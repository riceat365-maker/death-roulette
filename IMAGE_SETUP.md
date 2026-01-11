# 画像の配置方法

## 📁 保存場所

**`public` フォルダ**に画像を配置してください。

```
プロジェクトルート/
  ├── public/
  │   └── young-hee-face.png  ← ここに画像を配置
  ├── src/
  └── ...
```

## 🖼️ 推奨される画像形式

### 1. **PNG形式（推奨）**
- **ファイル名**: `young-hee-face.png`
- **メリット**: 
  - 透明背景に対応
  - 高品質
  - すべてのブラウザで対応
- **用途**: 透明背景が必要な場合（人形の画像に最適）

### 2. **WebP形式（軽量）**
- **ファイル名**: `young-hee-face.webp`
- **メリット**: 
  - PNGより軽量（約30-50%削減）
  - 透明背景に対応
  - 高品質
- **注意**: コード内のパスも変更が必要（後述）

### 3. **SVG形式（ベクター）**
- **ファイル名**: `young-hee-face.svg`
- **メリット**: 
  - 拡大縮小しても劣化しない
  - 非常に軽量
- **注意**: 複雑な画像には不向き、コード内のパスも変更が必要

## 📐 推奨サイズ

- **最小サイズ**: 256x256px
- **推奨サイズ**: 512x512px 以上
- **最大サイズ**: 1024x1024px（それ以上は不要）
- **ファイルサイズ**: 100KB以下を推奨

## 🔧 画像の配置手順

### ステップ1: 画像ファイルを準備
1. ヨンヒ人形の画像を用意
2. 必要に応じて画像を最適化（後述）

### ステップ2: publicフォルダに配置
1. プロジェクトの `public` フォルダを開く
2. 画像ファイルを `young-hee-face.png` という名前で保存

### ステップ3: 確認
- 開発サーバーを起動（`npm run dev`）
- ブラウザで `http://localhost:5173` を開く
- 画像が正しく表示されるか確認

## 🎨 画像の最適化方法

### オンラインツール（無料）

1. **TinyPNG** (https://tinypng.com/)
   - PNG/WebPの圧縮に最適
   - ドラッグ&ドロップで簡単
   - 品質を保ちながらファイルサイズを削減

2. **Squoosh** (https://squoosh.app/)
   - Google製の画像最適化ツール
   - リアルタイムでプレビュー可能
   - 複数の形式に対応

3. **ImageOptim** (https://imageoptim.com/)
   - 複数の画像を一括処理可能

### コマンドラインツール

```powershell
# Sharpを使用した画像最適化（オプション）
npm install -D sharp
```

## 🔄 別の形式を使用する場合

### WebP形式を使用する場合

1. `public/young-hee-face.webp` に画像を配置
2. `src/YoungHeeDoll.tsx` を編集：

```typescript
<img
  src="/young-hee-face.webp"
  alt="YoungHee Doll"
  className="w-32 h-32 md:w-48 md:h-48 object-contain"
/>
```

### 複数の形式を用意する場合（最適化）

モダンブラウザではWebP、古いブラウザではPNGを使用：

```typescript
<picture>
  <source srcSet="/young-hee-face.webp" type="image/webp" />
  <img
    src="/young-hee-face.png"
    alt="YoungHee Doll"
    className="w-32 h-32 md:w-48 md:h-48 object-contain"
  />
</picture>
```

## ⚠️ 注意事項

1. **ファイル名の大文字小文字**: 
   - Windowsでは区別されませんが、Linux/サーバーでは区別されます
   - 小文字で統一することを推奨

2. **パスの指定**:
   - `public` フォルダ内のファイルは `/` から始まるパスで指定
   - 例: `/young-hee-face.png`（`public/` は含めない）

3. **フォールバック**:
   - 現在のコードは、ローカル画像が見つからない場合、自動的に外部URLにフォールバックします
   - ローカル画像を配置すれば、外部URLは使用されません

## 📦 デプロイ時の注意

- `public` フォルダ内のファイルは、ビルド時にそのまま `dist` フォルダにコピーされます
- 画像ファイルも一緒にデプロイされるため、ファイルサイズに注意してください

## 🎯 まとめ

**最も簡単な方法：**
1. PNG形式の画像を用意
2. `public/young-hee-face.png` として保存
3. 完了！

これで、外部URLに依存せず、ローカルの画像が使用されます。

