// 檢查用戶登入狀態 (修改版)
useEffect(() => {
  const checkUser = async () => {
    // 處理認證回調
    const { data, error } = await supabase.auth.getSession();
    
    if (data?.session) {
      setUser(data.session.user);
      await loadUserData(data.session.user.id);
      
      // 清理 URL 中的認證片段
      if (window.location.hash.includes('access_token')) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  };
  
  checkUser();

  // 監聽認證狀態變化
  const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session) {
      setUser(session.user);
      await loadUserData(session.user.id);
      
      // 清理 URL
      if (window.location.hash.includes('access_token')) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } else if (event === 'SIGNED_OUT') {
      setUser(null);
      setGameLibrary([]);
      setWishlist([]);
    }
  });

  return () => subscription.unsubscribe();
}, []);
