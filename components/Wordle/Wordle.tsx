import React, { useEffect, useState } from "react";
import styles from "./wordle.module.css";

const Wordle = () => {
  const [submitGuess, setSubmitGuess] = useState<Array<Array<string>>>([]);
  const [guess, setGuess] = useState<Array<string>>([]);

  useEffect(() => {
    function handleKeyDown({ key }: { key: string }) {
      console.log(key);
      const isChar = /^[a-z]$/.test(key);
      const isBackSpace = key === "Backspace";
      const isSubmit = key === "Enter";
      const isGuessFinished = guess.length === 5;

      if (isBackSpace) {
        setGuess((prev) => {
          const temp = [...prev];
          temp.pop();
          return temp;
        });
      } else if (isChar && !isGuessFinished) {
        setGuess((prev) => [...prev, key]);
      } else if (isGuessFinished && isSubmit) {
        setSubmitGuess((prev) => [...prev, guess]);
        setGuess([]);
      }
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [guess.length]);
  console.log(submitGuess);

  return (
    <div className={styles.wordle}>
      <EmptyGuess />
      <EmptyGuess />
      <EmptyGuess />
      <EmptyGuess />
      <EmptyGuess />
      <EmptyGuess />
    </div>
  );
};

export default Wordle;

function CurrentGuess() {}

function PreviousGuess() {}

function EmptyGuess() {
  return (
    <div className={styles.word}>
      {Array.from({ length: 5 }).map((_, i) => {
        return <span className={styles.char} key={i} />;
      })}
    </div>
  );
}
