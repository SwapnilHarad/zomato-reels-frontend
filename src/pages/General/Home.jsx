import React, { useEffect, useRef, useState } from 'react';
import { Store, Heart, MessageCircle, Share2, Volume2, VolumeX, X, Send, Copy, Check, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const ReelsFeed = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [isMuted, setIsMuted] = useState(true); 
  const videoRefs = useRef(new Map());
  const containerRef = useRef(null);

  // --- NEW INTERACTIVE STATES ---
  const [likedVideos, setLikedVideos] = useState(new Set());
  const [activeCommentsVideo, setActiveCommentsVideo] = useState(null);
  const [commentsData, setCommentsData] = useState({}); 
  const [newComment, setNewComment] = useState('');
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  // --- AUTOPLAY LOGIC WITH DYNAMIC MUTING ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          
          if (entry.isIntersecting) {
            videoRefs.current.forEach((otherVideo) => {
              if (otherVideo && otherVideo !== video) {
                otherVideo.pause();
                otherVideo.currentTime = 0; 
              }
            });

            video.muted = isMuted;
            video.play().catch((err) => console.log("Autoplay blocked:", err));
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.6 }
    );

    videoRefs.current.forEach((vid) => {
      if (vid) observer.observe(vid);
    });

    return () => observer.disconnect();
  }, [videos, isMuted]);

  // --- GLOBAL AUDIO TOGGLE ---
  const handleVideoClick = () => {
    const nextMuteState = !isMuted;
    setIsMuted(nextMuteState);
    videoRefs.current.forEach((video) => {
      if (video) video.muted = nextMuteState;
    });
  };

  // --- FETCHING DATA ---
  useEffect(() => {
    axios.get('https://zomato-reels-backend-qn19.onrender.com/api/food',{withCredentials: true})
      .then(response => {
        setVideos(response.data.foodItems || response.data);
      })
      .catch(error => {
        console.error("Error fetching videos:", error);
        if (error.response && error.response.status === 401) {
          navigate('/user/login');
        }
      });
  }, [navigate]);

  const setVideoRef = (id) => (el) => {
    if (el) videoRefs.current.set(id, el);
    else videoRefs.current.delete(id);
  };

  // --- LIKE TOGGLE HANDLER ---
  const toggleLike = (id) => {
    const newLikes = new Set(likedVideos);
    if (newLikes.has(id)) {
      newLikes.delete(id);
    } else {
      newLikes.add(id);
    }
    setLikedVideos(newLikes);
  };

  // --- COMMENT HANDLER ---
  const handleAddComment = (videoId) => {
    if (!newComment.trim()) return;
    const currentComments = commentsData[videoId] || ["Amazing dish!", "Wow, looks delicious 🔥", "Where is this located?"];
    setCommentsData({
      ...commentsData,
      [videoId]: [...currentComments, newComment]
    });
    setNewComment('');
  };

  // --- SHARE LINK POPUP GENERATOR ---
  const triggerShare = (videoId) => {
    const customGeneratedUrl = `${window.location.origin}/food-partner/profile/${videoId}`;
    setShareUrl(customGeneratedUrl);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div ref={containerRef} className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black relative">
      
      <style>
        {`
          @keyframes shimmer {
            0% { transform: translateX(-150%) skewX(-20deg); }
            100% { transform: translateX(150%) skewX(-20deg); }
          }
          .ios-glass {
            position: relative;
            overflow: hidden;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(168, 85, 247, 0.4);
          }
          .ios-glass::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 50%;
            height: 100%;
            background: linear-gradient(to right, transparent, rgba(168, 85, 247, 0.2), rgba(255, 255, 255, 0.3), transparent);
            animation: shimmer 3s infinite;
          }
          @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
          @keyframes scaleUp {
            from { transform: scale(0.9) translateY(20px); opacity: 0; }
            to { transform: scale(1) translateY(0); opacity: 1; }
          }
          .comment-sheet {
            animation: slideUp 0.3s cubic-bezier(0.1, 0.76, 0.55, 0.94) forwards;
          }
          .share-modal {
            animation: scaleUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
        `}
      </style>

      {/* --- PERSISTENT FLOATING BACK BUTTON --- */}
      <div className="fixed top-6 left-4 z-40">
        <button
          onClick={() => navigate('/')} 
          className="bg-black/40 text-white p-3 rounded-full backdrop-blur-md border border-white/10 active:scale-90 transition-transform shadow-lg"
          title="Back to Home"
        >
          <ArrowLeft size={18} />
        </button>
      </div>

      {/* RENDER VIDEOS */}
      {videos && videos.map((video) => {
        const isCurrentlyLiked = likedVideos.has(video._id);
        const totalCommentsCount = (commentsData[video._id] || ["1", "2", "3"]).length;

        return (
          <div key={video._id} className="relative h-screen w-full snap-start flex items-center justify-center">
            
            <video 
              ref={setVideoRef(video._id)}
              className="h-full w-full object-cover cursor-pointer"
              src={video.url || video.video} 
              loop 
              playsInline 
              preload='metadata'
              onClick={handleVideoClick}
            />

            {/* FLOATING MUTE STATUS ICON OVERLAY */}
            <div 
              onClick={handleVideoClick}
              className="absolute top-6 right-4 z-30 bg-black/40 text-white p-3 rounded-full backdrop-blur-md border border-white/10 cursor-pointer active:scale-90 transition-transform"
            >
              {isMuted ? <VolumeX size={18} className="text-red-400" /> : <Volume2 size={18} className="text-[#d4ff00]" />}
            </div>

            {/* RIGHT SIDE ICONS */}
            <div className="absolute right-4 bottom-32 flex flex-col gap-6 text-white items-center z-20">
               {/* LIKE BUTTON */}
               <div onClick={() => toggleLike(video._id)} className="flex flex-col items-center gap-1 cursor-pointer group">
                  <div className={`p-3 rounded-full backdrop-blur-md border transition-all active:scale-75 ${isCurrentlyLiked ? 'bg-pink-600/30 border-pink-500 text-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.5)]' : 'bg-white/10 border-white/20'}`}>
                      <Heart size={24} fill={isCurrentlyLiked ? "currentColor" : "none"} />
                  </div>
                  <span className={`text-[10px] font-bold ${isCurrentlyLiked ? 'text-pink-400' : ''}`}>
                    1.2k
                  </span>
               </div>

               {/* COMMENT OPEN TRIGGER */}
               <div onClick={() => setActiveCommentsVideo(video)} className="flex flex-col items-center gap-1 cursor-pointer">
                  <div className="bg-white/10 p-3 rounded-full backdrop-blur-md border border-white/20 active:scale-90 transition-all">
                      <MessageCircle size={24} />
                  </div>
                  <span className="text-[10px] font-bold">{totalCommentsCount}</span>
               </div>

               {/* SHARE LINK TRIGGER */}
               <div onClick={() => triggerShare(video._id)} className="flex flex-col items-center gap-1 cursor-pointer">
                  <div className="bg-white/10 p-3 rounded-full backdrop-blur-md border border-white/20 active:scale-90 transition-all">
                      <Share2 size={24} />
                  </div>
                  <span className="text-[10px] font-bold">Share</span>
               </div>
            </div>

            {/* BOTTOM OVERLAY */}
            <div className="absolute bottom-0 left-0 w-full p-6 pb-10 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10">
              <h3 className="text-white font-black italic uppercase tracking-tighter text-xl mb-1 drop-shadow-lg">
                {video.foodPartner?.name || "Store Name"}
              </h3>

              <p className="text-gray-200 text-sm mb-6 line-clamp-2 max-w-[75%] leading-snug drop-shadow-md">
                {video.description || "No description available."}
              </p>

              <div className="flex justify-center w-full pr-8"> 
                  <Link to={"/food-partner/profile/" + (video.foodPartner?._id || video.foodPartner)}>
                    <button className="ios-glass flex items-center justify-center gap-2 text-white font-black px-12 py-4 rounded-2xl uppercase italic text-sm shadow-[0_0_25px_rgba(168,85,247,0.2)] transition-all active:scale-95">
                      <Store size={18} className="text-purple-400" />
                      Visit Store
                    </button>
                  </Link>
              </div>
            </div>
          </div>
        );
      })}

      {/* --- SLIDE-UP GLASS INTERACTIVE COMMENT SHEET --- */}
      {activeCommentsVideo && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end justify-center" onClick={() => setActiveCommentsVideo(null)}>
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="comment-sheet w-full max-w-md h-[55vh] rounded-t-3xl border-t border-white/10 p-6 flex flex-col justify-between"
            style={{ background: 'rgba(15, 15, 17, 0.85)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)' }}
          >
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <span className="text-xs uppercase font-black tracking-widest text-[#d4ff00]">Comments</span>
              <button onClick={() => setActiveCommentsVideo(null)} className="text-gray-400 hover:text-white p-1 bg-white/5 rounded-full"><X size={16} /></button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
              {(commentsData[activeCommentsVideo._id] || ["Amazing dish!", "Wow, looks delicious 🔥", "Where is this located?"]).map((msg, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-7 h-7 rounded-full bg-white/10 border border-white/10 shrink-0 text-[10px] font-black flex items-center justify-center text-purple-400 uppercase">U</div>
                  <div className="bg-white/5 border border-white/5 px-4 py-2.5 rounded-2xl rounded-tl-none max-w-[85%]">
                    <p className="text-xs text-gray-200 leading-relaxed">{msg}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 items-center pt-2">
              <input 
                type="text" 
                placeholder="Add a dynamic comment..." 
                value={newComment} 
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => { if(e.key === 'Enter') handleAddComment(activeCommentsVideo._id); }}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#d4ff00]/30 transition-all"
              />
              <button 
                onClick={() => handleAddComment(activeCommentsVideo._id)}
                className="bg-[#d4ff00] text-black p-3 rounded-xl hover:scale-105 active:scale-95 transition-all"
              >
                <Send size={14} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- CENTER POP-UP GLASS SHARE MODAL --- */}
      {shareUrl && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={() => setShareUrl('')}>
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="share-modal w-[310px] rounded-3xl border border-white/10 p-6 flex flex-col items-center text-center gap-4 shadow-2xl"
            style={{ background: 'rgba(20, 20, 22, 0.75)', backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)' }}
          >
            <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Share2 size={20} />
            </div>
            
            <div>
              <h4 className="text-white font-black tracking-widest text-xs uppercase mb-1">Generate Link</h4>
              <p className="text-[11px] text-gray-400 leading-normal">Copy this profile location string to share this reel item anywhere.</p>
            </div>

            <div className="w-full flex items-center gap-1.5 bg-black/40 border border-white/5 rounded-xl p-2 pl-3">
              <span className="text-[10px] text-gray-400 truncate flex-1 text-left select-all">{shareUrl}</span>
              <button 
                onClick={copyToClipboard}
                className={`p-2.5 rounded-lg transition-all ${copied ? 'bg-emerald-500 text-black' : 'bg-white/5 text-gray-300 hover:text-white'}`}
              >
                {copied ? <Check size={14} strokeWidth={3} /> : <Copy size={14} />}
              </button>
            </div>

            <button onClick={() => setShareUrl('')} className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-gray-300 transition-colors pt-1">
              Close Preview
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default ReelsFeed;