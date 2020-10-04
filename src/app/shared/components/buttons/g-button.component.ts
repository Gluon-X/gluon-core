import { Component, Input } from '@angular/core'

enum ButtonType {
  FILLED,
  OUTLINE,
}

interface ButtonOption {
  type: ButtonType
  title: string
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'g-button',
  template: `
    <button
      *ngIf="options.type === 0"
      class="whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-400 focus:outline-none focus:border-blue-600 focus:shadow-outline-blue active:bg-blue-400 transition ease-in-out duration-150"
      type="button"
      style="transition: all .15s ease"
    >
      {{ options.title }}
    </button>

    <button
      *ngIf="options.type === 1"
      class="whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-blue-600 bg-white hover:bg-blue-600 hover:text-white focus:outline-none focus:border-blue-600 focus:shadow-outline-blue active:bg-blue-400 transition ease-in-out duration-150"
      type="button"
      style="transition: all .15s ease"
    >
      {{ options.title }}
    </button>
  `,
  styles: [``],
})
export class GButtonComponent {
  @Input() options: ButtonOption
}
