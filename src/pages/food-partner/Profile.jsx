import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, MapPin, Target, Users, X, Play, Pause } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom'; 
import axios from 'axios'; 

const Profile = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 

    const [partner, setPartner] = useState(null);
    const [reels, setReels] = useState([]); 
    const [loading, setLoading] = useState(true);

    const [selectedReel, setSelectedReel] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const modalVideoRef = useRef(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`https://zomato-reels-backend-qn19.onrender.com/api/food-partner/${id}`, {
                    withCredentials: true
                });
                setPartner(response.data.foodPartner);
                setReels(response.data.reels);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching profile:", error);
                setLoading(false);
            }
        };

        if (id) fetchProfile();
    }, [id]);

    const togglePlayPause = () => {
        if (modalVideoRef.current) {
            if (isPlaying) {
                modalVideoRef.current.pause();
            } else {
                modalVideoRef.current.play().catch(err => console.log(err));
            }
            setIsPlaying(!isPlaying);
        }
    };

    if (loading) {
        return <div className="min-h-screen bg-[#050505] text-white flex justify-center items-center font-bold tracking-widest text-purple-500 animate-pulse">LOADING...</div>;
    }

    const partnerName = partner?.name || "Unknown Store"; 
    const partnerAddress = partner?.address || "Location not provided";
    const totalMeals = reels.length; 

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans pb-10 relative">
            <style>
                {`
                .ios-glass {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border: 1px solid rgba(168, 85, 247, 0.15);
                }
                @keyframes slideUp {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                `}
            </style>

            <div className="max-w-md mx-auto px-4 pt-8">
                
                {/* --- HEADER --- */}
                <div className="flex items-center justify-between mb-10">
                    <button onClick={() => navigate('/reels')} className="ios-glass flex items-center justify-center gap-2 text-white font-bold px-5 py-2.5 rounded-full uppercase tracking-wider text-[10px] active:scale-95 transition-transform">
                        <ArrowLeft size={14} /> Back to Feed
                    </button>
                    <div className="text-sm font-black tracking-widest uppercase italic text-purple-500">Profile</div>
                </div>

                {/* --- MAIN PROFILE INFO --- */}
                <div className="mb-10 px-1">
                    <div className="flex items-center justify-between mb-8">
                        
                        {/* Read-Only Profile Image or Initial Avatar */}
                        <div className="w-24 h-24 shrink-0 rounded-full bg-[#111] border border-purple-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.1)] uppercase overflow-hidden">
                            {partner?.profileImage ? (
                                <img src={partner.profileImage} alt="Store avatar" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-3xl font-black text-purple-400">{partnerName.charAt(0)}</span>
                            )}
                        </div>

                        <div className="flex flex-col items-end justify-center gap-2">
                            <div className="ios-glass px-4 py-2 rounded-lg w-fit">
                                <h1 className="text-sm font-black tracking-widest uppercase text-white text-right">{partnerName}</h1>
                            </div>
                            <div className="ios-glass px-4 py-2 rounded-lg flex items-center gap-2 w-fit">
                                <p className="text-[9px] uppercase tracking-wider text-gray-300 text-right">{partnerAddress}</p>
                                <MapPin size={10} className="text-purple-500 shrink-0" />
                            </div>
                        </div>
                    </div>

                    <div className="ios-glass rounded-2xl p-6">
                        <div className="grid grid-cols-2 divide-x divide-purple-500/20">
                            <div className="flex flex-col items-center justify-center gap-2">
                                <Target size={20} className="text-purple-400 opacity-80" />
                                <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">{totalMeals} Meals</span>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-2">
                                <Users size={20} className="text-purple-400 opacity-80" />
                                <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">Customer Serve</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- REELS GRID --- */}
                <div className="px-1">
                    <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4 pl-1">Store Food Reels</h2>
                    <div className="grid grid-cols-3 gap-1">
                        {reels.map((reel) => (
                            <div 
                                key={reel._id} 
                                onClick={() => { setSelectedReel(reel); setIsPlaying(true); }}
                                className="bg-[#1a1a1c] aspect-[9/16] relative cursor-pointer border border-white/5 rounded-sm overflow-hidden hover:scale-[0.98] transition-all duration-200"
                            >
                                <video src={reel.video} className="w-full h-full object-cover" muted preload="metadata" />
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                    <Play size={16} className="text-purple-400" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- FULL SCREEN REEL MODAL OVERLAY --- */}
            {selectedReel && (
                <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center" style={{ animation: 'slideUp 0.3s cubic-bezier(0.1, 0.76, 0.55, 0.94) forwards' }}>
                    <div className="relative w-full max-w-md h-full bg-black flex items-center justify-center">
                        <video ref={modalVideoRef} src={selectedReel.video} className="w-full h-full object-cover cursor-pointer" loop playsInline autoPlay onClick={togglePlayPause} />
                        {!isPlaying && (
                            <div onClick={togglePlayPause} className="absolute pointer-events-none bg-black/50 p-5 rounded-full backdrop-blur-md border border-white/10 z-30">
                                <Pause size={32} className="text-white" />
                            </div>
                        )}
                        <button onClick={() => setSelectedReel(null)} className="absolute top-6 left-4 z-50 bg-black/40 text-white p-3 rounded-full backdrop-blur-md border border-white/10 active:scale-90 transition-transform">
                            <X size={20} />
                        </button>
                        <div className="absolute bottom-0 left-0 w-full p-6 pb-12 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20">
                            <span className="text-purple-400 font-black text-xs uppercase tracking-widest italic block mb-1">{partnerName}</span>
                            <h3 className="text-white font-bold text-lg mb-2">{selectedReel.name || "Delicious Video"}</h3>
                            <p className="text-gray-300 text-xs line-clamp-3 leading-relaxed max-w-[85%]">{selectedReel.description || "Viewing food video presentation."}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;