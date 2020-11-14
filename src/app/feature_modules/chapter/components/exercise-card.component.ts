import { Component, Input } from '@angular/core'

interface Exercise {
  name: string,
  isActive: boolean,
  problems: Problem[]
}

interface Problem {
  name: string,
  imageURL: string,
  description?: string
}

@Component({
  selector: 'app-exercise-list',
  template: `
    <div class="my-1 px-3 box bg-gray-100 rounded shadow divide-y-2 divide-gray-300 divide-solid">
      <div *ngFor="let exercise of exercises; let i = index" class="px-2 box">
        <app-exercise-item [name]="exercise.name" (click)="handleExerciseItemClick(i)"></app-exercise-item>
        <app-problem-list [problems]="exercise.problems" [isActive]="exercise.isActive"></app-problem-list>
      </div>
    </div>
  `
})
export class ExerciseCardComponent {

  exercises: Exercise[] = [{
    name: 'Bài 1 - Động lực học chất điểm',
    isActive: true,
    problems: [{
      name: 'Problem 1 - Lorem ipsum',
      imageURL: 'https://cdn2.iconfinder.com/data/icons/topology-geometric-shapes-blue-line/64/143_topology-mathematics-math-impossible-figure-512.png',
      description: 'Lorem ipsum dolor sit amet'
    }, {
      name: 'Problem 2 - Lorem ipsum',
      imageURL: 'https://cdn2.iconfinder.com/data/icons/topology-geometric-shapes-blue-line/64/143_topology-mathematics-math-torus-tore-01-512.png',
      description: 'Lorem ipsum dolor sit amet'
    }, {
      name: 'Problem 3 - Lorem ipsum',
      imageURL: 'https://cdn2.iconfinder.com/data/icons/topology-geometric-shapes-blue-line/64/143_topology-mathematics-math-mobius-strip-512.png',
      description: 'Lorem ipsum dolor sit amet'
    }]
  }, {
    name: 'Bài 2 - Động lực học chất điểm',
    isActive: false,
    problems: [{
      name: 'Problem 4 - Lorem ipsum',
      imageURL: 'https://cdn2.iconfinder.com/data/icons/topology-geometric-shapes-blue-line/64/143_topology-mathematics-math-impossible-figure-512.png',
      description: 'Lorem ipsum dolor sit amet'
    }]
  }]

  handleExerciseItemClick(index: number) {
    this.exercises[index].isActive = !this.exercises[index].isActive
  }

}

@Component({
  selector: 'app-exercise-item',
  template: `
    <div class="py-4 flex justify-between cursor-pointer">
      <span class="truncate">{{ name }}</span>
      <svg class="-mr-1 ml-2 h-5 w-5"
           xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 20 20"
           fill="currentColor">
        <path fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd" />
      </svg>
    </div>
  `
})
export class ExerciseItemComponent {

  @Input()
  name: string

}

@Component({
  selector: 'app-problem-list',
  template: `
    <div class="box transform transition-height duration-200"
         [ngClass]="{ 'h-0 overflow-hidden scale-0': !isActive, 'scale-100': isActive }">
      <div *ngFor="let problem of problems; let i = index" class="flex p-2">
        <img [src]="problem.imageURL" [alt]="problem.imageURL" class="w-16 h-16">
        <div class="flex-auto block mx-4" [ngClass]="{ 'border-b-2 border-b-solid border-b-gray-300': i !== problems.length - 1 }">
          <h4 class="truncate font-semibold">{{ problem.name }}</h4>
          <p *ngIf="problem.description" class="break-words">{{ problem.description }}</p>
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

}
