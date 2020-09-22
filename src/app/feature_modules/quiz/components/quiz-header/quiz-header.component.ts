import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-quiz-header',
  template: ` <h1>{{ exerciseName }}</h1> `,
  styles: [``],
})
export class QuizHeaderComponent {
  @Input()
  exerciseName: string
}
