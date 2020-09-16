import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DummyQuizState, QUIZ_STATE } from './services/quiz-state.service'
import { QuizFacade } from './services/quiz-facade.service'
import { PhaseIndicatorComponent } from './components/phase-indicator/phase-indicator.component'
import { QuizHeaderComponent } from './components/quiz-header/quiz-header.component'
import { QuizAppComponent } from './containers/quiz-app.component'

@NgModule({
  imports: [CommonModule],
  exports: [QuizAppComponent],
  declarations: [
    QuizAppComponent,
    PhaseIndicatorComponent,
    QuizHeaderComponent,
  ]
})
export class QuizModule {}
