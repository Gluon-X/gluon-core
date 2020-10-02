import { QuizState } from '../models/enums'
import { QuizPlayable } from '../models/interfaces'
import { QuizHandler, QuizStorage } from './quiz-provider.service'

const createInstance = (): QuizPlayable => new QuizHandler(new QuizStorage())

describe('Dummy quiz provider test suite', () => {
  describe('Initialization behaviours', () => {
    const expectDefaultState = (service: QuizPlayable) => {
      expect(service.qid).toBeNull()
      expect(service.state).toEqual(QuizState.EMPTY)
      expect(service.mainQuestion).toBeNull()
      expect(service.helper).toBeNull()
      expect(service.followUpProvider).toBeNull()
    }

    it('should create a service instance with all fields are NULL and default state is EMPTY', () => {
      const service = createInstance()
      expectDefaultState(service)
    })

    it('should not mutate default states when calling enableHelper() behaviour', () => {
      const service = createInstance()
      service.enableHelper()
      expectDefaultState(service)
    })

    it('should not mutate default states when calling submit() behaviour', () => {
      /**
       *    coverage
       * ------|-----
       * -3 -1 0 1 3
       */
      // const service = createInstance()
      //
      // // Try with number
      // service.submit(-3)
      // expectDefaultState(service)
      //
      // service.submit(-1)
      // expectDefaultState(service)
      //
      // service.submit(0)
      // expectDefaultState(service)
      //
      // service.submit(1)
      // expectDefaultState(service)
      //
      // service.submit(3)
      // expectDefaultState(service)
      //
      // // Try with numbers
      // // TODO: implement function that pass combination of inputs
      //
      // // Try with string
      // service.submit('')
      // expectDefaultState(service)
      //
      // service.submit('Hello World')
      // expectDefaultState(service)
      //
      // // Try with strange type
      // service.submit(null)
      // expectDefaultState(service)
      //
      // service.submit(undefined)
      // expectDefaultState(service)
      //
      // service.submit(NaN)
      // expectDefaultState(service)
    })
  })
})
