import React, { useState } from 'react';
import { ArrowLeft, Video, Upload, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateFood = () => {
    const navigate = useNavigate();

    // --- FORM STATE ---
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [videoFile, setVideoFile] = useState(null);       // actual File object
    const [videoPreview, setVideoPreview] = useState(null); // local preview URL

    // --- UI STATE ---
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    // --- WHEN USER PICKS A VIDEO ---
    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideoFile(file);
            setVideoPreview(URL.createObjectURL(file));
        }
    };

    // --- UPLOAD HANDLER ---
    const handleUpload = async () => {
        if (!name || !description || !videoFile) {
            setError('Please fill all fields and select a video.');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('video', videoFile); 

            // Post request to backend matching your exact endpoint schema
            const response = await axios.post('http://localhost:3000/api/food/', formData, {
                withCredentials: true, 
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSuccess(true);
            setLoading(false);

            // Redirect back to the dynamic partner portal dashboard using backend response identity
            const partnerId = response.data?.foodItem?.foodPartner || response.data?.foodPartner;

            setTimeout(() => {
                if (partnerId) {
                    navigate(`/food-partner/${partnerId}`);
                } else {
                    navigate(-1); // Fallback to previous window if id parsing is complex
                }
            }, 2000);

        } catch (err) {
            console.error('Upload failed:', err);
            setError(err.response?.data?.message || 'Upload failed. Please try again.');
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center gap-4">
                <CheckCircle size={56} className="text-[#d4ff00]" />
                <p className="text-white font-black tracking-widest uppercase text-sm">Uploaded!</p>
                <p className="text-gray-500 text-xs tracking-wider">Redirecting to dashboard...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans pb-24">
            <style>{`
                .glass {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border: 1px solid rgba(212, 255, 0, 0.15);
                }
            `}</style>

            <div className="max-w-md mx-auto px-4 pt-8">

                {/* --- HEADER --- */}
                <div className="flex items-center gap-4 mb-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="glass p-3 rounded-full text-gray-400 hover:text-white active:scale-95 transition-all"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <h1 className="text-sm font-black tracking-widest uppercase italic text-[#d4ff00]">
                        Upload Reel
                    </h1>
                </div>

                {/* --- VIDEO PICKER --- */}
                <div className="mb-6">
                    <label
                        htmlFor="video-input"
                        className="glass rounded-2xl w-full aspect-[9/16] max-h-72 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[#d4ff00]/40 transition-all overflow-hidden block"
                    >
                        {videoPreview ? (
                            <video
                                src={videoPreview}
                                className="w-full h-full object-cover"
                                autoPlay
                                muted
                                loop
                            />
                        ) : (
                            <>
                                <Video size={32} className="text-[#d4ff00] opacity-60" />
                                <p className="text-[10px] uppercase tracking-widest text-gray-500">
                                    Tap to select video
                                </p>
                            </>
                        )}
                    </label>
                    <input
                        id="video-input"
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={handleVideoChange}
                    />
                </div>

                {/* --- DISH NAME INPUT --- */}
                <div className="mb-4">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 block pl-1">
                        Dish Name
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. Butter Chicken"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="glass w-full rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#d4ff00]/40 transition-all"
                    />
                </div>

                {/* --- DESCRIPTION INPUT --- */}
                <div className="mb-6">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 block pl-1">
                        Description
                    </label>
                    <textarea
                        placeholder="Tell people about this dish..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="glass w-full rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-[#d4ff00]/40 transition-all resize-none"
                    />
                </div>

                {/* --- ERROR MESSAGE --- */}
                {error && (
                    <p className="text-red-400 text-[11px] tracking-wide mb-4 pl-1">{error}</p>
                )}

                {/* --- UPLOAD BUTTON --- */}
                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="w-full bg-[#d4ff00] text-black font-black uppercase tracking-widest text-sm py-4 rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(212,255,0,0.3)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <span className="animate-pulse">Uploading...</span>
                    ) : (
                        <>
                            <Upload size={18} strokeWidth={3} />
                            Upload Reel
                        </>
                    )}
                </button>

            </div>
        </div>
    );
};

export default CreateFood;