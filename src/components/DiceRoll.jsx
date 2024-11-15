import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DiceRoll = () => {
  const [isRolling, setIsRolling] = useState(false);
  const [diceValues, setDiceValues] = useState([1, 1]);

  const rollDice = () => {
    setIsRolling(true);
    setTimeout(() => {
      const newValues = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
      ];
      setDiceValues(newValues);
      setIsRolling(false);
    }, 2000);
  };

  const DiceFace = ({ value }) => {
    const dotPositions = {
      1: ['center'],
      2: ['top-left', 'bottom-right'],
      3: ['top-left', 'center', 'bottom-right'],
      4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
      6: ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right'],
    };

    const positionClasses = {
      'top-left': 'top-2 left-2',
      'top-right': 'top-2 right-2',
      'middle-left': 'top-1/2 left-2 -translate-y-1/2',
      'middle-right': 'top-1/2 right-2 -translate-y-1/2',
      'bottom-left': 'bottom-2 left-2',
      'bottom-right': 'bottom-2 right-2',
      'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    };

    return (
      <motion.div
        className="w-20 h-20 bg-beige-100 rounded-lg shadow-chocolate-md relative"
        animate={{
          rotate: isRolling ? 360 : 0,
          scale: isRolling ? [1, 1.2, 1] : 1,
        }}
        transition={{ duration: 1, repeat: isRolling ? 1 : 0 }}
      >
        {dotPositions[value].map((position, index) => (
          <div
            key={index}
            className={`absolute w-3 h-3 bg-chocolate-800 rounded-full ${positionClasses[position]}`}
            aria-hidden="true"
          />
        ))}
        <span className="sr-only">Dice showing {value}</span>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-4 mb-8">
        <DiceFace value={diceValues[0]} />
        <DiceFace value={diceValues[1]} />
      </div>
      <motion.button
        onClick={rollDice}
        disabled={isRolling}
        className="bg-gradient-to-r from-chocolate-500 to-chocolate-700 text-beige-100 px-10 py-4 rounded-full text-2xl font-bold shadow-chocolate-lg disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(67, 48, 43, 0.5)' }}
        whileTap={{ scale: 0.95 }}
      >
        {isRolling ? 'Lanzando...' : 'Lanzar Dados'}
      </motion.button>
    </div>
  );
};

export default DiceRoll;