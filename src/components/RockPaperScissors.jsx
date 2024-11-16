import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const choices = ['piedra', 'papel', 'tijera'];
const botNicknames = ["IronClaw", "TurboByte", "NeoPhantom", "ShadowCore", "OmegaDrive", "PixelBlaze", "AlphaBot", "CyberHawk", "SteelFang", "RoboKnight", "MechaStorm", "GlitchHunter", "QuantumSpark", "ElectroFury", "CodeBreaker", "BinaryGhost", "RustyBlade", "NanoShade", "ProtoBlast", "CircuitRunner"];

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [countdown, setCountdown] = useState(null);
  const [loadingChoice, setLoadingChoice] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [botNickname, setBotNickname] = useState('');

  const playGame = (choice) => {
    setPlayerChoice(choice);
    setCountdown(3);
    setShowResult(false);
    setBotNickname(botNicknames[Math.floor(Math.random() * botNicknames.length)]);
  };

  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }

    if (countdown === 0) {
      const finalChoice = choices[Math.floor(Math.random() * choices.length)];
      setComputerChoice(finalChoice);
      setShowResult(true);
      setResult(getResult(playerChoice, finalChoice));
    }
  }, [countdown, playerChoice]);

  useEffect(() => {
    if (countdown === null || countdown === 0) return;

    const interval = setInterval(() => {
      setLoadingChoice((prev) => (prev + 1) % choices.length);
    }, 150);

    return () => clearInterval(interval);
  }, [countdown]);

  const getResult = (player, computer) => {
    if (player === computer) return 'Empate';
    if (
      (player === 'piedra' && computer === 'tijera') ||
      (player === 'papel' && computer === 'piedra') ||
      (player === 'tijera' && computer === 'papel')
    ) {
      return '¡Ganaste!';
    }
    return 'Perdiste';
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult('');
    setCountdown(null);
    setShowResult(false);
    setBotNickname('');
  };

  const renderChoice = (choice) => {
    switch (choice) {
      case 'piedra':
        return '🪨';
      case 'papel':
        return '📄';
      case 'tijera':
        return '✂️';
      default:
        return '❓';
    }
  };

  if (!playerChoice) {
    return (
      <div className="flex flex-col items-center">
        <div className="flex space-x-4 mb-8">
          {choices.map((choice) => (
            <motion.button
              key={choice}
              onClick={() => playGame(choice)}
              className="bg-chocolate-500 text-beige-100 px-6 py-4 rounded-xl text-2xl font-bold shadow-chocolate-lg hover:bg-chocolate-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {renderChoice(choice)}
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center space-x-20 mb-12">
        <div className="text-center">
          <p className="text-2xl font-bold text-chocolate-700 mb-4">Tú</p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-7xl"
          >
            {renderChoice(playerChoice)}
          </motion.div>
        </div>
        <div className="text-5xl font-bold text-chocolate-800">VS</div>
        <div className="text-center">
          <p className="text-2xl font-bold text-chocolate-700 mb-4">Bot {botNickname}</p>
          <AnimatePresence mode="wait">
            <motion.div
              key={countdown === 0 ? computerChoice : loadingChoice}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-7xl"
            >
              {countdown === 0 
                ? renderChoice(computerChoice)
                : renderChoice(choices[loadingChoice])}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key="countdown"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="text-8xl font-bold text-chocolate-800 mb-12"
          >
            {countdown}
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-6xl font-bold text-chocolate-800 mb-12"
          >
            {result}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={resetGame}
        className="bg-chocolate-500 text-beige-100 px-8 py-4 rounded-xl text-2xl font-bold shadow-chocolate-lg hover:bg-chocolate-600 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Jugar de nuevo
      </motion.button>
    </div>
  );
};

export default RockPaperScissors;