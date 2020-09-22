import { Injectable, InjectionToken } from '@angular/core'
import { isNull, isNullOrUndefined } from 'src/app/shared'
import {
  FollowUpQuestionProvider,
  HelpProvider,
  MainQuestionProvider,
} from '../models/classes'
import { realDummyData } from '../models/dummy_data'
import { QuizState } from '../models/enums'
import { MainQuestion, QuizPlayable } from '../models/interfaces'

export const QUIZ_STATE = new InjectionToken<QuizPlayable>('quiz.state')

@Injectable()
export class QuizProvider implements QuizPlayable {
  mainQuestion?: MainQuestionProvider

  state: QuizState

  helper?: HelpProvider

  followUpProvider?: FollowUpQuestionProvider

  qid: string = ''

  // submit(choice: string | number | number[]) {
  //   throw new Error('Method not implemented.')
  // }

  enableHelper(): void {
    throw new Error('Method not implemented.')
  }
}

@Injectable()
export class DummyQuizProvider implements QuizPlayable {
  private _qid?: string = null

  set qid(value: string) {
    if (this._qid === value) return
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
    setTimeout(() => this.parse(realDummyData[value]), 1000)
  }

  get qid(): string {
    return this._qid
  }

  private _mainQuestion?: MainQuestionProvider = null

  get mainQuestion(): MainQuestionProvider {
    return this._mainQuestion
  }

  private _title?: string = null

  get title(): string {
    return this._title
  }

  private _enableHelp = false

  get state(): QuizState {
    /**
     * should not use this.followUpProvider getter here.
     * since the getter method also use this getter.
     * which may cause looping functions.
     */
    const main = this.mainQuestion

    if (isNull(main)) return QuizState.EMPTY
    if (main.isCompleted)
      return this.followUpProvider.isCompleted
        ? QuizState.FINISHED
        : QuizState.FOLLOW_UP
    return this._enableHelp ? QuizState.HELP : QuizState.READY
  }

  private _helper?: HelpProvider = null

  get helper(): HelpProvider {
    return this._helper
  }

  private _followUpProvider?: FollowUpQuestionProvider = null

  get followUpProvider(): FollowUpQuestionProvider {
    return this._followUpProvider
  }

  // submit(answer: string | number | number[]) {
  // if (
  //   isNullOrUndefined(answer) ||
  //   (this.state !== QuizState.HELP && this.state !== QuizState.READY)
  // )
  //   return
  // this._answer = answer
  // if (this.isCorrect) this._state = QuizState.FOLLOW_UP
  /**
   * TODO:  negative numbers or numbers greater than len of available answers
   * TODO:  duplicate numbers in number[]
   * TODO:  is empty string available????
   */
  // }

  enableHelper() {
    // if (this.state === QuizState.READY) this._state = QuizState.HELP
    this._enableHelp = true
  }

  private parse(question: MainQuestion) {
    this._mainQuestion = MainQuestionProvider.fromBaseQuestion(question)
    this._helper = new HelpProvider(question.helps)
    this._followUpProvider = new FollowUpQuestionProvider(
      question.followUpQuestions
    )
    this._title = question.title
  }

  private reset() {
    this._mainQuestion = null
    this._title = null
    this._helper = null
    this._followUpProvider = null
    this._enableHelp = false
  }

}
