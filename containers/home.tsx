"use client";

import React, { useState } from "react";
import Game from "@/components/Game";
import Scoreboard from "@/components/Scoreboard";

export default function Home() {
  const [score, setScore] = useState(0);

  const incrementScore = () => setScore(score + 1);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-10">
        <div className="flex items-center mx-auto my-6 text-2xl">
          <Scoreboard score={score} />
        </div>
        <div className="flex w-full">
          <Game incrementScore={incrementScore} />
        </div>
      </div>
    </div>
  );
}
