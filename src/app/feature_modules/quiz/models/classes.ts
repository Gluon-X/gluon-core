import { BaseQuestion, PhaseStack, Question } from './interfaces'

export class HelpProvider {
  isCompleted: boolean

  currentPhase: string | number

  phasesCount: number

  questionIndex: number

  questionsCount: number

  openQuestion?: string

  hint?: string

  question?: BaseQuestion

  answer?: string

  isCorrect?: boolean

  constructor(private helps: { [phaseName: string]: PhaseStack }) {}

  next() {}

  previous() {}

  submit(answer: number | number[] | string) {}
}

export class FollowUpQuestionProvider {
  isCompleted: boolean

  constructor(private _questions: Question[]) {}
}
