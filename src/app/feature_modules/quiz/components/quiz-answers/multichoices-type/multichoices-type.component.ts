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
  selector: 'app-multichoices-answer',
  templateUrl: './multichoices-type.component.html',
})
export class MultichoicesTypeComponent implements OnInit {
  @ViewChild('radioForm') radioFromGroup: ElementRef<HTMLFormElement>
  choosenString = ''

  @Input() listOfQuestions: Array<Choice>

  inputForm: FormGroup = new FormGroup({
    inputControl: new FormControl(),
  })

  constructor() { }

  ngOnInit(): void {
    console.log(this.listOfQuestions)
  }
}
