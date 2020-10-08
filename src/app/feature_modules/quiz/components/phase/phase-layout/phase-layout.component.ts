import { ThrowStmt } from '@angular/compiler'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Question } from '../../../models/interfaces'

@Component({
  selector: 'app-phase-layout',
  templateUrl: './phase-layout.component.html',
  styleUrls: ['./phase-layout.component.scss'],
})
export class PhaseLayoutComponent implements OnInit {
  @Input() openQuestion: string
  @Input() phaseQuestions: Array<Question>
  @Output() onSubmit = new EventEmitter()
  constructor() {}

  ngOnInit(): void {}

  submit(answear) {
    this.onSubmit.emit(answear)
  }
}
