import React, { useEffect, useState } from "react";
import styles from "./wordle.module.css";

const totalGuessMax = 6;

type WordleProps = {
  puzzleWord: string;
};

const Wordle = ({ puzzleWord }: WordleProps) => {
  if (puzzleWord.length !== 5) {
    throw new Error(
      `La palabra debe tener 5 caracteres. ${puzzleWord} no es valida`
    );
  }

  const [submittedGuesses, setSubmittedGuesses] = useState<string[][]>([]);
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
        setSubmittedGuesses((prev) => [...prev, guess]);
        setGuess([]);
      }
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [guess.length]);

  console.log(submittedGuesses);

  const isCorrect =
    submittedGuesses.length > 0 &&
    submittedGuesses[submittedGuesses.length - 1].join() === puzzleWord;
  return (
    <div className={styles.wordle}>
      <SubmittedGuesses submittedGuesses={submittedGuesses} />
      {!isCorrect && <CurrentGuess guess={guess} />}
      {Array.from({
        length: totalGuessMax - submittedGuesses.length - (isCorrect ? 0 : 1),
      }).map((_, i) => {
        return <EmptyGuess key={i} />;
      })}
    </div>
  );
};

export default Wordle;

type SubmittedGuessesProps = {
  submittedGuesses: string[][];
};

function SubmittedGuesses({ submittedGuesses }: SubmittedGuessesProps) {
  return (
    <>
      {submittedGuesses.map((guess, i) => {
        return <SubmittedGuess guess={guess} key={i} />;
      })}
    </>
  );
}

function SubmittedGuess({ guess }: GuessProps) {
  return (
    <div className={styles.submittedGuess}>
      {Array.from({ length: 5 }).map((_, i) => {
        return (
          <span className={styles.char} key={i}>
            {guess[i] || ""}
          </span>
        );
      })}
    </div>
  );
}

function CurrentGuess({ guess }: GuessProps) {
  return (
    <div className={styles.word}>
      {Array.from({ length: 5 }).map((_, i) => {
        return (
          <span className={styles.char} key={i}>
            {guess[i] || ""}
          </span>
        );
      })}
    </div>
  );
}

function EmptyGuess() {
  return (
    <div className={styles.word}>
      {Array.from({ length: 5 }).map((_, i) => {
        return <span className={styles.char} key={i} />;
      })}
    </div>
  );
}

type GuessProps = {
  guess: string[];
};
