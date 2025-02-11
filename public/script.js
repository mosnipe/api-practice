document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('add-character-form');
  const getButton = document.getElementById('get-characters-btn');
  const list = document.getElementById('characters-list');

  // APIエンドポイント
  const API_BASE = 'https://api-practice-murex.vercel.app/api/characters';

  async function fetchCharacters() {
    try {
      getButton.disabled = true;
      const res = await fetch(API_BASE);
      if (!res.ok) {
        throw new Error(`HTTPエラー: ${res.status}`);
      }
      const data = await res.json();
      // ここで renderCharacterList を呼び出す
      renderCharacterList(data);
    } catch (err) {
      console.error('キャラクター一覧取得エラー:', err);
      alert('キャラクター一覧を取得できませんでした。');
    } finally {
      getButton.disabled = false;
    }
  }

  // 🎯 これが必要
  function renderCharacterList(data) {
    // 一覧表示のロジック
    list.innerHTML = '';

    if (!data || data.length === 0) {
      list.innerHTML = '<li>キャラクターが登録されていません。</li>';
      return;
    }

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
  }

  // ページロード時に一覧取得
  fetchCharacters();
});
