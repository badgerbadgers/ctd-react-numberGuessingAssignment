import React, { useState } from "react";
import GuessControl from "./GuessControl";
import GuessMessage from "./GuessMessage";
import GameOver from "./GameOver";

/* function that returns a random integer number from 1-100 inclusive */
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}
/* variable that is equal to function call that generates random integer */
let randomNum = getRandomNumber()

/* variable that represent max number of attempts which is 5 */
const MAX_ATTEMPTS = 5;

/*
  a functional stateful component with various states for numberToGuess which is the number
  a user needs to guess which is a randomly generated number, number of guess which is initially
  set to 0, latestGuess which is the number the user has guessed initially set to null. there
  are also two booleans isCorrectGuess which is set to false and isGameOver which is set to false.
  
  there are also two functions one is handleGuess this function, which is passed down as a prop
  to the GuessControl component takes in an argument (guess) and will use set functions to 
  increment number of guesses by 1. there is a second set function that will set a user's
  current guess to the guess that was input by the user from the input field. there are two
  conditional statements one that checks if the input guess equals the numberToGuess if true
  then change two booleans to true isCorrectGuess and isGameOver. the second conditional is
  if the numberOfGuess variable equals to the MAX_ATTEMPTS variable - 1 (because the number
  is 4 since the count starts at 0) if this is true the change isGameOver to true.

  the handleReset function clears all the states back to when the page first loads so the 
  numberOfGuess is set to 0, the numberToGuess generates a new number after calling the
  getRandomNumber function, latestGuess is set to null, and isCorrectGuess and isGameOver
  are both set back to false.

  lastly a there is a return of jsx, it contains a header with text, one component GuessControl
  with the handleGuess function passed down as the onGuess prop and a conditional render if
  isGameOver (is true in this case because of the initial false state) then render GameOver
  component with two props. the second conditional render is if !isGameOver (read: isGameOver is true)
  then render GuessMessage component with props passed down to it.
*/
export default function NumberGuessingGame() {
  const [numberToGuess, setNumberToGuess] = useState(randomNum)
  const [numberOfGuesses, setNumberOfGuesses] = useState(0)
  const [latestGuess, setLatestGuess] = useState(null)
  const [isCorrectGuess, setIsCorrectGuess] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)

  const handleGuess = (guess) => {
    setNumberOfGuesses(numberOfGuesses + 1)
    setLatestGuess(guess)
    if(guess === numberToGuess) {
      setIsCorrectGuess(true)
      setIsGameOver(true)
    }
    if(numberOfGuesses === MAX_ATTEMPTS - 1) {
      setIsGameOver(true)
    }
  }

  const handleReset = () => {
    setNumberOfGuesses(0)
    setNumberToGuess(getRandomNumber())
    setLatestGuess(null)
    setIsCorrectGuess(false)
    setIsGameOver(false)
  }

  return (
    <div>
      <h2>I'm thinking of a number from 1 to 100.</h2>
      <h2>
        Can you guess the number I am thinking of in {MAX_ATTEMPTS} tries?
      </h2>
      <GuessControl onGuess={handleGuess} />
      {isGameOver && (
        <GameOver hasWon={isCorrectGuess} onReset={handleReset} />
      )}
      {!isGameOver && (
        <GuessMessage
          guess={latestGuess}
          numberToGuess={numberToGuess}
          numberOfGuesses={numberOfGuesses}
        />
      )}
    </div>
  );
}
