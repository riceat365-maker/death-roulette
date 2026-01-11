# Gitエラー修正ガイド

## 🔍 エラーの原因

1. **リモートURLが間違っている**: URLが重複している
2. **mainブランチが存在しない**: コミットがまだされていない

## ✅ 解決手順

### ステップ1: リモートURLを修正

```powershell
# 現在のリモート設定を確認
git remote -v

# 間違ったリモートを削除
git remote remove origin

# 正しいリモートを追加
git remote add origin https://github.com/riceat365-maker/death-roulette.git

# 確認
git remote -v
```

**正しい出力例:**
```
origin  https://github.com/riceat365-maker/death-roulette.git (fetch)
origin  https://github.com/riceat365-maker/death-roulette.git (push)
```

### ステップ2: コミットの確認

```powershell
# コミット履歴を確認
git log

# または
git status
```

**コミットが存在しない場合:**
```powershell
# すべてのファイルを追加
git add .

# コミット
git commit -m "Initial commit: DEATH ROULETTE game"
```

### ステップ3: ブランチの確認と作成

```powershell
# 現在のブランチを確認
git branch

# ブランチが表示されない場合、mainブランチを作成
git branch -M main

# 確認
git branch
```

### ステップ4: GitHubにプッシュ

```powershell
# プッシュ
git push -u origin main
```

---

## 🔧 完全な手順（一からやり直す場合）

もし上記で解決しない場合は、以下を順番に実行：

```powershell
# 1. リモートを削除
git remote remove origin

# 2. 正しいリモートを追加
git remote add origin https://github.com/riceat365-maker/death-roulette.git

# 3. すべてのファイルを追加
git add .

# 4. コミット（まだの場合）
git commit -m "Initial commit: DEATH ROULETTE game"

# 5. メインブランチに設定
git branch -M main

# 6. プッシュ
git push -u origin main
```

---

## ⚠️ 認証エラーが出る場合

Personal Access Tokenが必要です：

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. 「Generate new token (classic)」
3. スコープで「repo」にチェック
4. 「Generate token」をクリック
5. トークンをコピー
6. パスワードの代わりにトークンを使用

---

## ✅ 成功の確認

プッシュが成功すると、以下のようなメッセージが表示されます：

```
Enumerating objects: X, done.
Counting objects: 100% (X/X), done.
Writing objects: 100% (X/X), done.
To https://github.com/riceat365-maker/death-roulette.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

