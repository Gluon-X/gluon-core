import { Injectable, InjectionToken } from '@angular/core'
import { isNotNull } from 'src/app/shared'
import { realDummyData } from '../models/dummy_data'
import { MainQuestion, QuizState } from '../models/interfaces'

export const QUIZ_STATE = new InjectionToken<QuizState>('quiz.state')

@Injectable()
export class QuizProvider implements QuizState {
  get isAvailable(): boolean {
    return false
  }

  qid: string = ''
}

@Injectable()
export class DummyQuizProvider implements QuizState {
  private _mainQuestion?: MainQuestion

  private _qid?: string

  /**
   * qid: execute whenever new qid is passed in
   *
   * @param value: new question id
   */
  set qid(value: string) {
    this._mainQuestion = null
    // fetching data from https server
    setTimeout(() => (this._mainQuestion = realDummyData), 3000)
  }

  get qid(): string {
    return this._qid
  }

  get isAvailable(): boolean {
    return isNotNull(this._mainQuestion)
  }
}
