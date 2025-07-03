import React, { useState, useEffect } from 'react';

// 圖示組件
const Icons = {
  Discord: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  ),
  Steam: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-8h2v6h-2v-6zm0-4h2v2h-2V8z"/>
    </svg>
  ),
  Search: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Users: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
    </svg>
  ),
  GamepadIcon: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  RefreshCw: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  ExternalLink: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  ),
  LogOut: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Crown: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 6L9 9l3-8 3 8-3-3zM6 9l-3 8h18l-3-8-6 4-6-4z"/>
    </svg>
  ),
  X: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
};

// 模擬的 Steam API 工具函數
const SteamAPI = {
  parseSteamUrl: (url) => {
    const patterns = [
      { pattern: /steamcommunity\.com\/id\/([^/]+)/, type: 'custom_id' },
      { pattern: /steamcommunity\.com\/profiles\/(\d{17})/, type: 'steam_id' }
    ];
    
    for (const { pattern, type } of patterns) {
      const match = url.match(pattern);
      if (match) {
        return {
          identifier: match[1],
          type: type,
          steamId: type === 'steam_id' ? match[1] : null
        };
      }
    }
    return null;
  },

  resolveVanityUrl: async (vanityName) => {
    return '76561198' + Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
  },

  generateMockGames: () => {
    const baseGames = [
      { appid: 730, name: 'Counter-Strike 2' },
      { appid: 1086940, name: 'Baldur\'s Gate 3' },
      { appid: 1245620, name: 'ELDEN RING' },
      { appid: 570, name: 'Dota 2' },
      { appid: 813780, name: 'Age of Empires IV' },
      { appid: 271590, name: 'Grand Theft Auto V' },
      { appid: 292030, name: 'The Witcher 3: Wild Hunt' },
      { appid: 582010, name: 'Monster Hunter: World' },
      { appid: 431960, name: 'Wallpaper Engine' },
      { appid: 1174180, name: 'Red Dead Redemption 2' },
      { appid: 1938090, name: 'Call of Duty®: Modern Warfare® II' }
    ];

    const selectedCount = Math.floor(Math.random() * 4) + 5;
    const selectedGames = [...baseGames]
      .sort(() => 0.5 - Math.random())
      .slice(0, selectedCount);

    return selectedGames.map(game => ({
      ...game,
      playtime_forever: Math.floor(Math.random() * 2000) + 50,
      header_image: `https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/header.jpg`
    }));
  }
};

