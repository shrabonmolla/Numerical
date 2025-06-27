import React from 'react'
import { motion } from 'framer-motion'
import left3d from "../images/materials/3D Character left.png"
import right3d from "../images/materials/3D Character right.png"
import leftglow from "../images/materials/left glow.png"
import rightglow from "../images/materials/right glow.png"
import line from "../images/materials/Line.png"
import pattern from "../images/materials/Pattern.png"
import circle1 from "../images/materials/circle1.png"
import circle2 from "../images/materials/circle2.png"
import { Link } from 'react-router-dom'


function Materials() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-4 bg-white overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${pattern})` }}
      ></div>

      {/* Glow Effects */}
      <motion.img
        src={leftglow}
        alt=""
        className="absolute top-0 left-0 w-[500px] md:w-[600px] opacity-90"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.9 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />
      <motion.img
        src={rightglow}
        alt=""
        className="absolute bottom-0 right-0 w-[500px] md:w-[600px] opacity-90"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.9 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />

      {/* Line and circles */}
      <img src={line} alt="" className="absolute top-6 left-0 w-24 md:w-32" />
      <img src={circle1} alt="" className="absolute bottom-0 left-0 w-20 md:w-35" />
      <img src={circle2} alt="" className="absolute right-0 top-1/2 transform -translate-y-1/2 w-16 md:w-24" />

      {/* Left 3D Character */}
      <motion.img
        src={left3d}
        alt="Left character"
        className="absolute top-0 left-0 w-[300px] md:w-[400px]"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />

      {/* Right 3D Character */}
      <motion.img
        src={right3d}
        alt="Right character"
        className="absolute bottom-0 right-0 w-[300px] md:w-[400px]"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
      />

      {/* Center Content */}
      <motion.div
        className="text-center z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h1 className="text-3xl md:text-5xl font-extrabold text-purple-700 mb-6 drop-shadow">
          Open Math Vault
        </h1>
        <Link to="/resource">
                <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="border-2 border-purple-700 px-6 py-2 text-purple-700 font-semibold rounded hover:bg-purple-100 transition"
        >
          Study Materials
        </motion.button>

        
        
        </Link>
      </motion.div>
    </div>
  )
}

export default Materials
