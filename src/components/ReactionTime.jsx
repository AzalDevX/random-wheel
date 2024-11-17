// src/components/ReactionTime.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const ReactionTime = () => {
  const [state, setState] = useState('waiting');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [bestTime, setBestTime] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('bestReactionTime');
    if (saved) {
      setBestTime(parseInt(saved, 10));
    }
  }, []);

  const startGame = useCallback(() => {
    setState('ready');
    const delay = Math.random() * 3750 + 750; // Random delay between 0.75s and 4.5s
    const timeout = setTimeout(() => {
      if (state === 'ready') {
        setStartTime(Date.now());
        setState('clicking');
      }
    }, delay);
    return () => clearTimeout(timeout);
  }, [state]);

  const handleClick = () => {
    if (state === 'waiting' || state === 'result' || state === 'tooSoon') {
      startGame();
    } else if (state === 'ready') {
      setState('tooSoon');
    } else if (state === 'clicking') {
      const clickTime = Date.now() - startTime;
      setEndTime(clickTime);
      setState('result');
      if (!bestTime || clickTime < bestTime) {
        setBestTime(clickTime);
        localStorage.setItem('bestReactionTime', clickTime.toString());
      }
    }
  };

  useEffect(() => {
    if (state === 'ready') {
      return startGame();
    }
  }, [state, startGame]);

  const getButtonText = () => {
    switch (state) {
      case 'waiting':
        return 'Iniciar';
      case 'ready':
        return 'Espera...';
      case 'clicking':
        return '¡Ahora!';
      case 'tooSoon':
        return 'Demasiado pronto';
      case 'result':
        return `Tu tiempo:\n${endTime} ms`;
      default:
        return '';
    }
  };

  const getButtonColor = () => {
    switch (state) {
      case 'waiting':
        return 'bg-chocolate-500 hover:bg-chocolate-600';
      case 'ready':
        return 'bg-chocolate-700 cursor-not-allowed';
      case 'clicking':
        return 'bg-green-500 hover:bg-green-600';
      case 'tooSoon':
        return 'bg-red-500 hover:bg-red-600';
      case 'result':
        return 'bg-chocolate-500 hover:bg-chocolate-600';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-beige-100 relative">
      {bestTime && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-4 bg-chocolate-100 p-4 rounded-lg shadow-md"
        >
          <p className="text-lg font-semibold text-chocolate-800">Mejor tiempo</p>
          <p className="text-2xl font-bold text-chocolate-600">{bestTime} ms</p>
        </motion.div>
      )}
      <h1 className="text-4xl md:text-6xl font-bold text-chocolate-800 mb-8">Clicker Rápido</h1>
      <motion.button
        className={`w-64 h-64 rounded-full text-2xl font-bold text-beige-100 shadow-lg ${getButtonColor()} flex flex-col items-center justify-center`}
        onClick={handleClick}
        whileHover={state !== 'ready' ? { scale: 1.05 } : {}}
        whileTap={state !== 'ready' ? { scale: 0.95 } : {}}
      >
        {getButtonText().split('\n').map((line, index) => (
          <span key={index} className={index === 0 ? 'mb-2' : 'text-3xl'}>{line}</span>
        ))}
      </motion.button>
      <p className="mt-8 text-lg text-chocolate-700 text-center max-w-md">
        Haz clic para empezar. Espera a que el botón se ponga verde, luego haz clic lo más rápido que puedas. Si haces clic antes de tiempo, el juego se detendrá y tendrás que volver a empezar.
      </p>
    </div>
  );
};

export default ReactionTime;