const express = require('express');
const cors = require('cors');
const app = express();

// 環境変数の設定
const API_BASE = process.env.API_BASE || 'http://localhost:3000/api-practice/characters';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'https://api-practice-murex.vercel.app';

// メモリ内データストレージ
let characters = [];
let currentId = 1;

// CORS設定（環境変数で許可するオリジンを指定）
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true
}));

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
  console.log(`Server is running on port ${port}`);
  console.log(`API Base URL: ${API_BASE}`);
});
