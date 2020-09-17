import { Component, Inject } from '@angular/core'
import { QuizState } from '../models/interfaces';
import { QUIZ_STATE } from '../services/quiz-provider.service';

@Component({
  selector: 'app-answer-card',
  template: ``,
  styles: [``],
})
export class AnswerCardComponent {
  constructor(@Inject(QUIZ_STATE) private service: QuizState) {}
}
