// ✅ VercelのAPIルートとして正しく動作するサーバーレス関数
const characters = [];
let currentId = 1;

export default function handler(req, res) {
  if (req.method === 'GET') {
    console.log("📥 GET /api/characters");
    return res.status(200).json(characters);
  }

  if (req.method === 'POST') {
    console.log("📥 POST /api/characters");
    
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required.' });
    }

    const newCharacter = { id: currentId++, name, description };
    characters.push(newCharacter);

    console.log(`✅ 追加成功: ${JSON.stringify(newCharacter)}`);
    return res.status(201).json(newCharacter);
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
