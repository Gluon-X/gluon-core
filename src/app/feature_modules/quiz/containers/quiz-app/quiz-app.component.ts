import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core'
import { QuizPlayable } from '../../models'
import { QuizHandler, QUIZ_STATE } from '../../services'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz-app.component.html',
  providers: [
    {
      provide: QUIZ_STATE,
      useClass: QuizHandler,
    },
  ],
})
export class QuizAppComponent {
  // answearType: QuestionType
  @ViewChild('helpQuestionRef') quizHelpBox: ElementRef<HTMLElement>

  enableHelp = true

  @Input()
  set quizId(value: string) {
    this.service.qid = value
  }

  get hint(): string {
    return this.service.mainQuestion.hint
  }

  constructor(@Inject(QUIZ_STATE) public service: QuizPlayable) {
    // TODO core feature calling to services
    // INPUT OUTPUT TO CHILD
  }

  toggleHelp() {
    this.enableHelp = !this.enableHelp
    setTimeout(() => {
      this.quizHelpBox.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 100)
  }

  checkAnswear(event) {
    this.service.mainQuestion.submit(event)
  }
}
