import { Component, EventEmitter, Input, Output } from '@angular/core'
import { QuestionProvider } from '../models/classes'

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

    <div>
      <button (click)="submit()">Submit</button>
      <br />
      <button (click)="emitHelp()">Help component works!</button>
    </div>
  `,
  styles: [``],
})
export class AnswerCardComponent {
  /**
   * TODO Why pass the entire QuizPlayable instance will we can only pass Question instance instead?
   */
  @Input()
  question: QuestionProvider

  @Output()
  help = new EventEmitter<void>()

  input: string = ''

  submit() {
    this.question.submit(this.input)
  }

  emitHelp() {
    this.help.emit()
  }
}
