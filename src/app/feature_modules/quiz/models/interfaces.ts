import { BoxType, QuizState } from './enums'
import { MultiPhasesProvider } from './multi_phases_provider.class'
import { QuestionProvider } from './question_provider.class'
import { MultiBoxesProvider } from './multi_boxes_provider.class'

export type PossibleInputAnswer = number | string

export interface Choice {
  content: string

  isCorrect: boolean

  explanation?: string
}

export interface Box {
  content: string

  imageURL?: string

  type: BoxType
}

export interface Submitable<T> {
  readonly isCorrect?: boolean

  readonly submission?: T

  readonly explanation?: string

  /**
   * Submit an answer. The input value must match the type of answer required by the question.
   * If the question is of type ShortAnswer, input value should be `number` or `string`.
   * If it is of type MultipleChoices, input value should be `number` or array of `number` indicate the choice's
   * indices; Method will return a boolean to tell if the input is valid or not.
   *
   * @param answer user's answer to the question.
   * @returns boolean indicate whether or not the input value is valid
   */
  submit(answer: T): boolean
}

export interface Question extends Box {
  hint?: string
}

export interface MultipleChoices extends Question {
  choices: Choice[]
}

export interface ShortAnswer extends Question {
  answer: string | number,

  approx?: number
}

export interface Phase {
  title: string

  content: string

  boxes: Box[]
}

export interface Quiz {
  title: string

  core: Question

  helps: Phase[]

  followUp?: Phase
}

export interface QuizPlayable {
  // id of current question
  qid: string

  readonly title?: string

  readonly mainQuestion?: QuestionProvider

  readonly state: QuizState

  readonly helper?: MultiPhasesProvider

  readonly followUpProvider?: MultiBoxesProvider

  enableHelper(): void
}
