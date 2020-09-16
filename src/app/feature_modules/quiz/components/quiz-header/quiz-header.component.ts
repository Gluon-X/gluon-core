import { Component, Input } from '@angular/core'
import { QuizFacade } from '../../services/quiz-facade.service'

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

  constructor(public service: QuizFacade) {}
}
