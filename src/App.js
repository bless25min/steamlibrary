import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase 設定
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// 圖示組件
const Icons = {
  Search: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Github: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  RefreshCw: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  Settings: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  User: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  LogOut: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
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
  )
};

function App() {
  // 狀態管理
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [gameLibrary, setGameLibrary] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [showSettings, setShowSettings] = useState(false);
  const [steamConfig, setSteamConfig] = useState({
    steamIds: ['', '', '', ''],
    accountNames: ['帳號1', '帳號2', '帳號3', '帳號4']
  });
  const [showWishForm, setShowWishForm] = useState(false);
  const [newWish, setNewWish] = useState({ name: '', reason: '' });
  const [syncStatus, setSyncStatus] = useState('未同步');
  const [lastSync, setLastSync] = useState(null);

  // 檢查用戶登入狀態
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        await loadUserData(user.id);
      }
    };
    checkUser();

    // 監聽認證狀態變化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await loadUserData(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // 載入用戶資料
  const loadUserData = async (userId) => {
    try {
      // 載入Steam設定
      const { data: configData } = await supabase
        .from('user_steam_config')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (configData) {
        setSteamConfig({
          steamIds: configData.steam_ids || ['', '', '', ''],
          accountNames: configData.account_names || ['帳號1', '帳號2', '帳號3', '帳號4']
        });
      }

      // 載入遊戲庫存
      const { data: gamesData } = await supabase
        .from('steam_games')
        .select('*')
        .order('name');

      if (gamesData) {
        setGameLibrary(gamesData);
      }

      // 載入許願清單
      const { data: wishData } = await supabase
        .from('wishlists')
        .select('*')
        .order('votes', { ascending: false });

      if (wishData) {
        setWishlist(wishData);
      }

    } catch (error) {
      console.error('載入用戶資料失敗:', error);
    }
  };

  // GitHub 登入 (修改後的版本)
  const signInWithGitHub = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github'
      });
      if (error) throw error;
    } catch (error) {
      console.error('登入錯誤:', error);
      alert('登入失敗: ' + error.message);
    }
  };

  // 登出
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setGameLibrary([]);
      setWishlist([]);
    } catch (error) {
      alert('登出失敗: ' + error.message);
    }
  };

  // 儲存Steam設定
  const saveSteamConfig = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_steam_config')
        .upsert({
          user_id: user.id,
          steam_ids: steamConfig.steamIds,
          account_names: steamConfig.accountNames
        });

      if (error) throw error;
      alert('Steam設定已儲存！');
    } catch (error) {
      alert('儲存失敗: ' + error.message);
    }
  };

  // 模擬同步Steam遊戲
  const syncSteamGames = async () => {
    if (!user) return;

    setLoading(true);
    setSyncStatus('同步中...');

    try {
      // 模擬API延遲
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 模擬遊戲資料
      const mockGames = [
        { app_id: 1, name: 'Valheim', accounts: [1, 2], playtime: 127, rating: 4.8, genre: '生存', price: 'NT$ 318' },
        { app_id: 2, name: 'Deep Rock Galactic', accounts: [1, 3, 4], playtime: 89, rating: 4.9, genre: '射擊', price: 'NT$ 590' },
        { app_id: 3, name: 'Among Us', accounts: [1, 2, 3, 4], playtime: 45, rating: 4.3, genre: '社交', price: 'NT$ 102' },
        { app_id: 4, name: 'Phasmophobia', accounts: [2, 3], playtime: 67, rating: 4.7, genre: '恐怖', price: 'NT$ 298' },
        { app_id: 5, name: 'Stardew Valley', accounts: [2, 4], playtime: 203, rating: 4.9, genre: '農場', price: 'NT$ 398' }
      ];

      // 儲存到資料庫
      for (const game of mockGames) {
        await supabase
          .from('steam_games')
          .upsert(game);
      }

      setGameLibrary(mockGames);
      setLastSync(new Date());
      setSyncStatus('同步成功');
      
    } catch (error) {
      setSyncStatus('同步失敗');
      alert('同步失敗: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 新增許願
  const addWish = async () => {
    if (!user || !newWish.name.trim()) return;

    try {
      const wishData = {
        user_id: user.id,
        game_name: newWish.name,
        reason: newWish.reason,
        requested_by: user.user_metadata?.name || user.email,
        votes: 1,
        status: 'pending'
      };

      const { error } = await supabase
        .from('wishlists')
        .insert(wishData);

      if (error) throw error;

      setWishlist([wishData, ...wishlist]);
      setNewWish({ name: '', reason: '' });
      setShowWishForm(false);
      
    } catch (error) {
      alert('新增許願失敗: ' + error.message);
    }
  };

  // 篩選遊戲
  const filteredGames = gameLibrary.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAccount = selectedAccount === 'all' || game.accounts.includes(parseInt(selectedAccount));
    return matchesSearch && matchesAccount;
  });

  // 統計數據
  const totalGames = gameLibrary.length;
  const accountGameCounts = [1, 2, 3, 4].map(acc => ({
    account: acc,
    count: gameLibrary.filter(game => game.accounts.includes(acc)).length
  }));

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* 頂部導航 */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center text-white font-bold">
                S
              </div>
              <h1 className="text-xl font-bold">Steam庫存管理系統</h1>
              <div className="flex items-center space-x-1 text-xs bg-gray-700 px-2 py-1 rounded">
                <Icons.Github />
                <span>GitHub Pages + Supabase</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <Icons.User />
                    <span className="text-sm">{user.user_metadata?.name || user.email}</span>
                  </div>
                  <button
                    onClick={signOut}
                    className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-sm flex items-center space-x-1 btn-hover"
                  >
                    <Icons.LogOut />
                    <span>登出</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={signInWithGitHub}
                  className="flex items-center space-x-2 px-4 py-2 rounded bg-green-600 hover:bg-green-700 btn-hover"
                >
                  <Icons.Github />
                  <span>GitHub登入</span>
                </button>
              )}
              
              <button
                onClick={() => setShowSettings(true)}
                className="bg-gray-600 hover:bg-gray-700 p-2 rounded btn-hover"
              >
                <Icons.Settings />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 主要內容 */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {user ? (
          <div>
            {/* 統計面板 */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 card-hover">
                <h3 className="text-sm font-medium text-gray-400 mb-1">總遊戲數</h3>
                <p className="text-2xl font-bold text-blue-400">{totalGames}</p>
              </div>
              {accountGameCounts.map(acc => (
                <div key={acc.account} className="bg-gray-800 rounded-lg p-4 border border-gray-700 card-hover">
                  <h3 className="text-sm font-medium text-gray-400 mb-1">{steamConfig.accountNames[acc.account - 1]}</h3>
                  <p className="text-2xl font-bold text-green-400">{acc.count}</p>
                </div>
              ))}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 card-hover">
                <h3 className="text-sm font-medium text-gray-400 mb-1">同步狀態</h3>
                <p className={`text-xs font-bold ${
                  syncStatus.includes('成功') ? 'text-green-400' :
                  syncStatus.includes('失敗') ? 'text-red-400' :
                  'text-yellow-400'
                }`}>
                  {syncStatus}
                </p>
                {lastSync && (
                  <p className="text-xs text-gray-400 mt-1">
                    {lastSync.toLocaleString('zh-TW')}
                  </p>
                )}
              </div>
            </div>

            {/* 控制面板 */}
            <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">控制面板</h3>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowWishForm(true)}
                    className="flex items-center space-x-2 px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 btn-hover"
                  >
                    <Icons.Plus />
                    <span>新增許願</span>
                  </button>
                  <button
                    onClick={syncSteamGames}
                    disabled={loading}
                    className={`flex items-center space-x-2 px-4 py-2 rounded btn-hover ${
                      loading
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    <Icons.RefreshCw className={loading ? 'animate-spin' : ''} />
                    <span>{loading ? '同步中...' : '同步Steam遊戲'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="搜尋遊戲..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <select
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">所有帳號</option>
                  {steamConfig.accountNames.map((name, index) => (
                    <option key={index + 1} value={index + 1}>{name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 遊戲列表 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredGames.map(game => (
                <div key={game.app_id} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors card-hover">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold">{game.name}</h3>
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm">{game.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">類型：</span>
                      <span>{game.genre}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">遊戲時間：</span>
                      <span>{game.playtime}小時</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">價格：</span>
                      <span>{game.price}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-400 mb-2">可用帳號：</div>
                    <div className="flex space-x-1">
                      {game.accounts.map(acc => (
                        <span key={acc} className="bg-blue-600 text-blue-100 px-2 py-1 rounded text-xs">
                          {steamConfig.accountNames[acc - 1]}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 許願清單 */}
            {wishlist.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4">許願清單</h3>
                <div className="space-y-4">
                  {wishlist.map(wish => (
                    <div key={wish.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700 card-hover">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{wish.game_name}</h4>
                          <p className="text-sm text-gray-400">提案人: {wish.requested_by}</p>
                          {wish.reason && <p className="text-sm text-gray-300 mt-1">{wish.reason}</p>}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-400">{wish.votes} 票</span>
                          <button className="bg-pink-600 hover:bg-pink-700 p-2 rounded btn-hover">
                            <Icons.Heart />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {gameLibrary.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icons.RefreshCw />
                </div>
                <p className="text-gray-400 text-lg mb-2">尚未同步遊戲庫存</p>
                <p className="text-gray-500">點擊「同步Steam遊戲」開始</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <Icons.Github className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400 text-lg mb-4">請先登入以使用Steam庫存管理功能</p>
            <button
              onClick={signInWithGitHub}
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg flex items-center space-x-2 mx-auto btn-hover"
            >
              <Icons.Github />
              <span>使用GitHub登入</span>
            </button>
          </div>
        )}
      </div>

      {/* 設定彈窗 */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-6">Steam 帳號設定</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[1, 2, 3, 4].map(num => (
                <div key={num} className="space-y-2">
                  <label className="block text-sm font-medium">帳號 #{num} 名稱</label>
                  <input
                    type="text"
                    value={steamConfig.accountNames[num - 1]}
                    onChange={(e) => {
                      const newNames = [...steamConfig.accountNames];
                      newNames[num - 1] = e.target.value;
                      setSteamConfig({...steamConfig, accountNames: newNames});
                    }}
                    className="w-full bg-gray-700 border border-gray-600 rounded p-2 focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="block text-sm font-medium">Steam ID</label>
                  <input
                    type="text"
                    value={steamConfig.steamIds[num - 1]}
                    onChange={(e) => {
                      const newIds = [...steamConfig.steamIds];
                      newIds[num - 1] = e.target.value;
                      setSteamConfig({...steamConfig, steamIds: newIds});
                    }}
                    placeholder="76561198xxxxxxxxx"
                    className="w-full bg-gray-700 border border-gray-600 rounded p-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={saveSteamConfig}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded btn-hover"
              >
                儲存設定
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded btn-hover"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 許願表單 */}
      {showWishForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">新增遊戲許願</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">遊戲名稱</label>
                <input
                  type="text"
                  value={newWish.name}
                  onChange={(e) => setNewWish({...newWish, name: e.target.value})}
                  placeholder="輸入想要的遊戲名稱..."
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">許願理由</label>
                <textarea
                  value={newWish.reason}
                  onChange={(e) => setNewWish({...newWish, reason: e.target.value})}
                  placeholder="為什麼想要這款遊戲？（選填）"
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 h-20 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={addWish}
                  className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded btn-hover"
                >
                  提交許願
                </button>
                <button
                  onClick={() => setShowWishForm(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 py-2 rounded btn-hover"
                >
                  取消
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
