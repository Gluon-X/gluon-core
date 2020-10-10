import { Box, Phase, PossibleInputAnswer, Question, Submitable } from './interfaces.new'
import { PhaseProvider } from './multi_questions_provider.class'
import { isNotUndefined } from '../../../shared'

export abstract class MultiPhasesProvider implements Submitable<PossibleInputAnswer> {
  // Passing fields from `PhaseProvider`
  get boxIndex(): number | undefined {
    return this._current?.index
  }

  get boxesCount(): number | undefined {
    return this._current?.count
  }

  get current(): Box | undefined {
    return this._current?.current
  }

  get explanation(): string | undefined {
    return this._current?.explanation
  }

  get help(): string | undefined {
    return this._current?.help
  }

  get isCorrect(): boolean | undefined {
    return this._current?.isCorrect
  }

  get isHelpExist(): boolean | undefined {
    return this._current?.isHelpExist
  }

  get submission(): PossibleInputAnswer | undefined {
    return this._current?.submission
  }

  get title(): string | undefined {
    return this._current?.title
  }

  get content(): string | undefined {
    return this._current?.content
  }

  //

  abstract get count(): number

  abstract get index(): number

  abstract get isCompleted(): boolean

  abstract get nextAvailable(): boolean

  abstract get prevAvailable(): boolean

  protected abstract get _current(): PhaseProvider | undefined

  static fromPhases(helpers: Phase[]): MultiPhasesProvider | undefined {
    if (helpers?.length > 0) return new DefaultMultiPhasesProvider(helpers)
    return undefined
  }

  abstract next()

  abstract previous()

  abstract submit(answer: PossibleInputAnswer): boolean
}

class DefaultMultiPhasesProvider extends MultiPhasesProvider {

  get count(): number {
    return this._phases.length
  }

  get index(): number {
    return this._index
  }

  get isCompleted(): boolean {
    let result = true
    for (const p of this._phases) result &&= p.isCompleted
    return result
  }

  get nextAvailable(): boolean {
    return (
      // at least one phase
      this._current?.nextAvailable ||
      // or next phase available and current phase is completed
      (this.index < this.count - 1 &&
        this._current?.isCompleted)
    )
  }

  get prevAvailable(): boolean {
    return this._current?.prevAvailable || this.index > 0
  }

  private _index = 0

  private readonly _phases: PhaseProvider[]

  protected get _current(): PhaseProvider | undefined {
    return this._phases[this.index]
  }

  constructor(phases: Phase[]) {
    super()
    this._phases = phases?.map(PhaseProvider.fromPhase)
      .filter(isNotUndefined) ?? []
  }

  next() {
    if (!this.nextAvailable) return
    if (this._current.nextAvailable) this._current.next()
    else this._index += 1
  }

  previous() {
    if (!this.prevAvailable) return
    if (this._current.prevAvailable) this._current.previous()
    else this._index -= 1
  }

  submit(answer: PossibleInputAnswer): boolean {
    return this._current?.submit(answer)
  }

}
