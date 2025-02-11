const express = require('express');
const cors = require('cors');
const app = express();

// 環境変数の設定
const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'https://api-practice-murex.vercel.app';

// メモリ内データストレージ（仮のデータ）
let characters = [];
let currentId = 1;

// ✅ CORS設定（特定のオリジンのみ許可）
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true
}));

// ✅ JSONボディの解析を有効化
app.use(express.json());

// ✅ APIエンドポイント
app.get('/api/characters', (req, res) => {
  console.log("📥 GET /api/characters - キャラクター一覧を取得");
  res.json(characters);
});

app.post('/api/characters', (req, res) => {
  console.log("📥 POST /api/characters - キャラクターを追加");
  
  const { name, description } = req.body;
  if (!name || !description) {
    console.error("❌ エラー: 名前と特徴が必要");
    return res.status(400).json({ error: 'Name and description are required.' });
  }

  const newCharacter = { id: currentId++, name, description };
  characters.push(newCharacter);

  console.log(`✅ 追加成功: ${JSON.stringify(newCharacter)}`);
  res.status(201).json(newCharacter);
});

// ✅ 静的ファイル配信
app.use(express.static('public'));

// ✅ サーバー起動
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
