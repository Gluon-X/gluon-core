import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PhaseIndicatorComponent } from './components/phase-indicator/phase-indicator.component'
import { QuizHeaderComponent } from './components/quiz-header/quiz-header.component'
import { QuizAppComponent } from './containers/quiz-app.component'
import { QuizProvider, QUIZ_STATE } from './services/quiz-provider.service'

@NgModule({
  imports: [CommonModule],
  exports: [QuizAppComponent],
  declarations: [
    QuizAppComponent,
    PhaseIndicatorComponent,
    QuizHeaderComponent,
  ],
  providers: [
    {
      provide: QUIZ_STATE,
      useClass: QuizProvider,
    },
  ],
})
export class QuizModule {}
