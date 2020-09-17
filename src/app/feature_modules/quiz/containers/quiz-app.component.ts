import { Component, Inject, Input } from '@angular/core'
import { QuizState } from '../models/interfaces'
import { QUIZ_STATE } from '../services/quiz-provider.service'

@Component({
  selector: 'app-quiz',
  template: `
    <div>
      <div *ngIf="!isAvailable">Loading ...</div>
      <div *ngIf="isAvailable">
        <app-quiz-header></app-quiz-header>
      </div>
    </div>
  `,
  styles: [``],
})
export class QuizAppComponent {
  @Input()
  set quizId(value: string) {
    this.service.qid = value
  }

  get isAvailable(): boolean {
    return this.service.isAvailable
  }

  constructor(@Inject(QUIZ_STATE) private service: QuizState) {}
}
