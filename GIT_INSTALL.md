# Gitのインストールガイド（Windows）

## 📥 Gitのインストール手順

### ステップ1: Gitをダウンロード

1. [Git公式サイト](https://git-scm.com/download/win) にアクセス
2. 「Download for Windows」をクリック
3. ダウンロードが開始されます（約50MB）

### ステップ2: Gitをインストール

1. ダウンロードした `Git-x.x.x-64-bit.exe` を実行
2. インストールウィザードが開きます
3. **重要な設定**:
   - 「Select Components」画面: デフォルトのまま「Next」
   - 「Choosing the default editor」: お好みで選択（デフォルトはVim、初心者は「Notepad++」や「Visual Studio Code」推奨）
   - 「Adjusting your PATH environment」: **「Git from the command line and also from 3rd-party software」を選択**（重要！）
   - 「Choosing HTTPS transport backend」: デフォルトのまま「Next」
   - 「Configuring the line ending conversions」: デフォルトのまま「Next」
   - 「Configuring the terminal emulator」: デフォルトのまま「Next」
   - 「Configuring extra options」: デフォルトのまま「Next」
   - 「Configuring experimental options」: チェックを外して「Install」
4. インストールが完了したら「Finish」をクリック

### ステップ3: PowerShellを再起動

**重要**: Gitをインストールした後は、**PowerShellを完全に閉じて再起動**してください。

1. 現在のPowerShellウィンドウを閉じる
2. 新しいPowerShellウィンドウを開く
3. プロジェクトディレクトリに移動:
   ```powershell
   cd "C:\Users\caree\Downloads\イカゲーム"
   ```

### ステップ4: Gitのインストール確認

以下のコマンドでGitが正しくインストールされたか確認：

```powershell
git --version
```

**正常な場合の出力例:**
```
git version 2.42.0.windows.1
```

**エラーが出る場合:**
- PowerShellを再起動してください
- それでもダメな場合は、コンピューターを再起動してください

---

## 🔧 トラブルシューティング

### 問題1: PowerShellを再起動しても `git` コマンドが認識されない

**解決方法1: 環境変数の確認**
1. Windowsキー + R を押す
2. `sysdm.cpl` と入力してEnter
3. 「詳細設定」タブ → 「環境変数」をクリック
4. 「システム環境変数」の「Path」を選択 → 「編集」
5. `C:\Program Files\Git\cmd` が含まれているか確認
6. 含まれていない場合は追加

**解決方法2: Git Bashを使用**
- Gitをインストールすると「Git Bash」もインストールされます
- スタートメニューから「Git Bash」を起動
- Git Bashでも同じコマンドが使えます

### 問題2: インストール中にエラーが出る

**解決方法:**
1. 管理者権限で実行する
2. ウイルス対策ソフトを一時的に無効化
3. 再インストールを試す

---

## ✅ インストール確認後の次のステップ

Gitが正しくインストールされたら、以下のコマンドでGitリポジトリを初期化できます：

```powershell
# プロジェクトディレクトリに移動
cd "C:\Users\caree\Downloads\イカゲーム"

# Gitリポジトリを初期化
git init

# すべてのファイルを追加
git add .

# 初回コミット
git commit -m "Initial commit: DEATH ROULETTE game"
```

---

## 💡 ヒント

- **Git Bash**: WindowsのコマンドプロンプトやPowerShellの代わりに、Git Bashも使用できます
- **Visual Studio Code**: VS Codeを使用している場合、統合ターミナルからもGitコマンドが使えます
- **GitHub Desktop**: コマンドラインが苦手な場合は、[GitHub Desktop](https://desktop.github.com/) というGUIツールもあります

---

**インストールが完了したら、`VERCEL_DEPLOY.md` に戻ってデプロイ手順を続けてください！**

