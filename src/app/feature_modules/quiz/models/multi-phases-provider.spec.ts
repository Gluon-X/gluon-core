import { PhaseStack } from './interfaces'
import { QuestionType } from './enums'
import { MultiPhasesProvider } from './classes'

const validDummyData: { [phaseName: string]: PhaseStack } = {
  phaseOne: {
    openQuestion: 'what is phase one?',
    subQuestions: [
      {
        content: 'Content',
        imageURL: 'https://somewhereonearth.com/cat.jpeg',
        availableAnswers: ['A', 'B', 'C', 'D'],
        type: QuestionType.SINGLE_CHOICE,
        correctAnswers: 0,
      },
    ],
  },

  phaseTwo: {
    openQuestion: 'what is phase two?',
    subQuestions: [
      {
        content: 'Content',
        imageURL: 'https://somewhereonearth.com/cat.jpeg',
        availableAnswers: ['A', 'B', 'C', 'D'],
        type: QuestionType.SINGLE_CHOICE,
        correctAnswers: 0,
      },
      {
        content: 'Content',
        imageURL: 'https://somewhereonearth.com/cat.jpeg',
        availableAnswers: ['A', 'B', 'C', 'D'],
        type: QuestionType.MULTIPLE_CHOICES,
        correctAnswers: [1, 2],
      },
    ],
  },

  phaseThree: {
    openQuestion: 'what is phase three?',
    subQuestions: [
      {
        content: 'Content',
        imageURL: 'https://somewhereonearth.com/cat.jpeg',
        availableAnswers: ['A', 'B', 'C', 'D'],
        type: QuestionType.SINGLE_CHOICE,
        correctAnswers: 0,
      },
      {
        content: 'Content',
        imageURL: 'https://somewhereonearth.com/cat.jpeg',
        availableAnswers: ['A', 'B', 'C', 'D'],
        type: QuestionType.MULTIPLE_CHOICES,
        correctAnswers: [1, 2],
      },
      {
        content: 'Content',
        imageURL: 'https://somewhereonearth.com/cat.jpeg',
        availableAnswers: null,
        type: QuestionType.TEXT,
        correctAnswers: 'hello_world',
      },
    ],
  },
}

