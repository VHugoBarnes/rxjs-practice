import "./style.css";
import { Observable, Observer, Subject, fromEvent } from "rxjs";
import WORDS_LIST from "./wordsList.json";

const letterRows = document.getElementsByClassName("letter-row");

const userWinOrLoss = new Subject();

const onKeyDown$: Observable<KeyboardEvent> = fromEvent<KeyboardEvent>(document, "keydown");
let letterIndex = 0;
let letterRowIndex = 0;
let userAnswer: string[] = [];
const getRandomWord = () => WORDS_LIST[Math.floor(Math.random() * WORDS_LIST.length)];
const rightWord = getRandomWord();
console.log(rightWord);

const insertLetter: Observer<KeyboardEvent> = {
  next(event) {
    const pressedKey = event.key.toUpperCase();
    if (pressedKey.length === 1 && pressedKey.match(/[a-z]/i)) {
      let letterBox = Array.from(letterRows)[letterRowIndex].children[letterIndex];
      letterBox.textContent = pressedKey;
      letterBox.classList.add("filled-letter");
      userAnswer.push(pressedKey);
      letterIndex++;
    }

  },
  complete() {

  },
  error(err) {
    console.error(err);
  },
}
onKeyDown$.subscribe(insertLetter);

const checkWord: Observer<KeyboardEvent> = {
  next(event) {
    if (event.key === "Enter") {
      if (rightWord === userAnswer.join("")) {
        userWinOrLoss.next("win");
      }
    }
  },
  complete() {

  },
  error(err) {
    console.error(err);
  },
};
onKeyDown$.subscribe(checkWord);

const onDeleteKey$: Observable<KeyboardEvent> = fromEvent<KeyboardEvent>(document, "keydown");
onDeleteKey$.subscribe({
  next(event) {
    if (event.key === "Backspace") {
      letterIndex--;
      const letterBox = Array.from(letterRows)[letterRowIndex].children[letterIndex];
      letterBox.textContent = " ";
      letterBox.classList.remove("filled-letter");
    }
  },
});
userWinOrLoss.subscribe(() => {
  let letterRowsWinned = Array.from(letterRows)[letterRowIndex];
  console.log(letterRowsWinned);

  for (let i = 0; i < 5; i++) {
    letterRowsWinned.children[i].classList.add("letter-green");
  }
});
