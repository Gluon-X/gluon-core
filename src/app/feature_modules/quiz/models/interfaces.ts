import { FollowUpQuestionProvider, HelpProvider } from './classes'
import { QuestionType, QuizState } from './enums'

export interface QuizPlayable {
  // id of current question
  qid: string

  readonly title?: string

  // TODO Considering whether `mainQuestion`, `answer` and `isCorrect` be encapsulated inside class
  readonly mainQuestion?: BaseQuestion

  readonly answer?: number | number[] | string

  readonly isCorrect?: boolean

  readonly state: QuizState

  helper?: HelpProvider

  followUpProvider?: FollowUpQuestionProvider

  submit(choice: number | number[] | string)

  enableHelper(): void
}

export interface BaseQuestion {
  content: string

  imageURL?: string

  // hold available answers to pick, this field is null if `type` is TEXT.
  answers?: string[]

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
  correctAnswer: number | number[] | string | string[]
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
