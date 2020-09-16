import { Component, Input } from '@angular/core'
import { QuizFacade } from '../services/quiz-facade.service'
import {
  QUIZ_STATE,
  DummyQuizState,
  QuizState,
} from '../services/quiz-state.service'

export const quizFacadeFactory = (
  quizState: QuizState,
  self: QuizAppComponent
) => new QuizFacade(quizState, self.quizId)

@Component({
  selector: 'app-quiz',
  template: `
    <div>
      <h1>QID: {{ quizId }}</h1>
      <app-quiz-header></app-quiz-header>
    </div>
  `,
  styles: [``],
  providers: [
    {
      provide: QUIZ_STATE,
      useValue: DummyQuizState,
    },
    {
      provide: QuizFacade,
      useFactory: quizFacadeFactory,
      deps: [QUIZ_STATE, QuizAppComponent],
    },
  ],
})
export class QuizAppComponent {
  @Input()
  quizId: string = ''

  constructor() {}
}
