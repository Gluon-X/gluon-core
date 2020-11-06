import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core'
import { QuizPlayable } from '../../models'
import { QuizHandler, QUIZ_STATE } from '../../services'
import { realDummyData } from '../../models/dummy_data'
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
  fakeData = realDummyData['GID11060001']
  // answearType: QuestionType
  @ViewChild('helpQuestionRef') quizHelpBox: ElementRef<HTMLElement>

  enableHelp = true;
  @Input()
  set quizId(value: string) {
    this.service.qid = value
    console.log(this.service.qid)
  }

  get hint(): string {

    return this.service.mainQuestion.hint
  }

  constructor(@Inject(QUIZ_STATE) public service: QuizPlayable) {
    //TODO core feature calling to services
    // INPUT OUTPUT TO CHILD
  }

  toggleHelp() {
    console.log(this.service)
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
    console.log(this.service.mainQuestion.isCorrect)
  }
}
