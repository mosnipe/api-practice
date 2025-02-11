const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'https://api-practice-p0tufedoq-mosnipes-projects.vercel.app';

let characters = [];
let currentId = 1;

// ✅ CORS 設定
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));

// ✅ JSONボディの解析を有効化
app.use(express.json());

// ✅ APIエンドポイント
app.get('/api/characters', (req, res) => {
  console.log("📥 GET /api/characters - Ver 2.00");
  res.json(characters);
});

app.post('/api/characters', (req, res) => {
  console.log("📥 POST /api/characters - Ver 2.00");
  
  const { name, description } = req.body;
  if (!name || !description) {
    console.error("❌ Ver 2.00 - エラー: 名前と特徴が必要");
    return res.status(400).json({ error: 'Name and description are required.' });
  }

  const newCharacter = { id: currentId++, name, description };
  characters.push(newCharacter);

  console.log(`✅ Ver 2.00 - 追加成功: ${JSON.stringify(newCharacter)}`);
  res.status(201).json(newCharacter);
});

// ✅ サーバー起動
app.listen(PORT, () => {
  console.log(`🚀 Ver 2.00 - Server is running on port ${PORT}`);
});
