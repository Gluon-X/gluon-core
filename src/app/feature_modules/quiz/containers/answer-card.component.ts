import { Component, EventEmitter, Input, Output } from '@angular/core'
import { QuestionProvider } from '../models'

@Component({
  selector: 'app-answer-card',
  template: `
    <div [ngSwitch]="question.type">
      <div *ngSwitchCase="'DISPLAY'">
        Nothing to display here.
      </div>
      <div *ngSwitchCase="'SHORT_ANSWER'">Short answer not available</div>
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
  styles: [``]
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
