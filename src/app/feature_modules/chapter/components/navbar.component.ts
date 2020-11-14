import { Component } from '@angular/core'


@Component({
  selector: 'app-navbar',
  template: `
    <div class="h-16 flex justify-start">

      <div class="py-3 w-1/6">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Simbolo_konoha.svg/1200px-Simbolo_konoha.svg.png"
             class="h-full"
             alt="Konoha">
      </div>

      <ul class="flex justify-start space-x-6 w-4/6">
        <li *ngFor="let nav of navigations; let i = index"
            (click)="handleItemPick(i)"
            [classList]="nav.isActive ?
            'cursor-pointer subpixel-antialiased align-middle px-4 mt-4 text-lg border-b-4 border-b-solid border-gray-900 font-semibold' :
            'cursor-pointer subpixel-antialiased align-middle px-4 mt-4 text-lg hover:border-b-4 hover:border-b-solid hover:border-gray-500 font-semibold' "
        >
          {{ nav.name }}
        </li>
      </ul>

      <div class="py-3 w-1/6">
        <input class="w-56 px-4 h-full rounded-full border-2 border-solid border-gray-300 hover:border-gray-700 focus:w-64" type="text"
               placeholder="Search">
      </div>

    </div>
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
