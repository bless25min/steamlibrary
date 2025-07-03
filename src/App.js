import React, { useState, useEffect } from 'react';

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
  
  // Steam設定
  const [steamApiKey, setSteamApiKey] = useState('');
  const [steamAccounts, setSteamAccounts] = useState([]);
  const [showAccountForm, setShowAccountForm] = useState(false);
  const [newAccount, setNewAccount] = useState({
    name: '',
    steamId: '',
    owner: ''
  });
  const [editingIndex, setEditingIndex] = useState(-1);
  
  // 遊戲數據
  const [gameLibrary, setGameLibrary] = useState([]);
  
  // UI狀態
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [loading, setLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState('未同步');
  const [showSettings, setShowSettings] = useState(false);

  // 載入保存的數據
  useEffect(() => {
    const savedApiKey = localStorage.getItem('steamApiKey');
    if (savedApiKey) setSteamApiKey(savedApiKey);

    const savedAccounts = localStorage.getItem('steamAccounts');
    if (savedAccounts) {
      try {
        setSteamAccounts(JSON.parse(savedAccounts));
      } catch (e) {
        console.error('載入帳號失敗:', e);
      }
    }

    const savedGames = localStorage.getItem('gameLibrary');
    if (savedGames) {
      try {
        setGameLibrary(JSON.parse(savedGames));
      } catch (e) {
        console.error('載入遊戲失敗:', e);
      }
    }
  }, []);

  // 儲存API Key
  const saveApiKey = () => {
    localStorage.setItem('steamApiKey', steamApiKey);
    setShowSettings(false);
    alert('API Key 已儲存！');
  };

  // 新增/編輯帳號
  const saveAccount = () => {
    if (!newAccount.name || !newAccount.steamId) {
      alert('請填寫帳號名稱和Steam ID');
      return;
    }

    let updatedAccounts;
    if (editingIndex >= 0) {
      // 編輯現有帳號
      updatedAccounts = [...steamAccounts];
      updatedAccounts[editingIndex] = {
        ...newAccount,
        id: Date.now() + editingIndex
      };
    } else {
      // 新增帳號
      updatedAccounts = [...steamAccounts, {
        ...newAccount,
        id: Date.now()
      }];
    }

    setSteamAccounts(updatedAccounts);
    localStorage.setItem('steamAccounts', JSON.stringify(updatedAccounts));
    setNewAccount({ name: '', steamId: '', owner: '' });
    setEditingIndex(-1);
    setShowAccountForm(false);
    alert(editingIndex >= 0 ? '帳號更新成功！' : '帳號新增成功！');
  };

  // 刪除帳號
  const deleteAccount = (index) => {
    if (!window.confirm('確定要刪除這個帳號嗎？')) return;
    
    const updatedAccounts = steamAccounts.filter((_, i) => i !== index);
    setSteamAccounts(updatedAccounts);
    localStorage.setItem('steamAccounts', JSON.stringify(updatedAccounts));
    alert('帳號刪除成功！');
  };

  // 編輯帳號
  const editAccount = (index) => {
    const account = steamAccounts[index];
    setNewAccount({
      name: account.name,
      steamId: account.steamId,
      owner: account.owner
    });
    setEditingIndex(index);
    setShowAccountForm(true);
  };

  // 同步Steam遊戲 - 簡化版本，避免複雜的異步操作
  const syncSteamGames = async () => {
    if (!steamApiKey) {
      alert('請先設定Steam API Key');
      setShowSettings(true);
      return;
    }

    if (steamAccounts.length === 0) {
      alert('請先新增Steam帳號');
      setShowAccountForm(true);
      return;
    }

    setLoading(true);
    setSyncStatus('開始同步...');

    try {
      const allGames = new Map();

      // 簡化的同步邏輯，一個個處理避免複雜的異步問題
      for (let i = 0; i < steamAccounts.length; i++) {
        const account = steamAccounts[i];
        setSyncStatus(`同步 ${account.name}... (${i + 1}/${steamAccounts.length})`);

        try {
          const proxyUrl = 'https://api.allorigins.win/raw?url=';
          const steamUrl = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamApiKey}&steamid=${account.steamId}&format=json&include_appinfo=true&include_played_free_games=true`;
          
          const response = await fetch(proxyUrl + encodeURIComponent(steamUrl));
          
          if (response.ok) {
            const data = await response.json();
            
            if (data.response && data.response.games) {
              data.response.games.forEach(game => {
                const gameId = game.appid.toString();
                
                if (allGames.has(gameId)) {
                  // 遊戲已存在，添加帳號
                  const existing = allGames.get(gameId);
                  existing.accounts.push(account.name);
                  existing.totalPlaytime += game.playtime_forever || 0;
                } else {
                  // 新遊戲
                  allGames.set(gameId, {
                    id: gameId,
                    name: game.name || '未知遊戲',
                    accounts: [account.name],
                    playtime: Math.floor((game.playtime_forever || 0) / 60),
                    totalPlaytime: game.playtime_forever || 0,
                    img_icon_url: game.img_icon_url
                  });
                }
              });
            }
          }
        } catch (error) {
          console.error(`同步 ${account.name} 失敗:`, error);
        }

        // 簡單延遲避免API限制
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      // 轉換為陣列並排序
      const gamesArray = Array.from(allGames.values()).sort((a, b) => a.name.localeCompare(b.name));
      
      setGameLibrary(gamesArray);
      localStorage.setItem('gameLibrary', JSON.stringify(gamesArray));
      
      setSyncStatus(`同步完成！獲得 ${gamesArray.length} 款遊戲`);
      alert(`同步成功！共獲得 ${gamesArray.length} 款遊戲`);

    } catch (error) {
      setSyncStatus('同步失敗');
      alert('同步失敗: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 篩選和排序遊戲
  const getFilteredGames = () => {
    let filtered = gameLibrary.filter(game =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'accounts':
          return b.accounts.length - a.accounts.length;
        case 'playtime':
          return b.playtime - a.playtime;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredGames = getFilteredGames();

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
                <h1 className="text-xl font-bold">Steam 多帳號管理系統</h1>
                <p className="text-sm text-gray-400">簡化版 • 本地存儲</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-300">
                {steamAccounts.length} 個帳號 • {gameLibrary.length} 款遊戲
              </span>
              <button
                onClick={() => setShowSettings(true)}
                className="bg-gray-600 hover:bg-gray-700 p-2 rounded-lg transition-colors"
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
            帳號管理 ({steamAccounts.length})
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`px-6 py-3 rounded-md transition-colors ${
              activeTab === 'library' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            遊戲庫存 ({gameLibrary.length})
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
                  <span>{loading ? '同步中...' : '同步遊戲'}</span>
                </button>
              </div>
            </div>

            {/* 同步狀態 */}
            {syncStatus !== '未同步' && (
              <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">狀態</span>
                  <span className={`text-sm font-bold ${
                    syncStatus.includes('完成') ? 'text-green-400' :
                    syncStatus.includes('失敗') ? 'text-red-400' :
                    'text-yellow-400'
                  }`}>
                    {syncStatus}
                  </span>
                </div>
              </div>
            )}

            {/* 帳號列表 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {steamAccounts.map((account, index) => (
                <div key={account.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{account.name}</h3>
                      <p className="text-sm text-gray-400">擁有者: {account.owner || '未設定'}</p>
                      <p className="text-xs text-gray-500 font-mono">ID: {account.steamId}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => editAccount(index)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Icons.Edit />
                      </button>
                      <button
                        onClick={() => deleteAccount(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Icons.Trash />
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>遊戲數量:</span>
                      <span>{gameLibrary.filter(game => game.accounts.includes(account.name)).length}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {steamAccounts.length === 0 && (
              <div className="text-center py-12">
                <Icons.User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="name">按名稱排序</option>
                  <option value="accounts">按帳號數量排序</option>
                  <option value="playtime">按遊戲時間排序</option>
                </select>

                <div className="text-sm text-gray-400 flex items-center">
                  顯示 {filteredGames.length} / {gameLibrary.length} 款遊戲
                </div>
              </div>
            </div>

            {/* 遊戲列表 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map(game => (
                <div key={game.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
                  <div className="flex items-start space-x-4 mb-3">
                    {game.img_icon_url && (
                      <img
                        src={`https://media.steampowered.com/steamcommunity/public/images/apps/${game.id}/${game.img_icon_url}.jpg`}
                        alt={game.name}
                        className="w-12 h-12 rounded bg-gray-700"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    )}
                    <div className="flex-1">
                      <a
                        href={`https://store.steampowered.com/app/${game.id}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        {game.name}
                        <Icons.ExternalLink className="inline ml-1 w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">遊戲時間：</span>
                      <span className="text-gray-300">{game.playtime}小時</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-400 mb-2">
                      可用帳號 ({game.accounts.length})：
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {game.accounts.map(accountName => (
                        <span key={accountName} className="bg-blue-600 text-blue-100 px-2 py-1 rounded text-xs">
                          {accountName}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredGames.length === 0 && gameLibrary.length > 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">沒有找到符合條件的遊戲</p>
              </div>
            )}

            {gameLibrary.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg mb-2">還沒有遊戲資料</p>
                <p className="text-gray-500">請先新增Steam帳號並同步遊戲庫存</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Steam API 設定彈窗 */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Steam API 設定</h3>
              <button
                onClick={() => setShowSettings(false)}
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
                <p className="text-xs text-gray-400 mt-2">
                  前往 <a href="https://steamcommunity.com/dev/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Steam API頁面</a> 獲取
                </p>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 py-3 rounded-lg transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={saveApiKey}
                  className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-lg transition-colors"
                >
                  儲存
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 帳號新增/編輯表單 */}
      {showAccountForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{editingIndex >= 0 ? '編輯帳號' : '新增Steam帳號'}</h3>
              <button
                onClick={() => {
                  setShowAccountForm(false);
                  setEditingIndex(-1);
                  setNewAccount({ name: '', steamId: '', owner: '' });
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
                  value={newAccount.name}
                  onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
                  placeholder="例如：主帳號、小號1..."
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Steam ID *</label>
                <input
                  type="text"
                  value={newAccount.steamId}
                  onChange={(e) => setNewAccount({...newAccount, steamId: e.target.value})}
                  placeholder="76561198xxxxxxxxx"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-400 mt-1">
                  前往 <a href="https://steamid.io/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">steamid.io</a> 查詢
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">擁有者</label>
                <input
                  type="text"
                  value={newAccount.owner}
                  onChange={(e) => setNewAccount({...newAccount, owner: e.target.value})}
                  placeholder="帳號擁有者名稱（選填）"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    setShowAccountForm(false);
                    setEditingIndex(-1);
                    setNewAccount({ name: '', steamId: '', owner: '' });
                  }}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 py-3 rounded-lg transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={saveAccount}
                  className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-lg transition-colors"
                >
                  {editingIndex >= 0 ? '更新帳號' : '新增帳號'}
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
