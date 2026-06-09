import React, { useState, useEffect, useRef } from 'react';
import { Power, Plus, MapPin, Target, Users, X, Play, Pause, Upload, Camera, Trash2 } from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom'; 
import axios from 'axios'; 

const PartnerDashboard = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [partner, setPartner] = useState(null);
    const [reels, setReels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    
    // --- PHOTO UPLOAD STATES ---
    const [showPhotoModal, setShowPhotoModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const fileInputRef = useRef(null);

    // --- REELS PREVIEW STATES ---
    const [selectedReel, setSelectedReel] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [reelToDelete, setReelToDelete] = useState(null);
    const modalVideoRef = useRef(null);

    const fetchDashboard = async () => {
        try {
            const response = await axios.get(`https://zomato-reels-backend-qn19.onrender.com/api/food-partner/${id}`, {
                withCredentials: true
            });
            setPartner(response.data.foodPartner);
            setReels(response.data.reels);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching dashboard:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchDashboard();
    }, [id]);

    // --- REEL DELETE HANDLER ---
    const handleDeleteClick = (e, reelId) => {
        e.stopPropagation();
        setReelToDelete(reelId);
        setShowDeleteModal(true);
    };

    const confirmDeleteReel = async () => {
        try {
            await axios.delete(
                `https://zomato-reels-backend-qn19.onrender.com/api/food/${reelToDelete}`,
                {
                    withCredentials: true
                }
            );

            setReels(prev =>
                prev.filter(reel => reel._id !== reelToDelete)
            );

            setShowDeleteModal(false);
            setReelToDelete(null);

        } catch (error) {
            console.error("Failed to delete reel:", error);

            alert(
                error.response?.data?.message ||
                "Could not delete reel. Please try again."
            );

            setShowDeleteModal(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleUploadPhoto = async () => {
        if (!selectedFile) return;
        setUploadingPhoto(true);
        try {
            const formData = new FormData();
            formData.append('profileImage', selectedFile);

            await axios.put(`https://zomato-reels-backend-qn19.onrender.com/api/food-partner/update-image/${id}`, formData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setUploadingPhoto(false);
            setShowPhotoModal(false);
            setSelectedFile(null);
            setImagePreview(null);
            fetchDashboard(); 
        } catch (error) {
            console.error("Failed to upload image:", error);
            setUploadingPhoto(false);
        }
    };

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

    // --- PROPER LOGOUT HANDLER ---
    const handleConfirmLogout = async () => {
        try {
            // 1. Tell backend to clear the secure cookie
            await axios.get('https://zomato-reels-backend-qn19.onrender.com/api/auth/food-partner/logout', {
                withCredentials: true
            });
        } catch (error) {
            console.error("Logout request failed:", error);
        }

        // 2. Clear Zomato Home local storage flags
        localStorage.removeItem('userRole');
        localStorage.removeItem('partnerId');

        // 3. Redirect back to login
        navigate('/food-partner/login');
    };

    if (loading) {
        return <div className="min-h-screen bg-[#050505] text-white flex justify-center items-center font-bold tracking-widest text-purple-600 animate-pulse">LOADING KITCHEN...</div>;
    }

    const partnerName = partner?.name || "My Kitchen"; 
    const partnerAddress = partner?.address || "Location not provided";
    const totalMeals = reels.length;

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans pb-24 relative">
            <style>
                {`
                .ios-glass {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border: 1px solid rgba(147, 51, 234, 0.15);
                }
                @keyframes modalPop {
                    from { opacity: 0; transform: scale(0.85); }
                    to   { opacity: 1; transform: scale(1); }
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
                    <div className="text-sm font-black tracking-widest uppercase italic text-purple-600">Dashboard</div>
                    <button onClick={() => setShowLogoutModal(true)} className="ios-glass p-3 rounded-full text-red-400 hover:text-red-300 active:scale-95 transition-all">
                        <Power size={18} />
                    </button>
                </div>

                {/* --- MAIN PROFILE INFO --- */}
                <div className="mb-10 px-1">
                    <div className="flex items-center justify-between mb-8">
                        <div 
                            onClick={() => setShowPhotoModal(true)}
                            className="w-24 h-24 shrink-0 rounded-full bg-[#111] border border-purple-600/30 flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.1)] relative cursor-pointer group overflow-hidden"
                        >
                            {partner?.profileImage ? (
                                <img src={partner.profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
                            ) : (
                                <span className="text-3xl font-black text-purple-600 uppercase">{partnerName.charAt(0)}</span>
                            )}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <Camera size={18} className="text-purple-600" />
                            </div>
                        </div>

                        <div className="flex flex-col items-end justify-center gap-2">
                            <div className="ios-glass px-4 py-2 rounded-lg w-fit">
                                <h1 className="text-sm font-black tracking-widest uppercase text-white text-right">{partnerName}</h1>
                            </div>
                            <div className="ios-glass px-4 py-2 rounded-lg flex items-center gap-2 w-fit">
                                <p className="text-[9px] uppercase tracking-wider text-gray-300 text-right">{partnerAddress}</p>
                                <MapPin size={10} className="text-purple-600 shrink-0" />
                            </div>
                        </div>
                    </div>

                    <div className="ios-glass rounded-2xl p-6">
                        <div className="grid grid-cols-2 divide-x divide-purple-600/20">
                            <div className="flex flex-col items-center justify-center gap-2">
                                <Target size={20} className="text-purple-600 opacity-80" />
                                <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">{totalMeals} Uploads</span>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-2">
                                <Users size={20} className="text-purple-600 opacity-80" />
                                <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">Manage Store</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- REELS GRID --- */}
                <div className="px-1">
                    <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4 pl-1">Your Uploaded Reels</h2>
                    <div className="grid grid-cols-3 gap-1">
                        {reels.map((reel) => (
                            <div 
                                key={reel._id} 
                                onClick={() => { setSelectedReel(reel); setIsPlaying(true); }}
                                className="bg-[#1a1a1c] aspect-[9/16] relative cursor-pointer border border-white/5 rounded-sm overflow-hidden group hover:scale-[0.98] transition-all duration-200"
                            >
                                <video src={reel.video} className="w-full h-full object-cover" muted preload="metadata" />
                                
                                {/* INTERACTIVE ABSOLUTE TRASH BUTTON CONTAINER */}
                                <div className="absolute top-1.5 right-1.5 z-30">
                                    <button
                                        onClick={(e) => handleDeleteClick(e, reel._id)}
                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500/90 text-white hover:bg-red-600 active:scale-90 transition-all shadow-lg"
                                        title="Delete Reel"
                                    >
                                        <Trash2 size={13} />
                                    </button>
                                </div>

                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    <Play size={16} className="text-purple-600" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- FLOATING ACTION BUTTON (UPLOAD) --- */}
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
                <Link to="/create-food">
                    <button className="bg-purple-600 text-white p-4 rounded-full shadow-[0_0_30px_rgba(147,51,234,0.4)] hover:scale-110 active:scale-95 transition-all">
                        <Plus size={28} strokeWidth={3} />
                    </button>
                </Link>
            </div>

            {/* --- FULL SCREEN PROFILE IMAGE GLASS UPLOAD MODAL --- */}
            {showPhotoModal && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => { setShowPhotoModal(false); setImagePreview(null); setSelectedFile(null); }}>
                    <div 
                        onClick={(e) => e.stopPropagation()}
                        style={{ animation: 'modalPop 0.25s cubic-bezier(0.34,1.56,0.64,1) forwards' }}
                        className="ios-glass rounded-3xl p-6 flex flex-col items-center w-full max-w-xs text-center border border-purple-600/20"
                    >
                        <h3 className="text-white font-black tracking-widest text-xs uppercase mb-6">Update Your Profile</h3>
                        
                        <div 
                            onClick={() => fileInputRef.current.click()}
                            className="w-28 h-28 rounded-full bg-white/5 border-2 border-dashed border-purple-600/30 flex items-center justify-center relative cursor-pointer overflow-hidden mb-6 group hover:border-purple-600/60 transition-colors"
                        >
                            {imagePreview ? (
                                <img src={imagePreview} alt="Staging Preview" className="w-full h-full object-cover" />
                            ) : partner?.profileImage ? (
                                <img src={partner.profileImage} alt="Current profile" className="w-full h-full object-cover" />
                            ) : (
                                <Camera size={28} className="text-gray-500 group-hover:text-purple-600 transition-colors" />
                            )}
                        </div>

                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

                        {!selectedFile ? (
                            <button 
                                onClick={() => fileInputRef.current.click()}
                                className="ios-glass flex items-center justify-center gap-2 text-purple-600 border border-purple-600/20 font-bold uppercase tracking-widest text-[10px] px-6 py-3 rounded-xl w-full hover:bg-purple-600/10 active:scale-95 transition-all mb-4"
                            >
                                <Upload size={14} strokeWidth={2.5} />
                                Choose Photo
                            </button>
                        ) : (
                            <button 
                                onClick={handleUploadPhoto}
                                disabled={uploadingPhoto}
                                className="w-full bg-purple-600 text-white font-black uppercase tracking-widest text-xs py-3.5 rounded-xl shadow-[0_0_20px_rgba(147,51,234,0.2)] active:scale-95 transition-all mb-4 disabled:opacity-50"
                            >
                                {uploadingPhoto ? "Saving Picture..." : "Upload Profile Image"}
                            </button>
                        )}

                        <button 
                            onClick={() => { setShowPhotoModal(false); setImagePreview(null); setSelectedFile(null); }}
                            className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-gray-300 active:scale-95 transition-colors pt-2 block mx-auto"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

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
                            <span className="text-purple-600 font-black text-xs uppercase tracking-widest italic block mb-1">{partnerName}</span>
                            <h3 className="text-white font-bold text-lg mb-2">{selectedReel.name || "Delicious Display"}</h3>
                            <p className="text-gray-300 text-xs line-clamp-3 leading-relaxed max-w-[85%]">{selectedReel.description || "Previewing live store reel upload content."}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* --- DELETE REEL MODAL --- */}
            {showDeleteModal && (
                <div
                    className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 backdrop-blur-sm"
                    onClick={() => setShowDeleteModal(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            animation: 'modalPop 0.25s cubic-bezier(0.34,1.56,0.64,1) forwards'
                        }}
                        className="ios-glass rounded-3xl p-6 w-[320px] text-center border border-red-500/20"
                    >
                        <div className="flex justify-center mb-4">
                            <div className="w-14 h-14 rounded-full bg-red-500/20 flex items-center justify-center">
                                <Trash2 size={24} className="text-red-400" />
                            </div>
                        </div>

                        <h2 className="text-white text-lg font-bold mb-2">
                            Delete Reel?
                        </h2>

                        <p className="text-gray-400 text-sm mb-6">
                            This action cannot be undone.
                        </p>

                        <div className="flex justify-center gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-5 py-2 rounded-xl bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={confirmDeleteReel}
                                className="px-5 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- iOS LOGOUT MODAL --- */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }} onClick={() => setShowLogoutModal(false)}>
                    <div onClick={(e) => e.stopPropagation()} style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)', border: '1px solid rgba(147, 51, 234, 0.18)', boxShadow: '0 8px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)', animation: 'modalPop 0.25s cubic-bezier(0.34,1.56,0.64,1) forwards' }} className="rounded-3xl px-8 py-10 flex flex-col items-center gap-7 w-[280px]">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)' }}><Power size={24} className="text-red-400" /></div>
                        <div className="text-center flex flex-col gap-2">
                            <p className="text-white font-black tracking-widest uppercase text-xs">Log Out?</p>
                            <p className="text-gray-400 text-[11px] tracking-wide leading-relaxed">Do you want to logout of your Partner Portal?</p>
                        </div>
                        {/* 🌟 FIXED: NOW CALLS handleConfirmLogout TO CLEAR COOKIES 🌟 */}
                        <button onClick={handleConfirmLogout} className="w-16 h-16 rounded-full flex items-center justify-center active:scale-90 transition-transform" style={{ background: 'linear-gradient(135deg, #ff4d4d 0%, #c0392b 100%)', boxShadow: '0 0 24px rgba(239,68,68,0.45)' }}><span className="text-white font-black tracking-widest text-[11px] uppercase">Yes</span></button>
                        <button onClick={() => setShowLogoutModal(false)} className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-gray-300 transition-colors">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PartnerDashboard;