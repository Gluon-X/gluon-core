import { Component } from '@angular/core'

@Component({
  selector: 'app-gluon-chapter',
  template: `
    <app-navbar></app-navbar>

    <div class="h-2 md:h-8"></div>

    <router-outlet></router-outlet>
  `,
})
export class ChapterComponent {
  
}
