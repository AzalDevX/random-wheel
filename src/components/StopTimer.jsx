import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StopTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [time, setTime] = useState(0);
  const [targetTime, setTargetTime] = useState(5);
  const [score, setScore] = useState(null);
  const [bestScore, setBestScore] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [showMs, setShowMs] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - (time * 1000);
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const startTimer = () => {
    setIsPreparing(true);
    setTargetTime(5); // Fijo en 5 segundos
    setTimeout(() => {
      setIsPreparing(false);
      setIsRunning(true);
      setTime(0);
      setScore(null);
      setShowMs(false);
    }, 2000);
  };

  const stopTimer = () => {
    setIsRunning(false);
    const endTime = Date.now();
    const actualTime = (endTime - startTimeRef.current) / 1000;
    const difference = Math.abs(actualTime - targetTime);
    const newScore = Math.max(0, 100 - Math.floor(difference * 100));
    setScore(newScore);
    setAttempts(prev => prev + 1);
    if (bestScore === null || newScore > bestScore) {
      setBestScore(newScore);
      localStorage.setItem('stopTimerBestScore', newScore);
    }
    setShowMs(true);
    setTime(actualTime);
  };

  useEffect(() => {
    const savedBestScore = localStorage.getItem('stopTimerBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  const formatTime = (time) => {
    const seconds = Math.floor(time);
    const ms = Math.floor((time - seconds) * 1000);
    return showMs ? `${seconds}.${ms.toString().padStart(3, '0')}` : `${seconds}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center space-y-6 p-8 bg-gradient-to-br from-beige-100 to-beige-200 rounded-3xl shadow-chocolate-lg max-w-md mx-auto"
    >
      <h2 className="text-3xl font-bold text-chocolate-800">Detén el Cronómetro</h2>
      <AnimatePresence>
        {(isPreparing || isRunning) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-2xl font-semibold text-chocolate-700 bg-beige-300 px-6 py-3 rounded-full shadow-chocolate-md"
          >
            Objetivo: {targetTime} segundos
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div 
        key={time}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="text-5xl font-bold text-chocolate-800 bg-gradient-to-br from-beige-200 to-beige-300 rounded-full w-48 h-48 flex items-center justify-center shadow-chocolate-inner"
      >
        {formatTime(time)}
      </motion.div>
      <motion.button
        whileHover={{ scale: isPreparing ? 1 : 1.05 }}
        whileTap={{ scale: isPreparing ? 1 : 0.95 }}
        onClick={isRunning ? stopTimer : (isPreparing ? null : startTimer)}
        disabled={isPreparing}
        className={`px-8 py-3 rounded-full text-xl font-semibold transition-colors duration-300 ${
          isRunning 
            ? 'bg-chocolate-600 text-beige-100 hover:bg-chocolate-700' 
            : isPreparing
              ? 'bg-chocolate-400 text-beige-200 cursor-not-allowed'
              : 'bg-chocolate-500 text-beige-100 hover:bg-chocolate-600'
        }`}
      >
        {isRunning ? 'Detener' : (isPreparing ? 'Preparando...' : 'Iniciar')}
      </motion.button>
      <AnimatePresence>
        {score !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-2xl font-semibold text-chocolate-700 bg-beige-300 px-6 py-3 rounded-full shadow-chocolate-md"
          >
            Puntuación: {score}
          </motion.div>
        )}
      </AnimatePresence>
      {bestScore !== null && (
        <p className="text-chocolate-700 text-lg">Mejor puntuación: {bestScore}</p>
      )}
      <p className="text-chocolate-700 text-lg">Intentos: {attempts}</p>
    </motion.div>
  );
};

export default StopTimer;