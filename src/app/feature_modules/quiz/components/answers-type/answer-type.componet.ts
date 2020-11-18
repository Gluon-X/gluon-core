import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

import { BoxType, ShortAnswer, MultipleChoices, MultipleChoicesProvider, ShortAnswerProvider } from '../../models';
import { AnswerListViewComponent } from './list/answer-type-list.component'
import { AnswerTextViewComponent } from './input-box/answer-type-input-box.component'
@Component({
  selector: 'app-quiz-answear-type',
  templateUrl: './answer-type.componet.html'
})
export class AnswearTypeComponent implements OnInit {


  @Input() answearType: BoxType
  @Input() hasHelp: boolean
  @Output() onSubmit = new EventEmitter<String | number | number[]>()

  @Input() answearBoxData: MultipleChoicesProvider | ShortAnswerProvider;
  @Output() enableHelp = new EventEmitter()
  inputAnswear: String | number | number[]

  public QuestionAnswearType: typeof BoxType = BoxType;


  toggleHelp() {
    this.enableHelp.emit()
  }
  saveAnswear(event) {
    this.inputAnswear = event
  }

  ngOnInit(): void {
  }

  praseMultipleChoicesProvider() {
    console.log((this.answearBoxData as MultipleChoicesProvider).choices)
    return this.answearBoxData as MultipleChoicesProvider;
  }

  praseShortAnswerProvider() {
    return this.answearBoxData as ShortAnswerProvider;

  }

  getDebugAnswear() {
    if (this.answearBoxData instanceof ShortAnswerProvider) {
      return (this.answearBoxData as ShortAnswerProvider).correctAnswear;
    } else {
      return (this.answearBoxData as MultipleChoicesProvider).choices.filter(choice => choice.isCorrect)[0].content;
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
