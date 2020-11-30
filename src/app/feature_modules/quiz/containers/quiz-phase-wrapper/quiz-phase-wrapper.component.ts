import { Component, Input } from '@angular/core'
import { PossibleInputAnswer } from '../../models'
import { MultiPhasesProvider } from '../../models'

@Component({
  // Render [subQuestions] xN
  selector: 'app-quiz-phase-wrapper',
  templateUrl: './quiz-phase-wrapper.component.html',
  styleUrls: ['./quiz-phase-wrapper.component.scss']
})
export class QuizPhaseWrapperComponent {
  @Input() phaseProvider: MultiPhasesProvider

  // @Input() multiQuestionProvider: MultiQuestionsProvider
  getPhaseList() {
    return Array(this.phaseProvider.count).fill(0)
  }

  submitAnswear(asnwear: PossibleInputAnswer) {
    this.phaseProvider.next()
    // this.phaseProvider.submit(asnwear)
    // this.phaseProvider.next()
  }
}
