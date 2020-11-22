import { Component } from '@angular/core'
import { SearchService } from '../services'

@Component({
  selector: 'app-gluon-chapter',
  template: `
    <app-navbar [searchService]="searchService"></app-navbar>

    <div class="h-2 md:h-8"></div>

    <router-outlet *ngIf="!searchService.isSearchActive"></router-outlet>

    <app-search-page
      *ngIf="searchService.isSearchActive"
      [service]="searchService"
    ></app-search-page>
  `,
  providers: [SearchService],
})
export class ChapterComponent {
  constructor(public searchService: SearchService) {}
}
