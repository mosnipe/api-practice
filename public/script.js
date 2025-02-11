document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('add-character-form');
  const getButton = document.getElementById('get-characters-btn');
  const list = document.getElementById('characters-list');

  // ✅ APIエンドポイント（本番環境固定）
  const API_BASE = window.location.hostname.includes('localhost')
    ? 'http://localhost:3000/api/characters'
    : 'https://api-practice-murex.vercel.app/api/characters';

  console.log(`🔍 Ver 2.02 - 使用するAPIエンドポイント: ${API_BASE}`);

  async function fetchCharacters() {
    try {
      console.log("📥 GETリクエスト送信中:", API_BASE);
      getButton.disabled = true;

      const res = await fetch(API_BASE);
      if (!res.ok) {
        throw new Error(`⚠️ Ver 2.02 - HTTPエラー: ${res.status}`);
      }

      const data = await res.json();
      renderCharacterList(data);
    } catch (err) {
      console.error(`❌ Ver 2.02 - キャラクター一覧取得エラー:`, err);
      alert('⚠️ Ver 2.02 - キャラクター一覧を取得できませんでした。');
    } finally {
      getButton.disabled = false;
    }
  }

  fetchCharacters();
});
