import { Subscription, fromEvent } from "rxjs";

const onMouseMove$ = fromEvent(document, "keydown");

const subscription: Subscription = onMouseMove$.subscribe({
  next(value) {
    console.log(value);
  },
  complete() {

  },
  error(err) {

  },
});
