import { ThrowStmt } from '@angular/compiler'
import { Component, Input, OnInit } from '@angular/core'
import {
  MultiPhasesProvider,
  MultiQuestionsProvider,
} from '../../models/classes'
import { PhaseStack } from '../../models/interfaces'
@Component({
  // Render [subQuestions] xN
  selector: 'app-quiz-phase-wrapper',
  templateUrl: './quiz-phase-wrapper.component.html',
  styleUrls: ['./quiz-phase-wrapper.component.scss'],
})
export class QuizPhaseWrapperComponent implements OnInit {
  @Input() phaseProvider: MultiPhasesProvider
  @Input() multiQuestionProvider: MultiQuestionsProvider
  constructor() {}

  ngOnInit(): void {}
  getPhaseList() {
    return Array(this.phaseProvider.phasesCount).fill(0)
  }

  test() {
    this.phaseProvider.submit(2)
    this.phaseProvider.isCorrect
    this.phaseProvider.next()
    this.phaseProvider.submit(1)
  }
}
