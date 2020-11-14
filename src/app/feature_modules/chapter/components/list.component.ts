import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-list',
  template: `
    <div class="block my-2">
      <div class="py-1 px-3 flex justify-between font-sans font-semibold rounded border-1 border-black cursor-pointer"
           (click)="handleCollapseClick()">
        <span class="truncate">Lớp Mười</span>
        <svg class="-mr-1 ml-2 h-5 w-5"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 20 20"
             fill="currentColor">
          <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd" />
        </svg>
      </div>

      <div class="transform transition-height duration-200"
           [ngClass]="{ 'h-0 overflow-hidden scale-0': !isActive, 'scale-100': isActive }">
        <app-list-item (click)="handleItemPick(i)"
                       *ngFor="let chapter of chapters; let i = index"
                       [isActive]="chapter.isActive"
                       [name]="chapter.name"
        ></app-list-item>
      </div>
    </div>
  `
})
export class ListComponent {

  isActive = true

  chapters = [{
    name: 'Chương 1',
    isActive: true
  }, {
    name: 'Chương 2',
    isActive: false
  }, {
    name: 'Chương 3',
    isActive: false
  }]

  handleItemPick(index: number) {
    let counter = 0

    for (const chapter of this.chapters) {
      this.chapters[counter].isActive = counter++ === index
    }
  }

  handleCollapseClick() {
    this.isActive = !this.isActive
  }

}

@Component({
  selector: 'app-list-item',
  template: `
    <div class="my-1 py-2 px-6 font-sans font-light rounded cursor-pointer break-words"
         [ngClass]="{ 'text-white bg-gray-900': isActive, 'hover:bg-gray-300': !isActive }">
      {{ name }}
    </div>
  `
})
export class ListItemComponent {

  @Input()
  name: string

  @Input()
  isActive: boolean = false

}
