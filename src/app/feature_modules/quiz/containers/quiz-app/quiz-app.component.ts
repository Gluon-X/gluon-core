import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core'
import { QuizPlayable } from '../../models'
import { QUIZ_STATE } from '../../services'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz-app.component.html',
})
export class QuizAppComponent {
  // answearType: QuestionType
  @ViewChild('helpQuestionRef') quizHelpBox: ElementRef<HTMLElement>

  enableHelp = true

  @Input()
  set quizId(value: string) {
    this.service.qid = value
  }

  @Output()
  return = new EventEmitter()

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
