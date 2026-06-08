import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const PartnerRegister = () => {
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();

    // 1. Collect data from the form
    const name = e.target.businessName.value;
    const contactName = e.target.contactName.value; // Now this will find the input below
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;

    try {
      // 2. The axios call
      const response = await axios.post('https://zomato-reels-backend-qn19.onrender.com/api/auth/food-partner/register', {
        name,
        contactName,
        phone,
        email,
        password,
        address
      }, {
        withCredentials: true,
      });

      console.log("Success:", response.data);
      // 3. Navigate after success
      navigate('/create-food'); 
      
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Something went wrong during registration. Check if all fields are filled.");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30">
      <div className="max-w-md mx-auto px-6 py-10">
        
        {/* Header Section */}
        <header className="text-center mb-8">
          <div className="inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-[0.2em] text-purple-400 border border-purple-400/30 rounded-full bg-purple-400/5 uppercase">
            Partner Network V2.0
          </div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter leading-none mb-4">
            Scale Your <span className="text-purple-500">Gastronomy</span> <br/> 
            <span className="text-white">at Neon Velocity</span>
          </h1>
        </header>

        {/* Switcher */}
        <div className="flex justify-center items-center gap-2 mb-8 text-[11px] uppercase tracking-widest font-bold">
          <span className="text-gray-600">Switch:</span>
          <Link to="/user/register" className="text-gray-500 hover:text-purple-400 transition-colors">User</Link>
          <span className="text-gray-800">·</span>
          <span className="text-purple-500 border-b border-purple-500 pb-0.5">Food partner</span>
        </div>

        <section className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/10 blur-[100px]"></div>
          
          <h2 className="text-xl font-bold uppercase mb-8 border-b-2 border-purple-600 inline-block pb-1 relative z-10">
            Onboarding
          </h2>
          
          <form onSubmit={handlesubmit} className="space-y-5 relative z-10">
            {/* Business Name */}
            <div>
              <label className="block text-[10px] font-bold text-purple-400 uppercase mb-2 tracking-widest">Business Name</label>
              <input name='businessName' required type="text" placeholder="e.g. Neon Sushi Lab" className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm focus:border-purple-500 outline-none transition-all" />
            </div>

            {/* ADDED: Contact Name (Required by your Mongoose model) */}
            <div>
              <label className="block text-[10px] font-bold text-purple-400 uppercase mb-2 tracking-widest">Contact Name</label>
              <input name='contactName' required type="text" placeholder="Your Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm focus:border-purple-500 outline-none transition-all" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-bold text-purple-400 uppercase mb-2 tracking-widest">Phone</label>
                <input name='phone' required type="tel" placeholder="+91 00000-00000" className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm focus:border-purple-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-purple-400 uppercase mb-2 tracking-widest">Email</label>
                <input name='email' required type="email" placeholder="partner@domain.com" className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm focus:border-purple-500 outline-none transition-all" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[10px] font-bold text-purple-400 uppercase mb-2 tracking-widest">Secure Password</label>
              <input name='password' required type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm focus:border-purple-500 outline-none transition-all" />
            </div>

            {/* Address */}
            <div>
              <label className="block text-[10px] font-bold text-purple-400 uppercase mb-2 tracking-widest">Business Address</label>
              <div className="relative">
                <input name='address' required type="text" placeholder="Street, City, ZIP" className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm focus:border-purple-500 outline-none transition-all" />
                <button type="button" className="absolute right-3 top-3.5 text-[9px] text-purple-400 font-bold bg-purple-400/10 px-2 py-1 rounded hover:bg-purple-400/20 transition-colors">AUTO-DETECT</button>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-purple-600 text-white font-black py-4 rounded-2xl mt-4 shadow-[0_0_20px_rgba(147,51,234,0.2)] hover:bg-purple-500 hover:-translate-y-1 active:translate-y-0 transition-all uppercase italic">
              Create Partner Account ⚡
            </button>

            <p className="text-center text-[11px] text-gray-500 uppercase mt-4">
              Already a partner? 
              <button type="button" onClick={() => navigate('/food-Partner/login')} className="ml-2 text-purple-400 font-bold hover:underline">Login</button>
            </p>
          </form>
        </section>
      </div>
    </div>
  );
};

export default PartnerRegister;