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
        if (QuestionProvider.isInvalidSingleChoiceQuestion(base)) {
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
          QuestionProvider.isInRange(
            availableAnswers.length,
            correctAnswers as number[]
          )
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
      !QuestionProvider.isInRange(
        base.availableAnswers.length,
        base.correctAnswers
      )
    )
  }

  private static isInRange(length: number, value: number | number[]): boolean {
    if (typeof value === 'number') return value < length && value >= 0
    for (const num of value)
      if (!QuestionProvider.isInRange(length, num)) return false
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
    if (type === 'number' && this.type === QuestionType.SINGLE_CHOICE)
      return QuestionProvider.isInRange(
        this.availableAnswers.length,
        answer as number
      )
    if (type === 'string' && this.type === QuestionType.TEXT) return true
    return (
      isNumbers(answer) &&
      (answer as number[]).length > 0 &&
      this.type === QuestionType.MULTIPLE_CHOICES &&
      QuestionProvider.isInRange(
        this.availableAnswers.length,
        answer as number[]
      )
    )
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
    let result = true
    for (const q of this._questions) result &&= q.isCompleted
    return result
  }

  constructor(questions: Question[]) {
    // `questions` field will not be NULL
    this._questions =
      questions
        ?.map(QuestionProvider.fromBaseQuestion)
        .filter(isNotNullOrUndefined) ?? []
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
    return isNull(this._question) ? null : this._question?.answer
  }

  get hint(): string | null {
    return isNull(this._question) ? null : this._question?.hint
  }

  get isCorrect(): boolean | null {
    return isNull(this._question) ? null : this._question?.isCorrect
  }

  private _questionIndex = 0

  get questionIndex(): number {
    return this._questionIndex
  }

  get questionsCount(): number {
    // `null check` operator is uneccessary since `_questions` will never be NULL;
    // at least empty, check `constructor`.
    return this._questions.length
  }

  get nextAvailable(): boolean {
    return (
      // at least one question
      this._questions.length > 0 &&
      // next question is available
      this.questionIndex < this.questionsCount - 1 &&
      // current question is completed
      this._question.isCompleted
    )
  }

  get prevAvailable(): boolean {
    return this.questionIndex > 0
  }

  next() {
    if (this.nextAvailable) this._questionIndex++
    else console.error('Next question is not available')
  }

  previous() {
    if (this.prevAvailable) this._questionIndex--
    else console.error('Previous question is not available')
  }

  submit(answer: PossibleInputAnswer) {
    this._question?.submit(answer)
  }
}

class PhaseStackProvider extends MultiQuestionsProvider {
  readonly phaseName?: string

  readonly openQuestion?: string

  constructor(phaseName: string, phaseStack: PhaseStack) {
    super(phaseStack?.subQuestions)
    this.phaseName = phaseName
    this.openQuestion = phaseStack?.openQuestion
  }

  public static fromPhaseStack(phaseName: string, value: PhaseStack) {
    return new PhaseStackProvider(phaseName, value)
  }
}

export class MultiPhasesProvider implements QuestionControlProvider {
  get isCompleted(): boolean {
    let result = true
    for (const p of this._phases) result &&= p.isCompleted
    return result
  }

  private _currentPhaseIndex = 0

  get currentPhaseIndex(): number {
    return this._currentPhaseIndex
  }

  private get _currentPhase(): PhaseStackProvider | null {
    return this.phasesCount > 0 ? this._phases[this.currentPhaseIndex] : null
  }

  get currentPhaseName(): string | null {
    return this._currentPhase?.phaseName
  }

  get phasesCount(): number {
    return this._phases.length
  }

  get questionIndex(): number | null {
    return this._currentPhase?.questionIndex
  }

  get questionsCount(): number | null {
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
    return (
      // at least one phase
      this._currentPhase?.nextAvailable ||
      // or next phase available and current phase is completed
      (this.currentPhaseIndex < this.phasesCount - 1 &&
        this._currentPhase?.isCompleted)
    )
  }

  get prevAvailable(): boolean {
    return this._currentPhase?.prevAvailable || this.currentPhaseIndex > 0
  }

  private readonly _phases: PhaseStackProvider[]

  constructor(_helps: { [phaseName: string]: PhaseStack }) {
    this._phases = Object.entries(_helps ?? {}).map(
      // @ts-ignore
      PhaseStackProvider.fromPhaseStack
    )
  }

  next() {
    if (!this.nextAvailable) return
    if (this._currentPhase.nextAvailable) this._currentPhase.next()
    else this._currentPhaseIndex += 1
  }

  previous() {
    if (!this.prevAvailable) return
    if (this._currentPhase.prevAvailable) this._currentPhase.previous()
    else this._currentPhaseIndex -= 1
  }

  submit(answer: PossibleInputAnswer) {
    this._currentPhase?.submit(answer)
  }
}
