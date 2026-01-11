# クイックデプロイガイド（5分で完了）

## 🚀 最も簡単な方法

### 1. GitHubリポジトリを作成

1. [GitHub](https://github.com) にログイン
2. 右上の「+」→ 「New repository」
3. リポジトリ名を入力（例: `death-roulette`）
4. **「Initialize with README」のチェックを外す**
5. 「Create repository」をクリック

### 2. プロジェクトをGitHubにプッシュ

**Gitがインストールされていない場合:**
- 詳細なインストール手順は [`GIT_INSTALL.md`](./GIT_INSTALL.md) を参照してください
- 簡単に: [Git for Windows](https://git-scm.com/download/win) をダウンロードしてインストール
- **重要**: インストール後はPowerShellを再起動してください

**PowerShellで実行:**

```powershell
cd "C:\Users\caree\Downloads\イカゲーム"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

**重要**: `YOUR_USERNAME` と `YOUR_REPO_NAME` を実際の値に置き換えてください。

### 3. Vercelでデプロイ

1. [Vercel](https://vercel.com) にアクセス
2. 「Sign Up」→ GitHubアカウントでログイン
3. 「Add New...」→ 「Project」
4. 作成したGitHubリポジトリを選択
5. 「Import」をクリック
6. 「Deploy」をクリック

**完了！** 数分でデプロイされます。

---

## 📝 環境変数の設定（オプション）

Gemini APIを使用する場合：

1. Vercelダッシュボードでプロジェクトを開く
2. 「Settings」→ 「Environment Variables」
3. 追加：
   - **Name**: `VITE_GEMINI_API_KEY`
   - **Value**: あなたのAPIキー
4. 「Save」→ 再デプロイ

---

## 🔄 更新方法

コードを変更したら：

```powershell
git add .
git commit -m "Update"
git push
```

Vercelが自動的に再デプロイします！

---

詳細は [`VERCEL_DEPLOY.md`](./VERCEL_DEPLOY.md) を参照してください。

