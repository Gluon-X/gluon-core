import { ThrowStmt } from '@angular/compiler'
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewChildren,
} from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
} from '@angular/forms'
import { Choice, MultipleChoicesProvider } from '../../../models'

@Component({
  selector: 'app-quiz-answer-type-list',
  templateUrl: './answer-type-list.component.html',
})
export class AnswerListViewComponent implements OnInit {
  @ViewChild('radioForm') radioFromGroup: ElementRef<HTMLFormElement>
  choosenString = ''
  @Input() listOfQuestions: Array<Choice>
  @Output() choosenAnswear = new EventEmitter<number | number[]>()
  inputForm: FormGroup = new FormGroup({
    inputControl: new FormControl(),
  })

  constructor() { }
  ngOnInit(): void {
    
    // throw new Error('Method not implemented.');
    // this.radioFromGroup.valueChanges.subscribe((data)=>{
    //   console.log(data)
    // })
  }


  handleChange(event) {
    this.choosenAnswear.emit(event)
  }
}
