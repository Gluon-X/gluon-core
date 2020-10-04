import { Component, Input } from '@angular/core'

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'g-navbar',
  template: `
    <div class="relative bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          class="flex justify-between items-center border-b-2 border-gray-200 py-6 md:justify-start md:space-x-10"
        >
          <div>
            <a routerLink="" class="flex">
              <!--Logo-->
              <img
                class="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg"
                alt="Workflow"
              />
            </a>
          </div>
          <div class="-mr-2 -my-2 md:hidden">
            <button
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
            >
              <!-- Heroicon name: menu -->
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <nav class="hidden md:flex space-x-10">
            <a
              *ngFor="let mn of menu"
              [routerLink]="mn.router"
              class="text-base leading-6 font-medium text-blue-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150"
            >
              {{ mn.title }}
            </a>
          </nav>
          <div
            class="hidden md:flex items-center justify-end space-x-8 md:flex-1 lg:w-0"
          >
            <a
              routerLink=""
              class="whitespace-no-wrap text-base leading-6 font-medium text-blue-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
            >
              Sign in
            </a>
            <span class="inline-flex rounded-md shadow-sm">
              <a
                routerLink=""
                class="whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-400 focus:outline-none focus:border-blue-600 focus:shadow-outline-blue active:bg-blue-400 transition ease-in-out duration-150"
              >
                Sign up
              </a>
            </span>
          </div>
        </div>
      </div>

      <!--
    Mobile menu, show/hide based on mobile menu state.

    Entering: "duration-200 ease-out"
      From: "opacity-0 scale-95"
      To: "opacity-100 scale-100"
    Leaving: "duration-100 ease-in"
      From: "opacity-100 scale-100"
      To: "opacity-0 scale-95"
  -->
      <div
        class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
      >
        <div class="rounded-lg shadow-lg">
          <div class="rounded-lg shadow-xs bg-white divide-y-2 divide-gray-50">
            <div class="pt-5 pb-6 px-5 space-y-6">
              <div class="flex items-center justify-between">
                <div>
                  <img
                    class="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg"
                    alt="Workflow"
                  />
                </div>
                <div class="-mr-2">
                  <button
                    type="button"
                    class="inline-flex items-center justify-center p-2 rounded-md text-blue-600 hover:text-blue-400 hover:bg-blue-400 focus:outline-none focus:bg-gray-100 focus:text-gray-900 transition duration-150 ease-in-out"
                  >
                    <!-- Heroicon name: x -->
                    <svg
                      class="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <nav class="grid gap-y-8"></nav>
              </div>
            </div>
            <div class="py-6 px-5 space-y-6">
              <div class="grid grid-cols-2 gap-y-4 gap-x-8">
                <a
                  *ngFor="let mn of menu"
                  routerLink="mn.router"
                  class="text-base leading-6 font-medium text-blue-600 hover:text-gray-900 transition ease-in-out duration-150"
                >
                  {{ mn.title }}
                </a>
              </div>
              <div class="space-y-6">
                <span class="w-full flex rounded-md shadow-sm">
                  <a
                    routerLink=""
                    class="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-400 focus:outline-none focus:border-blue-600 focus:shadow-outline-blue active:bg-blue-600 transition ease-in-out duration-150"
                  >
                    Sign up
                  </a>
                </span>
                <p
                  class="text-center text-base leading-6 font-medium text-gray-900"
                >
                  Existing customer?
                  <a
                    routerLink=""
                    class="text-blue-600 hover:text-gray-900 transition ease-in-out duration-150"
                  >
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [``],
})
export class GNavBarComponent {
  @Input() menu: Array<{
    router: string
    title: string
  }>
}
