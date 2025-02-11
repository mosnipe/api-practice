document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('add-character-form');
  const getButton = document.getElementById('get-characters-btn');
  const list = document.getElementById('characters-list');

  // ✅ APIエンドポイント（環境変数で自動切り替え）
  const API_BASE = window.location.hostname.includes('localhost')
    ? 'http://localhost:3000/api/characters'
    : 'https://api-practice-murex.vercel.app/api/characters';

  console.log(`使用するAPIエンドポイント: ${API_BASE}`);

  /**
   * キャラクター追加処理
   */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const description = form.description.value.trim();

    if (!name || !description) {
      alert('名前と特徴を入力してください。');
      return;
    }

    try {
      console.log("POSTリクエスト送信中:", API_BASE);
      form.querySelector('button[type="submit"]').disabled = true;

      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
        mode: 'cors'
      });

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      const data = await res.json();
      alert(`追加しました: ${data.name}`);
      form.reset();
      fetchCharacters(); // 追加後に自動更新
    } catch (err) {
      console.error("キャラクター追加エラー:", err);
      alert('サーバーに接続できませんでした。');
    } finally {
      form.querySelector('button[type="submit"]').disabled = false;
    }
  });

  /**
   * キャラクター一覧取得処理
   */
  getButton.addEventListener('click', fetchCharacters);

  async function fetchCharacters() {
    try {
      console.log("GETリクエスト送信中:", API_BASE);
      getButton.disabled = true;

      const res = await fetch(API_BASE, { mode: 'cors' });
      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      const data = await res.json();
      renderCharacterList(data);
    } catch (err) {
      console.error("キャラクター一覧取得エラー:", err);
      alert('キャラクター一覧を取得できませんでした。');
    } finally {
      getButton.disabled = false;
    }
  }

  /**
   * キャラクター一覧を描画する
   * @param {Array} data
   */
  function renderCharacterList(data) {
    list.innerHTML = '';

    if (data.length === 0) {
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
});
