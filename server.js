// server.js
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// メモリ上にキャラクターデータを保持
// 形式: { id: number, name: string, description: string }
let characters = [];
let currentId = 1;

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
  const newChar = { id: currentId++, name, description };
  characters.push(newChar);
  res.status(201).json(newChar);
});

// 静的ファイル提供（publicディレクトリ配下）
app.use(express.static('public'));

const port = 3000; // 任意のポートで
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
