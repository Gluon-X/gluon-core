import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

import {
  BoxType,
  MultipleChoicesProvider,
  ShortAnswerProvider,
} from '../../models'

@Component({
  selector: 'app-quiz-answear-type',
  template: `
    <ng-container *ngIf="this.answearBoxData">
      🐞 Debug Correct Answer : {{ getDebugAnswear() }}

      <div
        #textView
        *ngIf="
          this.answearType == QuestionAnswearType.SHORT_ANSWER;
          else listView
        "
      >
        <app-quiz-answer-type-input-text
          (writedAnswear)="this.saveAnswear($event)"
        ></app-quiz-answer-type-input-text>
        <div
          class="flex flex-row justify-between px-3 m-4"
          style="min-width: 300px;"
        >
          <button
            (click)="this.submitAnswear()"
            style="min-width: 170px;"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Kiểm tra kết quả
          </button>
          <button
            *ngIf="this.hasHelp"
            (click)="toggleHelp()"
            class="bg-gray-200 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
          >
            Trợ giúp
          </button>
        </div>
      </div>
      <ng-template #listView>
        <app-quiz-answer-type-list
          (choosenAnswear)="this.saveAnswear($event)"
          [isDone]="this.praseMultipleChoicesProvider()"
          [listOfQuestions]="this.praseMultipleChoicesProvider().choices"
        ></app-quiz-answer-type-list>
        <div
          class="flex flex-row justify-between px-3 m-4"
          style="min-width: 300px;"
        >
          <button
            (click)="this.submitAnswear()"
            style="min-width: 170px;"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Kiểm tra kết quả
          </button>
          <button
            *ngIf="this.hasHelp == null"
            class="bg-gray-200 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
          >
            Giợi ý
          </button>
        </div>
      </ng-template>
    </ng-container>
  `,
})
export class AnswearTypeComponent implements OnInit {
  @Input() answearType: BoxType

  @Input() hasHelp: boolean

  @Output() onSubmit = new EventEmitter<string | number | number[]>()

  @Input() answearBoxData: MultipleChoicesProvider | ShortAnswerProvider

  @Output() enableHelp = new EventEmitter()

  inputAnswear: string | number | number[]

  public QuestionAnswearType: typeof BoxType = BoxType

  toggleHelp() {
    this.enableHelp.emit()
  }

  saveAnswear(event) {
    this.inputAnswear = event
  }

  ngOnInit(): void {
    console.log(this.answearType)
  }

  praseMultipleChoicesProvider() {
    // console.log((this.answearBoxData as MultipleChoicesProvider).choices)
    return this.answearBoxData as MultipleChoicesProvider
  }

  praseShortAnswerProvider() {
    return this.answearBoxData as ShortAnswerProvider
  }

  getDebugAnswear() {
    if (this.answearBoxData instanceof ShortAnswerProvider) {
      return (this.answearBoxData as ShortAnswerProvider).correctAnswear
    } else {
      return (this.answearBoxData as MultipleChoicesProvider).choices.filter(
        (choice) => choice.isCorrect
      )[0].content
    }
  }

  submitAnswear() {
    if (this.answearType == this.QuestionAnswearType.SHORT_ANSWER) {
      (this.answearBoxData as ShortAnswerProvider).submit((String)(this.inputAnswear))
    } else {
      (this.answearBoxData as MultipleChoicesProvider).submit((this.inputAnswear as number))

    }
    console.log(this.answearBoxData.isCorrect)

    this.onSubmit.emit(this.inputAnswear)
  }
}
