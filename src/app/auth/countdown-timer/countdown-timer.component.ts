import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core'

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss']
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
  @Input() durationInSeconds: number = 60; // Default 1 minute
  @Output() tokenExpired = new EventEmitter<void>(); // Event emitter for token expiration
  public timeLeft: string = '';
  private interval: any;

  ngOnInit() {
    this.startCountdown(this.durationInSeconds);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  startCountdown(duration: number) {
    let time = duration;
    this.updateTimeLeft(time);

    this.interval = setInterval(() => {
      time--;
      this.updateTimeLeft(time);

      if (time <= 0) {
        clearInterval(this.interval);
        this.timeLeft = 'Token expired';
        this.tokenExpired.emit(); // Emit event on expiration
      }
    }, 1000);
  }

  updateTimeLeft(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.timeLeft = `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}