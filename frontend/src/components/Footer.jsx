import React from 'react';
import {Link} from 'react-router-dom'
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 text-center">
      <p className="text-sm md:text-base">
        © {new Date().getFullYear()} All rights reserved.
      </p>
      <p className="text-xs md:text-sm mt-1">
        Designed & Developed by <span className="font-bold text-2xl text-purple-400"><Link to="https://web.facebook.com/shrabon.molla.96"  >Shrabon</Link></span>
      </p>
    </footer>
  );
}

export default Footer;
