import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';
import YoungHeeDoll from './YoungHeeDoll';

interface Player {
  id: string;
  name: string;
  eliminated: boolean;
  angle: number;
}

interface Penalty {
  message: string;
  command: string;
}

const App: React.FC = () => {
  const [maxPlayers, setMaxPlayers] = useState<number | null>(null);
  const [tempMaxPlayers, setTempMaxPlayers] = useState<string>('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [tempPlayerNames, setTempPlayerNames] = useState<string[]>([]); // 一時的なプレイヤー名リスト
  const [playerName, setPlayerName] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [eliminatedPlayer, setEliminatedPlayer] = useState<Player | null>(null);
  const [penalty, setPenalty] = useState<Penalty | null>(null);
  const [showPenaltyDialog, setShowPenaltyDialog] = useState(false);
  const [showGameOverDialog, setShowGameOverDialog] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const rotationRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const addPlayer = () => {
    if (!maxPlayers) {
      alert('まず人数を設定してください');
      return;
    }
    if (playerName.trim() && tempPlayerNames.length < maxPlayers) {
      // 一時的なリストに追加（まだ配置しない）
      setTempPlayerNames([...tempPlayerNames, playerName.trim()]);
      setPlayerName('');
      
      // 全員入力が完了したら配置
      if (tempPlayerNames.length + 1 >= maxPlayers) {
        finalizePlayers([...tempPlayerNames, playerName.trim()]);
      }
    }
  };

  const finalizePlayers = (names: string[]) => {
    // 全員の名前が入力されたら、配置する
    const angleStep = 360 / maxPlayers!;
    const newPlayers: Player[] = names.map((name, index) => ({
      id: Date.now().toString() + index,
      name: name,
      eliminated: false,
      angle: angleStep * index,
    }));
    setPlayers(newPlayers);
    setTempPlayerNames([]);
  };

  const removeTempPlayer = (index: number) => {
    const updated = tempPlayerNames.filter((_, i) => i !== index);
    setTempPlayerNames(updated);
  };

  const removePlayer = (id: string) => {
    const updatedPlayers = players.filter(p => p.id !== id);
    // 人数に応じて角度を再計算
    if (maxPlayers) {
      const angleStep = 360 / maxPlayers;
      const recalculatedPlayers = updatedPlayers.map((p, index) => ({
        ...p,
        angle: angleStep * index,
      }));
      setPlayers(recalculatedPlayers);
    }
  };

  const resetGame = () => {
    setPlayers(players.map(p => ({ ...p, eliminated: false })));
    setEliminatedPlayer(null);
    setPenalty(null);
    setShowPenaltyDialog(false);
    setShowGameOverDialog(false);
    setRotation(0);
    setIsStopped(false);
  };

  const resetToInitial = () => {
    setMaxPlayers(null);
    setTempMaxPlayers('');
    setPlayers([]);
    setTempPlayerNames([]);
    setPlayerName('');
    setEliminatedPlayer(null);
    setPenalty(null);
    setShowPenaltyDialog(false);
    setShowGameOverDialog(false);
    setRotation(0);
    setIsStopped(false);
  };

  const checkGameOver = () => {
    const activePlayers = players.filter(p => !p.eliminated);
    return activePlayers.length <= 1;
  };

  const generatePenalty = async (playerName: string): Promise<Penalty> => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      // APIキーがない場合はデフォルトの罰ゲームを返す
      const defaultPenalties: Penalty[] = [
        { message: '監視カメラは見ていました。', command: 'テキーラを1杯飲み干してください。' },
        { message: 'ルール違反が検出されました。', command: 'ビールを1杯一気飲みしてください。' },
        { message: '脱落が確定しました。', command: '好きなお酒を1杯選んで飲んでください。' },
        { message: 'ゲームオーバーです。', command: 'ウイスキーを1ショット飲んでください。' },
      ];
      return defaultPenalties[Math.floor(Math.random() * defaultPenalties.length)];
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `飲み会の罰ゲームを生成してください。プレイヤー名は「${playerName}」です。イカゲームの雰囲気で、冷酷かつユーモアのある罰ゲーム（命令）を考えてください。回答は以下のJSON形式で返してください：{"message": "監視カメラは見ていました。", "command": "テキーラを1杯飲み干してください。"}`
              }]
            }]
          }),
        }
      );

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      // JSONを抽出
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // JSONが見つからない場合はデフォルトを返す
      return {
        message: '監視カメラは見ていました。',
        command: `${playerName}さん、お酒を1杯飲み干してください。`,
      };
    } catch (error) {
      console.error('Error generating penalty:', error);
      return {
        message: '監視カメラは見ていました。',
        command: `${playerName}さん、お酒を1杯飲み干してください。`,
      };
    }
  };

  const spinRoulette = async () => {
    if (!maxPlayers || players.length !== maxPlayers) {
      alert(`プレイヤーを${maxPlayers}人登録してください`);
      return;
    }

    const activePlayers = players.filter(p => !p.eliminated);
    if (activePlayers.length < 2) {
      alert('脱落していないプレイヤーが2人以上必要です');
      return;
    }

    setIsSpinning(true);
    setIsStopped(false);
    setEliminatedPlayer(null);
    setPenalty(null);
    setShowPenaltyDialog(false);

    // 高速回転アニメーション
    const spinDuration = 3000; // 3秒
    const startTime = Date.now();
    const baseRotation = rotationRef.current;

    const animate = async () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / spinDuration;

      if (progress < 1) {
        rotationRef.current = baseRotation + progress * 360 * 10; // 10回転
        setRotation(rotationRef.current);
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // アニメーションフレームをクリーンアップ
        if (animationFrameRef.current !== null) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }

        // ランダムなプレイヤーを選択
        const randomIndex = Math.floor(Math.random() * activePlayers.length);
        const selectedPlayer = activePlayers[randomIndex];
        
        // 選択されたプレイヤーの角度に向ける
        const targetAngle = selectedPlayer.angle;
        const finalRotation = baseRotation + 360 * 10 + (360 - (baseRotation % 360)) + targetAngle;
        
        rotationRef.current = finalRotation;
        setRotation(finalRotation);
        setIsSpinning(false);
        setIsStopped(true);

        // プレイヤーを脱落状態にする
        setPlayers(prev => prev.map(p => 
          p.id === selectedPlayer.id ? { ...p, eliminated: true } : p
        ));
        
        setEliminatedPlayer(selectedPlayer);

        // 人形が止まり、指さしが表示されるまで待つ（アニメーション2秒 + 指さし表示0.5秒 = 2.5秒）
        await new Promise(resolve => setTimeout(resolve, 2500));

        // 罰ゲームを生成
        const generatedPenalty = await generatePenalty(selectedPlayer.name);
        setPenalty(generatedPenalty);
        
        // 結果画面を表示
        setTimeout(() => {
          setShowPenaltyDialog(true);
        }, 300);

        // ゲーム終了チェック
        setTimeout(() => {
          if (checkGameOver()) {
            setTimeout(() => {
              setShowGameOverDialog(true);
            }, 1000);
          }
        }, 3500);
      }
    };

    animate();
  };

  const calculatePlayerPosition = (angle: number, radius: number) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const radian = (angle - 90) * (Math.PI / 180); // -90度で上から開始
    return {
      x: centerX + radius * Math.cos(radian),
      y: centerY + radius * Math.sin(radian),
    };
  };

  const getRadius = () => {
    const minDimension = Math.min(window.innerWidth, window.innerHeight);
    // スマホでは少し小さめに
    const isMobile = window.innerWidth < 768;
    return minDimension * (isMobile ? 0.25 : 0.3);
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {/* Scanline Effect */}
      <div className="scanline" />

      {/* Title */}
      <motion.h1
        className="absolute top-2 md:top-4 left-1/2 transform -translate-x-1/2 text-xl md:text-4xl font-dot text-squid-pink neon-glow z-10 px-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        DEATH ROULETTE
      </motion.h1>


      {/* Player Setup Section */}
      {!maxPlayers ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4 px-4 w-full max-w-sm">
          <h2 className="text-lg md:text-2xl font-dot text-squid-pink neon-glow text-center mb-2 md:mb-4">
            参加人数を設定
          </h2>
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                min="2"
                max="12"
                value={tempMaxPlayers}
                onChange={(e) => {
                  setTempMaxPlayers(e.target.value);
                }}
                onBlur={(e) => {
                  const value = parseInt(e.target.value);
                  if (value >= 2 && value <= 12) {
                    setTempMaxPlayers(value.toString());
                  } else {
                    setTempMaxPlayers('');
                  }
                }}
                placeholder="人数"
                className="bg-black border-2 border-squid-pink text-white px-4 py-3 md:py-2 rounded font-dot text-center w-24 text-lg md:text-base focus:outline-none focus:border-squid-pink focus:neon-glow"
              />
              <span className="text-squid-pink font-dot text-lg md:text-base">人</span>
            </div>
            <button
              onClick={() => {
                const value = parseInt(tempMaxPlayers);
                if (value >= 2 && value <= 12) {
                  setMaxPlayers(value);
                  setTempMaxPlayers('');
                } else {
                  alert('2人以上12人以下で設定してください');
                }
              }}
              disabled={!tempMaxPlayers || parseInt(tempMaxPlayers) < 2 || parseInt(tempMaxPlayers) > 12}
              className="bg-squid-pink text-black px-8 py-3 md:py-3 rounded-lg font-dot font-bold text-base md:text-lg hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity neon-glow w-full max-w-xs"
            >
              決定
            </button>
          </div>
        </div>
      ) : (
        <div className="absolute top-12 md:top-20 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2 w-full px-4">
          <div className="flex items-center justify-center gap-3 mb-2 w-full">
            <span className="text-sm md:text-base text-squid-pink font-dot">
              {players.length > 0 ? players.length : tempPlayerNames.length} / {maxPlayers} 人
            </span>
            <button
              onClick={() => {
                if (window.confirm('人数を変更すると、登録済みのプレイヤーがすべて削除されます。よろしいですか？')) {
                  setMaxPlayers(null);
                  setPlayers([]);
                  setTempPlayerNames([]);
                  setPlayerName('');
                  setRotation(0);
                  setEliminatedPlayer(null);
                  setPenalty(null);
                  setShowPenaltyDialog(false);
                  setShowGameOverDialog(false);
                  setIsStopped(false);
                }
              }}
              className="text-xs md:text-sm text-squid-pink border border-squid-pink px-3 py-1 rounded font-dot hover:bg-squid-pink hover:text-black transition-colors"
            >
              人数変更
            </button>
          </div>
          <div className="flex gap-2 w-full max-w-md">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
              placeholder="プレイヤー名"
              className="flex-1 bg-black border-2 border-squid-pink text-white px-3 py-2 md:px-4 md:py-2 rounded font-dot text-sm md:text-base focus:outline-none focus:border-squid-pink focus:neon-glow"
              maxLength={20}
              disabled={tempPlayerNames.length >= maxPlayers || players.length > 0}
            />
            <button
              onClick={addPlayer}
              disabled={!playerName.trim() || tempPlayerNames.length >= maxPlayers || players.length > 0}
              className="bg-squid-pink text-black px-4 py-2 md:px-6 md:py-2 rounded font-dot font-bold text-sm md:text-base hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity min-w-[80px]"
            >
              追加
            </button>
          </div>
          {/* 一時的なプレイヤー名リスト表示 */}
          {tempPlayerNames.length > 0 && (
            <div className="w-full max-w-md mt-2 space-y-1">
              <p className="text-xs text-gray-400 font-dot text-center">
                入力済み: {tempPlayerNames.length} / {maxPlayers} 人
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {tempPlayerNames.map((name, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 border border-squid-pink rounded px-2 py-1 text-xs font-dot text-squid-pink flex items-center gap-1"
                  >
                    <span>{name}</span>
                    <button
                      onClick={() => removeTempPlayer(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {players.length > 0 && (
            <button
              onClick={resetGame}
              className="text-xs md:text-sm text-squid-pink hover:underline"
            >
              リセット
            </button>
          )}
        </div>
      )}

      {/* Central YoungHee Doll */}
      {maxPlayers && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
          <YoungHeeDoll
            rotation={rotation}
            isSpinning={isSpinning}
            targetAngle={isStopped && eliminatedPlayer ? players.find(p => p.id === eliminatedPlayer.id)?.angle : undefined}
          />
        </div>
      )}

      {/* Players Circle */}
      {maxPlayers && (
        <div className="relative w-full h-full">
          {players.map((player) => {
          const radius = getRadius();
          const position = calculatePlayerPosition(player.angle, radius);
          return (
            <motion.div
              key={player.id}
              className="absolute z-20"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: position.x - 50,
                y: position.y - 50,
              }}
              style={{
                left: 0,
                top: 0,
              }}
            >
              <div className="relative">
                <div
                  className={`w-16 h-16 md:w-24 md:h-24 rounded-full border-3 md:border-4 flex items-center justify-center text-[10px] md:text-sm font-dot text-center p-1 md:p-2 transition-all ${
                    player.eliminated
                      ? 'border-red-500 bg-red-900/50 opacity-50'
                      : 'border-squid-pink bg-black'
                  }`}
                >
                  <span className="truncate px-1">{player.name}</span>
                  {player.eliminated && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <X className="w-8 h-8 md:w-12 md:h-12 text-red-500" strokeWidth={3} />
                    </div>
                  )}
                </div>
                {player.eliminated && (
                  <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-red-500 text-white text-[8px] md:text-xs px-1 md:px-2 py-0.5 md:py-1 rounded font-dot neon-glow-red">
                    ELIMINATED
                  </div>
                )}
                <button
                  onClick={() => removePlayer(player.id)}
                  className="absolute -top-1 -left-1 md:-top-2 md:-left-2 w-5 h-5 md:w-6 md:h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs hover:bg-red-600 touch-manipulation"
                >
                  ×
                </button>
              </div>
            </motion.div>
          );
          })}
        </div>
      )}

      {/* Start Button and Exit Button */}
      {maxPlayers && players.length === maxPlayers && players.length >= 2 && (
        <div className="absolute bottom-4 md:bottom-12 left-1/2 transform -translate-x-1/2 z-30 w-[90%] max-w-2xl flex flex-col md:flex-row gap-3 md:gap-4 items-center justify-center">
          <motion.button
            onClick={spinRoulette}
            disabled={isSpinning || checkGameOver()}
            className="bg-squid-pink text-black px-6 py-3 md:px-8 md:py-4 rounded-lg font-dot text-sm md:text-xl font-bold hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity neon-glow touch-manipulation flex-1 max-w-md w-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSpinning ? '回転中...' : 'だるまさんがころんだ'}
          </motion.button>
          <motion.button
            onClick={() => {
              if (window.confirm('ゲームを終了して最初の画面に戻りますか？')) {
                resetToInitial();
              }
            }}
            className="bg-gray-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-dot text-sm md:text-xl font-bold hover:bg-gray-600 transition-colors touch-manipulation flex-1 max-w-md w-full border-2 border-gray-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            終了
          </motion.button>
        </div>
      )}

      {/* Penalty Dialog */}
      <AnimatePresence>
        {showPenaltyDialog && penalty && eliminatedPlayer && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPenaltyDialog(false)}
          >
            <motion.div
              className="bg-black border-4 border-squid-pink rounded-lg p-4 md:p-8 max-w-md w-full relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowPenaltyDialog(false)}
                className="absolute top-2 right-2 text-squid-pink hover:text-white transition-colors"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              
              <div className="text-center space-y-3 md:space-y-4">
                <AlertTriangle className="w-12 h-12 md:w-16 md:h-16 text-red-500 mx-auto neon-glow-red" />
                <h2 className="text-xl md:text-3xl font-dot text-red-500 neon-glow-red">
                  ELIMINATED
                </h2>
                <p className="text-lg md:text-2xl font-dot text-squid-pink neon-glow">
                  {eliminatedPlayer.name}
                </p>
                <div className="border-t border-squid-pink pt-3 md:pt-4 space-y-2">
                  <p className="text-xs md:text-base text-gray-300 font-dot">
                    {penalty.message}
                  </p>
                  <p className="text-base md:text-xl text-squid-pink neon-glow font-dot">
                    {penalty.command}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Over Dialog */}
      <AnimatePresence>
        {showGameOverDialog && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-black border-4 border-squid-pink rounded-lg p-6 md:p-8 max-w-md w-full relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="text-center space-y-4 md:space-y-6">
                <h2 className="text-2xl md:text-4xl font-dot text-squid-pink neon-glow">
                  ゲーム終了
                </h2>
                <p className="text-base md:text-lg text-gray-300 font-dot">
                  もう一度遊びますか？
                </p>
                <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center pt-4">
                  <button
                    onClick={() => {
                      setShowGameOverDialog(false);
                      resetGame();
                    }}
                    className="bg-squid-pink text-black px-6 py-3 md:px-8 md:py-4 rounded-lg font-dot text-base md:text-lg font-bold hover:opacity-80 transition-opacity neon-glow touch-manipulation"
                  >
                    もう一度遊ぶ
                  </button>
                  <button
                    onClick={resetToInitial}
                    className="bg-gray-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-dot text-base md:text-lg font-bold hover:bg-gray-600 transition-colors touch-manipulation"
                  >
                    終了
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;

