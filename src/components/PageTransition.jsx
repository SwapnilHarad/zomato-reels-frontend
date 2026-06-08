import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}    // Starts slightly lower and invisible
      animate={{ opacity: 1, y: 0 }}     // Slides up and fades in
      exit={{ opacity: 0, y: -20 }}      // Slides up and fades out when leaving
      transition={{ duration: 0.4, ease: "easeOut" }} // Smooth timing
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;