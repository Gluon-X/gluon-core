import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PhaseIndicatorComponent } from './components/phase-indicator/phase-indicator.component'
import { QuizHeaderComponent } from './components/quiz-header/quiz-header.component'
import { QuizAppComponent } from './containers/quiz-app.component'
import { DummyQuizProvider, QuizProvider, QUIZ_STATE } from './services/quiz-provider.service'
import { AngularFireModule } from '@angular/fire'
import { environment } from 'src/environments/environment'
import { AngularFireFunctions } from '@angular/fire/functions'

@NgModule({
  imports: [CommonModule,AngularFireModule.initializeApp(environment.firebase),AngularFireFunctions],
  exports: [QuizAppComponent],
  declarations: [
    QuizAppComponent,
    PhaseIndicatorComponent,
    QuizHeaderComponent,
  ],
  providers: [
    {
      provide: QUIZ_STATE,
      useClass: DummyQuizProvider,
    },
  ],
})
export class QuizModule {}
