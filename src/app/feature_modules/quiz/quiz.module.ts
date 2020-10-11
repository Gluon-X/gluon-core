import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PhaseIndicatorComponent } from './components/phase/phase-indicator/phase-indicator.component'
import { QuizHeaderComponent } from './components/quiz-header/quiz-header.component'
import { QuizAppComponent } from './containers/quiz-app/quiz-app.component'
import {
  QUIZ_STATE,
  QuizHandler,
  QuizStorage,
} from './services/quiz-provider.service'
import { AnswerCardComponent } from './containers/answer-card.component'
import { QuizShowcaseComponent } from './components/quiz-showcase.component'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AnswerListViewComponent } from './components/answers-type/list/answer-type-list.component'
import {AnswerTextViewComponent } from "./components/answers-type/input-box/answer-type-input-box.component";
import { QuizPhaseWrapperComponent } from './containers/quiz-phase-wrapper/quiz-phase-wrapper.component';
import { PhaseLayoutComponent } from './components/phase/phase-layout/phase-layout.component';
import { AnswearTypeComponent } from './components/answers-type/answer-type.componet';
import { QuizMainQuestionComponent } from './containers/quiz-main-question/quiz-main-question.component';
import { QuizWikiComponent } from './components/quiz-wiki/quiz-wiki.component'

@NgModule({
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
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
    QuizWikiComponent

    // Attribute Directives
  ],
  providers: [
    QuizStorage,
  ],
})
export class QuizModule {}
