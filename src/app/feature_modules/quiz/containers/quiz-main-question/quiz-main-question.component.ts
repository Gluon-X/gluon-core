import { ThrowStmt } from '@angular/compiler'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { retry } from 'rxjs/operators'
import { Box, MultiBoxesProvider, MultiPhasesProvider, MultipleChoicesProvider, PossibleInputAnswer, QuestionProvider, ShortAnswerProvider, Submitable } from '../../models'

@Component({
  selector: 'app-quiz-main-question',
  templateUrl: './quiz-main-question.component.html',
  styleUrls: ['./quiz-main-question.component.scss'],
})
export class QuizMainQuestionComponent {
  @Input()
  question: Box;

  @Input()
  isMainQuestion = true

  @Output()
  return = new EventEmitter()

  @Output()
  onHelp = new EventEmitter();

  @Input() quizTitle: string

  get instance() {
    console.log(this.question)
    if (this.question instanceof MultiBoxesProvider || this.question instanceof MultiPhasesProvider) {
      return (this.question as any).current
    }
    return this.question
  }

  submission(answear: PossibleInputAnswer) {
    console.log(answear);
    if (this.question instanceof MultiPhasesProvider) {
      ((this.question as any) as MultiPhasesProvider).submit(answear);
      // ((this.question as any) as MultiPhasesProvider).next();
      // console.log(((this.question as any) as MultiPhasesProvider).isCorrect)
    } else {
      if ((this.question instanceof ShortAnswerProvider)) {
        console.log("OK");
        (this.question as ShortAnswerProvider).submit(answear);

      }
      if ((this.question instanceof MultipleChoicesProvider)) {
        (this.question as MultipleChoicesProvider).submit(answear as number);

      }

    }
  }

  praseMulthiPhaseProvider(): MultiPhasesProvider | undefined {
    if (this.question instanceof MultiPhasesProvider) {
      return this.question as MultiPhasesProvider;
    }
    return undefined
  }

}
