import { QuestionType } from './enums'

export interface QuizState {
  // id of current question
  qid: string

  // tell whether or not quiz's data is available to display
  isAvailable: boolean
}

export interface Question {
  content: string

  /**
   * hold data of correct answer
   * - number: if one correct answer only
   * - number[]: if multiple correct answers
   * - string: if correct answer is a text
   * - string[]: answer is a text, but multiple correct inputs
   */
  correctAnswer: number | number[] | string | string[]

  // hold available answers to pick, this field is null if `type` is TEXT.
  answers?: string[]

  type: QuestionType
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
