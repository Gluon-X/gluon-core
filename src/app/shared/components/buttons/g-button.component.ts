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
    <div class="w-full" [ngSwitch]="options.type">
      <button
        *ngSwitchCase="0"
        class="bg-gray-900 hover:bg-gray-700 text-white text-sm py-2 rounded w-full focus:outline-none"
        type="button"
        style="transition: all .15s ease"
      >
        {{ options.title }}
      </button>

      <button
        *ngSwitchCase="1"
        class="bg-white hover:bg-gray-300 border-2 border-gray-300 text-sm text-gray-900 py-2 rounded w-full focus:outline-none"
        type="button"
        style="transition: all .15s ease"
      >
        {{ options.title }}
      </button>
    </div>
  `,
})
export class GButtonComponent {
  @Input() options: ButtonOption
}
