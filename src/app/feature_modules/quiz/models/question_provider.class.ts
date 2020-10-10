import { Choice, MultipleChoices, PossibleInputAnswer, Question, ShortAnswer, Submitable } from './interfaces.new'
import { BoxType } from './enums.new'
import { isNotUndefined, isNullOrUndefined } from '../../../shared'

// Acts as substitution to `QuestionProvider`
export abstract class QuestionProvider implements Submitable<PossibleInputAnswer>, Question {

  // Fields inherit from `Question`
  get content(): string {
    return this._question?.content
  }

  get imageURL(): string {
    return this._question?.imageURL
  }

  get type(): BoxType {
    return this._question?.type
  }

  get isHelpExist(): boolean {
    return isNotUndefined(this._question?.help)
  }

  get help(): string | undefined {
    return this._isHelpEnabled ? this._question?.help : undefined
  }

  // Fields inherit from `Submitable`
  readonly submission?: PossibleInputAnswer

  readonly explanation?: string

  readonly isCorrect?: boolean

  get isCompleted(): boolean {
    return this.isCorrect ?? false
  }

  protected _question?: Question

  private _isHelpEnabled = false

  static fromBaseQuestion(question: Question): QuestionProvider | undefined {
    if (isNullOrUndefined(question)) return undefined
    switch (question.type) {
      case BoxType.SHORT_ANSWER:
        return new ShortAnswerProvider(question as ShortAnswer)
      case BoxType.MULTIPLE_CHOICES:
        if ((question as MultipleChoices).choices?.length > 0)
          return new MultipleChoicesProvider(question as MultipleChoices)
    }
    return undefined
  }

  abstract submit(answer: PossibleInputAnswer): boolean

  enableHelp() {
    this._isHelpEnabled = true
  }
}

export class ShortAnswerProvider extends QuestionProvider implements Submitable<string> {
  readonly submission?: string

  readonly explanation?: string

  readonly isCorrect: boolean

  // readonly answer: string | number

  readonly approx: number

  constructor(protected readonly _question: ShortAnswer) {
    super()
  }

  submit(answer: string): boolean {
    if (typeof answer !== 'string') return false
    // TODO implement this
    return true
  }

}

export class MultipleChoicesProvider extends QuestionProvider implements Submitable<number> {
  readonly submission?: number

  readonly explanation?: string

  readonly isCorrect: boolean

  readonly choices: Choice[]

  constructor(protected readonly _question: MultipleChoices) {
    super()
  }

  submit(answer: number): boolean {
    if (typeof answer !== 'number') return false
    // TODO implement this
    return true
  }

}

