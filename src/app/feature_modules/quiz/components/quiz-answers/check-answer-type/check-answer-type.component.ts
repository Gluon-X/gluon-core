import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ShortAnswerProvider } from '../../../models'

@Component({
  selector: 'app-check-answer',
  templateUrl: './check-answer-type.component.html',
})
export class CheckAnswerTypeComponent {
  @Input() checkAnswer: boolean = true
}
