import { Component, Input } from '@angular/core'
import { Question } from '../models'

@Component({
  selector: 'app-quiz-showcase',

  template: `
    <h3>Exercise</h3>
    <ng-katex-paragraph [paragraph]="question.content"></ng-katex-paragraph>
  `
})
export class QuizShowcaseComponent {
  @Input()
  question: Question
}
