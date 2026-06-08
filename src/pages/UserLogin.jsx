import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserLogin = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  
  // --- FORGOT PASSWORD STATES ---
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotStatus, setForgotStatus] = useState({ loading: false, message: "", type: "" });

  const handlesubmit = async (e) => {
    e.preventDefault(); 
    setErrorMessage(""); 
  
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post('http://localhost:3000/api/auth/user/login', {
        email: email,
        password: password
      }, {
        withCredentials: true
      });

      console.log("Login response:", response.data);
      
      // --- CRITICAL STEP 1 ADDITION ---
      // Save user role so the Zomato Home page knows they are logged in!
      localStorage.setItem('userRole', 'user');
      
      navigate('/'); 

    } catch (error) {
      console.error("Login failed:", error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "Invalid email or password");
      } else {
        setErrorMessage("Server error. Please make sure your backend is running.");
      }
    }
  };

  // --- FORGOT PASSWORD HANDLER ---
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotEmail) return;

    setForgotStatus({ loading: true, message: "", type: "" });

    try {
      await axios.post('http://localhost:3000/api/auth/user/forgot-password', { email: forgotEmail });
      
      setForgotStatus({ 
        loading: false, 
        message: "Reset link sent! Please check your email.", 
        type: "success" 
      });
      setForgotEmail(""); // Clear input on success
    } catch (error) {
      setForgotStatus({ 
        loading: false, 
        message: error.response?.data?.message || "Failed to send reset link. Try again.", 
        type: "error" 
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans px-6 flex items-center justify-center relative">
      
      {/* Reusable Animation Styles */}
      <style>
        {`
          @keyframes modalPop {
            from { opacity: 0; transform: scale(0.85); }
            to   { opacity: 1; transform: scale(1); }
          }
        `}
      </style>

      <div className="max-w-md w-full">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">
            Welcome <span className="text-purple-500">Back</span>
          </h1>
          <p className="text-gray-400 text-[10px] mt-2 uppercase tracking-[0.3em]">Log in to your profile</p>
        </header>

        {/* Glass Box Container */}
        <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/10 blur-[100px]"></div>
          
          <form onSubmit={handlesubmit} className="space-y-6 relative z-10">
            
            {/* Show error message if login fails */}
            {errorMessage && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-400 text-xs p-3 rounded-xl text-center">
                {errorMessage}
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold text-purple-400 uppercase mb-2 tracking-widest">Email Address</label>
              <input name='email' required
                type="email" 
                placeholder="Enter email" 
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all placeholder:text-gray-600" 
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-purple-400 uppercase mb-2 tracking-widest">Password</label>
              <input name='password' required
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all placeholder:text-gray-600" 
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-purple-600 text-white font-black py-4 rounded-2xl shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:bg-purple-500 active:scale-95 transition-all uppercase italic flex items-center justify-center gap-2"
            >
              Enter the Feed ⚡
            </button>

            <div className="flex flex-col gap-4 mt-6 items-center">
               <button 
                type="button"
                onClick={() => navigate('/user/register')} 
                className="text-[11px] text-gray-400 uppercase font-bold hover:text-white transition-colors tracking-widest"
              >
                Create New Account
              </button>
              
              {/* TRIGGER FORGOT PASSWORD MODAL */}
              <button 
                type="button" 
                onClick={() => setShowForgotModal(true)}
                className="text-[10px] text-purple-400/60 uppercase font-medium hover:text-purple-400 transition-colors"
              >
                Forgot Password?
              </button>
            </div>
          </form>
        </section>

        {/* Footer */}
        <footer className="flex justify-between items-center mt-12 opacity-30">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/20"></div>
          <p className="mx-4 text-[8px] font-bold uppercase tracking-[0.4em]">Secure Access</p>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/20"></div>
        </footer>
      </div>

      {/* --- FORGOT PASSWORD GLASS MODAL --- */}
      {showForgotModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" 
          onClick={() => { setShowForgotModal(false); setForgotStatus({ loading: false, message: "", type: "" }); setForgotEmail(""); }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'modalPop 0.25s cubic-bezier(0.34,1.56,0.64,1) forwards' }}
            className="bg-[#0a0a0c] border border-white/10 rounded-3xl p-8 w-full max-w-sm shadow-2xl relative overflow-hidden"
          >
            {/* Modal Glow Effect */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-600/20 blur-[80px]"></div>

            <h3 className="text-white font-black tracking-widest text-lg uppercase mb-2 relative z-10">Reset Password</h3>
            <p className="text-gray-400 text-xs mb-6 relative z-10 leading-relaxed">
              Enter your email address and we'll send you a link to get back into your account.
            </p>

            <form onSubmit={handleForgotPassword} className="relative z-10">
              {/* Status Message */}
              {forgotStatus.message && (
                <div className={`mb-4 text-xs p-3 rounded-xl text-center border ${forgotStatus.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                  {forgotStatus.message}
                </div>
              )}

              <div className="mb-6">
                <input 
                  type="email" 
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Enter your email address" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-purple-500 outline-none transition-all placeholder:text-gray-600" 
                />
              </div>

              <button 
                type="submit" 
                disabled={forgotStatus.loading}
                className="w-full bg-purple-600 text-white font-black py-3.5 rounded-xl shadow-lg active:scale-95 transition-all uppercase text-xs tracking-widest disabled:opacity-50 disabled:cursor-not-allowed mb-4"
              >
                {forgotStatus.loading ? "Sending..." : "Send Reset Link"}
              </button>

              <button 
                type="button" 
                onClick={() => { setShowForgotModal(false); setForgotStatus({ loading: false, message: "", type: "" }); setForgotEmail(""); }}
                className="w-full text-[10px] uppercase tracking-widest text-gray-500 hover:text-gray-300 active:scale-95 transition-colors"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default UserLogin;