import "./style.css";
import { Observable, Observer, fromEvent } from "rxjs";

const letterRows = document.getElementsByClassName("letter-row");

const onKeyDown$: Observable<KeyboardEvent> = fromEvent<KeyboardEvent>(document, "keydown");
let letterIndex = 0;
let letterRowIndex = 0;
const insertLetter: Observer<KeyboardEvent> = {
  next(event) {
    const pressedKey = event.key.toUpperCase();
    if (pressedKey.length === 1 && pressedKey.match(/[a-z]/i)) {
      let letterBox = Array.from(letterRows)[letterRowIndex].children[letterIndex];
      letterBox.textContent = pressedKey;
      letterBox.classList.add("filled-letter");
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
