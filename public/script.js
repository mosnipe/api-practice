document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('add-character-form');
  const getButton = document.getElementById('get-characters-btn');
  const list = document.getElementById('characters-list');

  // ✅ 本番環境のAPIエンドポイントを固定
  const API_BASE = 'https://api-practice-murex.vercel.app/api/characters';

  console.log(`🔍 Ver 2.03 - 使用するAPIエンドポイント: ${API_BASE}`);

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
      console.error(`❌ キャラクター一覧取得エラー:`, err);
      alert('⚠️ キャラクター一覧を取得できませんでした。');
    } finally {
      getButton.disabled = false;
    }
  }

  fetchCharacters();
});
