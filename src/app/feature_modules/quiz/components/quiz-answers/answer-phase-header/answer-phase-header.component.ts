import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-answer-phase-header',
  templateUrl: './answer-phase-header.component.html'
})
export class AnswerPhaseHeaderComponent {
}

@Component({
  selector: 'app-question-indicator',
  template: `
    <div class="flex flex-row py-4 items-center justify-center">
      <img
        src="../../../../../../assets/images/answers-box/chevron-left.svg"
        class="h-6 w-6 flex-none"
        alt="" />

      <div class="h-6 flex-grow relative cursor-pointer">
        <div class="absolute inset-0 bg-gray-900 opacity-25"></div>
        <div
          class="absolute inset-0 transform origin-left hover:-rotate-45 transition duration-300"
        >
          <div
            class="h-full w-full bg-gray-900"
            style="border: 1px solid black"
          ></div>
        </div>
      </div>

      <div class="h-6 flex-grow relative cursor-pointer">
        <div class="absolute inset-0 bg-yellow-500 opacity-25"></div>
        <div
          class="absolute inset-0 transform origin-left hover:-rotate-45 transition duration-300"
        >
          <div
            class="h-full w-full bg-yellow-500"
            style="border: 1px solid black"
          ></div>
        </div>
      </div>
      <div class="h-6 flex-grow relative cursor-pointer">
        <div class="absolute inset-0 bg-gray-200 opacity-25"></div>
        <div
          class="absolute inset-0 transform origin-left hover:-rotate-45 transition duration-300"
        >
          <div
            class="h-full w-full bg-gray-200"
            style="border: 1px solid black"
          ></div>
        </div>
      </div>

      <img
        src="../../../../../../assets/images/answers-box/chevron-right.svg"
        class="h-6 w-6 flex-none"
        alt="" />
    </div>
  `
})
export class QuestionIndicatorComponent {

  @Input()
  current: number

  @Input()
  total: number
}
