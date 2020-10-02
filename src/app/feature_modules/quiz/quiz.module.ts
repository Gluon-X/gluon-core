import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PhaseIndicatorComponent } from './components/phase-indicator/phase-indicator.component'
import { QuizHeaderComponent } from './components/quiz-header/quiz-header.component'
import { QuizAppComponent } from './containers/quiz-app.component'
import { QuizStorage } from './services/quiz-provider.service'
import { AnswerCardComponent } from './containers/answer-card.component'
import { QuizShowcaseComponent } from './components/quiz-showcase.component'
import { FormsModule } from '@angular/forms'

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

    // Attribute Directives
  ],
  providers: [QuizStorage],
})
export class QuizModule {}
