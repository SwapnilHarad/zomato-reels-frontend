import React, { useState, useEffect } from 'react';
import { Search, User, Store, LogOut, Star, Clock, MapPin, ShieldCheck, Volume2, Video, X, Wallet, Home, Utensils } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ZomatoHome = () => {
  const navigate = useNavigate();
  
  // Modals state
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showReelsAuthWarning, setShowReelsAuthWarning] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans overflow-x-hidden relative selection:bg-red-500 selection:text-white">
      
      {/* --- HERO STICKY NAVIGATION --- */}
      <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-white/5 bg-[#0d0d0d]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <span className="text-red-500 font-black tracking-tighter text-xl uppercase italic flex items-center gap-1">
            <X size={20} strokeWidth={3} className="rotate-45" /> ZOMATO LUXE
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <Search size={18} className="text-gray-400 cursor-pointer hover:text-white transition-colors" />
          <div 
            onClick={handleProfileClick} 
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-amber-600 flex items-center justify-center font-bold text-sm cursor-pointer border border-white/10 shadow-lg shadow-black/40"
          >
            {userRole === 'user' ? 'U' : userRole === 'partner' ? 'P' : <User size={14} />}
          </div>
        </div>
      </nav>

      {/* --- HERO BRANDING SECTION --- */}
      <div className="relative pt-12 pb-6 px-6 text-center flex flex-col items-center">
        <h1 className="text-5xl font-black tracking-tight leading-none mb-4 text-center max-w-sm">
          Discover <br /> Every <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">Flavor</span>
        </h1>
        <p className="text-gray-400 text-xs max-w-xs leading-relaxed mb-8">
          Order your favourite meals, explore trending restaurants, and watch delicious Food Reels before you decide.
        </p>

        {/* Hero Compact Search Area */}
        <div className="w-full max-w-sm bg-[#161616] rounded-2xl p-1.5 flex items-center gap-2 border border-white/5 shadow-xl mb-6">
          <div className="flex items-center gap-2 pl-3 flex-1">
            <Search size={16} className="text-gray-500" />
            <input 
              type="text" 
              placeholder="Search Biryani..." 
              className="bg-transparent outline-none w-full text-xs text-white placeholder-gray-600 font-medium"
            />
          </div>
          <button className="bg-red-500 hover:bg-red-600 text-white text-xs font-black px-5 py-2.5 rounded-xl transition-all shadow-md shadow-red-900/20 uppercase tracking-wider">
            Search
          </button>
        </div>

        {/* Action Button Controls */}
        <div className="w-full max-w-sm flex flex-col gap-3">
          <button className="w-full bg-red-500 hover:bg-red-600 text-white font-black text-xs py-3.5 rounded-xl transition-all shadow-lg uppercase tracking-widest">
            Order Food
          </button>
          <button className="w-full bg-[#161616] hover:bg-[#202020] text-gray-300 border border-white/5 font-black text-xs py-3.5 rounded-xl transition-all uppercase tracking-widest">
            Explore Restaurants
          </button>
        </div>
      </div>

      {/* --- 🌟 IMAGE COLLAGE SECTION (Option 1 Web URLs) 🌟 --- */}
      <div className="w-full max-w-md mx-auto px-6 py-6 grid grid-cols-2 gap-4 relative">
        {/* Transparent checkerboard background backdrop overlay */}
        <div className="absolute inset-0 mx-6 bg-[linear-gradient(45deg,#111_25%,transparent_25%),linear-gradient(-45deg,#111_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#111_75%),linear-gradient(-45deg,transparent_75%,#111_75%)] bg-[size:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0px] border border-white/5 rounded-2xl opacity-40 pointer-events-none"></div>
        
        {/* Floating Pizza */}
        <div className="aspect-square bg-white/5 rounded-2xl border border-white/5 p-4 flex items-center justify-center relative z-10 shadow-xl backdrop-blur-sm group hover:scale-98 transition-transform">
          <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=250&q=80" className="w-full h-full object-cover rounded-xl" alt="Pizza" />
        </div>
        
        {/* Floating Burger */}
        <div className="aspect-square bg-white/5 rounded-2xl border border-white/5 p-4 flex items-center justify-center relative z-10 shadow-xl backdrop-blur-sm group hover:scale-98 transition-transform">
          <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=250&q=80" className="w-full h-full object-cover rounded-xl" alt="Burger" />
        </div>

        {/* Bowls Collage Row */}
        <div className="col-span-2 bg-white/5 rounded-2xl border border-white/5 p-4 flex gap-4 items-center justify-center relative z-10 shadow-xl backdrop-blur-sm h-32 group hover:scale-98 transition-transform">
          <img src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=150&q=80" className="w-20 h-20 object-cover rounded-xl shadow-md" alt="Biryani" />
          <img src="https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=150&q=80" className="w-24 h-20 object-cover rounded-xl shadow-md flex-1" alt="Noodles" />
        </div>
      </div>

      {/* --- IN THE MOOD FOR --- */}
      <div className="mt-12 px-6">
        <h2 className="text-2xl font-black tracking-tight mb-6">In the mood for?</h2>
        
        <div className="flex justify-start gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {[
            { img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=150&q=80", title: "Pizza" },
            { img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150&q=80", title: "Burger" },
            { img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=150&q=80", title: "Biryani" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer">
              <div className="w-[76px] h-[76px] rounded-full p-[2px] bg-gradient-to-b from-white/10 to-transparent group-hover:from-red-500 transition-all shadow-lg shadow-black/30">
                <img src={item.img} className="w-full h-full object-cover rounded-full" alt={item.title} />
              </div>
              <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors tracking-wide">{item.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* --- POPULAR RESTAURANTS VERTICAL FEED --- */}
      <div className="mt-10 px-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black tracking-tight leading-none mb-1.5">Popular Restaurants</h2>
            <p className="text-[11px] text-gray-500 uppercase tracking-widest font-bold">Handpicked for your exquisite taste</p>
          </div>
          <span className="text-xs font-black text-red-500 uppercase tracking-wider flex items-center gap-0.5 cursor-pointer hover:text-red-400">
            See All <span className="text-sm leading-none">›</span>
          </span>
        </div>

        <div className="flex flex-col gap-6">
          {/* Card 1 */}
          <div className="bg-[#141414] rounded-3xl overflow-hidden border border-white/5 shadow-xl flex flex-col">
            <div className="w-full h-48 relative bg-gray-900">
              <img src="https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80" className="w-full h-full object-cover" alt="La Marée" />
              <div className="absolute top-3 left-3 bg-[#e23744] text-white text-[9px] font-black tracking-widest uppercase px-2 py-1 rounded shadow-md">
                Trending
              </div>
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white text-[11px] font-black px-2 py-1 rounded-lg flex items-center gap-0.5 shadow-md border border-white/5">
                <span>4.8</span> <Star size={10} fill="#f5c518" className="text-[#f5c518]" />
              </div>
            </div>
            <div className="p-5 flex flex-col gap-1.5">
              <div className="flex justify-between items-start">
                <h3 className="font-black text-lg text-white leading-tight">La Marée Fine Dining</h3>
                <span className="text-sm font-bold text-gray-300 shrink-0">₹2500 for two</span>
              </div>
              <p className="text-xs text-gray-400 font-medium">French, Continental, Seafood</p>
              <div className="flex items-center gap-4 text-[11px] text-gray-500 font-bold tracking-wide mt-2 border-t border-white/5 pt-3">
                <span className="flex items-center gap-1"><Clock size={12} /> 35-40 min</span>
                <span>• 2.4 km</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#141414] rounded-3xl overflow-hidden border border-white/5 shadow-xl flex flex-col">
            <div className="w-full h-48 relative bg-gray-900">
              <img src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80" className="w-full h-full object-cover" alt="Sakura" />
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white text-[11px] font-black px-2 py-1 rounded-lg flex items-center gap-0.5 shadow-md border border-white/5">
                <span>4.6</span> <Star size={10} fill="#f5c518" className="text-[#f5c518]" />
              </div>
            </div>
            <div className="p-5 flex flex-col gap-1.5">
              <div className="flex justify-between items-start">
                <h3 className="font-black text-lg text-white leading-tight">Sakura Teppanyaki</h3>
                <span className="text-sm font-bold text-gray-300 shrink-0">₹3200 for two</span>
              </div>
              <p className="text-xs text-gray-400 font-medium">Japanese, Sushi, Asian</p>
              <div className="flex items-center gap-4 text-[11px] text-gray-500 font-bold tracking-wide mt-2 border-t border-white/5 pt-3">
                <span className="flex items-center gap-1"><Clock size={12} /> 45-50 min</span>
                <span>• 4.1 km</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#141414] rounded-3xl overflow-hidden border border-white/5 shadow-xl flex flex-col">
            <div className="w-full h-48 relative bg-gray-900">
              <img src="https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=600&q=80" className="w-full h-full object-cover" alt="Bella Ciao" />
              <div className="absolute top-3 left-3 bg-amber-500/90 text-black text-[9px] font-black tracking-widest uppercase px-2 py-1 rounded shadow-md">
                Luxe Choice
              </div>
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white text-[11px] font-black px-2 py-1 rounded-lg flex items-center gap-0.5 shadow-md border border-white/5">
                <span>4.9</span> <Star size={10} fill="#f5c518" className="text-[#f5c518]" />
              </div>
            </div>
            <div className="p-5 flex flex-col gap-1.5">
              <div className="flex justify-between items-start">
                <h3 className="font-black text-lg text-white leading-tight">Bella Ciao Italian</h3>
                <span className="text-sm font-bold text-gray-300 shrink-0">₹1800 for two</span>
              </div>
              <p className="text-xs text-gray-400 font-medium">Italian, Wood-fired Pizza, Pasta</p>
              <div className="flex items-center gap-4 text-[11px] text-gray-500 font-bold tracking-wide mt-2 border-t border-white/5 pt-3">
                <span className="flex items-center gap-1"><Clock size={12} /> 25-30 min</span>
                <span>• 1.8 km</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- PREMIUM CORPORATE FOOTER --- */}
      <footer className="mt-20 bg-[#090909] border-t border-white/5 px-6 pt-12 pb-32">
        <div className="flex flex-col gap-2 mb-6">
          <span className="text-red-500 font-black tracking-tighter text-lg uppercase italic">ZOMATO LUXE</span>
          <p className="text-gray-500 text-xs leading-relaxed max-w-xs">
            Elevating your food experiences with premium curation and lightning-fast delivery.
          </p>
        </div>

        <div className="flex items-center gap-4 text-gray-400 border-b border-white/5 pb-8 mb-8">
          <ShieldCheck size={18} className="hover:text-white cursor-pointer" />
          <Volume2 size={18} className="hover:text-white cursor-pointer" />
          <MapPin size={18} className="hover:text-white cursor-pointer" />
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-black tracking-widest uppercase text-gray-500">Explore</span>
            <ul className="space-y-2 text-xs font-bold text-gray-400">
              <li className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate('/')}>Home</li>
              <li className="hover:text-white cursor-pointer transition-colors">Dining</li>
              <li className="hover:text-white cursor-pointer transition-colors">Delivery</li>
              <li className="hover:text-white cursor-pointer transition-colors" onClick={handleReelsClick}>Reels</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-black tracking-widest uppercase text-gray-500">Help</span>
            <ul className="space-y-2 text-xs font-bold text-gray-400">
              <li className="hover:text-white cursor-pointer transition-colors">Offers</li>
              <li className="hover:text-white cursor-pointer transition-colors">Privacy</li>
              <li className="hover:text-white cursor-pointer transition-colors">Terms</li>
            </ul>
          </div>

          <div className="col-span-2 flex flex-col gap-3 border-t border-white/5 pt-6">
            <span className="text-[10px] font-black tracking-widest uppercase text-gray-500">Join Us</span>
            <p className="text-xs text-gray-400 leading-relaxed mb-2">
              Become a Luxe Partner and reach thousands of urban diners.
            </p>
            <button 
              onClick={() => navigate('/food-partner/login')}
              className="w-full sm:w-fit bg-white/5 hover:bg-white/10 text-white font-bold text-xs py-3 px-6 rounded-xl border border-white/10 tracking-wider uppercase transition-all"
            >
              Partner with us
            </button>
          </div>
        </div>

        <div className="text-center text-[9px] font-bold tracking-widest uppercase text-gray-600 mt-12 pt-6 border-t border-white/5">
          © 2026 ZOMATO LUXE. CURATED DINING EXPERIENCES.
        </div>
      </footer>

      {/* --- STICKY BOTTOM NAVIGATION BAR (CENTERED REELS BUTTON) --- */}
      <div className="fixed bottom-4 left-0 w-full px-4 z-50">
        <div className="bg-[#1a1a1c] border border-white/10 rounded-[28px] p-2 flex justify-between items-center shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl max-w-md mx-auto relative">
            
            <div className="flex-1 flex flex-col items-center gap-1 cursor-pointer" onClick={() => navigate('/')}>
                <Home size={22} className="text-red-500" fill="currentColor" />
                <span className="text-[10px] font-bold text-white">Home</span>
            </div>

            {/* --- CENTERED REELS BUTTON (text-purple-600) --- */}
            <div 
                onClick={handleReelsClick}
                className="flex flex-col items-center gap-1 cursor-pointer active:scale-95 transition-transform"
            >
                <div className="p-3 rounded-full bg-white/5 border border-purple-600/30 shadow-[0_0_15px_rgba(147,51,234,0.15)]">
                  <Video size={24} className="text-purple-600" />
                </div>
                <span className="text-[10px] font-bold text-purple-600 tracking-wide">Food Reels</span>
            </div>

            <div className="flex-1 flex flex-col items-center gap-1 cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
                <Utensils size={22} />
                <span className="text-[10px] font-medium">Dining</span>
            </div>
        </div>
      </div>

      {/* --- MODALS SYSTEM --- */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setShowLoginModal(false)}>
            <div 
                className="bg-[#121212] border border-white/10 rounded-3xl p-6 w-full max-w-sm flex flex-col gap-4 relative overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                style={{ animation: 'modalPop 0.2s ease-out' }}
            >
                <div className="absolute top-0 right-0 p-4 cursor-pointer" onClick={() => setShowLoginModal(false)}>
                    <X size={20} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-black italic uppercase tracking-tighter text-white mb-2">Welcome to <span className="text-red-500">Zomato Luxe</span></h3>
                <p className="text-gray-400 text-xs mb-4">Log in or register to experience the new Food Reels feature.</p>

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

      {showReelsAuthWarning && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setShowReelsAuthWarning(false)}>
            <div 
                className="bg-[#121212] border border-green-500/30 rounded-3xl p-8 w-full max-w-sm flex flex-col items-center text-center relative overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                style={{ animation: 'modalPop 0.2s ease-out' }}
            >
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-4">
                    <Video size={28} className="text-[#d4ff00]" />
                </div>
                <h3 className="text-xl font-black uppercase text-white mb-2">Sign in Required</h3>
                <p className="text-gray-400 text-xs mb-6">Food Reels is an exclusive feature. Please sign in to watch or upload clips!</p>

                <button onClick={() => { setShowReelsAuthWarning(false); setShowLoginModal(true); }} className="w-full bg-[#d4ff00] text-black font-black uppercase tracking-widest text-xs py-4 rounded-2xl active:scale-95 transition-transform shadow-[0_0_20px_rgba(212,255,0,0.2)]">
                    Sign In Now
                </button>
            </div>
        </div>
      )}

      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setShowLogoutModal(false)}>
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'modalPop 0.25s cubic-bezier(0.34,1.56,0.64,1) forwards' }}
            className="bg-[#161616] border border-red-500/20 rounded-3xl p-6 w-[280px] text-center shadow-2xl"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 bg-red-500/10 border border-red-500/20">
                <LogOut size={24} className="text-red-400" />
            </div>
            <h4 className="text-white font-black tracking-widest uppercase text-xs mb-1">Log Out?</h4>
            <p className="text-gray-400 text-[11px] leading-relaxed mb-6">Do you want to log out of your Zomato Luxe profile?</p>
            
            <button 
              onClick={handleConfirmLogout}
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-black uppercase text-[11px] transition-transform active:scale-90 shadow-lg shadow-red-900/30"
              style={{ background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)' }}
            >
              Yes
            </button>
            <button onClick={() => setShowLogoutModal(false)} className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-gray-300 block mx-auto pt-2">
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
          .scrollbar-hide::-webkit-scrollbar {
              display: none;
          }
          .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
          }
      `}</style>
    </div>
  );
};

export default ZomatoHome;