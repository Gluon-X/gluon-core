import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Exercise, Problem } from '../models/interfaces'
import { ExercisePickable } from '../services/chapter_provider.service'

@Component({
  selector: 'app-exercise-list',
  template: `
    <div
      class="my-1 px-3 box bg-gray-100 rounded shadow divide-y-2 divide-gray-300 divide-solid"
    >
      <div
        *ngFor="let exercise of exerciseService.exercises; let i = index"
        class="px-2 box"
      >
        <app-exercise-item [exercise]="exercise"></app-exercise-item>
        <app-problem-list
          [problems]="exercise.problems"
          [isActive]="exercise.isActive"
          (pick)="onProblemPick($event)"
        ></app-problem-list>
      </div>
    </div>
  `,
})
export class ExerciseCardComponent {
  @Input()
  exerciseService: ExercisePickable

  onProblemPick(qid: string) {
    this.exerciseService.qid = 'GID11060001'
  }
}

@Component({
  selector: 'app-exercise-item',
  template: `
    <div
      class="py-4 flex justify-between cursor-pointer"
      (click)="exercise.toggleCollapse()"
    >
      <span class="truncate">{{ exercise.name }}</span>
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
  `,
})
export class ExerciseItemComponent {
  @Input()
  exercise: Exercise
}

@Component({
  selector: 'app-problem-list',
  template: `
    <div
      class="box transform transition-height duration-200"
      [ngClass]="{
        'h-0 overflow-hidden scale-0': !isActive,
        'scale-100': isActive
      }"
    >
      <div *ngFor="let problem of problems; let i = index" class="flex p-2">
        <img
          [src]="problem.imageURL"
          [alt]="problem.imageURL"
          class="w-12 h-12"
        />
        <div
          class="flex-auto flex justify-between mx-4"
          [ngClass]="{
            'border-b-2 border-b-solid border-b-gray-300':
              i !== problems.length - 1
          }"
        >
          <div>
            <h4 class="truncate font-semibold text-base">{{ problem.name }}</h4>
            <p *ngIf="problem.description" class="break-words text-sm py-1">
              {{ problem.description }}
            </p>
          </div>

          <button
            class="my-auto rounded-full py-1 px-4 border-2 border-solid border-gray-300 bg-gray-100 hover:bg-gray-300 font-semibold text-sm text-gray-700"
            (click)="onProblemPick(i)"
          >
            Bắt đầu
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ProblemListComponent {
  @Input()
  isActive = false

  @Input()
  problems: Problem[]

  @Output()
  pick = new EventEmitter<string>()

  onProblemPick(pid: number) {
    this.pick.emit(`${pid}`)
  }
}
