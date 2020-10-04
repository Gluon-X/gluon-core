import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../../../models/interfaces';

@Component({
  selector: 'app-phase-layout',
  templateUrl: './phase-layout.component.html',
  styleUrls: ['./phase-layout.component.scss']
})
export class PhaseLayoutComponent implements OnInit {
  @Input() openQuestion:string;
  @Input() phaseQuestions:Array<Question>;
  constructor() { }

  ngOnInit(): void {
  }

}
