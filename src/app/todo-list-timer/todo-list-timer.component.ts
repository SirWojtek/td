import { Component, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { interval, Subscription } from 'rxjs';

const TICK_INTERVAL = 0.1; // s

@Component({
  selector: 'app-todo-list-timer',
  templateUrl: './todo-list-timer.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TodoListTimerComponent),
      multi: true
    }
  ]
})
export class TodoListTimerComponent implements ControlValueAccessor {
  @Output()
  save = new EventEmitter<void>();

  isTimerActive = false;

  private value_: number;

  private intervalSubscription: Subscription;

  get value(): number {
    return this.value_;
  }

  set value(newVal: number) {
    if (this.value_ === newVal) {
      return;
    }

    this.value_ = newVal;
    this.onChange(this.value_);
  }

  private onChange: (obj: number) => void = () => {};

  startTimer() {
    this.isTimerActive = true;
    this.intervalSubscription = interval(TICK_INTERVAL * 1000).subscribe(
      () => (this.value = this.value + TICK_INTERVAL)
    );
  }

  stopTimer() {
    this.isTimerActive = false;
    this.intervalSubscription.unsubscribe();
    this.save.emit();
  }

  writeValue(obj: number): void {
    this.value_ = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}
}
