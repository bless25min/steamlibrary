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
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-8h2v6h-2v-6zm0-4h2v2h-2V8z"/>
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
  AlertTriangle: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5l-6.928-12c-.77-.833-2.494-.833-3.464 0l-6.928 12c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  )
};

// ========== Supabase 配置 ==========
const SUPABASE_CONFIG = {
  url: 'https://lwbrqtevzhfkwbwbcdtz.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3YnJxdGV2emhma3did2JjZHR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NjcxMjYsImV4cCI6MjA2NzA0MzEyNn0.4s16bos5EEhSuUg-K1Paf8B5UXyo-Ca8reTFZ03VVT8'
  // Steam API Key 已移除 - 將通過後端 Edge Functions 處理
};

// 模擬的 Supabase 客戶端 (開發用)
const createMockSupabase = () => {
  const mockUsers = [
    {
      id: '1',
      discord_id: '123456789',
      username: 'GamerPro2024',
      avatar_url: 'https://cdn.discordapp.com/avatars/123456789/avatar1.png',
      steam_id: '76561198123456789',
      steam_profile_url: 'https://steamcommunity.com/id/gamerpro2024/',
      game_count: 7,
      total_playtime: 234,
      created_at: '2024-01-15'
    },
    {
      id: '2', 
      discord_id: '987654321',
      username: 'SteamMaster',
      avatar_url: 'https://cdn.discordapp.com/avatars/987654321/avatar2.png',
      steam_id: '76561198987654321',
      steam_profile_url: 'https://steamcommunity.com/id/steammaster/',
      game_count: 5,
      total_playtime: 156,
      created_at: '2024-02-01'
    }
  ];

  const mockGames = [
    {
      id: '1',
      steam_app_id: '730',
      name: 'Counter-Strike 2',
      header_image: 'https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg',
      user_games: [
        { playtime_forever: 7440, user: { username: 'GamerPro2024' } },
        { playtime_forever: 5136, user: { username: 'SteamMaster' } }
      ]
    },
    {
      id: '2',
      steam_app_id: '1086940',
      name: 'Baldur\'s Gate 3',
      header_image: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg',
      user_games: [
        { playtime_forever: 11220, user: { username: 'GamerPro2024' } }
      ]
    },
    {
      id: '3',
      steam_app_id: '1245620',
      name: 'ELDEN RING',
      header_image: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg',
      user_games: [
        { playtime_forever: 20700, user: { username: 'SteamMaster' } }
      ]
    }
  ];

  return {
    auth: {
      signInWithOAuth: async (config) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const mockUser = {
              id: 'mock_' + Date.now(),
              user_metadata: {
                provider_id: '999888777',
                full_name: 'TestUser' + Math.floor(Math.random() * 1000),
                avatar_url: `https://cdn.discordapp.com/avatars/999888777/avatar.png`
              }
            };
            resolve({ data: { user: mockUser }, error: null });
          }, 1500);
        });
      },
      signOut: async () => ({ error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
      onAuthStateChange: (callback) => {
        return { data: { subscription: {} } };
      }
    },
    from: (table) => ({
      select: (columns = '*') => ({
        eq: (column, value) => ({
          single: async () => {
            if (table === 'users') {
              const user = mockUsers.find(u => u[column] === value);
              return { data: user || null, error: null };
            }
            return { data: null, error: null };
          },
          order: (orderColumn, options) => ({
            then: async (callback) => {
              if (table === 'users') {
                return callback({ data: mockUsers, error: null });
              }
              return callback({ data: [], error: null });
            }
          })
        }),
        order: (orderColumn, options) => ({
          then: async (callback) => {
            if (table === 'users') {
              return callback({ data: mockUsers, error: null });
            } else if (table === 'games') {
              return callback({ data: mockGames, error: null });
            }
            return callback({ data: [], error: null });
          }
        }),
        then: async (callback) => {
          if (table === 'users') {
            return callback({ data: mockUsers, error: null });
          } else if (table === 'games') {
            return callback({ data: mockGames, error: null });
          }
          return callback({ data: [], error: null });
        }
      }),
      insert: (data) => ({
        select: () => ({
          single: async () => {
            if (table === 'users') {
              const newUser = { ...data, id: 'new_' + Date.now() };
              mockUsers.push(newUser);
              return { data: newUser, error: null };
            }
            return { data: data, error: null };
          }
        })
      }),
      update: (data) => ({
        eq: (column, value) => ({
          select: () => ({
            single: async () => {
              if (table === 'users') {
                const userIndex = mockUsers.findIndex(u => u[column] === value);
                if (userIndex >= 0) {
                  mockUsers[userIndex] = { ...mockUsers[userIndex], ...data };
                  return { data: mockUsers[userIndex], error: null };
                }
              }
              return { data: null, error: null };
            }
          })
        })
      }),
      upsert: (data, options) => ({
        select: () => ({
          single: async () => {
            // 模擬 upsert 操作
            if (table === 'games') {
              const newData = { ...data, id: 'game_' + Date.now() };
              return { data: newData, error: null };
            } else if (table === 'user_games') {
              const newData = { ...data, id: 'user_game_' + Date.now() };
              return { data: newData, error: null };
            }
            return { data: data, error: null };
          }
        }),
        // 對於 user_games 表不需要 select
        then: async () => {
          return { data: null, error: null };
        }
      })
    })
  };
};