describe('MultiPhasesProvider tests', () => {
  const assertEmptyPhasesList = (provider: MultiPhasesProvider) => {
    expect(provider).not.toBeNull()
    expect(provider.phasesCount).toEqual(0)
    expect(provider.currentPhaseIndex).toEqual(0)
    expect(provider.currentPhaseName).toBeNull()
    expect(provider.prevAvailable).toBeFalse()
    expect(provider.nextAvailable).toBeFalse()
    expect(provider.answer).toBeNull()
    expect(provider.hint).toBeNull()
    expect(provider.isCompleted).toBeTrue()
    expect(provider.isCorrect).toBeNull()
    expect(provider.question).toBeNull()
    expect(provider.questionIndex).toBeNull()
    expect(provider.questionsCount).toBeNull()
  }

  it('should ', () => {
    const provider = new MultiPhasesProvider(null)

    assertEmptyPhasesList(provider)
    provider.next()
    assertEmptyPhasesList(provider)
    provider.previous()
    assertEmptyPhasesList(provider)
  })

  it('should ', () => {
    const provider = new MultiPhasesProvider(undefined)

    assertEmptyPhasesList(provider)
    provider.next()
    assertEmptyPhasesList(provider)
    provider.previous()
    assertEmptyPhasesList(provider)
  })

  it('should ', () => {
    const provider = new MultiPhasesProvider({})

    assertEmptyPhasesList(provider)
    provider.next()
    assertEmptyPhasesList(provider)
    provider.previous()
    assertEmptyPhasesList(provider)
  })

  it('first question first phase', () => {
    const assertPhaseOneFirstQuestionNotAnswerYet = () => {
      expect(provider).not.toBeNull()
      expect(provider.phasesCount).toEqual(3)
      expect(provider.currentPhaseIndex).toEqual(0)
      expect(provider.currentPhaseName).toEqual('phaseOne')
      expect(provider.prevAvailable).toBeFalse()
      expect(provider.nextAvailable).toBeFalse()
      expect(provider.answer).toBeNull()
      expect(provider.hint).toBeNull()
      expect(provider.isCompleted).toBeFalse()
      expect(provider.isCorrect).toBeNull()
      expect(provider.question).not.toBeNull()
      expect(provider.questionIndex).toEqual(0)
      expect(provider.questionsCount).toEqual(1)
    }
    const provider = new MultiPhasesProvider(validDummyData)

    assertPhaseOneFirstQuestionNotAnswerYet()

    provider.next()
    assertPhaseOneFirstQuestionNotAnswerYet()

    provider.previous()
    assertPhaseOneFirstQuestionNotAnswerYet()
  })

  it('first question incorrect first phase', () => {
    const assertPhaseOneFirstQuestionAnswerIncorrectly = () => {
      expect(provider.phasesCount).toEqual(3)
      expect(provider.currentPhaseIndex).toEqual(0)
      expect(provider.currentPhaseName).toEqual('phaseOne')
      expect(provider.prevAvailable).toBeFalse()
      expect(provider.nextAvailable).toBeFalse()
      expect(provider.answer).toEqual(1)
      expect(provider.hint?.length).toBeGreaterThan(0)
      expect(provider.isCompleted).toBeFalse()
      expect(provider.isCorrect).toBeFalse()
      expect(provider.question).not.toBeNull()
      expect(provider.questionIndex).toEqual(0)
      expect(provider.questionsCount).toEqual(1)
    }

    const provider = new MultiPhasesProvider(validDummyData)

    provider.submit(1)
    assertPhaseOneFirstQuestionAnswerIncorrectly()

    provider.previous()
    assertPhaseOneFirstQuestionAnswerIncorrectly()

    provider.next()
    assertPhaseOneFirstQuestionAnswerIncorrectly()
  })

  const assertPhaseOneFirstQuestionAnswerCorrectly = (
    provider: MultiPhasesProvider
  ) => {
    expect(provider.phasesCount).toEqual(3)
    expect(provider.currentPhaseIndex).toEqual(0)
    expect(provider.currentPhaseName).toEqual('phaseOne')
    expect(provider.prevAvailable).toBeFalse()
    expect(provider.nextAvailable).toBeTrue()
    expect(provider.answer).toEqual(0)
    expect(provider.hint).toBeNull()
    expect(provider.isCompleted).toBeFalse()
    expect(provider.isCorrect).toBeTrue()
    expect(provider.question).not.toBeNull()
    expect(provider.questionIndex).toEqual(0)
    expect(provider.questionsCount).toEqual(1)
  }

  it('first question correct first phase', () => {
    const provider = new MultiPhasesProvider(validDummyData)

    provider.submit(0)
    assertPhaseOneFirstQuestionAnswerCorrectly(provider)

    provider.previous()
    assertPhaseOneFirstQuestionAnswerCorrectly(provider)
  })

  it('first question second phase', () => {
    const assertPhaseTwoFirstQuestionNotAnswerYet = () => {
      expect(provider.phasesCount).toEqual(3)
      expect(provider.currentPhaseIndex).toEqual(1)
      expect(provider.currentPhaseName).toEqual('phaseTwo')
      expect(provider.prevAvailable).toBeTrue()
      expect(provider.nextAvailable).toBeFalse()
      expect(provider.answer).toBeNull()
      expect(provider.hint).toBeNull()
      expect(provider.isCompleted).toBeFalse()
      expect(provider.isCorrect).toBeNull()
      expect(provider.question).not.toBeNull()
      expect(provider.questionIndex).toEqual(0)
      expect(provider.questionsCount).toEqual(2)
    }

    const provider = new MultiPhasesProvider(validDummyData)

    provider.submit(0)
    provider.next()

    assertPhaseTwoFirstQuestionNotAnswerYet()

    provider.previous()
    assertPhaseOneFirstQuestionAnswerCorrectly(provider)

    provider.next()
    assertPhaseTwoFirstQuestionNotAnswerYet()
  })

  it('first question incorrect second phase', () => {
    const assertPhaseTwoFirstQuestionAnswerIncorrectly = () => {
      expect(provider.phasesCount).toEqual(3)
      expect(provider.currentPhaseIndex).toEqual(1)
      expect(provider.currentPhaseName).toEqual('phaseTwo')
      expect(provider.prevAvailable).toBeTrue()
      expect(provider.nextAvailable).toBeFalse()
      expect(provider.answer).toEqual(1)
      expect(provider.hint?.length).toBeGreaterThan(0)
      expect(provider.isCompleted).toBeFalse()
      expect(provider.isCorrect).toBeFalse()
      expect(provider.question).not.toBeNull()
      expect(provider.questionIndex).toEqual(0)
      expect(provider.questionsCount).toEqual(2)
    }

    const provider = new MultiPhasesProvider(validDummyData)

    provider.submit(0)
    provider.next()
    provider.submit(1)

    assertPhaseTwoFirstQuestionAnswerIncorrectly()

    provider.previous()
    assertPhaseOneFirstQuestionAnswerCorrectly(provider)

    provider.next()
    assertPhaseTwoFirstQuestionAnswerIncorrectly()
  })

  const assertPhaseTwoFirstQuestionAnswerCorrectly = (
    provider: MultiPhasesProvider
  ) => {
    expect(provider.phasesCount).toEqual(3)
    expect(provider.currentPhaseIndex).toEqual(1)
    expect(provider.currentPhaseName).toEqual('phaseTwo')
    expect(provider.prevAvailable).toBeTrue()
    expect(provider.nextAvailable).toBeTrue()
    expect(provider.answer).toEqual(0)
    expect(provider.hint).toBeNull()
    expect(provider.isCompleted).toBeFalse()
    expect(provider.isCorrect).toBeTrue()
    expect(provider.question).not.toBeNull()
    expect(provider.questionIndex).toEqual(0)
    expect(provider.questionsCount).toEqual(2)
  }

  it('first question correct second phase', () => {
    const provider = new MultiPhasesProvider(validDummyData)

    provider.submit(0)
    provider.next()
    provider.submit(0)

    assertPhaseTwoFirstQuestionAnswerCorrectly(provider)

    provider.previous()
    assertPhaseOneFirstQuestionAnswerCorrectly(provider)

    provider.next()
    assertPhaseTwoFirstQuestionAnswerCorrectly(provider)
  })

  const assertPhaseTwoSecondQuestionAnswerCorrectly = (
    provider: MultiPhasesProvider
  ) => {
    expect(provider.phasesCount).toEqual(3)
    expect(provider.currentPhaseIndex).toEqual(1)
    expect(provider.currentPhaseName).toEqual('phaseTwo')
    expect(provider.prevAvailable).toBeTrue()
    expect(provider.nextAvailable).toBeTrue()
    expect(provider.answer).toEqual([1, 2])
    expect(provider.hint).toBeNull()
    expect(provider.isCompleted).toBeFalse()
    expect(provider.isCorrect).toBeTrue()
    expect(provider.question).not.toBeNull()
    expect(provider.questionIndex).toEqual(1)
    expect(provider.questionsCount).toEqual(2)
  }

  it('second question correct second phase', () => {
    const provider = new MultiPhasesProvider(validDummyData)

    provider.submit(0)
    provider.next()
    provider.submit(0)
    provider.next()
    provider.submit([1, 2])

    assertPhaseTwoSecondQuestionAnswerCorrectly(provider)

    provider.previous()
    assertPhaseTwoFirstQuestionAnswerCorrectly(provider)

    provider.next()
    assertPhaseTwoSecondQuestionAnswerCorrectly(provider)
  })

  const assertPhaseThreeFirstQuestionAnswerCorrectly = (
    provider: MultiPhasesProvider
  ) => {
    expect(provider.phasesCount).toEqual(3)
    expect(provider.currentPhaseIndex).toEqual(2)
    expect(provider.currentPhaseName).toEqual('phaseThree')
    expect(provider.prevAvailable).toBeTrue()
    expect(provider.nextAvailable).toBeTrue()
    expect(provider.answer).toEqual(0)
    expect(provider.hint).toBeNull()
    expect(provider.isCompleted).toBeFalse()
    expect(provider.isCorrect).toBeTrue()
    expect(provider.question).not.toBeNull()
    expect(provider.questionIndex).toEqual(0)
    expect(provider.questionsCount).toEqual(3)
  }

  const assertPhaseThreeSecondQuestionAnswerCorrectly = (
    provider: MultiPhasesProvider
  ) => {
    expect(provider.phasesCount).toEqual(3)
    expect(provider.currentPhaseIndex).toEqual(2)
    expect(provider.currentPhaseName).toEqual('phaseThree')
    expect(provider.prevAvailable).toBeTrue()
    expect(provider.nextAvailable).toBeTrue()
    expect(provider.answer).toEqual([1, 2])
    expect(provider.hint).toBeNull()
    expect(provider.isCompleted).toBeFalse()
    expect(provider.isCorrect).toBeTrue()
    expect(provider.question).not.toBeNull()
    expect(provider.questionIndex).toEqual(1)
    expect(provider.questionsCount).toEqual(3)
  }

  const assertPhaseThreeThirdQuestionAnswerCorrectly = (
    provider: MultiPhasesProvider
  ) => {
    expect(provider.phasesCount).toEqual(3)
    expect(provider.currentPhaseIndex).toEqual(2)
    expect(provider.currentPhaseName).toEqual('phaseThree')
    expect(provider.prevAvailable).toBeTrue()
    expect(provider.nextAvailable).toBeFalse()
    expect(provider.answer).toEqual('hello_world')
    expect(provider.hint).toBeNull()
    expect(provider.isCompleted).toBeTrue()
    expect(provider.isCorrect).toBeTrue()
    expect(provider.question).not.toBeNull()
    expect(provider.questionIndex).toEqual(2)
    expect(provider.questionsCount).toEqual(3)
  }

  it('first question correct third phase', () => {
    const provider = new MultiPhasesProvider(validDummyData)

    provider.submit(0)
    provider.next()
    provider.submit(0)
    provider.next()
    provider.submit([1, 2])
    provider.next()
    provider.submit(0)

    assertPhaseThreeFirstQuestionAnswerCorrectly(provider)

    provider.previous()
    assertPhaseTwoSecondQuestionAnswerCorrectly(provider)

    provider.previous()
    assertPhaseTwoFirstQuestionAnswerCorrectly(provider)
  })

  it('third question correct third phase', () => {
    const provider = new MultiPhasesProvider(validDummyData)

    provider.submit(0)
    provider.next()
    provider.submit(0)
    provider.next()
    provider.submit([1, 2])
    provider.next()
    provider.submit(0)
    provider.next()
    provider.submit([1, 2])
    provider.next()
    provider.submit('hello_world')

    assertPhaseThreeThirdQuestionAnswerCorrectly(provider)

    provider.next()
    assertPhaseThreeThirdQuestionAnswerCorrectly(provider)

    provider.previous()
    assertPhaseThreeSecondQuestionAnswerCorrectly(provider)

    provider.previous()
    assertPhaseThreeFirstQuestionAnswerCorrectly(provider)

    provider.previous()
    assertPhaseTwoSecondQuestionAnswerCorrectly(provider)
  })
})
