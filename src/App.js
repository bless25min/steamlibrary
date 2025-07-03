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
  Heart: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  AlertCircle: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
  )
};

function App() {
  // 基本狀態
  const [activeTab, setActiveTab] = useState('library');
  const [showSettings, setShowSettings] = useState(false);
  const [showWishForm, setShowWishForm] = useState(false);
  
  // Steam設定
  const [steamConfig, setSteamConfig] = useState({
    apiKey: '',
    steamIds: ['', '', '', ''],
    accountNames: ['帳號1', '帳號2', '帳號3', '帳號4']
  });

  // 遊戲數據
  const [gameLibrary, setGameLibrary] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  
  // UI狀態
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [loading, setLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState('未同步');
  const [lastSync, setLastSync] = useState(null);
  const [newWish, setNewWish] = useState({ name: '', reason: '' });

  // 載入保存的設定
  useEffect(() => {
    const savedConfig = localStorage.getItem('steamConfig');
    if (savedConfig) {
      setSteamConfig(JSON.parse(savedConfig));
    }

    const savedGames = localStorage.getItem('gameLibrary');
    if (savedGames) {
      setGameLibrary(JSON.parse(savedGames));
    }

    const savedWishes = localStorage.getItem('wishlist');
    if (savedWishes) {
      setWishlist(JSON.parse(savedWishes));
    }

    const savedSync = localStorage.getItem('lastSync');
    if (savedSync) {
      setLastSync(new Date(savedSync));
      setSyncStatus('已同步');
    }
  }, []);

  // 儲存Steam設定
  const saveSteamConfig = () => {
    localStorage.setItem('steamConfig', JSON.stringify(steamConfig));
    setShowSettings(false);
    alert('設定已儲存！');
  };

  // 真實Steam API同步
  const syncSteamGames = async () => {
    if (!steamConfig.apiKey) {
      alert('請先設定Steam API密鑰');
      setShowSettings(true);
      return;
    }

    if (!steamConfig.steamIds.some(id => id.trim())) {
      alert('請至少設定一個Steam ID');
      setShowSettings(true);
      return;
    }

    setLoading(true);
    setSyncStatus('同步中...');

    try {
      const gameMap = new Map();
      let successCount = 0;
      let errors = [];

      // 為每個設定的Steam ID獲取遊戲
      for (let i = 0; i < steamConfig.steamIds.length; i++) {
        const steamId = steamConfig.steamIds[i].trim();
        if (!steamId) continue;

        const accountIndex = i + 1;
        setSyncStatus(`同步中... 正在處理${steamConfig.accountNames[i]}`);

        try {
          // 使用CORS代理來避免瀏覽器限制
          const proxyUrl = 'https://api.allorigins.win/raw?url=';
          const steamApiUrl = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamConfig.apiKey}&steamid=${steamId}&format=json&include_appinfo=true&include_played_free_games=true`;
          
          const response = await fetch(proxyUrl + encodeURIComponent(steamApiUrl));
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: 無法連接Steam API`);
          }

          const data = await response.json();
          
          if (!data.response) {
            throw new Error('Steam API 回應格式錯誤');
          }

          if (!data.response.games) {
            errors.push(`${steamConfig.accountNames[i]}: 沒有遊戲資料或帳號隱私設定不允許存取`);
            continue;
          }

          // 處理遊戲資料
          data.response.games.forEach(game => {
            const gameId = game.appid;
            const playtimeMinutes = game.playtime_forever || 0;
            
            if (gameMap.has(gameId)) {
              // 遊戲已存在，添加帳號和累加遊戲時間
              const existingGame = gameMap.get(gameId);
              if (!existingGame.accounts.includes(accountIndex)) {
                existingGame.accounts.push(accountIndex);
              }
              existingGame.totalPlaytime += playtimeMinutes;
            } else {
              // 新遊戲
              gameMap.set(gameId, {
                id: gameId,
                name: game.name || '未知遊戲',
                accounts: [accountIndex],
                playtime: Math.floor(playtimeMinutes / 60), // 轉換為小時
                totalPlaytime: playtimeMinutes,
                rating: 0, // Steam API 不提供評分
                genre: '待分類',
                price: '待查詢',
                tags: [],
                img_icon_url: game.img_icon_url
              });
            }
          });

          successCount++;
          
        } catch (error) {
          console.error(`帳號 ${accountIndex} 同步失敗:`, error);
          errors.push(`${steamConfig.accountNames[i]}: ${error.message}`);
        }

        // 添加延遲以避免API限制
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // 轉換為陣列並排序
      const gamesArray = Array.from(gameMap.values()).sort((a, b) => a.name.localeCompare(b.name));
      
      setGameLibrary(gamesArray);
      localStorage.setItem('gameLibrary', JSON.stringify(gamesArray));
      
      const now = new Date();
      setLastSync(now);
      localStorage.setItem('lastSync', now.toISOString());
      
      // 設定狀態訊息
      if (successCount === 0) {
        setSyncStatus('同步失敗');
        alert('所有帳號同步失敗:\n' + errors.join('\n'));
      } else if (errors.length > 0) {
        setSyncStatus(`部分成功 (${successCount}/${steamConfig.steamIds.filter(id => id.trim()).length})`);
        alert(`同步完成！\n成功: ${successCount} 個帳號\n錯誤: ${errors.length} 個帳號\n\n錯誤詳情:\n${errors.join('\n')}`);
      } else {
        setSyncStatus('同步成功');
        alert(`同步成功！獲得 ${gamesArray.length} 款遊戲`);
      }
      
    } catch (error) {
      console.error('同步過程發生錯誤:', error);
      setSyncStatus('同步失敗');
      alert('同步失敗: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 新增許願
  const addWish = () => {
    if (!newWish.name.trim()) {
      alert('請輸入遊戲名稱');
      return;
    }

    const wish = {
      id: Date.now(),
      name: newWish.name,
      reason: newWish.reason,
      votes: 1,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    const updatedWishlist = [wish, ...wishlist];
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    
    setNewWish({ name: '', reason: '' });
    setShowWishForm(false);
  };

  // 投票
  const voteWish = (wishId) => {
    const updatedWishlist = wishlist.map(wish => 
      wish.id === wishId ? { ...wish, votes: wish.votes + 1 } : wish
    );
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  // 刪除許願
  const deleteWish = (wishId) => {
    const updatedWishlist = wishlist.filter(wish => wish.id !== wishId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  // 篩選遊戲
  const filteredGames = gameLibrary.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesAccount = selectedAccount === 'all' || game.accounts.includes(parseInt(selectedAccount));
    return matchesSearch && matchesAccount;
  });

  // 統計數據
  const totalGames = gameLibrary.length;
  const accountGameCounts = [1, 2, 3, 4].map(acc => ({
    account: acc,
    count: gameLibrary.filter(game => game.accounts.includes(acc)).length
  }));

  const isConfigured = steamConfig.apiKey && steamConfig.steamIds.some(id => id.trim());

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
                <h1 className="text-xl font-bold">Steam 遊戲庫存管理</h1>
                <p className="text-sm text-gray-400">簡化版 - 無需登入 • 本地存儲</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-300">
                {lastSync ? `最後同步: ${lastSync.toLocaleString('zh-TW')}` : '尚未同步'}
              </span>
              <button
                onClick={() => setShowSettings(true)}
                className="bg-gray-600 hover:bg-gray-700 p-2 rounded-lg transition-colors"
                title="設定"
              >
                <Icons.Settings />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 設定提醒 */}
      {!isConfigured && (
        <div className="bg-blue-600 text-blue-100 px-4 py-3 text-center">
          <div className="flex items-center justify-center space-x-2">
            <Icons.AlertCircle />
            <span>請先設定Steam API密鑰和Steam ID以開始使用</span>
            <button
              onClick={() => setShowSettings(true)}
              className="underline hover:no-underline font-semibold"
            >
              立即設定
            </button>
          </div>
        </div>
      )}

      {/* 主要內容 */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* 標籤頁 */}
        <div className="flex space-x-1 mb-6 bg-gray-800 p-1 rounded-lg w-fit">
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

        {/* 遊戲庫存頁面 */}
        {activeTab === 'library' && (
          <div>
            {/* 統計面板 */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h3 className="text-sm font-medium text-gray-400 mb-1">總遊戲數</h3>
                <p className="text-2xl font-bold text-blue-400">{totalGames}</p>
              </div>
              {accountGameCounts.map(acc => (
                <div key={acc.account} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-sm font-medium text-gray-400 mb-1">{steamConfig.accountNames[acc.account - 1]}</h3>
                  <p className="text-2xl font-bold text-green-400">{acc.count}</p>
                </div>
              ))}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h3 className="text-sm font-medium text-gray-400 mb-1">同步狀態</h3>
                <p className={`text-xs font-bold ${
                  syncStatus.includes('成功') ? 'text-green-400' :
                  syncStatus.includes('失敗') ? 'text-red-400' :
                  'text-yellow-400'
                }`}>
                  {syncStatus}
                </p>
              </div>
            </div>

            {/* 控制面板 */}
            <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">控制面板</h3>
                <button
                  onClick={syncSteamGames}
                  disabled={loading || !isConfigured}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    loading || !isConfigured
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  <Icons.RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  <span>{loading ? '同步中...' : '同步Steam遊戲'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="搜尋遊戲名稱或標籤..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <select
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">所有帳號</option>
                  {steamConfig.accountNames.map((name, index) => (
                    <option key={index + 1} value={index + 1}>{name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 遊戲列表 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map(game => (
                <div key={game.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-all transform hover:scale-105">
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
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-white line-clamp-2">{game.name}</h3>
                        {game.rating > 0 && (
                          <div className="flex items-center space-x-1 text-yellow-400">
                            <Icons.Star />
                            <span className="text-sm">{game.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">類型：</span>
                      <span className="text-gray-300">{game.genre}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">遊戲時間：</span>
                      <span className="text-gray-300">{game.playtime}小時</span>
                    </div>
                    {game.price !== '待查詢' && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">價格：</span>
                        <span className="text-gray-300">{game.price}</span>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <div className="text-sm text-gray-400 mb-2">可用帳號：</div>
                    <div className="flex flex-wrap gap-1">
                      {game.accounts.map(acc => (
                        <span key={acc} className="bg-blue-600 text-blue-100 px-2 py-1 rounded text-xs">
                          {steamConfig.accountNames[acc - 1]}
                        </span>
                      ))}
                    </div>
                  </div>

                  {game.tags && game.tags.length > 0 && (
                    <div>
                      <div className="text-sm text-gray-400 mb-2">標籤：</div>
                      <div className="flex flex-wrap gap-1">
                        {game.tags.map(tag => (
                          <span key={tag} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {gameLibrary.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icons.RefreshCw className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-400 text-lg mb-2">尚未同步遊戲庫存</p>
                <p className="text-gray-500 mb-4">設定Steam API後點擊「同步Steam遊戲」開始</p>
                {!isConfigured && (
                  <button
                    onClick={() => setShowSettings(true)}
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors"
                  >
                    開始設定
                  </button>
                )}
              </div>
            )}

            {filteredGames.length === 0 && gameLibrary.length > 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">沒有找到符合條件的遊戲</p>
                <p className="text-gray-500">試試調整搜尋條件或帳號篩選</p>
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

            {wishlist.length > 0 ? (
              <div className="space-y-4">
                {wishlist.map(wish => (
                  <div key={wish.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{wish.name}</h3>
                        {wish.reason && (
                          <p className="text-gray-400 mb-3">{wish.reason}</p>
                        )}
                        <div className="text-sm text-gray-500">
                          {new Date(wish.createdAt).toLocaleDateString('zh-TW')}
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
                        <button
                          onClick={() => deleteWish(wish.id)}
                          className="bg-red-600 hover:bg-red-700 p-2 rounded-lg transition-colors"
                          title="刪除"
                        >
                          <Icons.X />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icons.Heart className="w-8 h-8 text-gray-400" />
                </div>
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

      {/* 設定彈窗 */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Steam API 設定</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-white"
              >
                <Icons.X />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* API Key 設定 */}
              <div>
                <label className="block text-lg font-semibold mb-3">Steam Web API 密鑰</label>
                <input
                  type="password"
                  value={steamConfig.apiKey}
                  onChange={(e) => setSteamConfig({...steamConfig, apiKey: e.target.value})}
                  placeholder="請輸入Steam API Key"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="mt-2 p-3 bg-blue-600 bg-opacity-20 border border-blue-600 rounded-lg">
                  <p className="text-blue-200 text-sm">
                    <strong>如何獲取 Steam API Key：</strong>
                  </p>
                  <ol className="text-blue-200 text-sm mt-1 space-y-1">
                    <li>1. 前往 <a href="https://steamcommunity.com/dev/apikey" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Steam API註冊頁面 <Icons.ExternalLink className="inline" /></a></li>
                    <li>2. 登入你的Steam帳號</li>
                    <li>3. 域名填入：<code className="bg-blue-800 px-1 rounded">bless25min.github.io</code></li>
                    <li>4. 複製生成的API Key</li>
                  </ol>
                </div>
              </div>

              {/* Steam ID 設定 */}
              <div>
                <label className="block text-lg font-semibold mb-3">Steam 帳號設定</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(num => (
                    <div key={num} className="space-y-3 p-4 bg-gray-700 rounded-lg">
                      <h4 className="font-medium text-gray-300">帳號 #{num}</h4>
                      <div>
                        <label className="block text-sm font-medium mb-1">帳號名稱</label>
                        <input
                          type="text"
                          value={steamConfig.accountNames[num - 1]}
                          onChange={(e) => {
                            const newNames = [...steamConfig.accountNames];
                            newNames[num - 1] = e.target.value;
                            setSteamConfig({...steamConfig, accountNames: newNames});
                          }}
                          className="w-full bg-gray-600 border border-gray-500 rounded p-2 focus:ring-2 focus:ring-blue-500"
                          placeholder={`帳號${num}`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Steam ID</label>
                        <input
                          type="text"
                          value={steamConfig.steamIds[num - 1]}
                          onChange={(e) => {
                            const newIds = [...steamConfig.steamIds];
                            newIds[num - 1] = e.target.value;
                            setSteamConfig({...steamConfig, steamIds: newIds});
                          }}
                          placeholder="76561198xxxxxxxxx"
                          className="w-full bg-gray-600 border border-gray-500 rounded p-2 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-yellow-600 bg-opacity-20 border border-yellow-600 rounded-lg">
                  <p className="text-yellow-200 text-sm">
                    <strong>如何獲取 Steam ID：</strong>
                  </p>
                  <ol className="text-yellow-200 text-sm mt-1 space-y-1">
                    <li>1. 前往 <a href="https://steamid.io/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">SteamID.io <Icons.ExternalLink className="inline" /></a></li>
                    <li>2. 輸入Steam個人檔案URL或用戶名</li>
                    <li>3. 複製「steamID64」的數字</li>
                    <li>4. 確保Steam個人檔案的遊戲詳情設為「公開」</li>
                  </ol>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                <button
                  onClick={() => setShowSettings(false)}
                  className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={saveSteamConfig}
                  className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg transition-colors"
                >
                  儲存設定
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
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">許願理由（選填）</label>
                <textarea
                  value={newWish.reason}
                  onChange={(e) => setNewWish({...newWish, reason: e.target.value})}
                  placeholder="為什麼想要這款遊戲？"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
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
