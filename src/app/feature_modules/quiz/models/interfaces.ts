import { FollowUpQuestionProvider, HelpProvider } from './classes'
import { QuestionType, QuizState } from './enums'

export interface QuizPlayable {
  // id of current question
  qid: string

  readonly title?: string

  readonly mainQuestion?: BaseQuestion

  readonly state: QuizState

  helper?: HelpProvider

  followUpProvider?: FollowUpQuestionProvider

  submit(choice: number | number[] | string)

  enableHelper(): void
}

export interface BaseQuestion {
  content: string

  // hold available answers to pick, this field is null if `type` is TEXT.
  answers?: string

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
