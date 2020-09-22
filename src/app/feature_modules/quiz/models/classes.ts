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
} from '../../../shared'

export class MainQuestionProvider implements Question {
  private _answer?: number | number[] | string

  get answer(): number | number[] | string | null {
    return this._answer
  }

  get isCorrect(): boolean | null {
    const answer = this._answer

    if (isNull(answer)) return null
    if (typeof answer === 'string') {
      return Array.isArray(answer)
        ? isNotUndefined(
            (this.correctAnswers as string[]).find((v) => v === answer)
          )
        : this.correctAnswers === answer
    }
  }

  private _hint?: string

  get hint(): string | null {
    return this._hint
  }

  get isCompleted(): boolean {
    return isNotNull(this.answer) && this.isCorrect
  }

  constructor(
    public availableAnswers: string[],
    public content: string,
    public imageURL: string,
    public type: QuestionType,
    public readonly correctAnswers: number | number[] | string | string[]
  ) {}

  static fromBaseQuestion(base: Question): MainQuestionProvider {
    if (isNullOrUndefined(base)) return null
    return new MainQuestionProvider(
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
  isCompleted: boolean

  constructor(private _questions: Question[]) {}

  answer: number | number[] | string

  hint: string

  isCorrect: boolean

  question: BaseQuestion

  questionIndex: number

  questionsCount: number

  next() {}

  previous() {}

  submit(answer: number | number[] | string) {}
}
