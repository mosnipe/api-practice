// script.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-character-form');
    const getButton = document.getElementById('get-characters-btn');
    const list = document.getElementById('characters-list');
  
    const API_BASE = 'https://yoshioka-test.sakura.ne.jp/api-practice/characters';
  
    // キャラクター追加処理
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const description = form.description.value.trim();
  
      if (!name || !description) {
        alert('名前と特徴は必須です。');
        return;
      }
  
      try {
        const res = await fetch(API_BASE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, description })
        });
  
        if (res.ok) {
          const data = await res.json();
          alert(`追加しました: ${data.name} (ID: ${data.id})`);
          form.reset();
        } else {
          const err = await res.json();
          alert(`エラー: ${err.error || '不明なエラー'}`);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        alert('サーバーへのリクエストに失敗しました。');
      }
    });
  
    // キャラクター一覧取得処理
    getButton.addEventListener('click', async () => {
      try {
        const res = await fetch(API_BASE);
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }
        const characters = await res.json();
        list.innerHTML = '';
        characters.forEach(char => {
          const li = document.createElement('li');
          li.textContent = `ID: ${char.id} / 名前: ${char.name} / 特徴: ${char.description}`;
          list.appendChild(li);
        });
        if (characters.length === 0) {
          list.innerHTML = '<li>キャラクターがいません。</li>';
        }
      } catch (error) {
        console.error(error);
        alert('キャラクター一覧取得中にエラーが発生しました。');
      }
    });
  });
  