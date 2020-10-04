import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PhaseIndicatorComponent } from './components/phase-indicator/phase-indicator.component'
import { QuizHeaderComponent } from './components/quiz-header/quiz-header.component'
import { QuizAppComponent } from './containers/quiz-app/quiz-app.component'
import {
  QUIZ_STATE,
  QuizHandler,
  QuizStorage,
} from './services/quiz-provider.service'
import { AnswerCardComponent } from './containers/answer-card.component'
import { QuizShowcaseComponent } from './components/quiz-showcase.component'
import { FormsModule } from '@angular/forms';
import { AnswerListViewComponent } from './components/answers-type/list/answer-type-list.component'

@NgModule({
  imports: [CommonModule, FormsModule],
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

    // Attribute Directives
  ],
  providers: [
    QuizStorage,
    {
      provide: QUIZ_STATE,
      useClass: QuizHandler,
    },
  ],
})
export class QuizModule {}
