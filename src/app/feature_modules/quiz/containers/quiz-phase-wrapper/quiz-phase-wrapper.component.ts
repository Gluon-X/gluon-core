import { ThrowStmt } from '@angular/compiler'
import { Component, Input, OnInit } from '@angular/core'
import { PossibleInputAnswer, Question } from '../../models'
import {
  MultiPhasesProvider,
  MultiBoxesProvider,
} from '../../models'
import { realDummyData } from '../../models/dummy_data'
import { PhaseStack } from '../../models/interfaces'

@Component({
  // Render [subQuestions] xN
  selector: 'app-quiz-phase-wrapper',
  templateUrl: './quiz-phase-wrapper.component.html',
  styleUrls: ['./quiz-phase-wrapper.component.scss'],
})
export class QuizPhaseWrapperComponent implements OnInit {
  @Input() phaseProvider: MultiPhasesProvider
  // @Input() multiQuestionProvider: MultiQuestionsProvider
  constructor() { }

  ngOnInit(): void { }
  getPhaseList() {
    return Array(this.phaseProvider.count).fill(0)
  }

  submitAnswear(asnwear: PossibleInputAnswer) {
    this.phaseProvider.submit(asnwear)
    this.phaseProvider.next()
  }
}
