import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase 設定
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// CSS 樣式
const styles = `
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

// 注入樣式
if (typeof document !== 'undefined' && !document.getElementById('custom-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'custom-styles';
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

// 圖示組件
const Icons = {
  Search: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  RefreshCw: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  Settings: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Plus: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  ),
  Heart: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  Users: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
    </svg>
  ),
  User: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  ExternalLink: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  ),
  Star: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  X: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Edit: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  Trash: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  )
};

function App() {
  // 基本狀態
  const [activeTab, setActiveTab] = useState('accounts');
  const [currentUser, setCurrentUser] = useState('');
  const [isUserSet, setIsUserSet] = useState(false);
  
  // 帳號管理
  const [steamAccounts, setSteamAccounts] = useState([]);
  const [showAccountForm, setShowAccountForm] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [newAccount, setNewAccount] = useState({
    account_name: '',
    steam_id: '',
    owner_name: ''
  });
  
  // 遊戲數據
  const [gameLibrary, setGameLibrary] = useState([]);
  const [gameDetails, setGameDetails] = useState({});
  const [wishlist, setWishlist] = useState([]);
  
  // UI狀態
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [minAccounts, setMinAccounts] = useState(1);
  const [loading, setLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState('未同步');
  const [lastSync, setLastSync] = useState(null);
  const [showWishForm, setShowWishForm] = useState(false);
  const [newWish, setNewWish] = useState({ name: '', reason: '' });
  
  // Steam API設定
  const [steamApiKey, setSteamApiKey] = useState('');
  const [showApiKeyForm, setShowApiKeyForm] = useState(false);

  // 初始化
  useEffect(() => {
    // 檢查用戶名稱
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(savedUser);
      setIsUserSet(true);
    }

    // 載入API Key
    const savedApiKey = localStorage.getItem('steamApiKey');
    if (savedApiKey) {
      setSteamApiKey(savedApiKey);
    }

    if (savedUser) {
      loadAllData();
    }
  }, []);

  // 載入所有數據
  const loadAllData = async () => {
    try {
      await Promise.all([
        loadSteamAccounts(),
        loadGameLibrary(),
        loadGameDetails(),
        loadWishlist()
      ]);
    } catch (error) {
      console.error('載入數據失敗:', error);
    }
  };

  // 載入Steam帳號
  const loadSteamAccounts = async () => {
    try {
      const { data, error } = await supabase
        .from('steam_accounts')
        .select('*')
        .order('created_at');

      if (error) throw error;
      setSteamAccounts(data || []);
    } catch (error) {
      console.error('載入Steam帳號失敗:', error);
    }
  };

  // 載入遊戲庫存
  const loadGameLibrary = async () => {
    try {
      const { data, error } = await supabase
        .from('steam_games')
        .select('*')
        .order('name');

      if (error) throw error;
      setGameLibrary(data || []);
    } catch (error) {
      console.error('載入遊戲庫存失敗:', error);
    }
  };

  // 載入遊戲詳情
  const loadGameDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('game_details')
        .select('*');

      if (error) throw error;
      
      const detailsMap = {};
      data?.forEach(detail => {
        detailsMap[detail.app_id] = detail;
      });
      setGameDetails(detailsMap);
    } catch (error) {
      console.error('載入遊戲詳情失敗:', error);
    }
  };

  // 載入許願清單
  const loadWishlist = async () => {
    try {
      const { data, error } = await supabase
        .from('wishlists')
        .select('*')
        .order('votes', { ascending: false });

      if (error) throw error;
      setWishlist(data || []);
    } catch (error) {
      console.error('載入許願清單失敗:', error);
    }
  };

  // 設定用戶名稱
  const setUserName = () => {
    if (!currentUser.trim()) {
      alert('請輸入用戶名稱');
      return;
    }
    localStorage.setItem('currentUser', currentUser);
    setIsUserSet(true);
    loadAllData();
  };

  // 新增Steam帳號
  const addSteamAccount = async () => {
    if (!newAccount.account_name || !newAccount.steam_id) {
      alert('請填寫帳號名稱和Steam ID');
      return;
    }

    try {
      const accountData = {
        ...newAccount,
        owner_name: newAccount.owner_name || currentUser
      };

      let result;
      if (editingAccount) {
        // 更新現有帳號
        result = await supabase
          .from('steam_accounts')
          .update(accountData)
          .eq('id', editingAccount.id);
      } else {
        // 新增帳號
        result = await supabase
          .from('steam_accounts')
          .insert([accountData]);
      }

      if (result.error) throw result.error;

      await loadSteamAccounts();
      setNewAccount({ account_name: '', steam_id: '', owner_name: '' });
      setShowAccountForm(false);
      setEditingAccount(null);
      
      alert(editingAccount ? '帳號更新成功！' : '帳號新增成功！');
    } catch (error) {
      console.error('操作帳號失敗:', error);
      alert('操作失敗: ' + error.message);
    }
  };

  // 刪除Steam帳號
  const deleteSteamAccount = async (accountId) => {
    if (!window.confirm('確定要刪除這個帳號嗎？')) return;

    try {
      const { error } = await supabase
        .from('steam_accounts')
        .delete()
        .eq('id', accountId);

      if (error) throw error;

      await loadSteamAccounts();
      alert('帳號刪除成功！');
    } catch (error) {
      console.error('刪除帳號失敗:', error);
      alert('刪除失敗: ' + error.message);
    }
  };

  // 同步Steam遊戲
  const syncSteamGames = async () => {
    if (!steamApiKey) {
      alert('請先設定Steam API Key');
      setShowApiKeyForm(true);
      return;
    }

    if (steamAccounts.length === 0) {
      alert('請先新增Steam帳號');
      setShowAccountForm(true);
      return;
    }

    setLoading(true);
    setSyncStatus('同步中...');

    try {
      const gameMap = new Map();
      let successCount = 0;
      let errors = [];

      for (const account of steamAccounts) {
        setSyncStatus(`同步中... 正在處理 ${account.account_name}`);

        try {
          const proxyUrl = 'https://api.allorigins.win/raw?url=';
          const steamApiUrl = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamApiKey}&steamid=${account.steam_id}&format=json&include_appinfo=true&include_played_free_games=true`;
          
          const response = await fetch(proxyUrl + encodeURIComponent(steamApiUrl));
          if (!response.ok) throw new Error(`HTTP ${response.status}`);

          const data = await response.json();
          if (!data.response?.games) {
            errors.push(`${account.account_name}: 沒有遊戲資料或隱私設定不允許`);
            continue;
          }

          // 處理遊戲資料
          data.response.games.forEach(game => {
            const gameId = game.appid;
            if (gameMap.has(gameId)) {
              const existing = gameMap.get(gameId);
              if (!existing.accounts.includes(account.id)) {
                existing.accounts.push(account.id);
              }
              existing.total_playtime += (game.playtime_forever || 0);
            } else {
              gameMap.set(gameId, {
                app_id: gameId,
                name: game.name || '未知遊戲',
                accounts: [account.id],
                playtime: Math.floor((game.playtime_forever || 0) / 60),
                total_playtime: game.playtime_forever || 0,
                img_icon_url: game.img_icon_url
              });
            }
          });

          successCount++;
          await new Promise(resolve => setTimeout(resolve, 500));
          
        } catch (error) {
          errors.push(`${account.account_name}: ${error.message}`);
        }
      }

      // 保存到資料庫
      const gamesArray = Array.from(gameMap.values());
      
      // 清除舊資料
      await supabase.from('steam_games').delete().neq('app_id', 0);
      
      // 插入新資料
      if (gamesArray.length > 0) {
        const { error } = await supabase
          .from('steam_games')
          .insert(gamesArray);
        
        if (error) throw error;
      }

      await loadGameLibrary();
      setLastSync(new Date());
      
      if (successCount === 0) {
        setSyncStatus('同步失敗');
        alert('所有帳號同步失敗:\n' + errors.join('\n'));
      } else if (errors.length > 0) {
        setSyncStatus(`部分成功 (${successCount}/${steamAccounts.length})`);
        alert(`同步完成！\n成功: ${successCount} 個帳號\n錯誤: ${errors.length} 個帳號\n\n獲得 ${gamesArray.length} 款遊戲`);
      } else {
        setSyncStatus('同步成功');
        alert(`同步成功！獲得 ${gamesArray.length} 款遊戲`);
      }

      // 開始獲取遊戲詳情
      if (gamesArray.length > 0) {
        setTimeout(() => batchFetchGameDetails(gamesArray), 1000);
      }

    } catch (error) {
      setSyncStatus('同步失敗');
      alert('同步失敗: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 獲取遊戲詳情
  const batchFetchGameDetails = async (games) => {
    setSyncStatus('獲取遊戲詳細資訊...');
    const batchSize = 3;
    let processedCount = 0;

    for (let i = 0; i < games.length; i += batchSize) {
      const batch = games.slice(i, i + batchSize);
      
      const promises = batch.map(async (game) => {
        if (!gameDetails[game.app_id]) {
          const details = await fetchGameDetails(game.app_id);
          if (details) {
            await supabase
              .from('game_details')
              .upsert({ app_id: game.app_id, ...details });
          }
        }
        processedCount++;
      });
      
      await Promise.allSettled(promises);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSyncStatus(`獲取遊戲資訊... ${Math.min(processedCount, games.length)}/${games.length}`);
    }
    
    await loadGameDetails();
    setSyncStatus('同步成功');
  };

  // 獲取單個遊戲詳情
  const fetchGameDetails = async (appId) => {
    try {
      const proxyUrl = 'https://api.allorigins.win/raw?url=';
      const storeApiUrl = `https://store.steampowered.com/api/appdetails?appids=${appId}&l=tchinese`;
      
      const response = await fetch(proxyUrl + encodeURIComponent(storeApiUrl));
      if (!response.ok) throw new Error('無法獲取遊戲資訊');
      
      const data = await response.json();
      const gameData = data[appId];
      
      if (gameData?.success && gameData.data) {
        return {
          short_description: gameData.data.short_description || '暫無描述',
          genres: gameData.data.genres || [],
          developers: gameData.data.developers || [],
          publishers: gameData.data.publishers || [],
          release_date: gameData.data.release_date || {},
          price_overview: gameData.data.price_overview || null,
          categories: gameData.data.categories || []
        };
      }
    } catch (error) {
      console.error(`獲取遊戲 ${appId} 詳細資訊失敗:`, error);
    }
    return null;
  };

  // 新增許願
  const addWish = async () => {
    if (!newWish.name.trim()) {
      alert('請輸入遊戲名稱');
      return;
    }

    try {
      const wishData = {
        game_name: newWish.name,
        reason: newWish.reason,
        requested_by: currentUser,
        votes: 1,
        status: 'pending'
      };

      const { error } = await supabase
        .from('wishlists')
        .insert([wishData]);

      if (error) throw error;

      await loadWishlist();
      setNewWish({ name: '', reason: '' });
      setShowWishForm(false);
    } catch (error) {
      alert('新增許願失敗: ' + error.message);
    }
  };

  // 投票許願
  const voteWish = async (wishId) => {
    try {
      const wish = wishlist.find(w => w.id === wishId);
      const { error } = await supabase
        .from('wishlists')
        .update({ votes: wish.votes + 1 })
        .eq('id', wishId);

      if (error) throw error;
      await loadWishlist();
    } catch (error) {
      alert('投票失敗: ' + error.message);
    }
  };

  // 篩選和排序遊戲
  const filteredAndSortedGames = () => {
    let filtered = gameLibrary.filter(game => {
      const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAccounts = selectedAccounts.length === 0 || 
                             selectedAccounts.every(accId => game.accounts.includes(accId));
      const matchesMinAccounts = game.accounts.length >= minAccounts;
      
      return matchesSearch && matchesAccounts && matchesMinAccounts;
    });

    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'playtime':
          comparison = a.playtime - b.playtime;
          break;
        case 'accounts':
          comparison = a.accounts.length - b.accounts.length;
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  };

  const filteredGames = filteredAndSortedGames();

  // 統計數據
  const totalGames = gameLibrary.length;
  const totalAccounts = steamAccounts.length;

  if (!isUserSet) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">歡迎使用Steam遊戲庫存系統</h2>
          <p className="text-gray-400 mb-6 text-center">請輸入你的用戶名稱開始使用</p>
          <div className="space-y-4">
            <input
              type="text"
              value={currentUser}
              onChange={(e) => setCurrentUser(e.target.value)}
              placeholder="輸入你的用戶名稱..."
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && setUserName()}
            />
            <button
              onClick={setUserName}
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg transition-colors"
            >
              開始使用
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* 頂部導航 */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                S
              </div>
              <div>
                <h1 className="text-xl font-bold">Steam 多用戶共享系統</h1>
                <p className="text-sm text-gray-400">Supabase版 • 用戶: {currentUser}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-300">
                {totalAccounts} 個帳號 • {totalGames} 款遊戲
              </span>
              <button
                onClick={() => setShowApiKeyForm(true)}
                className="bg-gray-600 hover:bg-gray-700 p-2 rounded-lg transition-colors"
                title="Steam API設定"
              >
                <Icons.Settings />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 主要內容 */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* 標籤頁 */}
        <div className="flex space-x-1 mb-6 bg-gray-800 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('accounts')}
            className={`px-6 py-3 rounded-md transition-colors ${
              activeTab === 'accounts' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            帳號管理 ({totalAccounts})
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`px-6 py-3 rounded-md transition-colors ${
              activeTab === 'library' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            遊戲庫存 ({totalGames})
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-6 py-3 rounded-md transition-colors ${
              activeTab === 'wishlist' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            許願清單 ({wishlist.length})
          </button>
        </div>

        {/* 帳號管理頁面 */}
        {activeTab === 'accounts' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Steam 帳號管理</h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAccountForm(true)}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Icons.Plus />
                  <span>新增帳號</span>
                </button>
                <button
                  onClick={syncSteamGames}
                  disabled={loading || !steamApiKey}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    loading || !steamApiKey
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  <Icons.RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  <span>{loading ? '同步中...' : '同步所有帳號'}</span>
                </button>
              </div>
            </div>

            {/* 同步狀態 */}
            {syncStatus !== '未同步' && (
              <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">同步狀態</span>
                  <span className={`text-sm font-bold ${
                    syncStatus.includes('成功') ? 'text-green-400' :
                    syncStatus.includes('失敗') ? 'text-red-400' :
                    'text-yellow-400'
                  }`}>
                    {syncStatus}
                  </span>
                </div>
                {lastSync && (
                  <p className="text-sm text-gray-400 mt-1">
                    最後同步: {lastSync.toLocaleString('zh-TW')}
                  </p>
                )}
              </div>
            )}

            {/* 帳號列表 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {steamAccounts.map(account => (
                <div key={account.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{account.account_name}</h3>
                      <p className="text-sm text-gray-400">擁有者: {account.owner_name}</p>
                      <p className="text-xs text-gray-500 font-mono">ID: {account.steam_id}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingAccount(account);
                          setNewAccount({
                            account_name: account.account_name,
                            steam_id: account.steam_id,
                            owner_name: account.owner_name
                          });
                          setShowAccountForm(true);
                        }}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Icons.Edit />
                      </button>
                      <button
                        onClick={() => deleteSteamAccount(account.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Icons.Trash />
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>遊戲數量:</span>
                      <span>{gameLibrary.filter(game => game.accounts.includes(account.id)).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>新增時間:</span>
                      <span>{new Date(account.created_at).toLocaleDateString('zh-TW')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {steamAccounts.length === 0 && (
              <div className="text-center py-12">
                <Icons.Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-2">還沒有Steam帳號</p>
                <p className="text-gray-500 mb-4">新增第一個Steam帳號開始使用</p>
                <button
                  onClick={() => setShowAccountForm(true)}
                  className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg flex items-center space-x-2 mx-auto transition-colors"
                >
                  <Icons.Plus />
                  <span>新增Steam帳號</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* 遊戲庫存頁面 */}
        {activeTab === 'library' && (
          <div>
            {/* 篩選控制 */}
            <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                  <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="搜尋遊戲..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [newSortBy, newSortOrder] = e.target.value.split('-');
                    setSortBy(newSortBy);
                    setSortOrder(newSortOrder);
                  }}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="name-asc">名稱 A-Z</option>
                  <option value="name-desc">名稱 Z-A</option>
                  <option value="playtime-desc">遊戲時間 高→低</option>
                  <option value="playtime-asc">遊戲時間 低→高</option>
                  <option value="accounts-desc">帳號數量 多→少</option>
                  <option value="accounts-asc">帳號數量 少→多</option>
                </select>

                <select
                  value={minAccounts}
                  onChange={(e) => setMinAccounts(parseInt(e.target.value))}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value={1}>至少1個帳號擁有</option>
                  <option value={2}>至少2個帳號擁有</option>
                  <option value={3}>至少3個帳號擁有</option>
                  <option value={Math.max(1, steamAccounts.length)}>所有帳號都擁有</option>
                </select>

                <div className="text-sm text-gray-400 flex items-center">
                  顯示 {filteredGames.length} / {totalGames} 款遊戲
                </div>
              </div>
            </div>

            {/* 遊戲列表 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map(game => {
                const details = gameDetails[game.app_id];
                const gameAccounts = steamAccounts.filter(acc => game.accounts.includes(acc.id));
                
                return (
                  <div key={game.app_id} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-all transform hover:scale-105">
                    <div className="flex items-start space-x-4 mb-3">
                      {game.img_icon_url && (
                        <img
                          src={`https://media.steampowered.com/steamcommunity/public/images/apps/${game.app_id}/${game.img_icon_url}.jpg`}
                          alt={game.name}
                          className="w-12 h-12 rounded bg-gray-700"
                          onError={(e) => e.target.style.display = 'none'}
                        />
                      )}
                      <div className="flex-1">
                        <a
                          href={`https://store.steampowered.com/app/${game.app_id}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-semibold text-blue-400 hover:text-blue-300 line-clamp-2 transition-colors"
                        >
                          {game.name}
                          <Icons.ExternalLink className="inline ml-1 w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    {details?.short_description && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-300 line-clamp-3">{details.short_description}</p>
                      </div>
                    )}

                    {details?.genres && details.genres.length > 0 && (
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {details.genres.slice(0, 3).map(genre => (
                            <span key={genre.id} className="bg-purple-600 text-purple-100 px-2 py-1 rounded text-xs">
                              {genre.description}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">遊戲時間：</span>
                        <span className="text-gray-300">{game.playtime}小時</span>
                      </div>
                      
                      {details?.developers && details.developers.length > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">開發商：</span>
                          <span className="text-gray-300 text-right">{details.developers[0]}</span>
                        </div>
                      )}

                      {details?.price_overview && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">價格：</span>
                          <span className="text-gray-300">{details.price_overview.final_formatted}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="text-sm text-gray-400 mb-2">
                        可用帳號 ({gameAccounts.length}/{steamAccounts.length})：
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {gameAccounts.map(acc => (
                          <span key={acc.id} className="bg-blue-600 text-blue-100 px-2 py-1 rounded text-xs">
                            {acc.account_name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredGames.length === 0 && totalGames > 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">沒有找到符合條件的遊戲</p>
              </div>
            )}

            {totalGames === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg mb-2">還沒有遊戲資料</p>
                <p className="text-gray-500">請先新增Steam帳號並同步遊戲庫存</p>
              </div>
            )}
          </div>
        )}

        {/* 許願清單頁面 */}
        {activeTab === 'wishlist' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">許願清單</h2>
              <button
                onClick={() => setShowWishForm(true)}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Icons.Plus />
                <span>新增許願</span>
              </button>
            </div>

            <div className="space-y-4">
              {wishlist.map(wish => (
                <div key={wish.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{wish.game_name}</h3>
                      {wish.reason && (
                        <p className="text-gray-400 mb-3">{wish.reason}</p>
                      )}
                      <div className="text-sm text-gray-500">
                        提案人: {wish.requested_by} • {new Date(wish.created_at).toLocaleDateString('zh-TW')}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-center">
                        <div className="text-lg font-bold text-pink-400">{wish.votes}</div>
                        <div className="text-xs text-gray-400">票</div>
                      </div>
                      <button
                        onClick={() => voteWish(wish.id)}
                        className="bg-pink-600 hover:bg-pink-700 p-2 rounded-lg transition-colors"
                        title="投票支持"
                      >
                        <Icons.Heart />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {wishlist.length === 0 && (
              <div className="text-center py-12">
                <Icons.Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-2">還沒有許願遊戲</p>
                <p className="text-gray-500 mb-4">新增第一個想要的遊戲吧！</p>
                <button
                  onClick={() => setShowWishForm(true)}
                  className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg flex items-center space-x-2 mx-auto transition-colors"
                >
                  <Icons.Plus />
                  <span>新增許願</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 帳號新增/編輯表單 */}
      {showAccountForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{editingAccount ? '編輯帳號' : '新增Steam帳號'}</h3>
              <button
                onClick={() => {
                  setShowAccountForm(false);
                  setEditingAccount(null);
                  setNewAccount({ account_name: '', steam_id: '', owner_name: '' });
                }}
                className="text-gray-400 hover:text-white"
              >
                <Icons.X />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">帳號名稱 *</label>
                <input
                  type="text"
                  value={newAccount.account_name}
                  onChange={(e) => setNewAccount({...newAccount, account_name: e.target.value})}
                  placeholder="例如：主帳號、小號1..."
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Steam ID *</label>
                <input
                  type="text"
                  value={newAccount.steam_id}
                  onChange={(e) => setNewAccount({...newAccount, steam_id: e.target.value})}
                  placeholder="76561198xxxxxxxxx"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-400 mt-1">
                  前往 <a href="https://steamid.io/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">steamid.io</a> 查詢
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">擁有者名稱</label>
                <input
                  type="text"
                  value={newAccount.owner_name}
                  onChange={(e) => setNewAccount({...newAccount, owner_name: e.target.value})}
                  placeholder={`留空將使用 "${currentUser}"`}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    setShowAccountForm(false);
                    setEditingAccount(null);
                    setNewAccount({ account_name: '', steam_id: '', owner_name: '' });
                  }}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 py-3 rounded-lg transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={addSteamAccount}
                  className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-lg transition-colors"
                >
                  {editingAccount ? '更新帳號' : '新增帳號'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Steam API Key 設定表單 */}
      {showApiKeyForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Steam API 設定</h3>
              <button
                onClick={() => setShowApiKeyForm(false)}
                className="text-gray-400 hover:text-white"
              >
                <Icons.X />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Steam Web API Key</label>
                <input
                  type="password"
                  value={steamApiKey}
                  onChange={(e) => setSteamApiKey(e.target.value)}
                  placeholder="請輸入Steam API Key"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                />
                <div className="mt-2 p-3 bg-blue-600 bg-opacity-20 border border-blue-600 rounded-lg">
                  <p className="text-blue-200 text-sm">
                    <strong>獲取步驟：</strong>
                  </p>
                  <ol className="text-blue-200 text-sm mt-1 space-y-1">
                    <li>1. 前往 <a href="https://steamcommunity.com/dev/apikey" target="_blank" rel="noopener noreferrer" className="underline">Steam API頁面</a></li>
                    <li>2. 登入Steam帳號</li>
                    <li>3. 域名填入：<code className="bg-blue-800 px-1 rounded">bless25min.github.io</code></li>
                    <li>4. 複製生成的API Key</li>
                  </ol>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowApiKeyForm(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 py-3 rounded-lg transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={() => {
                    localStorage.setItem('steamApiKey', steamApiKey);
                    setShowApiKeyForm(false);
                    alert('API Key 已儲存！');
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-lg transition-colors"
                >
                  儲存
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 許願表單 */}
      {showWishForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">新增遊戲許願</h3>
              <button
                onClick={() => setShowWishForm(false)}
                className="text-gray-400 hover:text-white"
              >
                <Icons.X />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">遊戲名稱 *</label>
                <input
                  type="text"
                  value={newWish.name}
                  onChange={(e) => setNewWish({...newWish, name: e.target.value})}
                  placeholder="輸入想要的遊戲名稱..."
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">許願理由（選填）</label>
                <textarea
                  value={newWish.reason}
                  onChange={(e) => setNewWish({...newWish, reason: e.target.value})}
                  placeholder="為什麼想要這款遊戲？"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 h-24 focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowWishForm(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 py-3 rounded-lg transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={addWish}
                  className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-lg transition-colors"
                >
                  新增許願
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
