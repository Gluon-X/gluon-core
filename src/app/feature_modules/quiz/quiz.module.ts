import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PhaseIndicatorComponent } from './components/phase/phase-indicator/phase-indicator.component'
import { QuizHeaderComponent } from './components/quiz-header/quiz-header.component'
import { KatexModule } from 'ng-katex'
import { QuizAppComponent } from './containers/quiz-app/quiz-app.component'
import { AnswerCardComponent } from './containers/answer-card.component'
import { QuizShowcaseComponent } from './components/quiz-showcase.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AnswerListViewComponent } from './components/answers-type/list/answer-type-list.component'
import { AnswerTextViewComponent } from './components/answers-type/input-box/answer-type-input-box.component'
import { QuizPhaseWrapperComponent } from './containers/quiz-phase-wrapper/quiz-phase-wrapper.component'
import { PhaseLayoutComponent } from './components/phase/phase-layout/phase-layout.component'
import { AnswearTypeComponent } from './components/answers-type/answer-type.componet'
import { QuizMainQuestionComponent } from './containers/quiz-main-question/quiz-main-question.component'
import { QuizWikiComponent } from './components/quiz-wiki/quiz-wiki.component'
import { SharedModule } from 'src/app/shared'
import { HttpClientModule } from '@angular/common/http'
import { QuizAnswersComponent } from './components/quiz-answers/quiz-answers.component'
import { MultichoicesTypeComponent } from './components/quiz-answers/multichoices-type/multichoices-type.component'
import { InputTypeComponent } from './components/quiz-answers/input-type/input-type.component'
import { CheckAnswerTypeComponent } from './components/quiz-answers/check-answer-type/check-answer-type.component'
import {
  AnswerPhaseHeaderComponent,
  QuestionIndicatorComponent,
} from './components/quiz-answers/answer-phase-header.component';
import { QuizQuestionComponent } from './components/quiz-question/quiz-question/quiz-question.component';
import { QuizQuestionMediaComponent } from './components/quiz-question/quiz-question-media/quiz-question-media.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    KatexModule,
    SharedModule,
    HttpClientModule,
  ],
  exports: [QuizAppComponent],
  declarations: [
    // Containers
    QuizAppComponent,

    // Components
    PhaseIndicatorComponent,
    QuizHeaderComponent,
    AnswerCardComponent,
    QuizShowcaseComponent,
    AnswerListViewComponent,
    AnswerTextViewComponent,
    QuizPhaseWrapperComponent,
    PhaseLayoutComponent,
    AnswearTypeComponent,
    QuizMainQuestionComponent,
    QuizWikiComponent,
    QuizAnswersComponent,
    MultichoicesTypeComponent,
    InputTypeComponent,
    CheckAnswerTypeComponent,
    AnswerPhaseHeaderComponent,
    QuestionIndicatorComponent,
    QuizQuestionComponent,
    QuizQuestionMediaComponent,
  ],
})
export class QuizModule {}
