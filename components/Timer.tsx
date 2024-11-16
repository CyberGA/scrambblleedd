"use client";

import React from "react";

interface TimerProps {
  timeLeft: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  restart: () => void;
  formatTime: (seconds: number) => string;
}

const Timer: React.FC<TimerProps> = ({
  timeLeft,
  isRunning,
  start,
  restart,
  formatTime,
}) => {
  return (
    <div className="flex items-center justify-between mt-5">
      <p className="text-gray-600">Time Left: {formatTime(timeLeft)}</p>
      <div className="flex gap-3">
        {!isRunning && (
          <button onClick={start} className="text-green-500">
            Start
          </button>
        )}
        {/* {isRunning && (
          <button onClick={pause} className="text-yellow-500">
            Pause
          </button>
        )} */}
        <button onClick={restart} className="text-blue-500 font-semibold">
          Restart
        </button>
      </div>
    </div>
  );
};

export default Timer;
