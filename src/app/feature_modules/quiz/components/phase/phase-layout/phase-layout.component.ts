import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { MultipleChoicesProvider, ShortAnswerProvider } from '../../../models'

@Component({
  selector: 'app-phase-layout',
  templateUrl: './phase-layout.component.html',
  styleUrls: ['./phase-layout.component.scss']
})
export class PhaseLayoutComponent implements OnInit {
  @Input() openQuestion: string

  @Input() phaseQuestions: MultipleChoicesProvider | ShortAnswerProvider

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSubmit = new EventEmitter()

  ngOnInit(): void {
    // console.log("This is phase Layout")
    // console.log(this.phaseQuestions)
  }

  submit(answear) {
    this.onSubmit.emit(answear)
  }
}
