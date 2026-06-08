import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const UserRegister = () => {

   


  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();

    // 1. We get the values using the 'name' attributes we added to the inputs
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post('https://zomato-reels-backend-qn19.onrender.com/api/auth/user/register', {
        fullName: firstName + " " + lastName,
        email: email,
        password: password
      },
      {
        withCredentials: true, // This allows cookies to be sent/received for session management
      }
    );

      console.log("Success:", response.data);
      // Optional: Redirect user after successful signup
      // navigate('/user/login');
      
    } catch (error) {
      console.error("Error signing up:", error);
    //   alert("Registration failed. Check console for details.");
    }

    navigate('/'); // Redirect to home after form submission (you can change this to login or dashboard)
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30">
      <div className="max-w-md mx-auto px-6 py-10">
        
        <header className="text-center mb-8">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">
            Join the <span className="text-purple-500">Feed</span>
          </h1>
          <p className="text-gray-400 text-xs mt-2 uppercase tracking-widest">Create your viewer account</p>
        </header>

        <div className="flex justify-center items-center gap-2 mb-8 text-[11px] uppercase tracking-widest font-bold">
          <span className="text-gray-600">Switch:</span>
          <span className="text-purple-500 border-b border-purple-500 pb-0.5 cursor-default">User</span> 
          <span className="text-gray-800">·</span>
          <Link to="/food-Partner/register" className="text-gray-500 hover:text-[#d4ff00] transition-colors">Food partner</Link>
        </div>

        <section className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/10 blur-[100px]"></div>
          
          <h2 className="text-xl font-bold uppercase mb-8 border-b-2 border-purple-600 inline-block pb-1 relative z-10">
            Onboarding
          </h2>
          
          {/* onSubmit handles the trigger */}
          <form onSubmit={handlesubmit} className="space-y-5 relative z-10">
            <div className="grid grid-cols-2 gap-4">
               <div>
                <label className="block text-[10px] font-bold text-purple-400 uppercase mb-2 tracking-widest">First Name</label>
                {/* 2. ADDED name="firstName" */}
                <input name="firstName" required type="text" placeholder="Jane" className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm focus:border-purple-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-purple-400 uppercase mb-2 tracking-widest">Last Name</label>
                {/* 3. ADDED name="lastName" */}
                <input name="lastName" required type="text" placeholder="Doe" className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm focus:border-purple-500 outline-none transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-purple-400 uppercase mb-2 tracking-widest">Email Address</label>
              {/* 4. ADDED name="email" */}
              <input name="email" required type="email" placeholder="name@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm focus:border-purple-500 outline-none transition-all" />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-purple-400 uppercase mb-2 tracking-widest">Create Password</label>
              {/* 5. ADDED name="password" */}
              <input name="password" required type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm focus:border-purple-500 outline-none transition-all" />
            </div>

            {/* 6. CHANGED type="button" to type="submit" */}
            <button type="submit" className="w-full bg-purple-600 text-white font-black py-4 rounded-2xl mt-4 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:bg-purple-500 hover:-translate-y-1 active:translate-y-0 transition-all uppercase italic">
              Sign Up ⚡
            </button>

            <p className="text-center text-[11px] text-gray-500 uppercase mt-4 tracking-tighter">
              Already have an account? 
              <button type="button" onClick={() => navigate('/user/login')} className="ml-2 text-purple-400 font-bold hover:underline">Sign In</button>
            </p>
          </form>
        </section>
      </div>
    </div>
  );
};

export default UserRegister;