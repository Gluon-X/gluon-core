import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from '../../shared'
import { ChapterComponent } from './containers/chapter.component'
import { ListComponent, ListItemComponent } from './components/list.component'
import { ExerciseCardComponent, ExerciseItemComponent, ProblemListComponent } from './components/exercise-card.component'
import { NavbarComponent } from './components/navbar.component'

@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [ChapterComponent],
  declarations: [
    ListComponent,
    ChapterComponent,
    ListItemComponent,
    ExerciseCardComponent,
    NavbarComponent,
    ExerciseItemComponent,
    ProblemListComponent
  ]
})
export class ChapterModule {
}
