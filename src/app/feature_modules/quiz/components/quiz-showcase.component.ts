import { Component, Input } from '@angular/core'
import { BaseQuestion } from '../models/interfaces'

@Component({
  selector: 'app-quiz-showcase',

  template: `
    <h3>Exercise</h3>
    <p>{{ question.content }}</p>

    <div *ngIf="question.answers">
      <p *ngFor="let answer of question.answers; let index = index">
        {{ index }}) {{ answer }}
      </p>
    </div>
  `,
})
export class QuizShowcaseComponent {
  @Input()
  question: BaseQuestion
}
