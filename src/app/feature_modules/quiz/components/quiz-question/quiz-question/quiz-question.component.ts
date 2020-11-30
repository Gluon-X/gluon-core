import { Component, Input, OnInit } from '@angular/core';
import { Box } from '../../../models';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.scss']
})
export class QuizQuestionComponent implements OnInit {

  @Input()
  box: Box

  constructor() { }

  ngOnInit(): void {
  }

}
