import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-quiz-header',
  templateUrl: './quiz-header.component.html',
  styleUrls: ['./quiz-header.component.css']
})
export class QuizHeaderComponent {
  @Output()
  return = new EventEmitter()

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
