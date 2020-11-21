import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

import {
  BoxType,
  ShortAnswer,
  MultipleChoices,
  MultipleChoicesProvider,
  ShortAnswerProvider,
} from '../../models'
@Component({
  selector: 'app-quiz-answers',
  template: `
    <div class="m-4">
      <app-answer-pharse-header></app-answer-pharse-header>
      <ng-template
        #inputHeader
        *ngIf="
          this.answerType == QuestionAnswerType.SHORT_ANSWER;
          else multichoicesHeader
        "
      >
        <p
          class="font-sans text-gray-900 flex justify-start text-base font-semibold"
        >
          Hãy nhập đáp án đúng
        </p>
      </ng-template>
      <ng-template #multichoicesHeader>
        <p
          class="font-sans text-gray-900 flex justify-start text-base font-semibold"
        >
          Hãy chọn đáp án đúng
        </p>
      </ng-template>
    </div>
    <div class="">
      <!-- <ng-template
        #inputView
        *ngIf="
          this.answerType == QuestionAnswerType.SHORT_ANSWER;
          else multichoicesView
        "
      >
        <app-input-answer></app-input-answer>
      </ng-template> -->
      <app-input-answer></app-input-answer>
      <ng-template #multichoicesView>
        <app-multichoices-answer
          [listOfQuestions]="this.praseMultipleChoicesProvider().choices"
        ></app-multichoices-answer>
      </ng-template>
    </div>
    <div class="flex flex-col w-full">
      <g-button
        class="flex-grow w-full"
        [options]="{ type: 0, title: 'Kiểm tra' }"
      ></g-button>
      <g-button
        class="flex-grow w-full"
        [options]="{ type: 1, title: 'Trợ giúp' }"
      ></g-button>
    </div>
  `,
})
export class QuizAnswersComponent implements OnInit {
  @Input() answerType: BoxType

  @Input() answersBoxData: MultipleChoicesProvider | ShortAnswerProvider

  inputAnswers: string | number | number[]

  public QuestionAnswerType: typeof BoxType = BoxType

  ngOnInit(): void {}

  praseMultipleChoicesProvider() {
    return this.answersBoxData as MultipleChoicesProvider
  }
}
