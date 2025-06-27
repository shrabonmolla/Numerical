import React, { useState, useEffect } from 'react';
import cover2 from '../images/gallery/cover2.jpg';
import cover3 from '../images/gallery/cover3.jpg';
import cover4 from '../images/gallery/cover4.jpg';
import cover5 from '../images/gallery/cover5.jpeg';
import cover6 from '../images/gallery/cover6.jpeg';
import cover7 from '../images/gallery/cover7.jpeg';


const images = [ cover2, cover3, cover4,cover5,cover6,cover7];

function Carousel() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const prevIndex = (current - 1 + images.length) % images.length;
  const nextIndex = (current + 1) % images.length;

  useEffect(() => {
    const timer = setInterval(() => {
      triggerTransition(() => {
        setCurrent((prev) => (prev + 1) % images.length);
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const triggerTransition = (callback) => {
    setIsTransitioning(true);
    setTimeout(() => {
      callback();
      setIsTransitioning(false);
    }, 300); // duration of fade
  };

  const goNext = () => {
    triggerTransition(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    });
  };

  const goPrev = () => {
    triggerTransition(() => {
      setCurrent((prev) => (prev - 1 + images.length) % images.length);
    });
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-transparent">
      {/* Previous Image */}
      <img
        src={images[prevIndex]}
        alt="previous"
        className="absolute w-[360px] h-[460px] object-cover rounded-lg opacity-30 scale-90 transform transition-all duration-700 ease-in-out"
        style={{ left: '10%' }}
      />

      {/* Next Image */}
      <img
        src={images[nextIndex]}
        alt="next"
        className="absolute w-[360px] h-[460px] object-cover rounded-lg opacity-30 scale-90 transform transition-all duration-700 ease-in-out"
        style={{ right: '10%' }}
      />

      {/* Current Image */}
      <img
        src={images[current]}
        alt="current"
        className={`relative z-10 w-[420px] h-[540px] object-cover rounded-2xl shadow-2xl transform transition-all duration-700 ease-in-out ${
          isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      />

      {/* Arrows */}
      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl bg-black/50 hover:bg-black/70 p-2 rounded-full z-20"
      >
        ‹
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl bg-black/50 hover:bg-black/70 p-2 rounded-full z-20"
      >
        ›
      </button>
    </div>
  );
}

export default Carousel;