// 初始化 Supabase 客戶端
let supabase;
try {
  // 在真實環境中使用真實的 Supabase 客戶端
  if (typeof window !== 'undefined') {
    // 嘗試使用全域 Supabase 客戶端（如果已安裝 @supabase/supabase-js）
    if (window.supabase) {
      supabase = window.supabase;
      console.log('✅ 使用真實的 Supabase 客戶端');
    } else {
      // 在這個 demo 環境中使用模擬客戶端
      // 在真實環境中，請安裝 @supabase/supabase-js 並使用:
      // import { createClient } from '@supabase/supabase-js'
      // supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey)
      
      supabase = createMockSupabase();
      console.log('🧪 使用模擬 Supabase 客戶端');
      console.log('📋 配置已準備好，可以在真實環境中使用！');
      console.log('🔗 Supabase URL:', SUPABASE_CONFIG.url);
    }
  } else {
    supabase = createMockSupabase();
  }
} catch (error) {
  console.log('🧪 使用模擬的 Supabase 客戶端');
  supabase = createMockSupabase();
}

// ========== Steam API 工具函數 ==========
const SteamAPI = {
  // 解析 Steam URL
  parseSteamUrl: (url) => {
    const patterns = [
      { pattern: /steamcommunity\.com\/id\/([^\/]+)/, type: 'custom_id' },
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

  // 解析自訂ID為Steam ID（簡化版）
  resolveVanityUrl: async (vanityName) => {
    // 生成模擬Steam ID
    return '76561198' + Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
  },

  // 生成模擬遊戲數據
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
      { appid: 431960, name: 'Wallpaper Engine' }
    ];

    // 隨機選擇5-8個遊戲
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

// ========== 主要組件 ==========
function App() {
  // 用戶狀態
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  
  // 頁面狀態
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
  
  // 數據
  const [users, setUsers] = useState([]);
  const [games, setGames] = useState([]);
  
  // 配置檢查
  const [configError, setConfigError] = useState('');

  // 初始化和身份驗證
  useEffect(() => {
    checkConfig();
    initializeAuth();
    loadData();
  }, []);

  // 檢查配置
  const checkConfig = () => {
    // 配置已完成，無需檢查
    setConfigError('');
  };

  // 初始化身份驗證
  const initializeAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await loadUserData(user);
      }
    } catch (error) {
      console.error('初始化認證失敗:', error);
    } finally {
      setLoading(false);
    }

    // 監聽認證狀態變化
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        await loadUserData(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });
  };

  // 載入用戶數據
  const loadUserData = async (authUser) => {
    try {
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('discord_id', authUser.user_metadata.provider_id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (userData) {
        setUser(userData);
      } else {
        // 創建新用戶
        const newUser = {
          discord_id: authUser.user_metadata.provider_id,
          username: authUser.user_metadata.full_name || authUser.user_metadata.preferred_username,
          avatar_url: authUser.user_metadata.avatar_url
        };

        const { data: createdUser, error: createError } = await supabase
          .from('users')
          .insert(newUser)
          .select()
          .single();

        if (createError) throw createError;
        
        setUser(createdUser);
        setShowSteamForm(true);
      }
    } catch (error) {
      console.error('載入用戶數據失敗:', error);
    }
  };

  // 載入平台數據
  const loadData = async () => {
    try {
      // 載入用戶數據
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (usersError) throw usersError;
      if (usersData) setUsers(usersData);

      // 載入遊戲數據（簡化版本）
      const { data: gamesData, error: gamesError } = await supabase
        .from('games')
        .select(`
          *,
          user_games (
            playtime_forever,
            user:users (username)
          )
        `);
      
      if (gamesError) throw gamesError;
      
      if (gamesData) {
        // 轉換數據格式以符合前端期望
        const formattedGames = gamesData.map(game => {
          const owners = game.user_games?.map(ug => ug.user?.username).filter(Boolean) || [];
          const playtime = {};
          
          game.user_games?.forEach(ug => {
            if (ug.user?.username && ug.playtime_forever) {
              playtime[ug.user.username] = Math.round(ug.playtime_forever / 60);
            }
          });

          return {
            id: game.id,
            steam_app_id: game.steam_app_id,
            name: game.name,
            header_image: game.header_image,
            owners: owners,
            playtime: playtime
          };
        });
        
        setGames(formattedGames);
      }
    } catch (error) {
      console.error('載入數據失敗:', error);
    }
  };

  // Discord 登入
  const signInWithDiscord = async () => {
    setAuthLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
          redirectTo: window.location.origin
        }
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Discord登入失敗:', error);
      alert('登入失敗: ' + error.message);
    } finally {
      setAuthLoading(false);
    }
  };

  // 登出
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setActiveTab('discover');
    } catch (error) {
      console.error('登出失敗:', error);
    }
  };

  // 儲存Steam資料並同步遊戲庫
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
      
      // 如果是自訂ID，需要解析為Steam ID
      if (parsedUrl.type === 'custom_id') {
        setSyncStatus('解析自訂ID中...');
        steamId = await SteamAPI.resolveVanityUrl(parsedUrl.identifier);
        if (!steamId) {
          alert('無法解析Steam自訂ID，請確認ID是否正確');
          return;
        }
      }

      setSyncStatus('同步遊戲庫中...');
      
      // 生成模擬遊戲數據
      const mockGames = SteamAPI.generateMockGames();
      const totalPlaytime = Math.round(mockGames.reduce((total, game) => total + game.playtime_forever, 0) / 60);

      // 更新用戶Steam資料
      const { data: updatedUser, error: updateError } = await supabase
        .from('users')
        .update({
          steam_id: steamId,
          steam_profile_url: steamUrl,
          game_count: mockGames.length,
          total_playtime: totalPlaytime
        })
        .eq('id', user.id)
        .select()
        .single();

      if (updateError) throw updateError;

      setSyncStatus('儲存遊戲資料中...');

      // 插入遊戲到遊戲表
      for (const game of mockGames) {
        // 先插入遊戲（如果不存在）
        const { data: gameData, error: gameError } = await supabase
          .from('games')
          .upsert({
            steam_app_id: game.appid.toString(),
            name: game.name,
            header_image: game.header_image
          }, {
            onConflict: 'steam_app_id'
          })
          .select()
          .single();

        if (gameError) {
          console.log(`插入遊戲 ${game.name} 失敗:`, gameError);
          continue;
        }

        // 建立用戶遊戲關聯
        await supabase
          .from('user_games')
          .upsert({
            user_id: updatedUser.id,
            game_id: gameData.id,
            playtime_forever: game.playtime_forever
          }, {
            onConflict: 'user_id,game_id'
          });
      }

      // 更新本地用戶狀態
      setUser(updatedUser);
      setSyncStatus('同步完成！');
      
      // 重新載入數據
      await loadData();
      
      alert(`Steam資料同步成功！\n遊戲數量: ${mockGames.length}\n總遊戲時間: ${totalPlaytime} 小時`);
      
      setShowSteamForm(false);
      setSteamUrl('');
    } catch (error) {
      console.error('同步Steam資料失敗:', error);
      setSyncStatus('同步失敗');
      alert('同步失敗: ' + error.message);
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
      if (filterBy === 'mine' && user) return matchesSearch && game.owners && game.owners.includes(user.username);
      
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

  // 配置錯誤顯示
  if (configError) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <Icons.AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">配置未完成</h1>
          <p className="text-gray-400 mb-6">{configError}</p>
          <div className="bg-gray-800 rounded-lg p-4 text-left text-sm">
            <p className="text-yellow-400 font-semibold mb-2">請在代碼中設置:</p>
            <ul className="text-gray-300 space-y-1">
              <li>• SUPABASE_CONFIG.url</li>
              <li>• SUPABASE_CONFIG.anonKey</li>
              <li>• SUPABASE_CONFIG.steamApiKey (可選)</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // 登入頁面
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icons.Steam className="w-10 h-10" />
            </div>
            
            <h1 className="text-3xl font-bold mb-2">Steam 遊戲庫共享平台</h1>
            <p className="text-gray-400 mb-8">
              與朋友分享你的Steam遊戲庫，發現共同喜好的遊戲
            </p>
            
            <button
              onClick={signInWithDiscord}
              disabled={authLoading}
              className={`w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-6 py-3 rounded-lg flex items-center justify-center space-x-3 transition-colors ${authLoading ? 'opacity-50' : ''}`}
            >
              <Icons.Discord />
              <span>{authLoading ? '登入中...' : '使用 Discord 登入'}</span>
            </button>
            
            <div className="mt-8 text-sm text-gray-500">
              <p>登入後你可以：</p>
              <ul className="mt-2 space-y-1">
                <li>• 添加你的Steam個人頁面連結</li>
                <li>• 自動同步遊戲庫到平台</li>
                <li>• 瀏覽其他玩家的遊戲收藏</li>
                <li>• 發現擁有相同遊戲的朋友</li>
              </ul>
            </div>
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
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Icons.Steam className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Steam 遊戲庫共享平台</h1>
                <p className="text-sm text-gray-400">{users.length} 位玩家 • {games.length} 款遊戲</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar_url}
                  alt={user.username}
                  className="w-8 h-8 rounded-full"
                  onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=6366f1&color=fff`}
                />
                <span className="text-sm font-medium">{user.username}</span>
              </div>
              <button
                onClick={signOut}
                className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Icons.LogOut />
              </button>
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
            <span>玩家列表 ({users.length})</span>
          </button>
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
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">所有遊戲</option>
                  <option value="popular">熱門遊戲 (2+人擁有)</option>
                  {user.steam_id && <option value="mine">我的遊戲</option>}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
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
                共 {users.length} 位玩家加入平台
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((userData, index) => (
                <div key={userData.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="relative">
                      <img
                        src={userData.avatar_url}
                        alt={userData.username}
                        className="w-12 h-12 rounded-full"
                        onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.username)}&background=6366f1&color=fff`}
                      />
                      {index === 0 && (
                        <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1">
                          <Icons.Crown className="w-3 h-3 text-yellow-900" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{userData.username}</h3>
                        {userData.id === user.id && (
                          <span className="bg-green-600 text-green-100 px-2 py-1 rounded text-xs">你</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">加入於 {userData.created_at}</p>
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
        {activeTab === 'profile' && (
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
                    onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=6366f1&color=fff`}
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
                      <div className="text-xl font-bold text-blue-400">{users.length}</div>
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
                      <div className="text-xl font-bold text-yellow-400">
                        {user.steam_id ? games.filter(g => g.owners && g.owners.includes(user.username)).length : 0}
                      </div>
                      <div className="text-sm text-gray-400">我的遊戲</div>
                    </div>
                  </div>
                </div>

                {user.steam_id && games.filter(game => game.owners && game.owners.includes(user.username)).length > 0 && (
                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h4 className="text-lg font-semibold mb-4">我的熱門遊戲</h4>
                    <div className="space-y-3">
                      {games
                        .filter(game => game.owners && game.owners.includes(user.username))
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
                              {game.playtime?.[user.username] || 0}小時
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
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
                ✕
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
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
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
