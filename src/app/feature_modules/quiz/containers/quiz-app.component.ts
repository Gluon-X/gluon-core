import { Component, Inject, Input } from '@angular/core'
import { QuizState } from '../models/enums'
import { QuizPlayable } from '../models/interfaces'
import { QUIZ_STATE } from '../services/quiz-provider.service'

@Component({
  selector: 'app-quiz',
  template: `
    <div [ngSwitch]="service.state">
      <div class="centering" *ngSwitchCase="'EMPTY'">Loading ...</div>
      <div class="centering" *ngSwitchCase="'FOLLOW_UP'"></div>
      <div *ngSwitchDefault>
        <app-quiz-header [exerciseName]="service.title"></app-quiz-header>
        <app-quiz-showcase
          [question]="service.mainQuestion"
        ></app-quiz-showcase>
      </div>
    </div>
  `,
  styles: [
    `
      .centering {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `,
  ],
})
export class QuizAppComponent {
  @Input()
  set quizId(value: string) {
    this.service.qid = value
  }

  get isAvailable(): boolean {
    return this.service.state !== QuizState.EMPTY
  }

  constructor(@Inject(QUIZ_STATE) public service: QuizPlayable) {}
}
