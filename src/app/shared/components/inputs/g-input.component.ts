import { Component, Input } from '@angular/core'
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'g-input',
  template: `
    <input
      class="shadow appearance-none border rounded py-2 px-3 text-grey-darker"
    />
  `,
  styles: [``],
})
export class GInputComponent {
  @Input() options
}
