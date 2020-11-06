import { ThrowStmt } from '@angular/compiler'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Box, MultipleChoicesProvider, ShortAnswerProvider } from '../../../models'
import { Question } from '../../../models/interfaces'

@Component({
  selector: 'app-phase-layout',
  templateUrl: './phase-layout.component.html',
  styleUrls: ['./phase-layout.component.scss'],
})
export class PhaseLayoutComponent implements OnInit {
  @Input() openQuestion: string
  @Input() phaseQuestions: MultipleChoicesProvider | ShortAnswerProvider
  @Output() onSubmit = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
    // console.log("This is phase Layout")
    console.log(this.phaseQuestions);
  }

  submit(answear) {
    this.onSubmit.emit(answear)
  }
}
