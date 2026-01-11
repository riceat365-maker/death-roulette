# GitHubリポジトリへのプッシュ修正ガイド

## 🔍 問題の確認

エラー「The provided GitHub repository does not contain the requested branch or commit reference」は、GitHubリポジトリが空であることを示しています。

## ✅ 解決手順

### ステップ1: 現在の状態を確認

PowerShellで以下を実行して、Gitの状態を確認：

```powershell
cd "C:\Users\caree\Downloads\イカゲーム"

# Gitリポジトリが初期化されているか確認
git status
```

**期待される出力:**
- リポジトリが初期化されている場合: ファイルのリストが表示される
- リポジトリが初期化されていない場合: 「not a git repository」というエラー

### ステップ2: Gitリポジトリを初期化（まだの場合）

```powershell
# Gitリポジトリを初期化
git init

# すべてのファイルを追加
git add .

# 初回コミット
git commit -m "Initial commit: DEATH ROULETTE game"
```

### ステップ3: GitHubリポジトリを確認

1. [GitHub](https://github.com) にログイン
2. リポジトリ `riceat365-maker/death-roulette` を開く
3. リポジトリが空（READMEのみ、または完全に空）か確認

### ステップ4: リモートリポジトリを設定

```powershell
# 現在のリモート設定を確認
git remote -v

# リモートが設定されていない、または間違っている場合
# 既存のリモートを削除（エラーが出る場合はスキップ）
git remote remove origin

# 正しいリモートを追加
git remote add origin https://github.com/riceat365-maker/death-roulette.git
```

### ステップ5: メインブランチを設定してプッシュ

```powershell
# メインブランチに設定
git branch -M main

# GitHubにプッシュ（初回は -u オプションを使用）
git push -u origin main
```

**認証が必要な場合:**
- GitHubのユーザー名とパスワード（またはPersonal Access Token）を入力
- パスワードの代わりにPersonal Access Tokenを使用することを推奨

### ステップ6: プッシュの確認

1. GitHubのリポジトリページをリロード
2. ファイルが表示されているか確認
3. 以下のファイルが表示されていれば成功：
   - `package.json`
   - `src/` フォルダ
   - `index.html`
   - その他のプロジェクトファイル

### ステップ7: Vercelで再試行

1. Vercelの「New Project」画面に戻る
2. リポジトリを再インポートするか、ページをリロード
3. リポジトリが正しく認識されるか確認
4. 「Deploy」をクリック

---

## 🔧 トラブルシューティング

### 問題1: `git push` で認証エラーが出る

**解決方法: Personal Access Tokenを使用**

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. 「Generate new token (classic)」をクリック
3. スコープで「repo」にチェック
4. 「Generate token」をクリック
5. 表示されたトークンをコピー（後で見れないので注意）
6. パスワードの代わりにこのトークンを使用

### 問題2: `git push` で「remote: Support for password authentication was removed」エラー

**解決方法: Personal Access Tokenを使用（上記参照）**

### 問題3: リポジトリが既に存在していて、READMEが含まれている

**解決方法: プルしてからプッシュ**

```powershell
# リモートのREADMEを取得
git pull origin main --allow-unrelated-histories

# 競合がある場合は解決してから
git add .
git commit -m "Merge remote README"

# プッシュ
git push -u origin main
```

### 問題4: ファイルが `.gitignore` で除外されている

**確認方法:**

```powershell
# ステージングされているファイルを確認
git status
```

**解決方法:**
- `.gitignore` を確認して、必要なファイルが除外されていないか確認
- 除外されているファイルを追加する場合:
  ```powershell
  git add -f ファイル名
  ```

---

## ✅ 成功の確認

GitHubリポジトリに以下のファイルが表示されていれば成功です：

- ✅ `package.json`
- ✅ `src/` フォルダとその中のファイル
- ✅ `index.html`
- ✅ `vite.config.ts`
- ✅ `tailwind.config.js`
- ✅ `README.md`
- ✅ その他の設定ファイル

---

## 🚀 次のステップ

GitHubにファイルが正しくプッシュされたら、Vercelで再度デプロイを試してください。

1. Vercelの「New Project」画面をリロード
2. リポジトリが正しく認識されるか確認
3. 「Deploy」をクリック

---

**問題が解決しない場合は、`git status` と `git remote -v` の出力結果を共有してください。**

