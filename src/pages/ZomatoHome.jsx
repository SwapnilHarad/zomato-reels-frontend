import React, { useState, useEffect } from 'react';
import { MapPin, ChevronDown, Search, Mic, Wallet, Home, Tag, Utensils, Video, X, User, Store, LogOut, Star, Clock, SlidersHorizontal, Percent } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ZomatoHome = () => {
  const navigate = useNavigate();
  
  // Modals state
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showReelsAuthWarning, setShowReelsAuthWarning] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  // Toggle States
  const [isVegOnly, setIsVegOnly] = useState(false);

  // Read local storage to see who is logged in
  const userRole = localStorage.getItem('userRole'); 
  const partnerId = localStorage.getItem('partnerId');

  // --- RANDOM ADDRESS GENERATOR ---
  const [currentAddress, setCurrentAddress] = useState("");
  
  useEffect(() => {
    const realisticAddresses = [
      "Boat Club garden hiraghat ne...",
      "Goal Maidan Ulhasnagar - 2 near...",
      "Below Regency near mharal society...",
      "Aman Talkies road, Ulhasnagar - 3...",
      "Shivaji Chowk, Kalyan West near station..."
    ];
    const randomIdx = Math.floor(Math.random() * realisticAddresses.length);
    setCurrentAddress(realisticAddresses[randomIdx]);
  }, []);

  // --- REELS BUTTON LOGIC ---
  const handleReelsClick = () => {
    if (userRole === 'user') {
      navigate('/reels');
    } else if (userRole === 'partner' && partnerId) {
      navigate(`/food-partner/dashboard/${partnerId}`);
    } else {
      setShowReelsAuthWarning(true);
    }
  };

  // --- PROFILE CLICK LOGIC ---
  const handleProfileClick = () => {
    if (userRole) {
      setShowLogoutModal(true);
    } else {
      setShowLoginModal(true);
    }
  };

  // --- CONFIRM LOGOUT LOGIC ---
  const handleConfirmLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('partnerId');
    localStorage.removeItem('authToken');
    window.location.reload(); 
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-sans pb-28 relative overflow-x-hidden">
      
      {/* --- TOP HEADER --- */}
      <div className="px-4 pt-4 flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-2">
          <MapPin size={26} className="text-white" fill="white" />
          <div className="flex flex-col">
            <div className="flex items-center gap-1 font-black text-xl leading-none">
              Home <ChevronDown size={20} className="mt-1" />
            </div>
            <p className="text-gray-400 text-xs truncate max-w-[170px] mt-1">{currentAddress}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-[#6b21a8] px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase italic">district</div>
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
            <Wallet size={14} />
          </div>
          <div onClick={handleProfileClick} className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold cursor-pointer hover:bg-blue-500 transition-colors text-sm">
            {userRole === 'user' ? 'U' : userRole === 'partner' ? 'P' : 'S'}
          </div>
        </div>
      </div>

      {/* --- SEARCH BAR & VEG TOGGLE --- */}
      <div className="px-4 mt-6 z-10 relative flex items-center gap-4">
        <div className="bg-[#1c1c1c] rounded-[18px] p-3.5 flex items-center gap-3 border border-white/5 flex-1 shadow-inner">
          <Search size={20} className="text-gray-400" />
          <input 
            type="text" 
            placeholder='Restaurant name or a dish...' 
            className="bg-transparent outline-none flex-1 text-[13px] text-white placeholder-gray-500 font-medium truncate" 
          />
          <div className="w-[1px] h-5 bg-white/10"></div>
          <Mic size={20} className="text-gray-400" />
        </div>

        {/* VEG Toggle Switch */}
        <div className="flex flex-col items-center justify-center gap-1 shrink-0" onClick={() => setIsVegOnly(!isVegOnly)}>
            <span className="text-[10px] font-black text-gray-500 tracking-wider">VEG</span>
            <div className={`w-9 h-5 rounded-full relative cursor-pointer transition-colors duration-300 ${isVegOnly ? 'bg-green-600' : 'bg-gray-700'}`}>
                <div className={`w-4 h-4 bg-white rounded-full absolute top-[2px] transition-transform duration-300 shadow-sm ${isVegOnly ? 'translate-x-[18px]' : 'translate-x-[2px]'}`}></div>
            </div>
        </div>
      </div>

      {/* --- GOLD FLASH SALE BANNER --- */}
      <div className="px-4 mt-6 relative">
        <div className="bg-gradient-to-b from-[#3a2b16] via-[#1a150c] to-[#0f0f0f] rounded-[24px] p-8 text-center relative overflow-hidden flex flex-col items-center shadow-lg border border-amber-900/30">
            
            {/* Background decorative confetti/glow */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-amber-500/10 blur-[50px] pointer-events-none"></div>
            
            <h2 className="text-[#f5c518] font-black text-[38px] uppercase tracking-tighter leading-[0.95] mb-2 drop-shadow-[0_2px_10px_rgba(245,197,24,0.2)] z-10 font-serif">
                GOLD<br/>FLASH SALE
            </h2>
            <p className="text-gray-200 text-[13px] font-medium mb-4 tracking-wide z-10">₹1 for 3 months</p>
            <button className="bg-[#111] text-[#f5c518] border border-[#f5c518]/40 text-[11px] font-bold px-5 py-2 rounded-full flex items-center gap-1.5 hover:bg-[#222] transition-colors z-10 shadow-lg">
                Renew Gold now <span className="text-base leading-none">→</span>
            </button>

            {/* Pagination dots */}
            <div className="flex gap-1.5 mt-5 z-10 items-center">
                <div className="w-4 h-1.5 bg-white rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
            </div>
        </div>
      </div>

      {/* --- CATEGORIES HORIZONTAL SCROLL --- */}
      <div className="mt-8 px-4 flex gap-5 overflow-x-auto pb-2 scrollbar-hide items-end">
        
        {/* Special Offers Applied Ticket */}
        <div className="flex flex-col items-center gap-2 shrink-0 cursor-pointer w-[76px] pb-[3px]">
            <div className="w-[72px] h-[72px] rounded-[18px] bg-gradient-to-br from-[#4ea5b6] to-[#2c7a8b] p-1.5 relative shadow-lg flex flex-col justify-between">
                <div className="bg-[#e23744] text-white text-[9px] font-black uppercase text-center w-full rounded-[4px] py-1 leading-[1.1] shadow-sm transform -rotate-2">
                    BEST OFFERS<br/>APPLIED
                </div>
                <div className="text-white text-[9px] font-bold text-center flex items-center justify-center gap-0.5 pb-0.5">
                    Explore <ChevronDown size={10} className="-rotate-90"/>
                </div>
                {/* Decorative cutouts for ticket effect */}
                <div className="absolute -left-1.5 top-1/2 w-3 h-3 bg-[#0f0f0f] rounded-full transform -translate-y-1/2"></div>
                <div className="absolute -right-1.5 top-1/2 w-3 h-3 bg-[#0f0f0f] rounded-full transform -translate-y-1/2"></div>
            </div>
        </div>

        {/* Regular Categories */}
        {[
            { 
              img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=150&q=80", 
              title: "All", 
              active: true 
            },
            { 
              img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=150&q=80", 
              title: "Biryani",
              active: false
            },
            { 
              img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=150&q=80", 
              title: "Fried Rice",
              active: false
            },
            { 
              img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&q=80", 
              title: "Dal Khichdi",
              active: false
            },
        ].map((cat, i) => (
            <div key={i} className="flex flex-col items-center gap-2 shrink-0 cursor-pointer relative w-[76px]">
                <div className={`w-[72px] h-[72px] rounded-full overflow-hidden ${cat.active ? 'p-0' : ''}`}>
                    <img src={cat.img} className="w-full h-full object-cover rounded-full" alt={cat.title}/>
                </div>
                <span className={`text-[11px] mt-1 ${cat.active ? 'text-white font-bold' : 'text-gray-400 font-medium'}`}>{cat.title}</span>
                {cat.active && (
                    <div className="absolute -bottom-[9px] left-1/2 transform -translate-x-1/2 w-14 h-[3px] bg-[#e23744] rounded-t-md"></div>
                )}
            </div>
        ))}
      </div>

      <div className="w-full h-[1px] bg-white/10 mt-2"></div>

      {/* --- FILTERS --- */}
      <div className="px-4 mt-4 flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        <div className="bg-[#242424] border border-white/5 px-3 py-1.5 rounded-[10px] text-[11px] font-medium flex items-center gap-1.5 shrink-0 cursor-pointer text-gray-200">
            <SlidersHorizontal size={12} className="text-gray-400" /> Filters <ChevronDown size={14}/>
        </div>
        <div className="bg-[#242424] border border-white/5 px-4 py-1.5 rounded-[10px] text-[11px] font-medium shrink-0 cursor-pointer text-gray-200">Under ₹200</div>
        <div className="bg-[#242424] border border-white/5 px-4 py-1.5 rounded-[10px] text-[11px] font-medium shrink-0 cursor-pointer text-gray-200">No packaging charges</div>
      </div>

      {/* --- RECOMMENDED FOR YOU (HORIZONTAL SCROLL) --- */}
      <div className="mt-8 pl-4">
        <h3 className="text-gray-400 text-[11px] font-bold tracking-widest uppercase mb-4">Recommended For You</h3>
        
        <div className="flex gap-4 overflow-x-auto pr-4 scrollbar-hide">
            
            {/* Card 1 */}
            <div className="flex flex-col gap-2 cursor-pointer w-[170px] shrink-0">
                <div className="relative w-full aspect-square rounded-[20px] overflow-hidden bg-[#1c1c1c] shadow-lg">
                    <img src="https://images.unsplash.com/photo-1589302168068-964664d93cb0?w=400&q=80" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" alt="Charcoal Eats"/>
                    
                    <div className="absolute top-2 left-0 bg-black/70 backdrop-blur-md px-2 py-1 text-[10px] font-medium text-white rounded-r-md border border-white/10 border-l-0">
                        Items at ₹149
                    </div>
                    
                    <div className="absolute bottom-2 left-2 bg-[#24963f] px-1.5 py-0.5 rounded-[6px] text-[10px] font-black flex items-center gap-0.5 shadow-md">
                        <span className="text-white">4.1</span>
                        <Star size={8} fill="white" className="text-white" />
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-[14px] text-white truncate leading-tight">Charcoal Eats - B...</h4>
                    <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5"><Clock size={10}/> 45-50 mins</p>
                </div>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col gap-2 cursor-pointer w-[170px] shrink-0">
                <div className="relative w-full aspect-square rounded-[20px] overflow-hidden bg-[#1c1c1c] shadow-lg">
                    <img src="https://images.unsplash.com/photo-1626779836371-70f9df5baeb0?w=400&q=80" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" alt="Hotel Palace"/>
                    
                    <div className="absolute top-2 left-0 bg-white/95 backdrop-blur-md px-2 py-1 text-[10px] font-bold text-black rounded-r-md">
                        10% OFF up to ₹40
                    </div>
                    
                    <div className="absolute bottom-2 left-2 bg-[#24963f] px-1.5 py-0.5 rounded-[6px] text-[10px] font-black flex items-center gap-0.5 shadow-md">
                        <span className="text-white">3.8</span>
                        <Star size={8} fill="white" className="text-white" />
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-[14px] text-white truncate leading-tight">Hotel Palace Fam...</h4>
                    <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5"><Clock size={10}/> 45-50 mins</p>
                </div>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col gap-2 cursor-pointer w-[170px] shrink-0">
                <div className="relative w-full aspect-square rounded-[20px] overflow-hidden bg-[#1c1c1c] shadow-lg">
                    <img src="https://images.unsplash.com/photo-1541832676-9b763b022144?w=400&q=80" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" alt="Nityanand Veg"/>
                    
                    <div className="absolute bottom-2 left-2 bg-[#24963f] px-1.5 py-0.5 rounded-[6px] text-[10px] font-black flex items-center gap-0.5 shadow-md">
                        <span className="text-white">3.8</span>
                        <Star size={8} fill="white" className="text-white" />
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-[14px] text-white truncate leading-tight">Nityanand Veg...</h4>
                    <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5"><Clock size={10}/> 40-45 mins</p>
                </div>
            </div>

        </div>
      </div>

      {/* --- STICKY BOTTOM NAVIGATION BAR --- */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-md flex items-center gap-2 z-40">
        
        {/* Left main pill */}
        <div className="flex-1 bg-[#1a1a1c] border border-white/10 rounded-[28px] p-2 flex justify-between items-center shadow-2xl backdrop-blur-xl">
            <div className="flex-1 flex flex-col items-center justify-center gap-1 cursor-pointer">
                <Home size={22} className="text-red-400" fill="currentColor" />
                <span className="text-[10px] font-bold text-white">Home</span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-1 opacity-50 cursor-pointer hover:opacity-100 transition-opacity">
                <Tag size={22} />
                <span className="text-[10px] font-medium">Under ₹250</span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-1 opacity-50 cursor-pointer hover:opacity-100 transition-opacity">
                <Utensils size={22} />
                <span className="text-[10px] font-medium">Dining</span>
            </div>
        </div>

        {/* --- DYNAMIC FOOD REELS BUTTON --- */}
        <div 
            onClick={handleReelsClick}
            className="w-24 h-[68px] rounded-[24px] bg-[#228448] flex flex-col items-center justify-center gap-1 shadow-lg cursor-pointer active:scale-95 transition-transform border border-[#309e5b]"
        >
            <Video size={22} className="text-[#d4ff00]" />
            <span className="text-[10px] font-bold text-white tracking-wide">Food Reels</span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MODALS SECTION */}
      {/* ------------------------------------------------------------- */}

      {/* AUTHENTICATION CHOICE MODAL */}
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

      {/* REELS RESTRICTION MODAL */}
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

      {/* CUSTOM LOGOUT MODAL */}
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
              border: '1px solid rgba(239, 68, 68, 0.25)', 
              boxShadow: '0 8px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
              animation: 'modalPop 0.25s cubic-bezier(0.34,1.56,0.64,1) forwards',
            }}
            className="rounded-3xl px-8 py-10 flex flex-col items-center gap-7 w-[280px]"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
                <LogOut size={24} className="text-red-400" />
            </div>
            <div className="text-center flex flex-col gap-2">
                <p className="text-white font-black tracking-widest uppercase text-xs">
                    Log Out?
                </p>
                <p className="text-gray-400 text-[11px] tracking-wide leading-relaxed">
                    Do you want to log out of your Zomato account?
                </p>
            </div>
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