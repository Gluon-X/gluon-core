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
import { Choice, MultipleChoicesProvider, PossibleInputAnswer } from '../../../models'

@Component({
  selector: 'app-multichoices-answer',
  templateUrl: './multichoices-type.component.html',
})
export class MultichoicesTypeComponent implements OnInit {
  @ViewChild('radioForm') radioFromGroup: ElementRef<HTMLFormElement>
  choosenString = ''

  @Input() multipleChoices: MultipleChoicesProvider;

  inputForm: FormGroup = new FormGroup({
    inputControl: new FormControl(),
  })
  @Output() onSelectAnswear: EventEmitter<PossibleInputAnswer> = new EventEmitter;


  constructor() { }

  saveAnswear(answear: PossibleInputAnswer) {
    console.log(answear)
    this.onSelectAnswear.emit(answear)
  }
  ngOnInit(): void {
    // console.log(this.listOfQuestions)
  }

  isDoneCorrectAnswear(boxId: number) {
    if (this.multipleChoices.isCompleted) {
      if (this.multipleChoices.submission == boxId) {
        return true
      } else {
        return false
      }
    }
  }

}
