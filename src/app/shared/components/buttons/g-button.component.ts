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
    <div class="flex flex-col justify-center">
      <button
        *ngIf="options.type === 0"
        class="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded m-1 w-48"
        type="button"
        style="transition: all .15s ease"
      >
        {{ options.title }}
      </button>

      <button
        *ngIf="options.type === 1"
        class="bg-white hover:bg-gray-300 border-gray-900 text-gray-900 font-bold py-2 px-4 rounded m-1 w-48"
        type="button"
        style="transition: all .15s ease"
      >
        {{ options.title }}
      </button>
    </div>
  `,
  styles: [``],
})
export class GButtonComponent {
  @Input() options: ButtonOption
}
