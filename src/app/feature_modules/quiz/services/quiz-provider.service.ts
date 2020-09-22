import { Injectable, InjectionToken } from '@angular/core'
import { isNullOrUndefined } from 'src/app/shared'
import { HelpProvider, FollowUpQuestionProvider } from '../models/classes'
import { realDummyData } from '../models/dummy_data'
import { QuizState } from '../models/enums'
import { BaseQuestion, MainQuestion, QuizPlayable } from '../models/interfaces'

export const QUIZ_STATE = new InjectionToken<QuizPlayable>('quiz.state')

@Injectable()
export class QuizProvider implements QuizPlayable {
  mainQuestion?: BaseQuestion

  state: QuizState

  helper?: HelpProvider

  followUpProvider?: FollowUpQuestionProvider

  qid: string = ''

  submit(choice: string | number | number[]) {
    throw new Error('Method not implemented.')
  }

  enableHelper(): void {
    throw new Error('Method not implemented.')
  }
}

@Injectable()
export class DummyQuizProvider implements QuizPlayable {
  private _qid?: string = null

  set qid(value: string) {
    if (this._qid === value) {
      return
    }
    this.reset()
    this._qid = value
    if (isNullOrUndefined(value)) {
      this._qid = null
      return
    }
    // fetching data from https server
    /**
     * TODO what if realDummyData[value] is unavailable??
     */
    this.parse(realDummyData[value])
  }

  get qid(): string {
    return this._qid
  }

  private _mainQuestion?: MainQuestion = null

  get mainQuestion(): BaseQuestion {
    return this._mainQuestion
  }

  get title(): string {
    return this._mainQuestion?.title
  }

  private _state = QuizState.EMPTY

  get state(): QuizState {
    /**
     * should not use this.followUpProvider getter here.
     * since the getter method also use this getter.
     * which may cause looping functions.
     */
    return this._followUpProvider?.isCompleted
      ? QuizState.FINISHED
      : this._state
  }

  private _helper?: HelpProvider = null

  get helper(): HelpProvider {
    return this.state === QuizState.HELP ? this._helper : null
  }

  private _followUpProvider?: FollowUpQuestionProvider = null

  get followUpProvider(): FollowUpQuestionProvider {
    return this.state === QuizState.FOLLOW_UP ? this._followUpProvider : null
  }

  submit(answer: string | number | number[]) {
    if (
      isNullOrUndefined(answer) ||
      (this.state !== QuizState.HELP && this.state !== QuizState.READY)
    ) {
      return
    }
    this._state = QuizState.FOLLOW_UP
    /**
     * TODO:  negative numbers or numbers greater than len of available answers
     * TODO:  duplicate numbers in number[]
     * TODO:  is empty string available????
     */
  }

  enableHelper() {
    if (this.state === QuizState.READY) {
      this._state = QuizState.HELP
    }
  }

  private parse(question: MainQuestion) {
    this._mainQuestion = question
    this._state = QuizState.READY
    this._helper = new HelpProvider(this._mainQuestion.helps)
    this._followUpProvider = new FollowUpQuestionProvider(
      this._mainQuestion.followUpQuestions
    )
  }

  private reset() {
    this._mainQuestion = null
    this._state = QuizState.EMPTY
    this._helper = null
    this._followUpProvider = null
  }
}
