import { Component, EventEmitter, Input, Output } from '@angular/core'
import { MultiPhasesProvider } from '../../models'

@Component({
  selector: 'app-answer-phase-header',
  template: `
    <div class="flex flex-col">
      <p class="font-sans text-sm font-medium text-gray-900">Giai đoạn {{phaseProvider.index+1}}</p>
      <p class="font-sans text-xl font-bold text-gray-900">{{phaseProvider.title}}</p>
    </div>
    <app-question-indicator

      [current]="current"
      [total]="total"
      [isNextAvailable]="isNextAvailable"
      [isPrevAvailable]="isPrevAvaialble"
      (next)="onNext()"
      (previous)="onPrev()"
    ></app-question-indicator>
  `,
})
export class AnswerPhaseHeaderComponent {

  @Input()
  phaseProvider: MultiPhasesProvider;

  get current() {
    return this.phaseProvider.boxIndex;
  }

  get total() {
    return this.phaseProvider.boxesCount;
  }

  get isNextAvailable(): boolean {
    return this.phaseProvider.nextAvailable;
    // return this.current < this.total - 1
  }

  get isPrevAvaialble(): boolean {
    return this.phaseProvider.prevAvailable;

    // return this.current > 0
  }

  onPrev() {
    this.phaseProvider.previous()
    // this.current--
  }

  onNext() {
    this.phaseProvider.next()
    // this.current++
  }
}

@Component({
  selector: 'app-question-indicator',
  template: `
    <div class="flex flex-row py-8 items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="h-6 w-6 flex-none cursor-pointer"
        [class.text-gray-900]="isPrevAvailable"
        [class.text-gray-400]="!isPrevAvailable"
        (click)="onPrevClick()"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>

      <div
        *ngFor="let indicator of indicators"
        class="h-6 flex-grow relative cursor-pointer"
        [class.rounded-l-sm]="indicator.index === 0"
        [class.rounded-r-sm]="indicator.index === indicators.length - 1"
      >
        <div
          class="absolute inset-0 opacity-25"
          [class.bg-gray-900]="indicator.state === 0"
          [class.bg-yellow-500]="indicator.state === 1"
          [class.bg-gray-200]="indicator.state === 2"
          [class.rounded-l-sm]="indicator.index === 0"
          [class.rounded-r-sm]="indicator.index === indicators.length - 1"
          [class.border-l-solid]="indicator.index !== 0"
          [class.border-l-gray-400]="indicator.index !== 0"
          [class.border-l-2]="indicator.index !== 0"
        ></div>
        <div
          class="absolute inset-0 transform origin-left hover:-rotate-45 transition duration-300"
        >
          <div
            class="h-full w-full"
            [class.bg-gray-900]="indicator.state === 0"
            [class.bg-yellow-500]="indicator.state === 1"
            [class.bg-gray-200]="indicator.state === 2"
            [class.rounded-l-sm]="indicator.index === 0"
            [class.rounded-r-sm]="indicator.index === indicators.length - 1"
            [class.border-l-solid]="indicator.index !== 0"
            [class.border-l-gray-400]="indicator.index !== 0"
            [class.border-l-2]="indicator.index !== 0"
          ></div>
        </div>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="h-6 w-6 flex-none transform rotate-180 cursor-pointer"
        [class.text-gray-900]="isNextAvailable"
        [class.text-gray-400]="!isNextAvailable"
        (click)="onNextClick()"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </div>
  `,
})
export class QuestionIndicatorComponent {
  @Input()
  current: number

  @Input()
  total: number

  @Input()
  isNextAvailable: boolean = false

  @Input()
  isPrevAvailable: boolean = true

  @Output()
  next = new EventEmitter()

  @Output()
  previous = new EventEmitter()

  get indicators(): Indicator[] {
    const indicators: Indicator[] = []
    const current = this.current

    for (let index = 0; index < this.total; index++) {
      let state: IndicatorState

      if (index < current) state = IndicatorState.Pass
      else if (index === current) state = IndicatorState.Current
      else state = IndicatorState.NotPass

      indicators.push({ index, state })
    }
    return indicators
  }

  onNextClick() {
    if (this.isNextAvailable) this.next.emit()
  }

  onPrevClick() {
    if (this.isPrevAvailable) this.previous.emit()
  }
}

interface Indicator {
  index: number

  state: IndicatorState
}

enum IndicatorState {
  Pass = 0,
  Current = 1,
  NotPass = 2,
}
