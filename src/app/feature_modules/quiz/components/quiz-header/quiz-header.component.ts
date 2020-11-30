import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-quiz-header',
  templateUrl: './quiz-header.component.html',
  styleUrls: ['./quiz-header.component.css']
})
export class QuizHeaderComponent {
  @Input()
  exerciseName: string

  // TODO PASSING AN OBJECT INSTADE ? Hmm to much parmasmetter
  @Input()
  chapter_img: string;
  @Input()
  quiz_title: string;
  @Input()
  go_back_chapter: string


}
