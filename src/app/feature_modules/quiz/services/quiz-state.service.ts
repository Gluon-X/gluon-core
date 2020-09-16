import { InjectionToken } from '@angular/core'

export interface QuizState {}

export const QUIZ_STATE = new InjectionToken<QuizState>('quiz.state')

export class DummyQuizState implements QuizState {}

export class DefaultQuizState implements QuizState {}
