# Vercelへのデプロイガイド

このガイドでは、DEATH ROULETTEアプリをVercelにデプロイする方法を詳しく説明します。

## 📋 前提条件

- GitHubアカウント（無料で作成可能）
- Vercelアカウント（無料で作成可能）
- プロジェクトが完成していること

---

## 🚀 方法1: GitHub経由でデプロイ（推奨）

この方法が最も簡単で、自動デプロイも設定できます。

### ステップ1: Gitのインストール（まだの場合）

**詳細なインストール手順は [`GIT_INSTALL.md`](./GIT_INSTALL.md) を参照してください。**

簡単な手順：
1. [Git公式サイト](https://git-scm.com/download/win) にアクセス
2. Windows版をダウンロードしてインストール
3. **インストール時に「Adjusting your PATH environment」で「Git from the command line and also from 3rd-party software」を選択**（重要！）
4. インストール後、**PowerShellを完全に閉じて再起動**
5. インストール確認: `git --version` を実行

### ステップ2: GitHubリポジトリの作成

1. [GitHub](https://github.com) にログイン
2. 右上の「+」ボタン → 「New repository」をクリック
3. リポジトリ名を入力（例: `death-roulette`）
4. 「Public」または「Private」を選択
5. **「Initialize this repository with a README」のチェックを外す**（既にファイルがあるため）
6. 「Create repository」をクリック

### ステップ3: ローカルでGitリポジトリを初期化

PowerShellでプロジェクトディレクトリに移動して、以下を実行：

```powershell
# プロジェクトディレクトリに移動
cd "C:\Users\caree\Downloads\イカゲーム"

# Gitリポジトリを初期化
git init

# すべてのファイルをステージング
git add .

# 初回コミット
git commit -m "Initial commit: DEATH ROULETTE game"

# GitHubリポジトリをリモートとして追加（YOUR_USERNAMEとYOUR_REPO_NAMEを置き換え）
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# メインブランチを設定
git branch -M main

# GitHubにプッシュ
git push -u origin main
```

**注意**: 
- `YOUR_USERNAME` をあなたのGitHubユーザー名に置き換えてください
- `YOUR_REPO_NAME` をステップ2で作成したリポジトリ名に置き換えてください

### ステップ4: Vercelでプロジェクトをインポート

1. [Vercel](https://vercel.com) にアクセス
2. 「Sign Up」をクリック（GitHubアカウントでログイン推奨）
3. ダッシュボードで「Add New...」→ 「Project」をクリック
4. 「Import Git Repository」でGitHubリポジトリを選択
5. リポジトリを選択して「Import」をクリック

### ステップ5: ビルド設定

Vercelが自動的に設定を検出しますが、確認してください：

- **Framework Preset**: Vite
- **Build Command**: `npm run build`（自動検出されるはず）
- **Output Directory**: `dist`（自動検出されるはず）
- **Install Command**: `npm install`（自動検出されるはず）

### ステップ6: 環境変数の設定（オプション）

Gemini APIを使用する場合：

1. 「Environment Variables」セクションを開く
2. 以下の環境変数を追加：
   - **Name**: `VITE_GEMINI_API_KEY`
   - **Value**: あなたのGemini APIキー
3. 「Save」をクリック

### ステップ7: デプロイ

1. 「Deploy」ボタンをクリック
2. 数分待つとデプロイが完了します
3. デプロイが完了すると、URLが表示されます（例: `https://death-roulette.vercel.app`）

### ステップ8: 自動デプロイの設定（オプション）

GitHubにプッシュするたびに自動的にデプロイされます：
- `main` ブランチへのプッシュ → 本番環境に自動デプロイ
- 他のブランチへのプッシュ → プレビュー環境に自動デプロイ

---

## 🛠️ 方法2: Vercel CLIを使用（上級者向け）

コマンドラインから直接デプロイする方法です。

### ステップ1: Vercel CLIのインストール

```powershell
npm install -g vercel
```

### ステップ2: Vercelにログイン

```powershell
vercel login
```

ブラウザが開くので、Vercelアカウントでログインします。

### ステップ3: プロジェクトディレクトリでデプロイ

```powershell
# プロジェクトディレクトリに移動
cd "C:\Users\caree\Downloads\イカゲーム"

# デプロイ実行
vercel
```

初回は以下の質問に答えます：
- **Set up and deploy?** → `Y`
- **Which scope?** → あなたのアカウントを選択
- **Link to existing project?** → `N`（新規プロジェクトの場合）
- **Project name?** → プロジェクト名を入力（例: `death-roulette`）
- **Directory?** → `.`（現在のディレクトリ）
- **Override settings?** → `N`（デフォルト設定を使用）

### ステップ4: 本番環境にデプロイ

```powershell
vercel --prod
```

---

## 🔧 トラブルシューティング

### 問題1: ビルドエラーが発生する

**エラーメッセージ例:**
```
Build failed
```

**解決方法:**
1. ローカルでビルドが成功するか確認：
   ```powershell
   npm run build
   ```
2. `package.json` の `scripts` セクションを確認
3. Vercelのビルドログを確認してエラーを特定

### 問題2: 環境変数が反映されない

**解決方法:**
1. 環境変数名が `VITE_` で始まっているか確認
2. Vercelのダッシュボードで環境変数を再設定
3. 再デプロイを実行

### 問題3: 画像が表示されない

**解決方法:**
1. `public` フォルダ内の画像ファイルがコミットされているか確認
2. 画像のパスが `/young-hee-face.png` のように正しいか確認

### 問題4: ルーティングエラー

**解決方法:**
Vercelは自動的にSPA（Single Page Application）として認識しますが、問題がある場合は `vercel.json` を作成：

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 📝 デプロイ後の確認事項

1. ✅ アプリが正常に表示されるか
2. ✅ すべての機能が動作するか
3. ✅ スマホでも正常に表示されるか
4. ✅ 画像が正しく表示されるか
5. ✅ 環境変数が正しく設定されているか（API使用時）

---

## 🔄 更新方法

### GitHub経由の場合

```powershell
# 変更をコミット
git add .
git commit -m "Update: 変更内容の説明"
git push
```

Vercelが自動的に再デプロイします。

### Vercel CLIの場合

```powershell
vercel --prod
```

---

## 🌐 カスタムドメインの設定（オプション）

1. Vercelダッシュボードでプロジェクトを開く
2. 「Settings」→ 「Domains」を開く
3. ドメイン名を入力
4. DNS設定を指示に従って設定

---

## 💡 ヒント

- **無料プラン**: Vercelの無料プランで十分です
- **自動デプロイ**: GitHubと連携すると、プッシュするだけで自動更新
- **プレビュー**: プルリクエストごとにプレビューURLが生成されます
- **ログ**: Vercelダッシュボードでビルドログとデプロイログを確認できます

---

## 📞 サポート

問題が解決しない場合：
1. [Vercel公式ドキュメント](https://vercel.com/docs) を確認
2. [Vercelコミュニティ](https://github.com/vercel/vercel/discussions) で質問
3. ビルドログのエラーメッセージを確認

---

**準備完了！Vercelでアプリを公開しましょう！🚀**

