"use client";

import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import { wordList } from "@/libs/word-lists";
import useTimer from "@/hooks/useTimer";

interface GameProps {
  incrementScore: () => void;
}

const scrambleWord = (word: string): string => {
  const scrambled = word
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
  return scrambled === word ? scrambleWord(word) : scrambled;
};

const getRandomIndex = (listLength: number) => {
  return Math.floor(Math.random() * listLength);
};

const Game: React.FC<GameProps> = ({ incrementScore }) => {
  const resetGame = () => {
    const index = getRandomIndex(wordList.length);
    setCurrentWordIndex(index);
    setScrambledWord(scrambleWord(wordList[index].word));
  };

  const { timeLeft, isRunning, start, pause, restart, formatTime } = useTimer(
    60,
    resetGame
  );
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [scrambledWord, setScrambledWord] = useState("");
  const [guess, setGuess] = useState("");
  const [hintVisible, setHintVisible] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const index = getRandomIndex(wordList.length);
    setCurrentWordIndex(index);
    setScrambledWord(scrambleWord(wordList[index].word));
  }, []);

  const handleGuess = () => {
    if (!guess.trim()) {
      setFeedback("Please enter a guess!");
      return;
    }
    const currentWord = wordList[currentWordIndex].word;
    if (guess.trim().toLowerCase() === currentWord.toLowerCase()) {
      setFeedback("Correct!");
      incrementScore();
      const nextIndex = getRandomIndex(wordList.length);
      setCurrentWordIndex(nextIndex);
      setScrambledWord(scrambleWord(wordList[nextIndex].word));
      setGuess("");
      setHintVisible(false);
    } else {
      setFeedback("Try Again!");
    }
  };

  return (
    <div className="w-full max-w-md bg-white shadow-md border border-pink-300 rounded-lg p-6 mx-auto">
      <p className="text-lg mb-4">
        Scrambled Word:{" "}
        <span className="font-semibold text-pink-500">{scrambledWord}</span>
      </p>
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Your Guess"
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      />
      <div className="flex gap-4">
        <button
          onClick={handleGuess}
          disabled={!isRunning}
          className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 disabled:cursor-not-allowed"
        >
          Submit
        </button>
        <button
          onClick={() => setHintVisible(!hintVisible)}
          disabled={!isRunning}
          className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 disabled:cursor-not-allowed"
        >
          {hintVisible ? "Hide Hint" : "Show Hint"}
        </button>
      </div>
      {hintVisible && (
        <p className="mt-4 text-sm text-gray-500">
          Hint: {wordList[currentWordIndex].hint}
        </p>
      )}
      <p className="mt-4 text-lg font-semibold">{feedback}</p>
      <Timer
        timeLeft={timeLeft}
        isRunning={isRunning}
        start={start}
        pause={pause}
        restart={restart}
        formatTime={formatTime}
      />
    </div>
  );
};

export default Game;
