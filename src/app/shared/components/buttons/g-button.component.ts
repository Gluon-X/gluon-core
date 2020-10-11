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
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      type="button"
      style="transition: all .15s ease"
    >
      {{ options.title }}
    </button>

    <button
      *ngIf="options.type === 1"
      class="bg-white hover:bg-blue-500 hover:text-white text-blue-500 font-bold py-2 px-4 rounded"
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
