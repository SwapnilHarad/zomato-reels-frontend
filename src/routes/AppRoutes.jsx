import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Import pages
import UserRegister from '../pages/UserRegister';
import UserLogin from '../pages/UserLogin';
import PartnerRegister from '../pages/PartnerRegister';
import PartnerLogin from '../pages/PartnerLogin';
import ZomatoHome from '../pages/ZomatoHome'; // <-- NEW ZOMATO LANDING PAGE
import ReelsFeed from "../pages/General/Home"; // <-- YOUR OLD Home.jsx RENAMED
import Profile from '../pages/food-partner/Profile'; 
import PartnerDashboard from '../pages/food-partner/PartnerDashboard'; 
import CreateFood from '../pages/food-partner/CreateFood'; 

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* --- USER ROUTES --- */}
        <Route path='/user/register' element={<PageWrapper><UserRegister /></PageWrapper>} />
        <Route path='/user/login' element={<PageWrapper><UserLogin /></PageWrapper>} />
        
        {/* --- FOOD PARTNER PORTAL ROUTES --- */}
        <Route path='/food-partner/register' element={<PageWrapper><PartnerRegister /></PageWrapper>} />
        <Route path='/food-partner/login' element={<PageWrapper><PartnerLogin /></PageWrapper>} />
        
        <Route path='/food-partner/dashboard/:id' element={<PageWrapper><PartnerDashboard /></PageWrapper>}/>
        <Route path='/food-partner/profile/:id' element={<PageWrapper><Profile /></PageWrapper>}/>
        <Route path='/food-partner/:id' element={<PageWrapper><PartnerDashboard /></PageWrapper>}/>
        <Route path='/create-food' element={<PageWrapper><CreateFood /></PageWrapper>} />
        
        {/* --- MAIN NAVIGATION ROUTES --- */}
        {/* The new Zomato interface is the default loading page */}
        <Route path='/' element={<PageWrapper><ZomatoHome /></PageWrapper>} />
        {/* The swiping reels feed is now safely tucked away under /reels */}
        <Route path='/reels' element={<PageWrapper><ReelsFeed /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const AppRoutes = () => {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
};

export default AppRoutes;