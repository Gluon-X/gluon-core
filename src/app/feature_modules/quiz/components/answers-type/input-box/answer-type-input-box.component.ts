import { Component, Input } from '@angular/core'
import { BaseQuestion } from '../../../models/interfaces'

@Component({
  selector: 'app-quiz-answer-type-input-text',
  templateUrl:'./answer-type-input-box.component.html'
})
export class AnswerTextViewComponent {
  @Input()
  question: BaseQuestion

  test(){
  }

}
