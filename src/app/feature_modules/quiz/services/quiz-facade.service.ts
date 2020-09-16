import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { QuizState } from './quiz-state.service'

@Injectable()
export class QuizFacade {
  get qid(): string {
    return this.quizId
  }

  constructor(private state: QuizState, private quizId: string = '') {
    console.log(`New qid: ${quizId}`)
  }
}
