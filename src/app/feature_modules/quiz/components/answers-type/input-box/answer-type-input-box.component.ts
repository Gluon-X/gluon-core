import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ShortAnswerProvider } from '../../../models'

@Component({
  selector: 'app-quiz-answer-type-input-text',
  templateUrl: './answer-type-input-box.component.html',
})
export class AnswerTextViewComponent {
  @Input()
  question: ShortAnswerProvider;

  @Output() writedAnswear = new EventEmitter<string>()

  answear: string

  test(evnet) {
    console.log(evnet)
  }

  onChange() {
    this.writedAnswear.emit(this.answear)
  }
}
