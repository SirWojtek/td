import { Component, ViewChild, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-todo-time-progress-circle',
  templateUrl: './todo-time-progress-circle.component.html',
  styleUrls: ['./todo-time-progress-circle.component.scss']
})
export class TodoTimeProgressCircleComponent {
  @ViewChild('border')
  border: ElementRef<any>;

  @ViewChild('loader')
  loader: ElementRef<any>;

  @Input()
  set timeSpend(val: number) {
    if (!this.border || !this.loader) {
      return;
    }

    this.draw(val);
  }

  private draw(percent: number) {
    const alpha = percent * 3.6;
    const r = (alpha * Math.PI) / 180,
      x = Math.sin(r) * 32,
      y = Math.cos(r) * -32,
      mid = alpha > 180 ? 1 : 0,
      anim = 'M 0 0 v -32 A 32 32 1 ' + mid + ' 1 ' + x + ' ' + y + ' z';

    // [x,y].forEach(function( d ){
    //   d = Math.round( d * 1e3 ) / 1e3;
    // });

    this.loader.nativeElement.setAttribute('d', anim);
    this.border.nativeElement.setAttribute('d', anim);
  }
}
