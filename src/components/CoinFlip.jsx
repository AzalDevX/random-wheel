// src/components/CoinFlip.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CoinFlip = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);

  const flipCoin = () => {
    setIsFlipping(true);
    const randomRotation = Math.random() < 0.5 ? 1800 : 1980; // 1980 grados = 1800 + 180 (media vuelta más)
    const newRotation = rotation + randomRotation;
    setRotation(newRotation);
    setResult(null);
    
    setTimeout(() => {
      setIsFlipping(false);
      setResult(newRotation % 360 === 0 ? 'Cara' : 'Cruz');
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-80 h-80 preserve-3d">
        <motion.div
          className="w-full h-full absolute"
          animate={{
            rotateY: rotation,
          }}
          transition={{ 
            duration: 3,
            ease: [0.645, 0.045, 0.355, 1.000]
          }}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Cara - Perfil del Rey */}
          <div 
            className="w-full h-full rounded-full absolute backface-hidden"
            style={{
              transform: 'rotateY(0deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="w-full h-full bg-chocolate-300 rounded-full shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] flex items-center justify-center">
              <div className="w-[94%] h-[94%] rounded-full bg-chocolate-200 flex items-center justify-center">
                {/* Círculo interior beige */}
                <div className="w-[84%] h-[84%] rounded-full bg-gradient-to-br from-beige-200 to-beige-300 flex items-center justify-center relative overflow-hidden">
                  {/* Estrellas */}
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-4 h-4"
                      style={{
                        top: '47%',
                        left: '47%',
                        transform: `rotate(${i * 30}deg) translate(100px, -50%) rotate(45deg)`,
                      }}
                    >
                      <div className="w-full h-full bg-chocolate-300" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Cruz - Número 1 y EURO */}
          <div 
            className="w-full h-full rounded-full absolute backface-hidden"
            style={{
              transform: 'rotateY(180deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="w-full h-full bg-chocolate-300 rounded-full shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] flex items-center justify-center">
              <div className="w-[94%] h-[94%] rounded-full bg-chocolate-200 flex items-center justify-center">
                {/* Círculo interior beige */}
                <div className="w-[84%] h-[84%] rounded-full bg-gradient-to-br from-beige-200 to-beige-300 flex items-center justify-center relative">
                  {/* Número 1 */}
                  <div className="absolute left-[25%] top-[20%] text-7xl font-bold text-chocolate-600">
                    1
                  </div>
                  {/* EURO texto */}
                  <div className="absolute right-[30%] top-[35%] text-2xl font-bold text-chocolate-600">
                    EURO
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <button
        onClick={flipCoin}
        disabled={isFlipping}
        className="mt-12 bg-gradient-to-r from-chocolate-500 to-chocolate-600 text-beige-100 px-8 py-4 rounded-xl text-xl font-bold hover:from-chocolate-600 hover:to-chocolate-700 transition-colors disabled:opacity-50 shadow-chocolate-lg"
      >
        {isFlipping ? 'Girando...' : 'Lanzar Moneda'}
      </button>

      <p className="mt-4 text-xl font-bold text-chocolate-800">
        {result && `Resultado: ${result}`}
      </p>
    </div>
  );
};

export default CoinFlip;