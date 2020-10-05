import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, Input, OnInit, ViewChild, ViewChildren } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { BaseQuestion } from '../../../models/interfaces'

@Component({
  selector: 'app-quiz-answer-type-list',
  templateUrl:'./answer-type-list.component.html'
})
export class AnswerListViewComponent implements OnInit{
  @ViewChild('radioForm') radioFromGroup:ElementRef<HTMLFormElement>;
  choosenString="";
  @Input() listOfQuestions:Array<String>;
  inputForm:FormGroup = new FormGroup(
    {
      "inputControl":new FormControl()
    }
  );

  constructor(){

  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    // this.radioFromGroup.valueChanges.subscribe((data)=>{
    //   console.log(data)
    // })
  }


  listOfQuestion = ["The box will stick to the conveyor belt, and reach speed v = 6.2 m/s instantaneosly.","The box will sit motionless for a few seconds until enough force builds up to change its velocity.","The box will begin to accelerate as soon as it touches the conveyor. The belt will slide underneath the box, accelerating the box uniformly. Then, the box will reach the same speed as the belt, and the box will stop accelerating","The box will accelerate less as it approaches the speed of the conveyor. So, the box will come closer and closer to the speed of the belt, but it will never quite"]

  handleChange(event){
    // this.radioFromGroup.nativeElement.submit();
  }

}
