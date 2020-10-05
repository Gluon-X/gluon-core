import { Component, Input } from '@angular/core'

// import {  } from ;
@Component({
  selector: 'custom-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
})
export class StepperComponent {
  @Input() listofContent: Array<String>
}
