import { Component, Inject, Input } from '@angular/core'
import { QuizState, QUIZ_STATE } from '../services/quiz-provider.service'

@Component({
  selector: 'app-quiz',
  template: `
    <div>
      <h1>QID: {{ quizId }}</h1>
      <app-quiz-header></app-quiz-header>
    </div>
  `,
  styles: [``],
})
export class QuizAppComponent {
  @Input()
  set quizId(value: string) {
    this.service.qid = value
  }

  constructor(@Inject(QUIZ_STATE) private service: QuizState) {}
}
