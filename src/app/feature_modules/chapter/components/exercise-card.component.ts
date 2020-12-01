import { Component, EventEmitter, Input, Output } from '@angular/core'
import { QuizPlayable } from '../../quiz/models'
import { Exercise, Problem } from '../models/interfaces'

@Component({
  selector: 'app-exercise-list',
  template: `
    <!-- Display shimmering effect when service is fetching chapter data from server -->
    <div
      *ngIf="isFetching"
      class="my-1 px-3 pb-2 box bg-gray-100 rounded shadow divide-y-2 divide-gray-300 divide-solid"
    >
      <div class="px-2 box">
        <app-exercise-loading></app-exercise-loading>
      </div>

      <div class="px-2 box">
        <app-exercise-loading></app-exercise-loading>
      </div>

      <div class="px-2 box">
        <app-exercise-loading></app-exercise-loading>
      </div>
    </div>

    <!-- Display exercises -->
    <div
      *ngIf="!isFetching && exercises !== undefined"
      class="px-2 box bg-gray-100 rounded shadow divide-y-2 divide-gray-300 divide-solid"
    >
      <div *ngFor="let exercise of exercises; let i = index" class="box px-2 pb-2">
        <app-exercise-item [exercise]="exercise" [isActive]="exercise.isActive"></app-exercise-item>
        <app-problems-list
          [problems]="exercise.questions"
          [isActive]="exercise.isActive"
          (pick)="onProblemPick($event)"
        ></app-problems-list>
      </div>
    </div>

    <div
      *ngIf="!isFetching && exercises === undefined"
      class="flex flex-col justify-center items-center"
    >
      <img src="../../../../assets/images/Illustrations/List is Empty.png" alt="Under construction" class="object-contain w-1/2 " />

      <span class="font-black text-xl lg:text-2xl text-center mb-2 mt-4" style="color: #f15634">Chưa có nội dung cho chương này</span>
      <span
        class="text-gray-400 text-sm lg:text-xl text-center font-normal">Xem qua những bài tập khác trong lúc chúng tôi chuẩn bị mọi thứ nhé!</span>
    </div>
  `
})
export class ExerciseCardComponent {
  @Input()
  quizService: QuizPlayable

  @Input()
  exercises?: Exercise[]

  @Input()
  isFetching: boolean = false

  onProblemPick(qid: string) {
    this.quizService.qid = qid
  }
}

@Component({
  selector: 'app-exercise-item',
  template: `
    <div
      class="py-4 flex justify-between cursor-pointer"
      (click)="exercise.toggleCollapse()"
    >
      <span class="truncate select-none">{{ exercise.name }}</span>
      <svg
        class="-mr-1 ml-2 h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        [ngClass]="{ 'transform rotate-180': isActive }"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  `
})
export class ExerciseItemComponent {
  @Input()
  exercise: Exercise

  @Input()
  isActive: boolean
}

@Component({
  selector: 'app-problems-list',
  template: `
    <div
      class="grid grid-cols-1 gap-x-6 transform transition-height duration-200 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2"
      [ngClass]="{
        'h-0 overflow-hidden scale-0': !isActive,
        'scale-100': isActive
      }"
    >
      <div
        *ngFor="let problem of problems; let i = index"
        class="flex flex-row items-center rounded-md cursor-pointer hover:bg-gray-200"
        (click)="onProblemPick(problem.qid)"
      >
        <div class="h-14 w-14 flex flex-col justify-center rounded">
          <img
            [src]="problem.image"
            [alt]="problem.image"
            class="object-contain rounded"
          />
        </div>

        <div
          class="h-full w-full p-2"
          [ngClass]="{
          'border-b-2 border-solid border-gray-200 hover:border-b-0': i !== problems.length - 1,
          'sm:border-b-0 md:border-b-2 lg:border-b-0': i === problems.length - 2
          }"
        >
          <h4 class="truncate font-semibold text-base">{{ problem.name }}</h4>
          <p
            *ngIf="problem.description"
            class="max-h-10 break-words text-sm overflow-hidden"
          >
            {{ problem.description }}
          </p>
        </div>

      </div>
    </div>
  `
})
export class ProblemListComponent {
  @Input()
  isActive = false

  @Input()
  problems: Problem[]

  @Output()
  pick = new EventEmitter<string>()

  onProblemPick(qid: string) {
    this.pick.emit(qid)
  }
}

@Component({
  selector: 'app-exercise-loading',
  template: ` <!-- Exercise collapsible -->
  <div class="py-4 flex justify-between cursor-pointer">
    <div class="rounded bg-gray-300 animate-pulse w-64"></div>
    <svg
      class="-mr-1 ml-2 h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clip-rule="evenodd"
      />
    </svg>
  </div>

  <div
    class="grid grid-cols-1 gap-x-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2"
  >
    <!-- Col 1 -->
    <div class="flex flex-row items-center pb-2">
      <div class="w-12 h-12 rounded bg-gray-300 animate-pulse"></div>

      <div class="flex-auto flex flex-col h-full w-full space-y-1 justify-between ml-4">
        <span class="rounded-sm h-1/2 bg-gray-300 animate-pulse w-5/6"></span>
        <span class="rounded-sm h-1/2 bg-gray-300 animate-pulse w-5/6"></span>
      </div>
    </div>

    <!-- Col 2 -->
    <div class="flex flex-row items-center pb-2">
      <div class="w-12 h-12 rounded bg-gray-300 animate-pulse"></div>

      <div class="flex-auto flex flex-col h-full w-full space-y-1 justify-between ml-4">
        <span class="rounded-sm h-1/2 bg-gray-300 animate-pulse w-5/6"></span>
        <span class="rounded-sm h-1/2 bg-gray-300 animate-pulse w-5/6"></span>
      </div>
    </div>
  </div>`
})
export class ExerciseLoadingComponent {
}
