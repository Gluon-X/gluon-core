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

  public get answer(): number | number[] | string | null {
    return this._answer
  }

  public get isCorrect(): boolean | null {
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
    public readonly correctAnswers: number | number[] | string | string[]
  ) {}

  // TODO the following code blocks are duplicated.
  // extended fields
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

export class HelpProvider implements QuestionControlProvider {
  isCompleted: boolean

  currentPhase: string | number

  phasesCount: number

  questionIndex: number

  questionsCount: number

  openQuestion?: string

  hint?: string

  question?: BaseQuestion

  answer?: string

  isCorrect?: boolean

  constructor(private _helps: { [phaseName: string]: PhaseStack }) {}

  next() {}

  previous() {}

  submit(answer: number | number[] | string) {}
}

export class FollowUpQuestionProvider implements QuestionControlProvider {
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

  get question(): QuestionProvider | null {
    return this._questions.length > 0
      ? this._questions[this.questionIndex]
      : null
  }

  get answer(): number | number[] | string | null {
    return this.question?.answer
  }

  get hint(): string | null {
    return this.question?.hint
  }

  get isCorrect(): boolean | null {
    return this.question?.isCorrect
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
    this._questions[this.questionIndex].submit(answer)
  }
}
