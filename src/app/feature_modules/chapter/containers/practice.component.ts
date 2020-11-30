import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { filter, switchMap } from 'rxjs/operators'
import { isUndefined } from 'src/app/shared'
import { QuizPlayable, QuizState } from '../../quiz/models'
import { QUIZ_STATE } from '../../quiz/services'
import { grades } from '../models/dummy_data'
import { ChapterNav, Exercise, GradeNav } from '../models/interfaces'
import { ChaptersHandler } from '../services'

@Component({
  template: `
    <div
      *ngIf="!isQuizReady"
      class="flex flex-col px-2 divide-y-2 md:divide-y-0 md:flex-row xl:px-0"
    >
      <div class="block pb-4 flex-1 md:flex-none md:pb-0">
        <app-list
          *ngFor="let grade of gradesNav; let i = index"
          [index]="i"
          [grade]="grade"
          (collapse)="grade.isActive = !grade.isActive"
        ></app-list>
      </div>

      <div class="flex-1 pt-4 px-2 md:pt-0 md:px-0 md:px-4 lg:px-0 lg:pl-8">
        <router-outlet></router-outlet>

        <div class="h-2 md:h-8"></div>
      </div>
    </div>

    <app-quiz
      *ngIf="isQuizReady"
      [quizId]="qid"
      (return)="onReturn()"
    ></app-quiz>
  `,
  providers: [ChaptersHandler],
})
export class PracticeComponent implements OnInit, OnDestroy {
  get isQuizReady(): boolean {
    return this.quizService.state === QuizState.READY
  }

  get qid(): string {
    return this.quizService.qid
  }

  get gradesNav(): GradeNav[] {
    let navControls = grades

    for (let g = 0; g < navControls.length; g++) {
      for (let c = 0; c < navControls[g].chapters.length; c++) {
        navControls[g].chapters[c].isActive =
          g == this._grade && c == this._chapter
      }
    }
    return navControls
  }

  private _chapter?: number

  private _grade?: number

  private _routerEventSubcription: Subscription

  constructor(
    @Inject(QUIZ_STATE) public quizService: QuizPlayable,
    private _activeRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnDestroy() {
    this._routerEventSubcription?.unsubscribe()
  }

  ngOnInit() {
    // Collect `chapter` & `grade` params at first render,
    // since ActivatedRoute event listener does not
    // pass NavigationEnd event instance at first render.
    let subscription: Subscription
    subscription = this._activeRoute.firstChild.params.subscribe(
      ({ chapter, grade }) => {
        subscription?.unsubscribe()
        this._chapter = parseInt(chapter)
        this._grade = parseInt(grade)
      }
    )

    // Listen to NavigationEnd events to update Chapter navigation panel
    // whenever child route changes.
    // Cannot subscribe to `firstChild.params`because it does not emit event in this scenario:
    // - Navigate to other tab from the top nav (`Today`) -> OnDestroy invokes
    // - Navigate back to `Practice` tab -> OnInit invokes
    // - Pick a chapter -> `firstChild.params` subscriber invokes at first, but then stop immediatly.
    // => Still no idea why?
    // Reference of this solution: https://github.com/angular/angular/issues/11692
    this._routerEventSubcription = this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        switchMap(
          () =>
            this._activeRoute.firstChild && this._activeRoute.firstChild.params
        )
      )
      .subscribe(({ chapter, grade }) => {
        this._chapter = parseInt(chapter)
        this._grade = parseInt(grade)
      })
  }

  onReturn() {
    this.quizService.qid = undefined
  }
}

@Component({
  template: `
    <article class="subpixel-antialiased">
      <h1 class="font-bold font-serif text-2xl md:text-4xl">
        Welcome to practice page
      </h1>
    </article>
  `,
})
export class PracticeWelcomeComponent {}

@Component({
  template: `
    <article class="subpixel-antialiased">
      <h1 class="font-bold font-serif text-2xl pb-6 md:text-4xl">
        {{ name }}
      </h1>

      <p
        *ngIf="description?.length > 0"
        class="text-base font-normal text-justify pb-6"
      >
        {{ description }}
      </p>
    </article>

    <app-exercise-list
      [quizService]="quizService"
      [exercises]="exercises"
      [isFetching]="isFetching"
    ></app-exercise-list>
  `,
})
export class ChapterDisplayComponent {
  private get _currentChapter(): ChapterNav | undefined {
    return grades[this._gid]?.chapters[this._cid]
  }

  get name(): string {
    return this._currentChapter?.name
  }

  get description(): string {
    return this._currentChapter?.description
  }

  get exercises(): Exercise[] | undefined {
    return this.chapterProvider.exercises
  }

  get isFetching(): boolean {
    return isUndefined(this.exercises)
  }

  private _cid?: number

  private _gid?: number

  constructor(
    @Inject(QUIZ_STATE) public quizService: QuizPlayable,
    private chapterProvider: ChaptersHandler,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(({ grade, chapter }) => {
      chapterProvider.cid = `${chapter}`
      this._gid = parseInt(grade)
      this._cid = parseInt(chapter)
    })
  }
}
