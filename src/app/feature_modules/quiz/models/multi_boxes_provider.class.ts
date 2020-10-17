// Acts as substitution to `MultiQuestionsProvider`
import { Box, Phase, PossibleInputAnswer, Submitable } from './interfaces.new'
import { isNotNullOrUndefined } from 'codelyzer/util/isNotNullOrUndefined'
import { BoxType } from './enums.new'
import { QuestionProvider } from './question_provider.class'
import { isNotUndefined, isUndefined } from '../../../shared'

export abstract class MultiBoxesProvider implements Submitable<PossibleInputAnswer> {

  readonly title?: string

  readonly content?: string

  abstract get count(): number

  // Single box related fields
  abstract get index(): number

  /**
   * Contain state of current box.
   * Try checking for box type before using.
   * If `current.type` is DISPLAY, use type Box.
   * If `current.type` is SHORT_ANSWER, parse to `ShortAnswerProvider`.
   * If `current.type` is MULTIPLE_CHOICES, parse to `MultipleChoicesProvider` to get extra `choices` fields.
   * This state never returns undefined or null, since if validation fails, `fromPhase` static
   * method will return undefined.
   *
   * @return Box as current box =)) Quite confuse eh?
   */
  abstract get current(): Box

  abstract get explanation(): string | undefined

  abstract get isCorrect(): boolean | undefined

  abstract get submission(): PossibleInputAnswer | undefined

  abstract get hint(): string | undefined

  // Navigate-able
  abstract get isCompleted(): boolean

  abstract get nextAvailable(): boolean

  abstract get prevAvailable(): boolean

  protected constructor(phase: Phase) {
    this.title = phase?.title
    this.content = phase?.content
  }

  /**
   * Init `PhaseProvider` instance from `Phase` raw data.
   * Use this static method instead of class constructor to provide input validation.
   *
   * @param phase: Phase. Raw data of a phase.
   * @return PhaseProvider. If `phase` data is not null or undefined and has at least one valid box.
   * @return undefined. If `phase` data is null or undefined or has no valid box.
   */
  static fromPhase(phase: Phase): MultiBoxesProvider | undefined {
    if (
      isNotNullOrUndefined(phase) &&
      phase.boxes?.length === 0) return undefined
    const provider = new DefaultMultiBoxesProvider(phase)
    return provider.count > 0 ? provider : undefined
  }

  abstract next()

  abstract previous()

  /**
   * Allow user to submit answer to current `question`.
   * It should return false and do nothing if `current.type` is DISPLAY.
   *
   * @param answer: number | string. Provide user input.
   * @return true. If `answer` param meets valid type.
   * @return false. If `answer` param is not valid.
   */
  abstract submit(answer: PossibleInputAnswer): boolean
}

class DefaultMultiBoxesProvider extends MultiBoxesProvider {

  constructor(phase: Phase) {
    super(phase)
    this._boxes = phase?.boxes
      ?.map(QuestionProvider.fromBox)
      .filter(isNotUndefined) ?? []
  }

  get count(): number {
    return this._boxes.length
  }

  // Single box related fields
  get current(): Box {
    return this._boxes[this.index]
  }

  get explanation(): string | undefined {
    if (isUndefined(this.current) || this.current.type === BoxType.DISPLAY) return undefined
    return this._currentBoxAsProvider.explanation
  }

  get index(): number {
    return this._index
  }

  get isCorrect(): boolean | undefined {
    if (isUndefined(this.current) || this.current.type === BoxType.DISPLAY) return undefined
    return this._currentBoxAsProvider.isCorrect
  }

  get hint(): string | undefined {
    return this._currentBoxAsProvider.hint
  }

  // Navigate-able
  get isCompleted(): boolean {
    let result = true
    for (const q of this._boxes)
      if (q.type !== BoxType.DISPLAY)
        result &&= (q as QuestionProvider).isCompleted
    return result
  }

  get nextAvailable(): boolean {
    return (
      // at least one question
      this._boxes.length > 0 &&
      // next question is available
      this.index < this.count - 1 &&
      // current box is displayable or question is completed
      (this.current.type === BoxType.DISPLAY ||
        this._currentBoxAsProvider.isCompleted)
    )
  }

  get prevAvailable(): boolean {
    return this.index > 0
  }

  get submission(): PossibleInputAnswer | undefined {
    if (this.current?.type === BoxType.DISPLAY) return undefined
    return this._currentBoxAsProvider.submission
  }

  private readonly _boxes: Box[]

  private _index = 0

  next() {
    if (this.nextAvailable) this._index++
    else console.error('Next box is not available')
  }

  previous() {
    if (this.prevAvailable) this._index--
    else console.error('Previous box is not available')
  }

  submit(answer: PossibleInputAnswer): boolean {
    if (this.current.type === BoxType.DISPLAY) return false
    return this._currentBoxAsProvider.submit(answer)
  }

  private get _currentBoxAsProvider(): QuestionProvider {
    return this.current as QuestionProvider
  }

}
