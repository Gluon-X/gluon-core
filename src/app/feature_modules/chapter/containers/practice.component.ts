import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { filter, switchMap } from 'rxjs/operators'
import { isNotUndefined } from 'src/app/shared'
import { grades } from '../models/dummy_data'
import { GradeNav } from '../models/interfaces'
import { ChaptersHandler } from '../services'
import { ExercisePickable } from '../services/chapter_provider.service'

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
    return isNotUndefined(this._chapterProvider.qid)
  }

  get qid(): string {
    return this._chapterProvider.qid
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
    private _chapterProvider: ChaptersHandler,
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
    this._chapterProvider.qid = undefined
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
      <h1 class="font-bold font-serif text-2xl md:text-4xl">
        Chương {{ cid }}: {{ name }}
      </h1>

      <p class="text-base font-normal text-justify py-6">
        {{ description }}
      </p>
    </article>

    <app-exercise-list [exerciseService]="exerciseService"></app-exercise-list>
  `,
})
export class ChapterDisplayComponent {
  get cid(): string {
    return this.chapterProvider.cid
  }

  get name(): string {
    return this.chapterProvider.name
  }

  get description(): string {
    return this.chapterProvider.description
  }

  get exerciseService(): ExercisePickable {
    return this.chapterProvider
  }

  constructor(
    private chapterProvider: ChaptersHandler,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(({ chapter }) => {
      chapterProvider.cid = `${chapter}`
    })
  }
}
