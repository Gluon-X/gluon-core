import { Box, Choice, MultipleChoices, PossibleInputAnswer, Question, ShortAnswer, Submitable } from './interfaces.new'
import { BoxType } from './enums.new'
import { isNotUndefined, isNullOrUndefined, isUndefined } from '../../../shared'

// Acts as substitution to `QuestionProvider`
export abstract class QuestionProvider implements Submitable<PossibleInputAnswer>, Question {

  // Fields inherit from `Question`
  get content(): string {
    return this._question.content
  }

  get imageURL(): string {
    return this._question.imageURL
  }

  get type(): BoxType {
    return this._question.type
  }

  get hint(): string | undefined {
    return this._question.hint
  }

  // Fields inherit from `Submitable`
  abstract get submission(): PossibleInputAnswer | undefined

  abstract get explanation(): string | undefined

  abstract get isCorrect(): boolean | undefined

  get isCompleted(): boolean {
    return this.isCorrect ?? false
  }

  // This should never be undefined or null.
  protected readonly _question: Question

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
        if (isNullOrUndefined((box as ShortAnswer).answer)) return undefined
        return new ShortAnswerProvider(box as ShortAnswer)
      case BoxType.MULTIPLE_CHOICES:
        const choices: Choice[] = (box as MultipleChoices).choices
        if (
          isNullOrUndefined(choices) ||
          choices?.length === 0
        ) return undefined

        // Contains at least one correct
        let hasCorrect = false
        for (const c of choices) hasCorrect ||= c.isCorrect
        if (!hasCorrect) return undefined

        return new MultipleChoicesProvider(box as MultipleChoices)
    }
    return box
  }

  abstract submit(answer: PossibleInputAnswer): boolean
}

export class ShortAnswerProvider extends QuestionProvider implements Submitable<string | number> {
  private _submission?: number | string

  get submission(): string | undefined {
    return isUndefined(this._submission) ? undefined : `${this._submission}`
  }

  get explanation(): string | undefined {
    return undefined
  }

  get isCorrect(): boolean | undefined {
    const answer = this._submission
    if (isUndefined(answer)) return undefined
    const type = typeof answer

    if (typeof this._question.answer === 'string' && type === 'string')
      return this._question.answer === answer
    let lowerBoundary = 0
    let upperBoundary = 0
    if (isNotUndefined(this._approx)) {
      lowerBoundary = (this._question.answer as number) - this._approx
      upperBoundary = (this._question.answer as number) + this._approx
    }
    return lowerBoundary <= answer && answer <= upperBoundary
  }

  private get _approx(): number | undefined {
    return this._question.approx
  }

  constructor(protected readonly _question: ShortAnswer) {
    super()
  }

  submit(answer: string | number): boolean {
    const type = typeof answer
    if (type !== 'string' && type !== 'number') return false
    if (type === 'string' && typeof this._question.answer === 'number')
      answer = Number.parseFloat(answer as string)
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
    return this._submittedChoice?.explanation
  }

  get isCorrect(): boolean | undefined {
    return this._submittedChoice?.isCorrect
  }

  get choices(): Choice[] {
    return this._question.choices
  }

  private get _submittedChoice(): Choice | undefined {
    return this._question.choices[this._submission]
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

