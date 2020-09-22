import { Component, EventEmitter, Input, Output } from '@angular/core'
import { BaseQuestion, QuizPlayable } from '../models/interfaces'

@Component({
  selector: 'app-answer-card',
  template: `
    <div [ngSwitch]="question.type">
      <div *ngSwitchCase="'TEXT'">
        <input type="text" [(ngModel)]="input" (keyup.enter)="submit()" />
      </div>
      <div *ngSwitchCase="'SINGLE_CHOICE'">Single choice not available</div>
      <div *ngSwitchCase="'MULTIPLE_CHOICES'">
        Multiple choices not available
      </div>
      <div *ngSwitchDefault>Default =))</div>
    </div>
  `,
  styles: [``],
})
export class AnswerCardComponent {
  /**
   * TODO Why pass the entire QuizPlayable instance will we can only pass Question instance instead?
   */
  @Input()
  question: BaseQuestion

  @Output()
  submitAnswer = new EventEmitter<number | number[] | string>()

  input: string = ''

  submit() {
    this.submitAnswer.emit(this.input)
  }
}
