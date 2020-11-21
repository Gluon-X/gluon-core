import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { QuestionProvider } from '../../models'

@Component({
  selector: 'app-quiz-main-question',
  templateUrl: './quiz-main-question.component.html',
  styleUrls: ['./quiz-main-question.component.scss'],
})
export class QuizMainQuestionComponent implements OnInit {
  @Input() mainQuestionProvider: QuestionProvider

  @Input() quizTitle: string

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onMainQuestionSubmition = new EventEmitter()

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onHelp = new EventEmitter()

  isEnableHelp: boolean = false

  ngOnInit(): void {
    // this.enableHelp();
  }

  submitAnswer(event) {
    this.onMainQuestionSubmition.emit(event)
  }

  enableHelp() {
    this.isEnableHelp = !this.isEnableHelp
    this.onHelp.emit()
  }
}
