import { Injectable } from "@angular/core";
import { BehaviorSubject, EMPTY, interval, Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@Injectable({
  providedIn: "root",
})
@UntilDestroy()
@Injectable()
export class TimerService {
  private timer$: Observable<number>;

  private timerState$ = new BehaviorSubject<boolean>(true);

  private currentTime = 0;

  private isTimerRunning = false;

  constructor() {
    this.timer$ = this.timerState$.pipe(
      switchMap((isPaused) =>
        isPaused ? EMPTY : interval(1000).pipe(map(() => this.currentTime++)),
      ),
    );

    this.timerState$
      .pipe(untilDestroyed(this))
      .subscribe((isPaused) => (this.isTimerRunning = !isPaused));
  }

  get isTimerActive(): boolean {
    return this.isTimerRunning;
  }

  get currentTimer$(): Observable<number> {
    return this.timer$;
  }

  get timerPaused$(): Observable<boolean> {
    return this.timerState$;
  }

  startTimer(initialTime: number): void {
    debugger;
    this.currentTime = (initialTime ?? 0) + 1;
    this.timerState$.next(false);
  }

  toggleTimer(): void {
    this.timerState$.next(this.isTimerRunning);
  }

  endTimer(): void {
    this.timerState$.next(true);
  }
}
