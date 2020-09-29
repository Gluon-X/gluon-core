import {
  MultiQuestionsProvider,
  MultiPhasesProvider,
  QuestionProvider,
} from './classes'
import { QuestionType, QuizState } from './enums'

export interface QuestionControlProvider {
  isCompleted: boolean

  questionIndex: number

  questionsCount: number

  hint?: string

  question?: BaseQuestion

  answer?: number | number[] | string

  isCorrect?: boolean

  nextAvailable: boolean

  prevAvailable: boolean

  next()

  previous()

  submit(answer: number | number[] | string)
}

export interface QuizPlayable {
  // id of current question
  qid: string

  readonly title?: string

  readonly mainQuestion?: QuestionProvider

  readonly state: QuizState

  readonly helper?: MultiPhasesProvider

  readonly followUpProvider?: MultiQuestionsProvider

  enableHelper(): void
}

export interface BaseQuestion {
  content: string

  imageURL?: string

  // hold available answers to pick, this field is null if `type` is TEXT.
  availableAnswers?: string[]

  type: QuestionType
}

export interface Question extends BaseQuestion {
  /**
   * hold data of correct answer
   * - number: if one correct answer only
   * - number[]: if multiple correct answers
   * - string: if correct answer is a text
   * - string[]: answer is a text, but multiple correct inputs
   */
  correctAnswers: number | number[] | string | string[]
}

export interface PhaseStack {
  openQuestion: string

  subQuestions: Question[]
}

export interface MainQuestion extends Question {
  title: string

  helps: { [phaseName: string]: PhaseStack }

  followUpQuestions: Question[]
}
