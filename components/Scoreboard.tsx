import React from "react";

interface ScoreboardProps {
  score: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ score }) => {
  return <p className="font-bold text-gray-700 mb-4">Score: {score}</p>;
};

export default Scoreboard;
