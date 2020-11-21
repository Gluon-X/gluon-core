import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from '../../shared'
import { ChapterComponent } from './containers/chapter.component'
import { ListComponent, ListItemComponent } from './components/list.component'
import {
  ExerciseCardComponent,
  ExerciseItemComponent,
  ProblemListComponent,
} from './components/exercise-card.component'
import { NavbarComponent } from './components/navbar.component'
import { QuizModule } from '../quiz'
import { RouterModule, Routes } from '@angular/router'
import {
  ChapterDisplayComponent,
  PracticeComponent,
  PracticeWelcomeComponent,
} from './containers/practice.component'
import { CoursesComponent, TodayComponent } from './containers/today.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/practice',
  },
  {
    path: 'today',
    pathMatch: 'full',
    component: TodayComponent,
  },
  {
    path: 'courses',
    pathMatch: 'full',
    component: CoursesComponent,
  },
  {
    path: 'practice',
    component: PracticeComponent,
    children: [
      {
        path: ':grade/:chapter',
        component: ChapterDisplayComponent,
      },
      {
        path: '',
        component: PracticeWelcomeComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/practice',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class ChapterRoutingModule {}

@NgModule({
  imports: [CommonModule, SharedModule, QuizModule, ChapterRoutingModule],
  exports: [ChapterComponent],
  declarations: [
    ListComponent,
    ChapterComponent,
    ListItemComponent,
    ExerciseCardComponent,
    NavbarComponent,
    ExerciseItemComponent,
    ProblemListComponent,
    PracticeComponent,
    TodayComponent,
    CoursesComponent,
    PracticeWelcomeComponent,
    ChapterDisplayComponent,
  ],
})
export class ChapterModule {}
