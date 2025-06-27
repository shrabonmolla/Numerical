import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import heroicon from '../images/herosec/heroicon.png';
import hertobg from '../images/herosec/herobg.png';

function Herosection() {
  const iconControls = useAnimation();

  useEffect(() => {
    // First play entrance, then loop shake animation
    iconControls.start({
      opacity: 1,
      x: 0,
      transition: { duration: 1 },
    }).then(() => {
      iconControls.start({
        rotate: [0, -5, 5, -5, 5, 0],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      });
    });
  }, [iconControls]);

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex items-center px-6"
      style={{ backgroundImage: `url(${hertobg})` }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 w-full">
        {/* Left: Hero Icon with entry + infinite shake animation */}
        <motion.div
          className="flex-shrink-0"
          initial={{ opacity: 0, x: -100 }}
          animate={iconControls}
        >
          <img
            src={heroicon}
            alt="Hero Icon"
            className="w-60 md:w-80 h-auto" // larger size
          />
        </motion.div>

        {/* Right: Text with fade and slide-in animation */}
        <motion.div
          className="text-white md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Numerical-19
            <br />
            <span className="text-yellow-300">Department of Mathematics</span>
          </h1>
          <p className="text-lg leading-relaxed">
            A vibrant community of learners, dreamers, and problem solvers. United by our passion for mathematics, we explore the patterns of logic and the beauty behind every equation. <strong>Numerical-19</strong> is more than a batch — it's a journey of growth, collaboration, and shared curiosity.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Herosection;
