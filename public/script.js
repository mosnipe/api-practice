document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('add-character-form');
  const getButton = document.getElementById('get-characters-btn');
  const list = document.getElementById('characters-list');

  // ✅ APIエンドポイント（Vercel & ローカルで自動切り替え）
  const API_BASE = window.location.hostname.includes('localhost')
    ? 'http://localhost:3000/api/characters'
    : 'https://api-practice-p0tufedoq-mosnipes-projects.vercel.app/api/characters';

  console.log(`🔍 Ver 2.00 - 使用するAPIエンドポイント: ${API_BASE}`);

  async function fetchCharacters() {
    try {
      console.log("📥 GETリクエスト送信中:", API_BASE);
      getButton.disabled = true;

      const res = await fetch(API_BASE);
      if (!res.ok) {
        throw new Error(`⚠️ HTTPエラー: ${res.status}`);
      }

      const data = await res.json();
      renderCharacterList(data);
    } catch (err) {
      console.error(`❌ [Ver 2.00] キャラクター一覧取得エラー:`, err);
      alert('⚠️ Ver 2.00 - キャラクター一覧を取得できませんでした。');
    } finally {
      getButton.disabled = false;
    }
  }

  fetchCharacters();
});
