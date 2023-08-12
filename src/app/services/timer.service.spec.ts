import { TestBed } from "@angular/core/testing";
import { take } from "rxjs/operators";
import { TimerService } from "./timer.service";

describe("TimerService", () => {
  let service: TimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TimerService,
      ],
    });

    service = TestBed.inject(TimerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should start with a paused timer", (done) => {
    service.timerPaused$.pipe(take(1)).subscribe((isPaused) => {
      expect(isPaused).toBeTruthy();
      done();
    });
  });

  it("should start timer and update the current time", (done) => {
    const initialTime = 10;
    service.startTimer(initialTime);

    service.currentTimer$.pipe(take(1)).subscribe((time) => {
      expect(time).toBe(initialTime + 1);
      done();
    });
  });

  it("should toggle the timer state", (done) => {
    service.startTimer(0);
    service.toggleTimer();

    service.timerPaused$.pipe(take(1)).subscribe((isPaused) => {
      expect(isPaused).toBeTruthy();
      done();
    });
  });

  it("should indicate if the timer is active", () => {
    service.startTimer(0);
    expect(service.isTimerActive).toBeTruthy();

    service.toggleTimer();
    expect(service.isTimerActive).toBeFalsy();
  });
});
