import React, { useState } from 'react';
import { MapPin, ChevronDown, Search, Mic, Wallet, Home, Tag, Utensils, Video, X, User, Store, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ZomatoHome = () => {
  const navigate = useNavigate();
  
  // Modals state
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showReelsAuthWarning, setShowReelsAuthWarning] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // NEW STATE FOR LOGOUT

  // Read local storage to see who is logged in
  const userRole = localStorage.getItem('userRole'); // 'user' or 'partner' or null
  const partnerId = localStorage.getItem('partnerId');

  // --- REELS BUTTON LOGIC ---
  const handleReelsClick = () => {
    if (userRole === 'user') {
      navigate('/reels');
    } else if (userRole === 'partner' && partnerId) {
      navigate(`/food-partner/dashboard/${partnerId}`);
    } else {
      // Not logged in! Show warning.
      setShowReelsAuthWarning(true);
    }
  };

  // --- PROFILE CLICK LOGIC ---
  const handleProfileClick = () => {
    if (userRole) {
      // If already logged in, show the sleek custom logout modal
      setShowLogoutModal(true);
    } else {
      // Not logged in -> Show login choices
      setShowLoginModal(true);
    }
  };

  // --- CONFIRM LOGOUT LOGIC ---
  const handleConfirmLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('partnerId');
    window.location.reload(); // Reloads to clear state and show logged-out view
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans pb-24 relative overflow-x-hidden">
      
      {/* --- TOP HEADER --- */}
      <div className="px-4 pt-4 flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-2">
          <MapPin size={22} className="text-white" fill="white" />
          <div>
            <div className="flex items-center gap-1 font-black text-xl">
              Home <ChevronDown size={18} />
            </div>
            <p className="text-gray-400 text-xs truncate max-w-[180px]">Boat Club garden hiraghat ne...</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-purple-600 px-3 py-1.5 rounded-lg text-xs font-black tracking-widest lowercase italic">district</div>
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
            <Wallet size={14} />
          </div>
          <div onClick={handleProfileClick} className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold cursor-pointer hover:bg-blue-500 transition-colors">
            {userRole === 'user' ? 'U' : userRole === 'partner' ? 'P' : 'S'}
          </div>
        </div>
      </div>

      {/* --- SEARCH BAR --- */}
      <div className="px-4 mt-6 z-10 relative">
        <div className="bg-[#242424] rounded-2xl p-3.5 flex items-center gap-3 border border-white/5">
          <Search size={20} className="text-red-400" />
          <input 
            type="text" 
            placeholder='Search "homestyle meals"' 
            className="bg-transparent outline-none flex-1 text-sm text-white placeholder-gray-500" 
          />
          <div className="w-[1px] h-5 bg-white/20"></div>
          <Mic size={20} className="text-red-400" />
        </div>
      </div>

      {/* --- GOLD FLASH SALE BANNER --- */}
      <div className="px-4 mt-6 relative">
        {/* Faux Background Glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-amber-500/20 blur-3xl rounded-full pointer-events-none"></div>
        
        <div className="bg-gradient-to-b from-[#2a2315] to-[#121212] border border-amber-500/20 rounded-3xl p-8 text-center relative overflow-hidden flex flex-col items-center">
            <h2 className="text-amber-400 font-black text-4xl uppercase tracking-tighter leading-none mb-2 drop-shadow-lg">
                Gold<br/>Flash Sale
            </h2>
            <p className="text-white text-sm font-bold mb-4 tracking-wider">₹1 for 3 months</p>
            <button className="bg-[#1a1a1a] text-amber-400 border border-amber-400/30 text-xs font-bold px-6 py-2.5 rounded-full flex items-center gap-2 hover:bg-[#222] transition-colors">
                Renew Gold now <span className="text-lg leading-none">→</span>
            </button>
        </div>
      </div>

      {/* --- CATEGORIES HORIZONTAL SCROLL --- */}
      <div className="mt-8 px-4 flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {[
            { img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&q=80", title: "All", border: "border-red-500" },
            { img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=150&q=80", title: "Fried Rice" },
            { img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=150&q=80", title: "Biryani" },
            { img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=150&q=80", title: "Cakes" },
        ].map((cat, i) => (
            <div key={i} className="flex flex-col items-center gap-3 shrink-0">
                <div className={`w-16 h-16 rounded-full overflow-hidden ${cat.border ? `border-[3px] ${cat.border} p-0.5` : ''}`}>
                    <img src={cat.img} className="w-full h-full object-cover rounded-full" alt={cat.title}/>
                </div>
                <span className="text-xs font-medium text-gray-300">{cat.title}</span>
            </div>
        ))}
      </div>

      {/* --- FILTERS --- */}
      <div className="px-4 mt-2 flex gap-3 overflow-x-auto scrollbar-hide">
        <div className="bg-[#1a1a1a] border border-white/10 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 shrink-0 cursor-pointer">
            <span className="opacity-60">○-○</span> Filters <ChevronDown size={12}/>
        </div>
        <div className="bg-[#1a1a1a] border border-white/10 px-4 py-2 rounded-xl text-xs font-bold shrink-0 cursor-pointer">Under ₹200</div>
        <div className="bg-[#1a1a1a] border border-white/10 px-4 py-2 rounded-xl text-xs font-bold shrink-0 cursor-pointer">No packaging charges</div>
      </div>

      {/* --- RECOMMENDED FOR YOU --- */}
      <div className="mt-8 px-4">
        <h3 className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-4">Recommended For You</h3>
        <div className="grid grid-cols-2 gap-4">
            
            {/* Card 1 */}
            <div className="flex flex-col gap-2 cursor-pointer">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-800">
                    <img src="https://images.unsplash.com/photo-1589302168068-964664d93cb0?w=400&q=80" className="w-full h-full object-cover" alt="Krunk"/>
                    <div className="absolute top-0 left-0 bg-blue-500/90 backdrop-blur-md px-2 py-1 text-[10px] font-black rounded-br-lg rounded-tl-2xl">₹80 OFF above ₹249</div>
                    <div className="absolute bottom-2 left-2 bg-green-700 px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-0.5"><span className="text-white">★ 4.3</span></div>
                </div>
                <h4 className="font-bold text-sm text-white">Krunk</h4>
                <p className="text-xs text-gray-400 flex items-center gap-1">⏱ 45-50 mins</p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col gap-2 cursor-pointer">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-800">
                    <img src="https://images.unsplash.com/photo-1626779836371-70f9df5baeb0?w=400&q=80" className="w-full h-full object-cover" alt="Doli"/>
                    <div className="absolute top-0 left-0 bg-blue-500/90 backdrop-blur-md px-2 py-1 text-[10px] font-black rounded-br-lg rounded-tl-2xl">₹125 OFF above ₹349</div>
                    <div className="absolute bottom-2 left-2 bg-green-700 px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-0.5"><span className="text-white">★ 4.2</span></div>
                </div>
                <h4 className="font-bold text-sm text-white truncate">Doli Restaurant &...</h4>
                <p className="text-xs text-gray-400 flex items-center gap-1">⏱ 45-50 mins</p>
            </div>

        </div>
      </div>

      {/* --- STICKY BOTTOM NAVIGATION BAR --- */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-md flex items-center gap-2 z-40">
        
        {/* Left main pill */}
        <div className="flex-1 bg-[#1a1a1c] border border-white/10 rounded-[24px] p-2 flex justify-between items-center shadow-2xl backdrop-blur-xl">
            <div className="flex-1 flex flex-col items-center justify-center gap-1 cursor-pointer">
                <Home size={20} className="text-red-400" fill="currentColor" />
                <span className="text-[10px] font-bold text-white">Home</span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-1 opacity-50 cursor-pointer">
                <Tag size={20} />
                <span className="text-[10px] font-medium">Under ₹250</span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-1 opacity-50 cursor-pointer">
                <Utensils size={20} />
                <span className="text-[10px] font-medium">Dining</span>
            </div>
        </div>

        {/* --- DYNAMIC FOOD REELS BUTTON --- */}
        <div 
            onClick={handleReelsClick}
            className="w-24 h-16 rounded-[24px] bg-gradient-to-br from-emerald-600 to-green-800 border border-green-400/30 flex flex-col items-center justify-center gap-1 shadow-lg shadow-green-900/50 cursor-pointer active:scale-95 transition-transform"
        >
            <Video size={18} className="text-[#d4ff00]" />
            <span className="text-[10px] font-bold text-white tracking-wide">Food Reels</span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MODALS SECTION */}
      {/* ------------------------------------------------------------- */}

      {/* AUTHENTICATION CHOICE MODAL (Triggers when clicking Profile 'S' if NOT logged in) */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowLoginModal(false)}>
            <div 
                className="bg-[#121212] border border-white/10 rounded-3xl p-6 w-full max-w-sm flex flex-col gap-4 relative overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                style={{ animation: 'modalPop 0.2s ease-out' }}
            >
                <div className="absolute top-0 right-0 p-4 cursor-pointer" onClick={() => setShowLoginModal(false)}>
                    <X size={20} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-black italic uppercase tracking-tighter text-white mb-2">Welcome to <span className="text-red-500">Zomato</span></h3>
                <p className="text-gray-400 text-xs mb-4">Log in or register to experience the new Food Reels feature and order food.</p>

                <button onClick={() => navigate('/user/login')} className="bg-red-500/10 border border-red-500/30 text-red-400 font-bold p-4 rounded-2xl flex items-center gap-3 hover:bg-red-500/20 active:scale-95 transition-all">
                    <User size={20} />
                    <span>Continue as Customer</span>
                </button>

                <button onClick={() => navigate('/food-partner/login')} className="bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold p-4 rounded-2xl flex items-center gap-3 hover:bg-purple-500/20 active:scale-95 transition-all">
                    <Store size={20} />
                    <span>Login as Restaurant Partner</span>
                </button>
            </div>
        </div>
      )}

      {/* REELS RESTRICTION MODAL (Triggers when clicking Reels button while logged out) */}
      {showReelsAuthWarning && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowReelsAuthWarning(false)}>
            <div 
                className="bg-[#121212] border border-green-500/30 rounded-3xl p-8 w-full max-w-sm flex flex-col items-center text-center relative overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                style={{ animation: 'modalPop 0.2s ease-out' }}
            >
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-4">
                    <Video size={28} className="text-[#d4ff00]" />
                </div>
                <h3 className="text-xl font-black uppercase text-white mb-2">Sign in Required</h3>
                <p className="text-gray-400 text-xs mb-6">Food Reels is an exclusive feature. Please sign in as a user to watch reels, or as a partner to upload them!</p>

                <button onClick={() => { setShowReelsAuthWarning(false); setShowLoginModal(true); }} className="w-full bg-[#d4ff00] text-black font-black uppercase tracking-widest text-xs py-4 rounded-2xl active:scale-95 transition-transform shadow-[0_0_20px_rgba(212,255,0,0.2)]">
                    Sign In Now
                </button>

                <button onClick={() => setShowReelsAuthWarning(false)} className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-white mt-4 transition-colors">
                    Maybe Later
                </button>
            </div>
        </div>
      )}

      {/* --- CUSTOM LOGOUT MODAL (RED) --- */}
      {showLogoutModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
          onClick={() => setShowLogoutModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              border: '1px solid rgba(239, 68, 68, 0.25)', // Red accent border
              boxShadow: '0 8px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
              animation: 'modalPop 0.25s cubic-bezier(0.34,1.56,0.64,1) forwards',
            }}
            className="rounded-3xl px-8 py-10 flex flex-col items-center gap-7 w-[280px]"
          >
            {/* Red Logout Icon */}
            <div className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
                <LogOut size={24} className="text-red-400" />
            </div>

            {/* Labels */}
            <div className="text-center flex flex-col gap-2">
                <p className="text-white font-black tracking-widest uppercase text-xs">
                    Log Out?
                </p>
                <p className="text-gray-400 text-[11px] tracking-wide leading-relaxed">
                    Do you want to log out of your Zomato account?
                </p>
            </div>

            {/* YES Circular Action Button */}
            <button
                onClick={handleConfirmLogout}
                className="w-16 h-16 rounded-full flex items-center justify-center active:scale-90 transition-transform"
                style={{
                    background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
                    boxShadow: '0 0 24px rgba(239, 68, 68, 0.45)',
                }}
            >
                <span className="text-white font-black tracking-widest text-[11px] uppercase">Yes</span>
            </button>

            {/* Cancel */}
            <button
                onClick={() => setShowLogoutModal(false)}
                className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-gray-300 transition-colors"
            >
                Cancel
            </button>
          </div>
        </div>
      )}

      <style>{`
          @keyframes modalPop {
              from { opacity: 0; transform: scale(0.9); }
              to { opacity: 1; transform: scale(1); }
          }
      `}</style>
    </div>
  );
};

export default ZomatoHome;