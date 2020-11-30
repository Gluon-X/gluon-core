import { Component, EventEmitter, Input, Output } from '@angular/core'
import { PossibleInputAnswer, ShortAnswerProvider } from '../../../models'

@Component({
  selector: 'app-input-answer',
  templateUrl: './input-type.component.html',
})
export class InputTypeComponent {
  @Input()
  question: ShortAnswerProvider
  @Output() onTextInput: EventEmitter<PossibleInputAnswer> = new EventEmitter;
  @Input() answearExplaination: string;

  onInputText() {
    this.onTextInput.emit(this.answer)
  }

  answer: string
}
