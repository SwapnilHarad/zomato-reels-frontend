import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const PartnerLogin = () => {
  const navigate = useNavigate();
  // State to show error messages if login fails
  const [errorMessage, setErrorMessage] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault(); 
    setErrorMessage(""); // Clear old errors

    const email = e.target.email.value;
    const password = e.target.password.value; 

    try {
      const response = await axios.post('https://zomato-reels-backend-qn19.onrender.com/api/auth/food-partner/login', {
        email: email,
        password: password
      }, {
        withCredentials: true
      });

      console.log("Login Success:", response.data);

      const partnerData = response.data.foodPartner || response.data.partner || response.data.user || response.data;
      const partnerId = partnerData._id;

      if (partnerId) {
        // --- CRITICAL STEP 1 ADDITION ---
        // Save partner role and ID for the Zomato Home page routing!
        localStorage.setItem('userRole', 'partner');
        localStorage.setItem('partnerId', partnerId);
        
        navigate(`/food-partner/dashboard/${partnerId}`); 
      } else {
        console.warn("Could not find ID in response, sending to default route.");
        navigate('/create-food'); 
      }

    } catch (error) {
      console.error("Login failed:", error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "Invalid email or password");
      } else {
        setErrorMessage("Server error. Please ensure backend is running.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        
        {/* Header */}
        <header className="text-center mb-8">
          <div className="inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-[0.2em] text-purple-600 border rounded-full bg-[#d4ff00]/5 uppercase">
            Partner Portal v2.0
          </div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter leading-none">
            Resume Your <span className=" text-purple-600">Growth</span>
          </h1>
          <p className="text-gray-500 text-[10px] mt-2 uppercase tracking-[0.3em]">Secure Partner Login</p>
        </header>

        {/* Glass Form Container */}
        <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle lime glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#d4ff00]/5 blur-[100px]"></div>
          
          <form onSubmit={handlesubmit} className="space-y-6 relative z-10">
            
            {/* Display Errors to the User */}
            {errorMessage && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-400 text-xs p-3 rounded-xl text-center font-bold">
                {errorMessage}
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold  text-purple-600 uppercase mb-2 tracking-widest">Partner Email</label>
              <input 
                name="email" required
                type="email" 
                placeholder="partner@domain.com" 
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-sm focus:border-[#a8a4aa] focus:ring-1 outline-none transition-all placeholder:text-gray-700" 
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-purple-600 uppercase mb-2 tracking-widest">Secure Password</label>
              <input name='password' required
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-sm focus:border-[#e1e3d9] focus:ring-1 outline-none transition-all placeholder:text-gray-700" 
              />
            </div>

            {/* Neon Lime Action Button */}
            <button 
              type="submit" 
              className="w-full bg-purple-600 text-whitefont-black py-4 rounded-2xl shadow-[0_0_20px_rgba(212,255,0,0.2)] hover:bg-[#e6ff66] hover:-translate-y-1 active:translate-y-0 transition-all uppercase italic flex items-center justify-center gap-2"
            >
              Access Dashboard ⚡
            </button>

            <div className="flex flex-col gap-4 mt-6 items-center">
               <button 
                type="button"
                onClick={() => navigate(`/food-partner/register`)} 
                className="text-[11px] text-gray-400 uppercase font-bold hover:text-[#d4ff00] transition-colors tracking-widest"
              >
                Register New Kitchen
              </button>
              <Link to="/user/login" className="text-[10px] text-purple-400 uppercase font-medium hover:text-purple-300 transition-colors">
                Switch to User Login
              </Link>
            </div>
          </form>
        </section>

        {/* Minimal Footer */}
        <footer className="mt-12 text-center">
          <p className="text-[8px] text-gray-600 font-bold uppercase tracking-[0.5em] opacity-50">
            Powered by Kinetic Grid
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PartnerLogin;