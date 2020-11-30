import { Component, Input } from '@angular/core'
import { ValueStorable } from '../services/search_provider.service'

@Component({
  selector: 'app-searchbar',
  template: `
    <div
      class="flex flex-row group items-center h-full rounded-full border-2 border-solid border-gray-300 hover:border-gray-700"
    >
      <app-search-icon></app-search-icon>
      <input
        class="px-4 flex-grow rounded-full focus:outline-none truncate"
        type="text"
        placeholder="Search"
        [(ngModel)]="searchBoxValue"
        (keyup.enter)="onEnter()"
      />
      <app-cross-component
        class="h-4 w-4 mr-3 flex-none fill-current text-gray-300 cursor-pointer group-focus:text-gray-700"
        [class.hidden]="searchBoxValue.length === 0"
        (click)="searchBoxValue = ''"
      ></app-cross-component>
    </div>
  `,
})
export class SearchbarComponent {
  @Input()
  service?: ValueStorable

  searchBoxValue: string = ''

  onEnter() {
    if (
      this.searchBoxValue.length > 0 &&
      this.searchBoxValue !== this.service.value
    ) {
      console.info(`Search for: ${this.searchBoxValue}`)
      this.service.value = this.searchBoxValue
    }
  }
}
