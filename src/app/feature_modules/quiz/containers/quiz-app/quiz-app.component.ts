import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core'
import { QuizPlayable } from '../../models/interfaces'
import { QuizStorage, QUIZ_STATE } from '../../services/quiz-provider.service'
import {QuestionType, QuizState} from '../../models/enums';
import {MainQuestion} from '../../models/interfaces';
import {realDummyData} from '../../models/dummy_data'
@Component({
  selector: 'app-quiz',
  templateUrl:'./quiz-app.component.html'
})
export class QuizAppComponent {
  fakeData = realDummyData["GID11060001"];
  answearType:QuestionType
  @ViewChild("helpQuestionRef") quizHelpBox: ElementRef<HTMLElement>;

  
  enableHelp = false;
  @Input()
  set quizId(value: string) {
    this.service.qid = value
    console.log(this.service.qid)
  }

  get hint(): string {
    return this.service.mainQuestion.hint
  }

  constructor(@Inject(QUIZ_STATE) public service: QuizPlayable) { 
  }

  toggleHelp(){
    this.enableHelp = !this.enableHelp
    setTimeout(() => {
      this.quizHelpBox.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" })

    }, 100);
  }
}
