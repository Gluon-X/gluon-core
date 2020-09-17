import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-quiz-header',
  template: ` <div>Quiz Header: {{ quizName }} - {{ exerciseName }}</div> `,
  styles: [``],
})
export class QuizHeaderComponent {
  @Input()
  quizName: string = 'Name'

  @Input()
  exerciseName: string = 'exercise name'
}
