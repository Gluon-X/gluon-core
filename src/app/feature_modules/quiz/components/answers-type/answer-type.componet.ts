import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AnswerListViewComponent } from './list/answer-type-list.component'
import { AnswerTextViewComponent } from './input-box/answer-type-input-box.component'
@Component({
  selector: 'app-quiz-answear-type',
  template: `
    <div #textView *ngIf="this.answearType == 'TEXT'; else listView">
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
        [listOfQuestions]="this.answearContent"
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
  `,
})
export class AnswearTypeComponent {
  @Input() answearType: string
  @Input() hasHelp: boolean
  @Output() onSubmit = new EventEmitter<String | number | number[]>()

  inputAnswear: String | number | number[]

  @Input() answearContent?: string
  @Output() enableHelp = new EventEmitter()

  toggleHelp() {
    this.enableHelp.emit()
  }
  saveAnswear(event) {
    this.inputAnswear = event
  }

  submitAnswear() {
    this.onSubmit.emit(this.inputAnswear)
  }
}
