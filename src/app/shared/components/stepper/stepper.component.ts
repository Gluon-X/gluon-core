import { Component, EventEmitter, Input, Output } from '@angular/core'

// import {  } from ;
@Component({
  selector: 'custom-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
})
export class StepperComponent {
  @Input() listofContent: Array<String>
  @Input() activeIndex: number;
  @Input() phaseCount: number;
  @Output() onClick = new EventEmitter<number>();

  getPhaseList() {
    return Array(this.phaseCount).fill(0)
  }

  onSelect(index: number) {
    this.onClick.emit(index);
  }



}
