import { Injectable, InjectionToken } from '@angular/core'
import { isNullOrUndefined, isUndefined } from 'src/app/shared'
import { QuizState } from '../models'
import { Quiz, QuizPlayable } from '../models'
import { QuestionProvider } from '../models'
import { MultiPhasesProvider } from '../models'
import { MultiBoxesProvider } from '../models'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment'
import { map } from 'rxjs/operators'

interface QuizResponse {
  data: Quiz[]
}

export const QUIZ_STATE = new InjectionToken<QuizPlayable>('quiz.state')

@Injectable()
export class QuizHandler implements QuizPlayable {
  private _qid?: string = null

  set qid(value: string) {
    if (this._qid === value) return
    this.reset()
    this._qid = value
    if (isNullOrUndefined(value)) {
      this._qid = null
      return
    }
    this._http.get<QuizResponse>(`${environment.serverAPI}/api/v1/questions/test`)
      .pipe(map(({ data }) => data), map(v => v[0]))
      .toPromise()
      .then(v => this.parse(v))
      .catch(console.error)
  }

  get qid(): string {
    return this._qid
  }

  private _coreQuestion?: QuestionProvider = undefined

  get mainQuestion(): QuestionProvider | undefined {
    return this._coreQuestion
  }

  private _title?: string = undefined

  get title(): string {
    return this._title
  }

  private _enableHelp = false

  private _isError = false

  get state(): QuizState {
    const main = this.mainQuestion

    if (isUndefined(main)) return this._isError ? QuizState.ERROR : QuizState.EMPTY
    if (main.isCompleted)
      return this.followUpProvider?.isCompleted ?? true
        ? QuizState.FINISHED
        : QuizState.FOLLOW_UP
    return this._enableHelp ? QuizState.HELP : QuizState.READY
  }

  private _helper?: MultiPhasesProvider = undefined

  get helper(): MultiPhasesProvider | undefined {
    return this._helper
  }

  private _followUpProvider?: MultiBoxesProvider = undefined

  get followUpProvider(): MultiBoxesProvider | undefined {
    return this._followUpProvider
  }

  constructor(private _http: HttpClient) {
  }

  enableHelper() {
    if (this.state === QuizState.READY) this._enableHelp = true
    else console.error('State of current quiz is not ready.')
  }

  private parse(question: Quiz) {
    this._coreQuestion = QuestionProvider.fromBox(question.core) as QuestionProvider
    if (isUndefined(this._coreQuestion)) {
      console.log(`An error occurred while parsing data`)
      this._isError = true
      return
    }
    this._helper = MultiPhasesProvider.fromPhases(question.helps)
    this._followUpProvider = MultiBoxesProvider.fromPhase(
      question.followUp
    )
    this._title = question.title
  }

  private reset() {
    this._coreQuestion = undefined
    this._title = undefined
    this._helper = undefined
    this._followUpProvider = undefined
    this._enableHelp = false
    this._isError = false
  }
}
