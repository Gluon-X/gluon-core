import { Component, EventEmitter, Input, Output } from '@angular/core'
import { BaseQuestion } from '../../../models/interfaces'

@Component({
  selector: 'app-quiz-answer-type-input-text',
  templateUrl: './answer-type-input-box.component.html',
})
export class AnswerTextViewComponent {
  @Input()
  question: BaseQuestion

  @Output() writedAnswear = new EventEmitter<string>()

  answear: string

  test(evnet) {
    console.log(evnet)
  }

  onChange() {
    this.writedAnswear.emit(this.answear)
  }
}
