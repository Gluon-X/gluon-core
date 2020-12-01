import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from '../../shared'
import { ChapterComponent } from './containers/chapter.component'
import { ListComponent, ListItemComponent } from './components/list.component'
import {
  ExerciseCardComponent,
  ExerciseItemComponent,
  ExerciseLoadingComponent,
  ProblemListComponent
} from './components/exercise-card.component'
import {
  CrossIconComponent,
  NavbarComponent,
  SearchIconComponent
} from './components/navbar.component'
import { QuizModule } from '../quiz'
import { RouterModule, Routes } from '@angular/router'
import {
  ChapterDisplayComponent,
  PracticeComponent,
  PracticeWelcomeComponent
} from './containers/practice.component'
import { CoursesComponent, TodayComponent } from './containers/today.component'
import { FormsModule } from '@angular/forms'
import { SearchbarComponent } from './components/searchbar.component'
import { SearchComponent } from './containers/search.component'
import { QUIZ_STATE, QuizHandler } from '../quiz/services'
import { UnderConstructionComponent } from './containers/under-construction.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/practice/0/0'
  },
  {
    path: 'today',
    pathMatch: 'full',
    component: TodayComponent
  },
  {
    path: 'courses',
    pathMatch: 'full',
    component: CoursesComponent
  },
  {
    path: 'practice',
    component: PracticeComponent,
    children: [
      {
        path: ':grade/:chapter',
        component: ChapterDisplayComponent
      },
      // {
      //   path: '',
      //   component: PracticeWelcomeComponent,
      //   redirectTo: '0/0',
      // },
      {
        path: '**',
        redirectTo: '0/0'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/practice/0/0'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class ChapterRoutingModule {
}

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    QuizModule,
    ChapterRoutingModule,
    FormsModule
  ],
  exports: [ChapterComponent],
  declarations: [
    ListComponent,
    ChapterComponent,
    ListItemComponent,
    ExerciseCardComponent,
    ExerciseLoadingComponent,
    NavbarComponent,
    ExerciseItemComponent,
    ProblemListComponent,
    PracticeComponent,
    TodayComponent,
    CoursesComponent,
    PracticeWelcomeComponent,
    ChapterDisplayComponent,
    SearchIconComponent,
    CrossIconComponent,
    SearchbarComponent,
    SearchComponent,
    UnderConstructionComponent
  ],
  providers: [
    {
      provide: QUIZ_STATE,
      useClass: QuizHandler
    }
  ]
})
export class ChapterModule {
}
