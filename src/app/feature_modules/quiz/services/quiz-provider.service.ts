import { Injectable, InjectionToken } from '@angular/core'
import { isNull, isNullOrUndefined } from 'src/app/shared'
import {
  MultiPhasesProvider,
  MultiQuestionsProvider,
  QuestionProvider,
} from '../models/classes'
import { realDummyData } from '../models/dummy_data'
import { QuizState } from '../models/enums'
import { MainQuestion, QuizPlayable } from '../models/interfaces'

export const QUIZ_STATE = new InjectionToken<QuizPlayable>('quiz.state')

@Injectable()
export class QuizProvider implements QuizPlayable {
  mainQuestion?: QuestionProvider

  state: QuizState

  helper?: MultiPhasesProvider

  followUpProvider?: MultiQuestionsProvider

  qid: string = ''

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

  private _mainQuestion?: QuestionProvider = null

  get mainQuestion(): QuestionProvider {
    return this._mainQuestion
  }

  private _title?: string = null

  get title(): string {
    return this._title
  }

  private _enableHelp = false

  private _isError = false

  get state(): QuizState {
    const main = this.mainQuestion

    if (isNull(main)) return this._isError ? QuizState.ERROR : QuizState.EMPTY
    if (main.isCompleted)
      return this.followUpProvider.isCompleted
        ? QuizState.FINISHED
        : QuizState.FOLLOW_UP
    return this._enableHelp ? QuizState.HELP : QuizState.READY
  }

  private _helper?: MultiPhasesProvider = null

  get helper(): MultiPhasesProvider {
    return this._helper
  }

  private _followUpProvider?: MultiQuestionsProvider = null

  get followUpProvider(): MultiQuestionsProvider {
    return this._followUpProvider
  }

  enableHelper() {
    // if (this.state === QuizState.READY) this._state = QuizState.HELP
    this._enableHelp = true
  }

  private parse(question: MainQuestion) {
    this._mainQuestion = QuestionProvider.fromBaseQuestion(question)
    if (isNull(this._mainQuestion)) {
      console.log(`An error occurred while parsing data`)
      this._isError = true
      return
    }
    this._helper = new MultiPhasesProvider(question.helps)
    this._followUpProvider = new MultiQuestionsProvider(
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
    this._isError = false
  }
}
