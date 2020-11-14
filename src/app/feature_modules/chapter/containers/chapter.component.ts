import { Component, Input } from '@angular/core'


@Component({
  selector: 'app-gluon-chapter',
  template: `
    <div>
      <app-navbar></app-navbar>

      <!--      <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">-->
      <!--        <div class="flex items-center flex-shrink-0 text-white mr-6">-->
      <!--          <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg">-->
      <!--            <path-->
      <!--              d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />-->
      <!--          </svg>-->
      <!--          <span class="font-semibold text-xl tracking-tight">Tailwind CSS</span>-->
      <!--        </div>-->
      <!--        <div class="block lg:hidden">-->
      <!--          <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">-->
      <!--            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title>-->
      <!--              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />-->
      <!--            </svg>-->
      <!--          </button>-->
      <!--        </div>-->
      <!--        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">-->
      <!--          <div class="text-sm lg:flex-grow">-->
      <!--            <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">-->
      <!--              Docs-->
      <!--            </a>-->
      <!--            <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">-->
      <!--              Examples-->
      <!--            </a>-->
      <!--            <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">-->
      <!--              Blog-->
      <!--            </a>-->
      <!--          </div>-->
      <!--          <div>-->
      <!--            <a href="#"-->
      <!--               class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Download</a>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </nav>-->

      <div class="h-8"></div>

      <div class="flex">
        <div class="w-1/4 flex-none block flex-shrink-0 flex-grow-0">

          <app-list></app-list>
          <app-list></app-list>
          <app-list></app-list>

        </div>

        <div class="flex-auto flex-shrink-0 flex-grow-0 w-3/4" style="padding-left: 48px;">
          <article class="subpixel-antialiased">
            <h1 class="font-bold font-serif text-4xl">Chương 1: Sóng âm</h1>
            <p class="text-base font-normal text-justify py-6">
              For years parents have espoused the health benefits of eating garlic bread with cheese to their
              children, with the food earning such an iconic status in our culture that kids will often dress
              up as warm, cheesy loaf for Halloween.
            </p>
          </article>

          <app-exercise-list></app-exercise-list>

          <div class="h-8"></div>
        </div>
      </div>

    </div>
  `
})
export class ChapterComponent {
}
