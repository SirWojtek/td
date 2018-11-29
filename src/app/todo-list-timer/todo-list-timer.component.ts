import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

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
  private value_: number;

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

  writeValue(obj: number): void {
    this.value_ = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}
}
