import { Component, Inject } from '@angular/core'
import { QuizPlayable } from '../../quiz/models'
import { QUIZ_STATE } from '../../quiz/services'
import { SearchService } from '../services'

@Component({
  selector: 'app-gluon-chapter',
  template: `
    <div class="flex flex-col">
      <app-navbar [searchService]="searchService" class="flex-none h-16"></app-navbar>

      <router-outlet *ngIf="!searchService.isSearchActive"></router-outlet>

      <app-search-page
        *ngIf="searchService.isSearchActive"
        [service]="searchService"
      ></app-search-page>
    </div>
  `,
  providers: [SearchService]
})
export class ChapterComponent {
  constructor(
    @Inject(QUIZ_STATE) public service: QuizPlayable,
    public searchService: SearchService
  ) {
  }
}
