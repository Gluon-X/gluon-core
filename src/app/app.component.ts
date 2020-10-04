import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  qid: string = 'Q01'
  navbarMenu: Array<{
    router: string
    title: string
  }> = [
    {
      router: '/daily-problem',
      title: 'Today',
    },
    {
      router: '/courses',
      title: 'Courses',
    },
    {
      router: '/practice',
      title: 'Practice',
    },
  ]
}
