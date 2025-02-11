const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// メモリ内データストレージ（仮のデータ）
let characters = [];
let currentId = 1;

// ✅ キャラクター一覧を取得
app.get('/api/characters', (req, res) => {
  console.log("📥 GET /api/characters - Ver 3.00");
  res.json(characters);
});

// ✅ キャラクターを追加
app.post('/api/characters', (req, res) => {
  console.log("📥 POST /api/characters - Ver 3.00");

  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required.' });
  }

  const newCharacter = { id: currentId++, name, description };
  characters.push(newCharacter);

  console.log(`✅ Ver 3.00 - 追加成功: ${JSON.stringify(newCharacter)}`);
  res.status(201).json(newCharacter);
});

module.exports = app;
