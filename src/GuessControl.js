import React, { useState } from "react";
import Button from "./Button";

/*
a functional stateful component that takes in props, contains two functions one that onChange
of input will capture event.target.value and using setCurrentGuess change currentGuess state
to that value, the default state is an empty string. the second function will onClick of a
button call event.preventDefault() and using prop passed down from NumberGuessingGame component
invoke onGuess with currentGuess converted into an integer.

the jsx returned is an input field with attributes including onChange that runs handleInputChange
value that sets value to currentGuess state and a button that has onClick attribute that runs
onSubmitGuess
*/
export default function GuessControl(data) {
  const [currentGuess, setCurrentGuess] = useState("")
  
  const handleInputChange = (event) => {
    setCurrentGuess(event.target.value)
  }
  const onSubmitGuess = (event) => {
    event.preventDefault()
    // Since the values from an HTML input are strings by default,
    //  convert to a number for the returned guess value
    //  by passing in the string to the Number function.
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
    data.onGuess(Number(currentGuess))
  }
  return (
    <div>
      <input
        type="number"
        value={currentGuess}
        onChange={handleInputChange}
      />
      <Button onClick={onSubmitGuess}>Submit Guess</Button>
    </div>
  );
}