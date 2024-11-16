import { useState, useEffect } from "react";

const useTimer = (defaultTime: number, onTimeUp: () => void) => {
  const [timeLeft, setTimeLeft] = useState(defaultTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      onTimeUp();
    }
    return () => clearTimeout(timer);
  }, [isRunning, timeLeft, onTimeUp]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const restart = () => {
    setTimeLeft(defaultTime);
    setIsRunning(false);
  };

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

  return { timeLeft, isRunning, start, pause, restart, formatTime };
};

export default useTimer;
