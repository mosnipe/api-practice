document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('add-character-form');
  const getButton = document.getElementById('get-characters-btn');
  const list = document.getElementById('characters-list');

  // APIエンドポイント
  const API_BASE = 'http://localhost:3000/api-practice/characters'; // ローカル環境用のパス

  // キャラクター追加処理
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const description = form.description.value.trim();

    if (!name || !description) {
      alert('名前と特徴を入力してください。');
      return;
    }

    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      });

      if (res.ok) {
        const data = await res.json();
        alert(`追加しました: ${data.name}`);
        form.reset();
      } else {
        const error = await res.json();
        alert(`エラー: ${error.error}`);
      }
    } catch (err) {
      console.error(err);
      alert('サーバーに接続できませんでした。');
    }
  });

  // キャラクター一覧取得処理
  getButton.addEventListener('click', async () => {
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }
      const data = await res.json();
      list.innerHTML = '';
      data.forEach((char) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>ID：</strong> ${char.id} <br>
          <strong>名前：</strong> ${char.name} <br>
          <strong>特徴：</strong> ${char.description} <br>
        `;
        li.style.textAlign = "left";
        list.appendChild(li);
      });
    } catch (err) {
      console.error(err);
      alert('キャラクター一覧を取得できませんでした。');
    }
  });
});
