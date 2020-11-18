import { Component } from '@angular/core'


@Component({
  selector: 'app-navbar',
  template: `
    <nav class="h-16 items-center flex justify-between flex-wrap">

      <div class="flex items-center flex-shrink-0 mr-6 cursor-pointer">
        <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
        </svg>
        <span class="font-semibold text-xl tracking-tight">Gluon</span>
      </div>

      <ul class="w-full flex-grow text-lg lg:flex lg:items-center lg:w-auto space-x-3 h-full">
        <li *ngFor="let nav of navigations; let i = index"
            (click)="handleItemPick(i)"
            class="group flex flex-col justify-between h-full cursor-pointer font-semibold"
        >
          <div class="flex-initial h-full flex flex-col px-4 justify-center">
            <span>{{ nav.name }}</span>
          </div>

          <span
            class="flex-initial h-1 rounded-t-full w-1/2 mx-auto"
            [class.bg-gray-900]="nav.isActive"
            [class.group-hover:bg-gray-300]="!nav.isActive"
          ></span>
        </li>
      </ul>

      <div class="h-full py-3">
        <input class="w-56 px-4 h-full rounded-full border-2 border-solid border-gray-300 hover:border-gray-700 focus:w-64" type="text"
               placeholder="Search">
      </div>

    </nav>
  `
})
export class NavbarComponent {

  navigations = [{
    name: 'Today',
    isActive: false
  }, {
    name: 'Courses',
    isActive: true
  }, {
    name: 'Practise',
    isActive: false
  }]

  handleItemPick(index: number) {
    let counter = 0

    for (const chapter of this.navigations) {
      this.navigations[counter].isActive = counter++ === index
    }
  }
}
