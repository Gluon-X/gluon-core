import { Injectable, InjectionToken } from '@angular/core'

export interface QuizState {
  qid: string
}

export const QUIZ_STATE = new InjectionToken<QuizState>('quiz.state')

@Injectable()
export class QuizProvider implements QuizState {
  qid: string = ''
}

@Injectable()
export class DummyQuizProvider implements QuizState {
  qid: string = ''
}
