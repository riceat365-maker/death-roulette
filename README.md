# DEATH ROULETTE - イカゲーム風ルーレット

「イカゲーム（Squid Game）」のヨンヒ人形をモチーフにした、飲み会用ルーレットゲームです。

## 🎮 機能

- **プレイヤー登録**: 2〜12人のプレイヤーを登録
- **ルーレット機能**: ヨンヒ人形が回転してランダムなプレイヤーを選択
- **AI罰ゲーム生成**: Google Gemini APIを使用して罰ゲームを自動生成（オプション）
- **脱落表示**: 選択されたプレイヤーに「ELIMINATED」マークを表示
- **レスポンシブ対応**: スマートフォンでも快適に操作可能

## 🚀 セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定（オプション）

Google Gemini APIを使用して罰ゲームを生成する場合、APIキーを設定してください。

1. [Google AI Studio](https://makersuite.google.com/app/apikey) でAPIキーを取得
2. `.env.example` を `.env` にコピー
3. `.env` ファイルにAPIキーを設定

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

**注意**: APIキーが設定されていない場合でも、デフォルトの罰ゲームが使用されるため、アプリは正常に動作します。

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開いてください。

### 4. ビルド

```bash
npm run build
```

ビルドされたファイルは `dist` ディレクトリに生成されます。

## 🌐 デプロイ（無料ホスティング）

### Vercel（推奨）

詳細なデプロイ手順は [`VERCEL_DEPLOY.md`](./VERCEL_DEPLOY.md) を参照してください。

**簡単な手順**:
1. [Vercel](https://vercel.com) にアカウントを作成（GitHubアカウントでログイン可能）
2. GitHubにリポジトリをプッシュ
3. Vercelで「New Project」を選択
4. GitHubリポジトリをインポート
5. 環境変数 `VITE_GEMINI_API_KEY` を設定（オプション）
6. 「Deploy」をクリック

**メリット**:
- 完全無料
- 自動デプロイ（GitHubにプッシュするだけで自動更新）
- 高速なCDN
- カスタムドメイン対応（無料）

### Netlify

1. [Netlify](https://www.netlify.com) にアカウントを作成
2. GitHubリポジトリを接続
3. ビルドコマンド: `npm run build`
4. 公開ディレクトリ: `dist`
5. 環境変数を設定

### GitHub Pages

1. `vite.config.ts` に `base: '/リポジトリ名/'` を追加
2. GitHub Actionsで自動デプロイを設定

## 🎨 技術スタック

- **React 18** - UIフレームワーク
- **TypeScript** - 型安全性
- **Vite** - ビルドツール
- **Tailwind CSS** - スタイリング
- **Framer Motion** - アニメーション
- **Lucide React** - アイコン
- **Google Gemini API** - AI罰ゲーム生成（オプション）

## 📱 使用方法

1. プレイヤー名を入力して「追加」ボタンをクリック（2人以上必要）
2. 「だるまさんがころんだ」ボタンをクリックしてルーレットを開始
3. ヨンヒ人形が回転し、ランダムなプレイヤーを指して止まる
4. 選択されたプレイヤーに罰ゲームが表示される
5. 「リセット」ボタンで全プレイヤーの状態をリセット可能

## ⚠️ 注意事項

- 飲酒は適度に、責任を持って楽しんでください
- APIキーは環境変数で管理し、GitHubにコミットしないでください
- プレイヤーは最大12人まで登録可能です

## 📄 ライセンス

MIT License

