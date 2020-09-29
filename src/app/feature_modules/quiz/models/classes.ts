import {
  BaseQuestion,
  PhaseStack,
  Question,
  QuestionControlProvider,
} from './interfaces'
import { QuestionType } from './enums'
import {
  isNotNull,
  isNotUndefined,
  isNull,
  isNullOrUndefined,
  isUndefined,
} from '../../../shared'
import { isNotNullOrUndefined } from 'codelyzer/util/isNotNullOrUndefined'

export class QuestionProvider implements Question {
  get isCompleted(): boolean {
    return isNotNull(this.answer) && this.isCorrect
  }

  get answer(): number | number[] | string | null {
    return this._answer
  }

  get isCorrect(): boolean | null {
    const answer = this._answer

    if (isNull(answer)) return null
    switch (typeof answer) {
      case 'string':
        return Array.isArray(this.correctAnswers)
          ? isNotUndefined(
              (this.correctAnswers as string[]).find((v) => v === answer)
            )
          : this.correctAnswers === answer
      case 'number':
        return Array.isArray(this.correctAnswers)
          ? isNotUndefined(
              (this.correctAnswers as number[]).find((v) => v === answer)
            )
          : this.correctAnswers === answer
      default:
        // TODO should this return null?
        return null
    }
  }

  get hint(): string | null {
    return this._hint
  }

  constructor(
    public availableAnswers: string[],
    public content: string,
    public imageURL: string,
    public type: QuestionType,
    public correctAnswers: number | number[] | string | string[]
  ) {}

  private _answer?: number | number[] | string

  private _hint?: string

  static fromBaseQuestion(base: Question): QuestionProvider {
    if (isNullOrUndefined(base)) return null
    return new QuestionProvider(
      base.availableAnswers,
      base.content,
      base.imageURL,
      base.type,
      base.correctAnswers
    )
  }

  submit(answer: number | number[] | string) {
    // TODO verify answer inputs before parsing
    this._answer = answer
    if (!this.isCorrect) this._hint = 'Incorrect answer!'
  }
}

export class MultiQuestionsProvider implements QuestionControlProvider {
  private readonly _questions: QuestionProvider[]

  get isCompleted(): boolean {
    return isUndefined(this._questions.find((q) => !q.isCompleted))
  }

  constructor(questions: Question[]) {
    this._questions = isNotNullOrUndefined(questions)
      ? questions
          .filter(isNotNullOrUndefined)
          .map(QuestionProvider.fromBaseQuestion)
      : []
  }

  get question(): Question | null {
    return this._question
  }

  private get _question(): QuestionProvider | null {
    return this._questions.length > 0
      ? this._questions[this.questionIndex]
      : null
  }

  get answer(): number | number[] | string | null {
    return this._question?.answer
  }

  get hint(): string | null {
    return this._question?.hint
  }

  get isCorrect(): boolean | null {
    return this._question?.isCorrect
  }

  private _questionIndex = 0

  get questionIndex(): number {
    return this._questionIndex
  }

  get questionsCount(): number {
    return this._questions?.length
  }

  get nextAvailable(): boolean {
    return (
      this._questions.length > 0 && this.questionIndex < this.questionsCount - 1
    )
  }

  get prevAvailable(): boolean {
    return this.questionIndex > 0
  }

  next() {
    if (this.nextAvailable) this._questionIndex++
  }

  previous() {
    if (this.prevAvailable) this._questionIndex--
  }

  submit(answer: number | number[] | string) {
    this._question?.submit(answer)
  }
}

class PhaseStackProvider extends MultiQuestionsProvider {
  readonly phaseName: string

  readonly openQuestion: string

  constructor(phaseName: string, phaseStack: PhaseStack) {
    super(phaseStack?.subQuestions)
    this.phaseName = phaseName
    this.openQuestion = phaseStack?.openQuestion
  }
}

export class MultiPhasesProvider implements QuestionControlProvider {
  get isCompleted(): boolean {
    return isUndefined(this._phases.find((p) => !p.isCompleted))
  }

  private _currentPhaseIndex = 0

  get currentPhaseIndex(): number {
    return this._currentPhaseIndex
  }

  private get _currentPhase(): PhaseStackProvider {
    return this.phasesCount > 0 ? this._phases[this.currentPhaseIndex] : null
  }

  get currentPhaseName(): string {
    return this._currentPhase?.phaseName
  }

  get phasesCount(): number {
    return this._phases.length
  }

  get questionIndex(): number {
    return this._currentPhase?.questionIndex
  }

  get questionsCount(): number {
    return this._currentPhase?.questionsCount
  }

  get openQuestion(): string | null {
    return this._currentPhase?.openQuestion
  }

  get hint(): string | null {
    return this._currentPhase?.hint
  }

  get question(): BaseQuestion | null {
    return this._currentPhase?.question
  }

  get answer(): string | number | number[] | null {
    return this._currentPhase?.answer
  }

  get isCorrect(): boolean | null {
    return this._currentPhase?.isCorrect
  }

  get nextAvailable(): boolean {
    // TODO implement this
    return true
  }

  get prevAvailable(): boolean {
    // TODO implement this
    return true
  }

  private readonly _phases: PhaseStackProvider[]

  constructor(private _helps: { [phaseName: string]: PhaseStack }) {
    this._phases = isNotNullOrUndefined(_helps)
      ? Object.keys(_helps).map((k) => new PhaseStackProvider(k, _helps[k]))
      : []
  }

  next() {
    const currentPhase = this._currentPhase

    if (!currentPhase.isCompleted) return
    if (currentPhase.nextAvailable) currentPhase.next()
    else if (this.nextAvailable) this._currentPhaseIndex += 1
  }

  previous() {
    const currentPhase = this._currentPhase

    if (currentPhase.prevAvailable) currentPhase.previous()
    else if (this.prevAvailable) this._currentPhaseIndex -= 1
  }

  submit(answer: number | number[] | string) {
    this._currentPhase.submit(answer)
  }
}
