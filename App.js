import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import Die from "./Die";

export default function App() {
  // useState
  const defaultState = {
    tenzies: false,
    rolls: 0
  }
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(defaultState.tenzies);
  const [rolls, setRolls] = useState(defaultState.rolls);

  // useEffect
  useEffect(() => {
    const allHeld = dice.every(die => die.held);
    const firstValue = dice[0].value;
    const allSameNumber = dice.every(die => die.value === firstValue);
    if (allHeld && allSameNumber) {
      setTenzies(true);
    }
  }, [dice]);
  useEffect(() => {
    if (!tenzies) {
      setDice(allNewDice());
      setRolls(defaultState.rolls);
    }
  }, [tenzies]);

  // functions
  function getRandomDie(i) {
    return {
      value: Math.ceil(Math.random() * 6),
      held: false,
      id: i + 1
    };
  }
  function allNewDice() {
    const newArray = [];
    for (let i = 0; i < 10; i++) {
      newArray.push(getRandomDie(i));
    }
    return newArray;
  }
  function rollUnheldDice() {
    if (!tenzies) {
      setDice(prevDice => prevDice.map((die, i) => {
        if (die.held) {
          return die;
        } else {
          return getRandomDie(i);
        }
      }));
      setRolls(prevRolls => prevRolls + 1);
    } else {
      setTenzies(defaultState.tenzies);
    }
  }
  function holdDice(id) {
    if (!tenzies) {
      setDice(prevDice => prevDice.map(die => {
        if (die.id === id) {
          return {
            value: die.value,
            held: !die.held,
            id: die.id
          };
        } else {
          return die;
        }
      }));
    }
  }

  // JSX elements
  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      held={die.held}
      handleClickDie={() => holdDice(die.id)}
    />
  ));

  // render
  return (
    <main>
    {tenzies && (
      <Confetti recycle={false} />
    )}
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click a die to freeze it between rolls.</p>
      <div className="die-container">{diceElements}</div>
      <button
        className="roll-dice"
        onClick={rollUnheldDice}
      >
        {tenzies ? "Reset Game" : "Roll"}
      </button>
      <p>Rolls: {rolls}</p>
    </main>
  );
}
