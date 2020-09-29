import {
  BaseQuestion,
  PhaseStack,
  Question,
  QuestionControlProvider,
} from './interfaces'
import { QuestionType } from './enums'
import {
  isNull,
  isNullOrUndefined,
  isNumbers,
  isStrings,
  isUndefined,
} from '../../../shared'
import { isNotNullOrUndefined } from 'codelyzer/util/isNotNullOrUndefined'

type PossibleInputAnswer = number | number[] | string

export class QuestionProvider implements Question {
  get isCompleted(): boolean {
    return this.isCorrect ?? false
  }

  get answer(): PossibleInputAnswer | null {
    return this._answer
  }

  get isCorrect(): boolean | null {
    const answer = this.answer
    if (isNull(answer)) return null

    switch (this.type) {
      case QuestionType.SINGLE_CHOICE:
        break
      case QuestionType.MULTIPLE_CHOICES:
        let result = true
        for (const a of answer as number[]) result &&= this.isMatch(a)
        return result
      case QuestionType.TEXT:
        if (isStrings(this.availableAnswers)) {
          const res = this.availableAnswers.find((a) => a === answer)
          return isUndefined(res)
        }
        break
      default:
        return null
    }
    return answer === this.correctAnswers
  }

  get hint(): string | null {
    return this._hint
  }

  constructor(
    public readonly content: string,
    public readonly type: QuestionType,
    public readonly correctAnswers: PossibleInputAnswer | string[],
    public readonly availableAnswers?: string[],
    public readonly imageURL?: string
  ) {}

  private _answer?: PossibleInputAnswer = null

  private _hint?: string = null

  static fromBaseQuestion(base: Question): QuestionProvider | null {
    let correctAnswers = base?.correctAnswers
    const availableAnswers = base?.availableAnswers

    if (isNullOrUndefined(base?.type) || isNullOrUndefined(correctAnswers)) {
      console.error(
        'Question is null or undefined; or invalid `type` or `correctAnswers` field.'
      )
      return null
    }
    switch (base.type) {
      case QuestionType.SINGLE_CHOICE:
        if (this.isInvalidSingleChoiceQuestion(base)) {
          console.error(`Invalid single choice question input.`)
          return null
        }
        break
      case QuestionType.MULTIPLE_CHOICES:
        if (
          isNullOrUndefined(availableAnswers) ||
          availableAnswers.length === 0
        ) {
          console.error(
            'Invalid multiple choices input (with field `availableAnswers` is null or undefined'
          )
          return null
        }
        // convert numeric value to single-el numeric array
        if (
          typeof correctAnswers === 'number' &&
          this.isInRange(availableAnswers.length, correctAnswers)
        ) {
          correctAnswers = [correctAnswers] as number[]
          break
        }
        // @ts-ignore
        if (
          // all correct answers must be numeric
          isNumbers(correctAnswers) &&
          // at least 1 correct answer
          (correctAnswers as number[]).length > 0 &&
          // correct answers indices must exist in available answers
          this.isInRange(availableAnswers.length, correctAnswers as number[])
        )
          break
        return null
      case QuestionType.TEXT:
        if (Array.isArray(correctAnswers)) {
          correctAnswers = (correctAnswers as any[])
            .filter(isNotNullOrUndefined)
            .map((a) => a.toString())
          if (correctAnswers.length === 0) return null
          break
        }
        if (typeof correctAnswers === 'string') break
        correctAnswers = correctAnswers.toString()
        break
      default:
        console.error('Uncatch question type!')
        return null
    }
    return new QuestionProvider(
      base.content,
      base.type,
      correctAnswers,
      availableAnswers,
      base.imageURL
    )
  }

  private static isInvalidSingleChoiceQuestion(base: Question): boolean {
    return (
      isNullOrUndefined(base.availableAnswers) ||
      // at least one available answer to pick
      base.availableAnswers.length === 0 ||
      // single choice question allows one correct answer index only
      typeof base.correctAnswers !== 'number' ||
      // correct answer index must be within available answers' indices
      !this.isInRange(base.availableAnswers.length, base.correctAnswers)
    )
  }

  private static isInRange(length: number, value: number | number[]): boolean {
    if (typeof value === 'number') return value < length && value >= 0
    for (const num of value) if (!this.isInRange(length, num)) return false
    return true
  }

  private isMatch(value: number): boolean {
    for (const answer of this.correctAnswers as number[])
      if (value === answer) return true
    return false
  }

  protected isValidAnswer(answer: PossibleInputAnswer): boolean {
    if (isNullOrUndefined(answer)) return false
    const type = typeof answer
    if (type === 'number' && this.type === QuestionType.SINGLE_CHOICE) {
      if (
        QuestionProvider.isInRange(
          this.availableAnswers.length,
          answer as number
        )
      )
        return true
      else return false
    }
    if (type === 'string' && this.type === QuestionType.TEXT) return true
    if (
      isNumbers(answer) &&
      (answer as number[]).length > 0 &&
      this.type === QuestionType.MULTIPLE_CHOICES &&
      QuestionProvider.isInRange(
        this.availableAnswers.length,
        answer as number[]
      )
    )
      return true
    return false
  }

  submit(answer: PossibleInputAnswer) {
    if (!this.isValidAnswer(answer)) {
      console.error(
        'Parameter `answer` passed into `submit` method is invalid.'
      )
      return
    }
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
    /**
     * TODO filter out nullable els in _questions. What if after filtered, _questions is empty?
     */
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

  get answer(): PossibleInputAnswer | null {
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

  submit(answer: PossibleInputAnswer) {
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

  get answer(): PossibleInputAnswer | null {
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

  constructor(_helps: { [phaseName: string]: PhaseStack }) {
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

  submit(answer: PossibleInputAnswer) {
    this._currentPhase.submit(answer)
  }
}
