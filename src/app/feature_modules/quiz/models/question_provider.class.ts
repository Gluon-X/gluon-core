import { Box, Choice, MultipleChoices, PossibleInputAnswer, Question, ShortAnswer, Submitable } from './interfaces.new'
import { BoxType } from './enums.new'
import { isNotUndefined, isNullOrUndefined, isUndefined } from '../../../shared'

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
    return isNotUndefined(this._question.help)
  }

  get help(): string | undefined {
    return this._isHelpEnabled ? this._question?.help : undefined
  }

  // Fields inherit from `Submitable`
  abstract get submission(): PossibleInputAnswer | undefined

  abstract get explanation(): string | undefined

  abstract get isCorrect(): boolean | undefined

  get isCompleted(): boolean {
    return this.isCorrect ?? false
  }

  protected readonly _question?: Question

  private _isHelpEnabled = false

  /**
   * Parse a displayable box object to `QuestionProvider` instance if its type is not `DISPLAYABLE`
   *
   * @param box indicate a displayable object
   * @return Box if `type` is `DISPLAYABLE`
   * @return ShortAnswerProvider if `type` is `SHORT_ANSWER`
   * @return MultipleChoicesProvider if `type` is `MULTIPLE_CHOICES`
   */
  static fromBox(box: Box): Box | QuestionProvider | undefined {
    if (isUndefined(box?.type)) return undefined
    switch (box.type) {
      case BoxType.SHORT_ANSWER:
        return new ShortAnswerProvider(box as ShortAnswer)
      case BoxType.MULTIPLE_CHOICES:
        if ((box as MultipleChoices).choices?.length > 0)
          return new MultipleChoicesProvider(box as MultipleChoices)
    }
    return box
  }

  abstract submit(answer: PossibleInputAnswer): boolean

  enableHelp() {
    this._isHelpEnabled = true
  }
}

export class ShortAnswerProvider extends QuestionProvider implements Submitable<string | number> {
  private _submission?: number | string

  get submission(): string | undefined {
    return `${this._submission}`
  }

  get explanation(): string | undefined {
    return undefined
  }

  get isCorrect(): boolean | undefined {
    const answer = this._submission
    const type = typeof answer

    if (typeof this._question.answer === 'string' && type === 'string')
      return true
    let lowerBoundary = 0
    let upperBoundary = 0
    if (isNotUndefined(this.approx)) {
      lowerBoundary = (this._question.answer as number) - this.approx
      upperBoundary = (this._question.answer as number) + this.approx
    }
    return lowerBoundary <= answer && answer <= upperBoundary
  }

  get approx(): number | undefined {
    return this._question.approx
  }

  constructor(protected readonly _question: ShortAnswer) {
    super()
  }

  submit(answer: string | number): boolean {
    const type = typeof answer
    if (type !== 'string' && type !== 'number') return false
    this._submission = answer
    return true
  }

}

export class MultipleChoicesProvider extends QuestionProvider implements Submitable<number> {
  private _submission?: number

  get submission(): number | undefined {
    return this._submission
  }

  get explanation(): string | undefined {
    return isUndefined(this.submission) ?
      undefined :
      this._question.choices[this._submission].explanation
  }

  get isCorrect(): boolean | undefined {
    return isNotUndefined(this._submission) ?
      this._question.choices[this._submission].isCorrect :
      undefined
  }

  get choices(): Choice[] {
    return this._question.choices
  }

  constructor(protected readonly _question: MultipleChoices) {
    super()
  }

  submit(answer: number): boolean {
    if (typeof answer !== 'number') return false
    if (this.choices.length - 1 < answer || answer < 0) return false
    this._submission = answer
    return true
  }

}

