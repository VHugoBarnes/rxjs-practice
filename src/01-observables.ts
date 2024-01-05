import { Observable, Observer } from "rxjs";

const observableAlpha$: Observable<number> = new Observable(subscriber => {
  subscriber.next(2);
  subscriber.next(4);
  subscriber.next(6);
  subscriber.complete();
  subscriber.error("AAAAAAAa")
});

const observer: Partial<Observer<number>> = {
  next: (value: number) => {
    console.log(value);
  },
  complete: () => {
    console.warn("Observable finished");
  },
  error: (error: Error) => {
    console.error(error);
  },
};

observableAlpha$.subscribe(observer);