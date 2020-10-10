// Acts as substitution to `MultiQuestionsProvider`
import { Box, Phase, PossibleInputAnswer, Question, Submitable } from './interfaces.new'
import { isNotNullOrUndefined } from 'codelyzer/util/isNotNullOrUndefined'
import { BoxType } from './enums.new'
import { QuestionProvider } from './question_provider.class'
import { isUndefined } from '../../../shared'

export abstract class PhaseProvider implements Submitable<PossibleInputAnswer> {

  readonly title?: string

  readonly content?: string

  abstract get count(): number

  // Single box related fields
  abstract get index(): number

  abstract get current(): Box | undefined

  abstract get explanation(): string | undefined

  abstract get isCorrect(): boolean | undefined

  abstract get submission(): PossibleInputAnswer | undefined

  abstract get help(): string | undefined

  abstract get isHelpExist(): boolean | undefined

  // Navigate-able
  abstract get isCompleted(): boolean

  abstract get nextAvailable(): boolean

  abstract get prevAvailable(): boolean

  protected constructor(phase: Phase) {
    this.title = phase?.title
    this.content = phase?.content
  }

  static fromPhase(phase: Phase): PhaseProvider | undefined {
    return isNotNullOrUndefined(phase) ?
      new DefaultMultiBoxesProvider(phase) :
      undefined
  }

  abstract next()

  abstract previous()

  abstract submit(answer: PossibleInputAnswer): boolean
}

class DefaultMultiBoxesProvider extends PhaseProvider {

  constructor(phase: Phase) {
    super(phase)
    this._boxes = phase?.boxes
      ?.map(DefaultMultiBoxesProvider._transformBox) ?? []
  }

  get count(): number {
    return this._boxes.length
  }

  // Single box related fields
  get current(): Box | undefined {
    return this._boxes.length > 0
      ? this._boxes[this.index] : undefined
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

  get help(): string | undefined {
    return this._currentBoxAsProvider?.help
  }

  get isHelpExist(): boolean {
    return this._currentBoxAsProvider?.isHelpExist ?? false
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

  private static _transformBox(b: Box): Box {
    return b?.type === BoxType.DISPLAY ? b : QuestionProvider.fromBaseQuestion(b as Question)
  }

  next() {
    if (this.nextAvailable) this._index++
    else console.error('Next question is not available')
  }

  previous() {
    if (this.prevAvailable) this._index--
    else console.error('Previous question is not available')
  }

  submit(answer: PossibleInputAnswer): boolean {
    return this._currentBoxAsProvider?.submit(answer) ?? false
  }

  private get _currentBoxAsProvider(): QuestionProvider | undefined {
    return this.current as QuestionProvider
  }

}
