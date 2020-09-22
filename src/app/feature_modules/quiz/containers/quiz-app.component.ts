import { Component, Inject, Input } from '@angular/core'
import { QuizPlayable } from '../models/interfaces'
import { QUIZ_STATE } from '../services/quiz-provider.service'
import { isNull } from '../../../shared'

@Component({
  selector: 'app-quiz',
  template: `
    <div [ngSwitch]="service.state">
      <div class="centering" *ngSwitchCase="'EMPTY'">Loading ...</div>
      <div class="centering" *ngSwitchCase="'FOLLOW_UP'">
        Following up round
      </div>
      <div *ngSwitchDefault class="vertical-centering">
        <app-quiz-header [exerciseName]="service.title"></app-quiz-header>
        <app-quiz-showcase
          [question]="service.mainQuestion"
        ></app-quiz-showcase>
        <h5>{{ hint }}</h5>
        <app-answer-card
          (submitAnswer)="service.submit($event)"
          [question]="service.mainQuestion"
        ></app-answer-card>
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

      .vertical-centering {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    `,
  ],
})
export class QuizAppComponent {
  @Input()
  set quizId(value: string) {
    this.service.qid = value
  }

  get hint(): string {
    const isCorrect = this.service.isCorrect
    if (isNull(isCorrect) || isCorrect) {
      return ''
    }
    return 'Incorrect answer'
  }

  constructor(@Inject(QUIZ_STATE) public service: QuizPlayable) {}
}
