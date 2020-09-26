import { Component, Inject, Input } from '@angular/core'
import { QuizPlayable } from '../../models/interfaces'
import { QUIZ_STATE } from '../../services/quiz-provider.service'

@Component({
  selector: 'app-quiz',
  templateUrl:'./quiz-app.component.html'
})
export class QuizAppComponent {
  @Input()
  set quizId(value: string) {
    this.service.qid = value
  }

  get hint(): string {
    return this.service.mainQuestion.hint
  }

  constructor(@Inject(QUIZ_STATE) public service: QuizPlayable) { }
}
