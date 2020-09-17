import { Component, Inject, Input } from '@angular/core'
import { QuizProvider, QuizState, QUIZ_STATE } from '../../services/quiz-provider.service'

@Component({
  selector: 'app-quiz-header',
  template: ` <div>App: {{ service.qid }}</div> `,
  styles: [``],
})
export class QuizHeaderComponent {
  @Input()
  quizName: string = 'Name'

  @Input()
  exerciseName: string = 'exercise name'

  constructor(@Inject(QUIZ_STATE) public service: QuizState) {}
}
