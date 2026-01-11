import { motion } from 'framer-motion';
import { Pointer } from 'lucide-react';

interface YoungHeeDollProps {
  rotation: number;
  isSpinning: boolean;
  targetAngle?: number;
}

const YoungHeeDoll: React.FC<YoungHeeDollProps> = ({ rotation, isSpinning, targetAngle }) => {
  return (
    <div className="relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center">
      <motion.div
        className="relative"
        animate={{
          rotate: isSpinning ? rotation : targetAngle || 0,
        }}
        transition={{
          duration: isSpinning ? 0.1 : 2,
          ease: isSpinning ? 'linear' : 'easeOut',
        }}
      >
        <img
          src="/young-hee-face.png"
          alt="YoungHee Doll"
          className="w-32 h-32 md:w-48 md:h-48 object-contain"
          onError={(e) => {
            // ローカル画像が見つからない場合、外部URLにフォールバック
            const target = e.target as HTMLImageElement;
            target.src = "https://images.microcms-assets.io/assets/27042597e78148338e3a2b16664d422a/91566373b88b4d089d81d45172037920/young-hee-face.png";
          }}
        />
        {!isSpinning && targetAngle !== undefined && (
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <Pointer className="w-8 h-8 md:w-12 md:h-12 text-squid-pink neon-glow" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default YoungHeeDoll;

