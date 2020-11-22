import { Component } from '@angular/core'
import { NavigationStart, Router } from '@angular/router'
import { filter } from 'rxjs/operators'

interface NavigationControl {
  name: string
  url: string
}

const navigations: NavigationControl[] = [
  { name: 'Hôm nay', url: '/today' },
  { name: 'Khoá học', url: '/courses' },
  { name: 'Luyện tập', url: '/practice' },
]

@Component({
  selector: 'app-navbar',
  template: `
    <nav
      class="h-16 px-4 items-center flex flex-row justify-between flex-wrap lg:px-0"
    >
      <div class="flex items-center flex-shrink-0 mr-6 cursor-pointer">
        <svg
          class="fill-current h-8 w-8 mr-2"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"
          />
        </svg>
        <span class="font-semibold text-lg tracking-tight lg:text-xl"
          >Gluon</span
        >
      </div>

      <ul
        class="flex-grow text-md flex space-x-3 h-full justify-center lg:justify-start lg:text-lg"
      >
        <li
          *ngFor="let nav of controls; let i = index"
          [routerLink]="nav.url"
          class="group flex flex-col justify-between h-full cursor-pointer font-semibold focus:outline-none"
        >
          <div class="flex-initial h-full flex flex-col px-4 justify-center">
            <span>{{ nav.name }}</span>
          </div>

          <span
            class="flex-initial h-1 rounded-t-full w-1/2 mx-auto"
            [class.bg-gray-900]="isMatchRoute(nav.url)"
            [class.group-hover:bg-gray-300]="!isMatchRoute(nav.url)"
          ></span>
        </li>
      </ul>

      <div
        class="flex-grow flex-shrink-0 py-3 hidden h-full md:block lg:max-w-xs"
      >
        <div
          class="flex flex-row group items-center h-full rounded-full border-2 border-solid border-gray-300 hover:border-gray-700"
        >
          <app-search-icon></app-search-icon>
          <input
            class="px-4 flex-grow rounded-full focus:outline-none truncate"
            type="text"
            placeholder="Search"
            [(ngModel)]="searchBoxValue"
          />
          <app-cross-component
            class="h-4 w-4 mr-3 flex-none fill-current text-gray-300 group-focus:text-gray-700"
            [class.hidden]="searchBoxValue.length === 0"
            [class.cursor-pointer]="searchBoxValue.length > 0"
            (click)="searchBoxValue = ''"
          ></app-cross-component>
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  searchBoxValue: string = ''

  controls: NavigationControl[] = navigations

  private currentRoute?: string

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((r) => r instanceof NavigationStart))
      .subscribe((evt: NavigationStart) => (this.currentRoute = evt.url))
  }

  isMatchRoute(url: string): boolean {
    let pattern = new RegExp(`${url}(/.*|)`)
    return pattern.test(this.currentRoute)
  }
}

@Component({
  selector: 'app-search-icon',
  template: `
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="612.01px"
      height="612.01px"
      viewBox="0 0 612.01 612.01"
      style="enable-background:new 0 0 612.01 612.01;"
      xml:space="preserve"
      class="h-4 w-4 ml-3 flex-none fill-current group-focus:text-gray-700"
    >
      <g>
        <g id="_x34__4_">
          <g>
            <path
              d="M606.209,578.714L448.198,423.228C489.576,378.272,515,318.817,515,253.393C514.98,113.439,399.704,0,257.493,0
				C115.282,0,0.006,113.439,0.006,253.393s115.276,253.393,257.487,253.393c61.445,0,117.801-21.253,162.068-56.586
				l158.624,156.099c7.729,7.614,20.277,7.614,28.006,0C613.938,598.686,613.938,586.328,606.209,578.714z M257.493,467.8
				c-120.326,0-217.869-95.993-217.869-214.407S137.167,38.986,257.493,38.986c120.327,0,217.869,95.993,217.869,214.407
				S377.82,467.8,257.493,467.8z"
            />
          </g>
        </g>
      </g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
    </svg>
  `,
})
export class SearchIconComponent {}

@Component({
  selector: 'app-cross-component',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      viewBox="0 0 64 64"
    >
      <line
        x1="9.37"
        x2="54.63"
        y1="9.37"
        y2="54.63"
        fill="none"
        stroke="#010101"
        stroke-miterlimit="10"
        stroke-width="4"
      />
      <line
        x1="9.37"
        x2="54.63"
        y1="54.63"
        y2="9.37"
        fill="none"
        stroke="#010101"
        stroke-miterlimit="10"
        stroke-width="4"
      />
    </svg>
  `,
})
export class CrossIconComponent {}
