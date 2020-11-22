import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-question-media',
  templateUrl: './quiz-question-media.component.html',
  styleUrls: ['./quiz-question-media.component.scss']
})
export class QuizQuestionMediaComponent implements OnInit {
  @Input()
  scrURL: string

  mediaButton = {
    'play': '../../../../../../assets/images/icons/play-button.svg',
    'pause': '../../../../../../assets/images/icons/pause.svg',
    "reload": '../../../../../../assets/images/icons/reload.svg'
  }


  constructor() { }

  ngOnInit(): void {
  }

}