function App() {
  // 狀態管理
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('discover');
  
  // Steam 設定
  const [steamUrl, setSteamUrl] = useState('');
  const [showSteamForm, setShowSteamForm] = useState(false);
  const [syncStatus, setSyncStatus] = useState('');
  const [syncLoading, setSyncLoading] = useState(false);
  
  // 搜尋和篩選
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  
  // 模擬數據 - 共享帳號
  const [users] = useState([
    {
      id: 'shared_1',
      discord_id: 'shared_account_1',
      username: '共享帳號 #1',
      avatar_url: 'https://ui-avatars.com/api/?name=S1&background=3b82f6&color=fff',
      steam_id: '76561199470483407',
      steam_profile_url: 'https://steamcommunity.com/profiles/76561199470483407/',
      game_count: 12,
      total_playtime: 456,
      created_at: '2024-01-01',
      is_shared: true
    },
    {
      id: 'shared_2',
      discord_id: 'shared_account_2',
      username: '共享帳號 #2',
      avatar_url: 'https://ui-avatars.com/api/?name=S2&background=10b981&color=fff',
      steam_id: '76561199509330900',
      steam_profile_url: 'https://steamcommunity.com/profiles/76561199509330900/',
      game_count: 8,
      total_playtime: 312,
      created_at: '2024-01-01',
      is_shared: true
    },
    {
      id: 'shared_3',
      discord_id: 'shared_account_3',
      username: '共享帳號 #3',
      avatar_url: 'https://ui-avatars.com/api/?name=S3&background=f59e0b&color=fff',
      steam_id: '76561199509470809',
      steam_profile_url: 'https://steamcommunity.com/profiles/76561199509470809/',
      game_count: 15,
      total_playtime: 678,
      created_at: '2024-01-01',
      is_shared: true
    },
    {
      id: 'shared_4',
      discord_id: 'shared_account_4',
      username: '共享帳號 #4',
      avatar_url: 'https://ui-avatars.com/api/?name=S4&background=ef4444&color=fff',
      steam_id: '76561199509470810',
      steam_profile_url: 'https://steamcommunity.com/profiles/76561199509470810/',
      game_count: 10,
      total_playtime: 523,
      created_at: '2024-01-01',
      is_shared: true
    }
  ]);

  // 模擬遊戲數據
  const [games] = useState([
    {
      id: 'game_1',
      steam_app_id: '730',
      name: 'Counter-Strike 2',
      header_image: 'https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg',
      owners: ['共享帳號 #1', '共享帳號 #2', '共享帳號 #3'],
      playtime: {
        '共享帳號 #1': 146,
        '共享帳號 #2': 104,
        '共享帳號 #3': 92
      }
    },
    {
      id: 'game_2',
      steam_app_id: '1086940',
      name: 'Baldur\'s Gate 3',
      header_image: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg',
      owners: ['共享帳號 #1', '共享帳號 #4'],
      playtime: {
        '共享帳號 #1': 210,
        '共享帳號 #4': 164
      }
    },
    {
      id: 'game_3',
      steam_app_id: '1245620',
      name: 'ELDEN RING',
      header_image: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg',
      owners: ['共享帳號 #2', '共享帳號 #3', '共享帳號 #4'],
      playtime: {
        '共享帳號 #2': 260,
        '共享帳號 #3': 188,
        '共享帳號 #4': 146
      }
    },
    {
      id: 'game_4',
      steam_app_id: '570',
      name: 'Dota 2',
      header_image: 'https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg',
      owners: ['共享帳號 #1', '共享帳號 #2'],
      playtime: {
        '共享帳號 #1': 300,
        '共享帳號 #2': 240
      }
    },
    {
      id: 'game_5',
      steam_app_id: '271590',
      name: 'Grand Theft Auto V',
      header_image: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg',
      owners: ['共享帳號 #3', '共享帳號 #4'],
      playtime: {
        '共享帳號 #3': 160,
        '共享帳號 #4': 120
      }
    },
    {
      id: 'game_6',
      steam_app_id: '292030',
      name: 'The Witcher 3: Wild Hunt',
      header_image: 'https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg',
      owners: ['共享帳號 #1', '共享帳號 #3'],
      playtime: {
        '共享帳號 #1': 180,
        '共享帳號 #3': 140
      }
    },
    {
      id: 'game_7',
      steam_app_id: '582010',
      name: 'Monster Hunter: World',
      header_image: 'https://cdn.akamai.steamstatic.com/steam/apps/582010/header.jpg',
      owners: ['共享帳號 #2', '共享帳號 #4'],
      playtime: {
        '共享帳號 #2': 130,
        '共享帳號 #4': 110
      }
    },
    {
      id: 'game_8',
      steam_app_id: '431960',
      name: 'Wallpaper Engine',
      header_image: 'https://cdn.akamai.steamstatic.com/steam/apps/431960/header.jpg',
      owners: ['共享帳號 #1', '共享帳號 #2', '共享帳號 #3'],
      playtime: {
        '共享帳號 #1': 80,
        '共享帳號 #2': 60,
        '共享帳號 #3': 40
      }
    }
  ]);

  // 當前顯示的用戶列表（可能包含登入用戶）
  const [displayUsers, setDisplayUsers] = useState(users);

  // 初始化
  useEffect(() => {
    if (!user && activeTab === 'profile') {
      setActiveTab('discover');
    }
  }, [user, activeTab]);

  // Discord 登入模擬
  const signInWithDiscord = async () => {
    setAuthLoading(true);
    try {
      // 模擬登入過程
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUser = {
        id: 'user_' + Date.now(),
        discord_id: '999888777',
        username: 'TestUser' + Math.floor(Math.random() * 1000),
        avatar_url: `https://ui-avatars.com/api/?name=U&background=6366f1&color=fff`,
        steam_id: null,
        steam_profile_url: null,
        game_count: 0,
        total_playtime: 0,
        created_at: new Date().toISOString().split('T')[0],
        is_shared: false
      };
      
      setUser(mockUser);
      setDisplayUsers([...users, mockUser]);
      setShowSteamForm(true); // 首次登入顯示 Steam 設定
    } catch (error) {
      console.error('登入失敗:', error);
      alert('登入失敗，請稍後重試');
    } finally {
      setAuthLoading(false);
    }
  };

  // 登出
  const signOut = () => {
    setUser(null);
    setDisplayUsers(users); // 只顯示共享帳號
    setActiveTab('discover');
    setSteamUrl('');
    setShowSteamForm(false);
  };

  // Steam 資料同步
  const saveSteamProfile = async () => {
    if (!steamUrl) {
      alert('請輸入Steam個人頁面連結');
      return;
    }

    const parsedUrl = SteamAPI.parseSteamUrl(steamUrl);
    if (!parsedUrl) {
      alert('無效的Steam連結格式\n支援格式:\n• https://steamcommunity.com/id/你的ID/\n• https://steamcommunity.com/profiles/數字ID/');
      return;
    }

    setSyncLoading(true);
    setSyncStatus('解析Steam資料中...');

    try {
      let steamId = parsedUrl.steamId;
      
      if (parsedUrl.type === 'custom_id') {
        setSyncStatus('解析自訂ID中...');
        steamId = await SteamAPI.resolveVanityUrl(parsedUrl.identifier);
      }

      setSyncStatus('同步遊戲庫中...');
      
      const mockGames = SteamAPI.generateMockGames();
      const totalPlaytime = Math.round(mockGames.reduce((total, game) => total + game.playtime_forever, 0) / 60);

      // 更新用戶資料
      const updatedUser = {
        ...user,
        steam_id: steamId,
        steam_profile_url: steamUrl,
        game_count: mockGames.length,
        total_playtime: totalPlaytime
      };

      setUser(updatedUser);
      
      // 更新顯示的用戶列表
      setDisplayUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u));

      setSyncStatus('同步完成！');
      
      setTimeout(() => {
        alert(`Steam資料同步成功！\n遊戲數量: ${mockGames.length}\n總遊戲時間: ${totalPlaytime} 小時`);
        setShowSteamForm(false);
        setSteamUrl('');
        setSyncStatus('');
      }, 1000);
      
    } catch (error) {
      console.error('同步失敗:', error);
      setSyncStatus('同步失敗');
      alert('同步失敗，請稍後重試');
    } finally {
      setSyncLoading(false);
    }
  };

  // 篩選遊戲
  const getFilteredGames = () => {
    let filtered = games.filter(game => {
      const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filterBy === 'all') return matchesSearch;
      if (filterBy === 'popular') return matchesSearch && game.owners && game.owners.length >= 2;
      if (filterBy === 'mine' && user && user.username) return matchesSearch && game.owners && game.owners.includes(user.username);
      
      return matchesSearch;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'popularity':
          return (b.owners?.length || 0) - (a.owners?.length || 0);
        case 'playtime':
          const aPlaytime = Math.max(...Object.values(a.playtime || { default: 0 }));
          const bPlaytime = Math.max(...Object.values(b.playtime || { default: 0 }));
          return bPlaytime - aPlaytime;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredGames = getFilteredGames();

  // 載入中狀態
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">載入中...</p>
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
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Icons.Steam className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Steam 遊戲庫共享平台</h1>
                <p className="text-sm text-gray-400">
                  群組遊戲庫 • {displayUsers.length} 位玩家 • {games.length} 款遊戲
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <div className="flex items-center space-x-3">
                    <img
                      src={user.avatar_url}
                      alt={user.username}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm font-medium">{user.username}</span>
                  </div>
                  <button
                    onClick={signOut}
                    className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
                    title="登出"
                  >
                    <Icons.LogOut />
                  </button>
                </>
              ) : (
                <button
                  onClick={signInWithDiscord}
                  disabled={authLoading}
                  className={`bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${authLoading ? 'opacity-50' : ''}`}
                >
                  <Icons.Discord />
                  <span className="text-sm">{authLoading ? '登入中...' : 'Discord 登入'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 主要內容 */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* 標籤頁導航 */}
        <div className="flex space-x-1 mb-6 bg-gray-800 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('discover')}
            className={`px-6 py-3 rounded-md transition-colors flex items-center space-x-2 ${
              activeTab === 'discover' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            <Icons.GamepadIcon />
            <span>探索遊戲</span>
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 rounded-md transition-colors flex items-center space-x-2 ${
              activeTab === 'users' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            <Icons.Users />
            <span>玩家列表 ({displayUsers.length})</span>
          </button>
          {user && (
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 rounded-md transition-colors flex items-center space-x-2 ${
                activeTab === 'profile' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Icons.Steam />
              <span>我的資料</span>
            </button>
          )}
        </div>

        {/* 探索遊戲頁面 */}
        {activeTab === 'discover' && (
          <div>
            {/* 搜尋和篩選 */}
            <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative md:col-span-2">
                  <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="搜尋遊戲..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">所有遊戲</option>
                  <option value="popular">熱門遊戲 (2+人擁有)</option>
                  {user && <option value="mine">我的遊戲</option>}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="name">按名稱排序</option>
                  <option value="popularity">按受歡迎程度排序</option>
                  <option value="playtime">按遊戲時間排序</option>
                </select>
              </div>
              
              <div className="mt-4 text-sm text-gray-400">
                顯示 {filteredGames.length} / {games.length} 款遊戲
              </div>
            </div>

            {/* 遊戲列表 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map(game => (
                <div key={game.id} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors">
                  <img
                    src={game.header_image}
                    alt={game.name}
                    className="w-full h-40 object-cover"
                    onError={(e) => e.target.src = 'https://via.placeholder.com/460x215/374151/9CA3AF?text=Steam+Game'}
                  />
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold line-clamp-2">{game.name}</h3>
                      <a
                        href={`https://store.steampowered.com/app/${game.steam_app_id}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 ml-2"
                      >
                        <Icons.ExternalLink />
                      </a>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">擁有者:</span>
                        <span className="text-gray-300">{game.owners?.length || 0} 人</span>
                      </div>

                      {game.owners && game.owners.length > 0 && (
                        <div>
                          <div className="text-sm text-gray-400 mb-2">玩家:</div>
                          <div className="flex flex-wrap gap-1">
                            {game.owners.map(owner => (
                              <span key={owner} className="bg-blue-600 text-blue-100 px-2 py-1 rounded text-xs">
                                {owner}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {game.playtime && Object.keys(game.playtime).length > 0 && (
                        <div>
                          <div className="text-sm text-gray-400 mb-2">遊戲時間:</div>
                          <div className="space-y-1">
                            {Object.entries(game.playtime).map(([player, hours]) => (
                              <div key={player} className="flex justify-between text-xs">
                                <span className="text-gray-300">{player}:</span>
                                <span className="text-gray-400">{hours}小時</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredGames.length === 0 && (
              <div className="text-center py-12">
                <Icons.GamepadIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">沒有找到符合條件的遊戲</p>
              </div>
            )}
          </div>
        )}

        {/* 玩家列表頁面 */}
        {activeTab === 'users' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">社群玩家</h2>
              <div className="text-sm text-gray-400">
                共 {displayUsers.length} 位玩家加入平台
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayUsers.map((userData, index) => (
                <div key={userData.id} className={`rounded-lg p-6 border ${userData.is_shared ? 'bg-blue-900 border-blue-700' : 'bg-gray-800 border-gray-700'}`}>
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="relative">
                      <img
                        src={userData.avatar_url}
                        alt={userData.username}
                        className="w-12 h-12 rounded-full"
                      />
                      {userData.is_shared && (
                        <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-1">
                          <Icons.Steam className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{userData.username}</h3>
                        {userData.is_shared && (
                          <span className="bg-blue-600 text-blue-100 px-2 py-1 rounded text-xs">共享</span>
                        )}
                        {userData.id === user?.id && (
                          <span className="bg-green-600 text-green-100 px-2 py-1 rounded text-xs">你</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">
                        {userData.is_shared ? '共享帳號' : `加入於 ${userData.created_at}`}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{userData.game_count || 0}</div>
                      <div className="text-xs text-gray-400">遊戲數量</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">{userData.total_playtime || 0}</div>
                      <div className="text-xs text-gray-400">總遊戲時間</div>
                    </div>
                  </div>

                  {userData.steam_profile_url && (
                    <a
                      href={userData.steam_profile_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors text-sm"
                    >
                      <Icons.Steam />
                      <span>查看Steam檔案</span>
                      <Icons.ExternalLink />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 我的資料頁面 */}
        {activeTab === 'profile' && user && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">我的資料</h2>
              {!user.steam_id && (
                <button
                  onClick={() => setShowSteamForm(true)}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Icons.Steam />
                  <span>連結Steam帳號</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 用戶資訊卡片 */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="text-center">
                  <img
                    src={user.avatar_url}
                    alt={user.username}
                    className="w-20 h-20 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2">{user.username}</h3>
                  <p className="text-gray-400 text-sm mb-4">Discord 用戶</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{user.game_count || 0}</div>
                      <div className="text-xs text-gray-400">遊戲數量</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">{user.total_playtime || 0}</div>
                      <div className="text-xs text-gray-400">總遊戲時間</div>
                    </div>
                  </div>

                  {user.steam_id ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-center space-x-2 text-green-400">
                        <Icons.Check />
                        <span className="text-sm">Steam 已連結</span>
                      </div>
                      {user.steam_profile_url && (
                        <a
                          href={user.steam_profile_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors text-sm"
                        >
                          <Icons.Steam />
                          <span>查看Steam檔案</span>
                          <Icons.ExternalLink />
                        </a>
                      )}
                      <button
                        onClick={() => setShowSteamForm(true)}
                        className="w-full bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors text-sm"
                      >
                        <Icons.RefreshCw />
                        <span>重新同步</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowSteamForm(true)}
                      className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                    >
                      <Icons.Steam />
                      <span>連結Steam帳號</span>
                    </button>
                  )}
                </div>
              </div>

              {/* 統計資訊 */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h4 className="text-lg font-semibold mb-4">平台統計</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-400">{displayUsers.length}</div>
                      <div className="text-sm text-gray-400">總玩家數</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-purple-400">{games.length}</div>
                      <div className="text-sm text-gray-400">遊戲總數</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-green-400">
                        {games.filter(g => g.owners && g.owners.length >= 2).length}
                      </div>
                      <div className="text-sm text-gray-400">熱門遊戲</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-yellow-400">4</div>
                      <div className="text-sm text-gray-400">共享帳號</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h4 className="text-lg font-semibold mb-4">熱門共享遊戲</h4>
                  <div className="space-y-3">
                    {games
                      .filter(game => game.owners && game.owners.length >= 2)
                      .slice(0, 5)
                      .map(game => (
                        <div key={game.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <img
                              src={game.header_image}
                              alt={game.name}
                              className="w-12 h-8 object-cover rounded"
                              onError={(e) => e.target.src = 'https://via.placeholder.com/60x40/374151/9CA3AF'}
                            />
                            <span className="font-medium">{game.name}</span>
                          </div>
                          <span className="text-sm text-gray-400">
                            {game.owners.length} 人擁有
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Steam 設定彈窗 */}
      {showSteamForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">連結 Steam 帳號</h3>
              <button
                onClick={() => {
                  setShowSteamForm(false);
                  setSteamUrl('');
                  setSyncStatus('');
                }}
                className="text-gray-400 hover:text-white"
              >
                <Icons.X />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Steam 個人頁面連結</label>
                <input
                  type="url"
                  value={steamUrl}
                  onChange={(e) => setSteamUrl(e.target.value)}
                  placeholder="https://steamcommunity.com/id/你的ID/"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="mt-2 text-xs text-gray-400">
                  <p>支援格式：</p>
                  <p>• https://steamcommunity.com/id/你的自訂ID/</p>
                  <p>• https://steamcommunity.com/profiles/數字ID/</p>
                </div>
              </div>
              
              {syncStatus && (
                <div className={`rounded-lg p-3 border ${
                  syncStatus.includes('完成') ? 'bg-green-900 border-green-700' :
                  syncStatus.includes('失敗') ? 'bg-red-900 border-red-700' :
                  'bg-blue-900 border-blue-700'
                }`}>
                  <p className={`text-sm ${
                    syncStatus.includes('完成') ? 'text-green-300' :
                    syncStatus.includes('失敗') ? 'text-red-300' :
                    'text-blue-300'
                  }`}>{syncStatus}</p>
                </div>
              )}
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    setShowSteamForm(false);
                    setSteamUrl('');
                    setSyncStatus('');
                  }}
                  disabled={syncLoading}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:opacity-50 py-3 rounded-lg transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={saveSteamProfile}
                  disabled={syncLoading || !steamUrl}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  {syncLoading && <Icons.RefreshCw className="w-4 h-4 animate-spin" />}
                  <span>{syncLoading ? '處理中...' : '連結並同步'}</span>
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
