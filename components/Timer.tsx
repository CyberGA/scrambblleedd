"use client";

import React, { useState, useEffect } from "react";

interface TimerProps {
  resetGame: () => void;
  defaultTime?: number;
}

const Timer: React.FC<TimerProps> = ({ resetGame, defaultTime = 60 }) => {
  const [timeLeft, setTimeLeft] = useState(defaultTime); 

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      resetGame();
    }
  }, [timeLeft, resetGame]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="flex items-center justify-between mt-5">
      <p className=" text-gray-600">Time Left: {formatTime(timeLeft)}</p>
      {timeLeft === 0 && <div
        onClick={() => setTimeLeft(3600)}
        className="cursor-pointer font-bold"
      >
        Restart
      </div>}
    </div>
  );
};

export default Timer;
