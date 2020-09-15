import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-quiz-nav',
  template: `
  <div>
    {{ quizName }} - {{ exerciseName }}
  </div>
  `,
  styles: [``]
})
export class QuizNavComponent {

  @Input()
  quizName: string = 'Name';


  @Input()
  exerciseName: string = 'execerise name';
}
