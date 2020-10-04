import { Component, Input, OnInit } from '@angular/core';
import { PhaseStack } from '../../models/interfaces';
@Component({
  // Render [subQuestions] xN
  selector: 'app-quiz-phase-wrapper',
  templateUrl: './quiz-phase-wrapper.component.html',
  styleUrls: ['./quiz-phase-wrapper.component.scss']
})


export class QuizPhaseWrapperComponent implements OnInit {
  @Input() phaseData:PhaseStack;
  constructor() { }

  ngOnInit(): void {
  }
  getPhaseList(){
    return Object.keys(this.phaseData);
  }

}
