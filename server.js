const express = require('express');
const cors = require('cors');
const app = express();

// メモリ内データストレージ
let characters = [];
let currentId = 1;

// CORS設定（すべてのオリジンを許可）
app.use(cors());

// JSONボディの解析を有効化
app.use(express.json());

// APIエンドポイント

// 全キャラクター取得
app.get('/api-practice/characters', (req, res) => {
  res.json(characters);
});

// キャラクター登録
app.post('/api-practice/characters', (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required.' });
  }

  const newCharacter = { id: currentId++, name, description };
  characters.push(newCharacter);
  res.status(201).json(newCharacter);
});

// 静的ファイル配信
app.use('/', express.static('public'));

// サーバー起動
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
