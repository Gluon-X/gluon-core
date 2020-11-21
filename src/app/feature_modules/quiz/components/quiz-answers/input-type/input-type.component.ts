import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ShortAnswerProvider } from '../../../models'

@Component({
  selector: 'app-input-answer',
  templateUrl: './input-type.component.html',
})
export class InputTypeComponent {
  @Input()
  question: ShortAnswerProvider

  answer: string
}
