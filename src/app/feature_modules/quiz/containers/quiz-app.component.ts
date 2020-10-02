import { Component, Inject, Input, Self } from '@angular/core'
import { QuizPlayable } from '../models/interfaces'
import { QUIZ_STATE, QuizHandler } from '../services/quiz-provider.service'

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
          (help)="service.enableHelper()"
          [question]="service.mainQuestion"
        ></app-answer-card>

        <div *ngIf="service.state == 'HELP'">Help!!!</div>
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

  providers: [
    {
      provide: QUIZ_STATE,
      useClass: QuizHandler,
    },
  ],
})
export class QuizAppComponent {
  @Input()
  set quizId(value: string) {
    this.service.qid = value
  }

  get hint(): string {
    return this.service.mainQuestion.hint
  }

  constructor(@Self() @Inject(QUIZ_STATE) public service: QuizPlayable) {}
}
