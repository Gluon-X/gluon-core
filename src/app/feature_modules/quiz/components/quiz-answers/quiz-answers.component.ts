import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

import {
  BoxType,
  ShortAnswer,
  MultipleChoices,
  MultipleChoicesProvider,
  ShortAnswerProvider,
  Submitable,
  PossibleInputAnswer,
  MultiBoxesProvider,
  MultiPhasesProvider,
  Box,
  QuestionProvider,
} from '../../models'

@Component({
  selector: 'app-quiz-answers',
  template: `
    <div>
      <app-answer-phase-header
      [phaseProvider]='phaseProvider'
        *ngIf="!isMainQuestion"
      ></app-answer-phase-header>
      <ng-template
        #inputHeader *ngIf="question.type === QuestionAnswerType.SHORT_ANSWER;
        "
      >
        <p
          class="font-sans text-gray-900 flex justify-start text-base font-semibold"
        >
          Hãy nhập đáp án đúng
        </p>
      </ng-template>

      <div *ngIf="question.type === QuestionAnswerType.MULTIPLE_CHOICES">
        <p
          class="font-sans text-gray-900 flex justify-start text-base font-semibold"
        >
        Hãy chọn đáp án đúng
        </p>
      </div>
    </div>

    <div>
      <app-input-answer
      [question]='currentAsShortAnswearProvider()'
      (onTextInput)='saveAnswear($event)' *ngIf="this.question.type === 'SHORT_ANSWER'"></app-input-answer>
      <div #multichoicesView *ngIf="this.question.type == QuestionAnswerType.MULTIPLE_CHOICES">
        <app-multichoices-answer
          (onSelectAnswear)='saveAnswear($event)'
          [multipleChoices]="currentAsMultipleChoices()"
        ></app-multichoices-answer>
      </div>
    </div>
    <div class="flex flex-col w-full">
      <g-button *ngIf="this.question.type == QuestionAnswerType.DISPLAY;else normalButtonRender"
      (click)='this.gotoNextAvaibleQuestion()'
        class="flex-grow w-full pb-2"
        [options]="{ type: 0, title: 'Câu kế tiếp'}"
      ></g-button>
      <ng-template #normalButtonRender>
      <ng-container [ngSwitch]='this.phaseProvider.isCorrect'>
        <g-button *ngSwitchCase="undefined" (click)='this.submitAnswear()' class="flex-grow w-full pb-2" [options]="{ type: 0, title: 'Kiểm tra' }"></g-button>
        <g-button *ngSwitchCase="true" (click)='this.gotoNextAvaibleQuestion()'
        class="flex-grow w-full pb-2"
        [options]="{ type: 0, title: 'Câu kế tiếp'}"></g-button>
        <g-button *ngSwitchCase="false" (click)='this.submitAnswear()' 
        class="flex-grow w-full pb-2"
        [options]="{ type: 0, title: 'Kiểm tra'}"></g-button>
      </ng-container>
      </ng-template>
      
      <!-- <g-button *ngIf="this.phaseProvider.isCorrect == undefined || this.phaseProvider.isCorrect != true;else gotoNextQuestion"
        (click)='this.submitAnswear()'
        class="flex-grow w-full pb-2"
        [options]="{ type: 0, title: 'Kiểm tra' }"
      ></g-button>
      <ng-template #gotoNextQuestion>
      <g-button 
        (click)='this.gotoNextAvaibleQuestion()'
        class="flex-grow w-full pb-2"
        [options]="{ type: 0, title: 'Câu kế tiếp' }"
      ></g-button>

      </ng-template>
            <g-button *ngIf="this.phaseProvider.current.type === QuestionAnswerType.DISPLAY && this.phaseProvider !== undefined"
        (click)='this.gotoNextAvaibleQuestion()'
        class="flex-grow w-full pb-2"
        [options]="{ type: 0, title: 'Câu kế tiếp' }"
      ></g-button> -->

      <g-button
        class="flex-grow w-full"
        [options]="{ type: 1, title: isMainQuestion ? 'Trợ giúp' : 'Gợi ý' }"
      ></g-button>
    </div>
  `,
})
export class QuizAnswersComponent implements OnInit {
  @Input()
  isMainQuestion: boolean

  @Input() answerType: BoxType

  @Output()
  onSubmission: EventEmitter<PossibleInputAnswer> = new EventEmitter

  @Input()
  question: Box

  @Input()
  phaseProvider: MultiPhasesProvider;

  ngOnInit() {
    console.log(this.phaseProvider)
    // console.log(this.question);
  }

  choosenAnswear: PossibleInputAnswer;

  saveAnswear(answear: PossibleInputAnswer) {
    console.log(answear);
    this.choosenAnswear = answear;
  }

  gotoNextAvaibleQuestion() {
    if (this.phaseProvider.nextAvailable) {
      this.phaseProvider.next();
    }
  }

  submitAnswear() {
    this.onSubmission.emit(this.choosenAnswear);
  }

  // parseMultiBoxesProvider(): MultiBoxesProvider | undefined {
  //   if (this.question instanceof MultiBoxesProvider) return this.question as MultiBoxesProvider
  //   return undefined
  // }


  currentAsShortAnswearProvider(): ShortAnswerProvider | undefined {
    if (this.question.type === BoxType.SHORT_ANSWER) return this.question as ShortAnswerProvider
    return undefined
  }

  currentAsMultipleChoices(): MultipleChoicesProvider | undefined {
    if (this.question.type === BoxType.MULTIPLE_CHOICES) return this.question as MultipleChoicesProvider
    return undefined
  }

  public QuestionAnswerType: typeof BoxType = BoxType

}

interface SubmitableBox extends Box, Submitable<PossibleInputAnswer> {

}
