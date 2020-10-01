import { Question } from './interfaces'
import { QuestionType } from './enums'
import { MultiQuestionsProvider } from './classes'

const validDummyData: Question[] = [
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
]

describe('MultiQuestionsProvider test suite', () => {
  const assertEmptyQuestionsList = (provider: MultiQuestionsProvider) => {
    expect(provider).not.toBeNull()
    expect(provider.questionsCount).toEqual(0)
    expect(provider.questionIndex).toEqual(0)
    expect(provider.nextAvailable).toBeFalse()
    expect(provider.prevAvailable).toBeFalse()
    expect(provider.isCompleted).toBeTrue()
    expect(provider.question).toBeNull()
    expect(provider.hint).toBeNull()
    expect(provider.answer).toBeNull()
    expect(provider.isCorrect).toBeNull()
  }

  it('should correctly parse null questions', () => {
    const provider: MultiQuestionsProvider = new MultiQuestionsProvider(null)

    assertEmptyQuestionsList(provider)
  })

  it('should correctly parse undefined questions', () => {
    const provider: MultiQuestionsProvider = new MultiQuestionsProvider(
      undefined
    )

    assertEmptyQuestionsList(provider)
  })

  it('should correctly parse empty questions', () => {
    const provider: MultiQuestionsProvider = new MultiQuestionsProvider([])

    assertEmptyQuestionsList(provider)
  })

  it('should correctly return first question as single choice', () => {
    const assertFirstQuestionNotFinish = () => {
      expect(provider).not.toBeNull()
      expect(provider.questionsCount).toEqual(validDummyData.length)
      expect(provider.questionIndex).toEqual(0)
      expect(provider.nextAvailable).toBeFalse()
      expect(provider.prevAvailable).toBeFalse()
      expect(provider.isCompleted).toBeFalse()
      expect(provider.question).not.toBeNull()
      expect(provider.hint).toBeNull()
      expect(provider.answer).toBeNull()
      expect(provider.isCorrect).toBeNull()
    }

    const provider: MultiQuestionsProvider = new MultiQuestionsProvider(
      validDummyData
    )

    assertFirstQuestionNotFinish()
    // Try calling next, but nothing change
    provider.next()
    assertFirstQuestionNotFinish()

    // Try calling prev, but nothing change
    provider.previous()
    assertFirstQuestionNotFinish()
  })

  it('answer incorrectly', () => {
    const assertFirstQuestionIncorrectly = () => {
      expect(provider.questionsCount).toEqual(validDummyData.length)
      expect(provider.questionIndex).toEqual(0)
      expect(provider.nextAvailable).toBeFalse()
      expect(provider.prevAvailable).toBeFalse()
      expect(provider.isCompleted).toBeFalse()
      expect(provider.question).not.toBeNull()
      expect(provider.hint?.length).toBeGreaterThan(0)
      expect(provider.answer).toEqual(1)
      expect(provider.isCorrect).toBeFalse()
    }

    const provider: MultiQuestionsProvider = new MultiQuestionsProvider(
      validDummyData
    )

    provider.submit(1)
    assertFirstQuestionIncorrectly()

    provider.next()
    assertFirstQuestionIncorrectly()

    provider.previous()
    assertFirstQuestionIncorrectly()
  })

  const assertFirstQuestionAnswerCorrectly = (
    provider: MultiQuestionsProvider
  ) => {
    expect(provider.questionsCount).toEqual(validDummyData.length)
    expect(provider.questionIndex).toEqual(0)
    expect(provider.nextAvailable).toBeTrue()
    expect(provider.prevAvailable).toBeFalse()
    expect(provider.isCompleted).toBeFalse()
    expect(provider.question).not.toBeNull()
    expect(provider.hint).toBeNull()
    expect(provider.answer).toEqual(0)
    expect(provider.isCorrect).toBeTrue()
  }

  it('answer correctly', () => {
    const provider: MultiQuestionsProvider = new MultiQuestionsProvider(
      validDummyData
    )

    provider.submit(0)
    assertFirstQuestionAnswerCorrectly(provider)

    provider.previous()
    assertFirstQuestionAnswerCorrectly(provider)
  })

  it('answer correctly and click next', () => {
    const assertSecondQuestionNotFinish = () => {
      expect(provider.questionsCount).toEqual(validDummyData.length)
      expect(provider.questionIndex).toEqual(1)
      expect(provider.nextAvailable).toBeFalse()
      expect(provider.prevAvailable).toBeTrue()
      expect(provider.isCompleted).toBeFalse()
      expect(provider.question).not.toBeNull()
      expect(provider.hint).toBeNull()
      expect(provider.answer).toBeNull()
      expect(provider.isCorrect).toBeNull()
    }

    const provider: MultiQuestionsProvider = new MultiQuestionsProvider(
      validDummyData
    )

    provider.submit(0)
    provider.next()
    assertSecondQuestionNotFinish()

    // rollback to first question
    provider.previous()
    assertFirstQuestionAnswerCorrectly(provider)

    // move next to second question
    provider.next()
    assertSecondQuestionNotFinish()
  })

  it('answer second question incorrectly', () => {
    const assertSecondQuestionAnswerIncorrectly = () => {
      expect(provider.questionIndex).toEqual(1)
      expect(provider.nextAvailable).toBeFalse()
      expect(provider.prevAvailable).toBeTrue()
      expect(provider.isCompleted).toBeFalse()
      expect(provider.question).not.toBeNull()
      expect(provider.hint?.length).toBeGreaterThan(0)
      expect(provider.answer).toEqual([0, 1])
      expect(provider.isCorrect).toBeFalse()
    }

    const provider: MultiQuestionsProvider = new MultiQuestionsProvider(
      validDummyData
    )

    provider.submit(0)
    provider.next()
    provider.submit([0, 1])

    assertSecondQuestionAnswerIncorrectly()

    // rollback to first question
    provider.previous()
    assertFirstQuestionAnswerCorrectly(provider)

    // move next to second question
    provider.next()
    assertSecondQuestionAnswerIncorrectly()
  })

  const assertSecondQuestionAnswerCorrectly = (
    provider: MultiQuestionsProvider
  ) => {
    expect(provider.questionIndex).toEqual(1)
    expect(provider.nextAvailable).toBeTrue()
    expect(provider.prevAvailable).toBeTrue()
    expect(provider.isCompleted).toBeFalse()
    expect(provider.question).not.toBeNull()
    expect(provider.hint).toBeNull()
    expect(provider.answer).toEqual([1, 2])
    expect(provider.isCorrect).toBeTrue()
  }

  it('answer second question correctly', () => {
    const provider: MultiQuestionsProvider = new MultiQuestionsProvider(
      validDummyData
    )

    provider.submit(0)
    provider.next()
    provider.submit([1, 2])

    assertSecondQuestionAnswerCorrectly(provider)
    // rollback to first question
    provider.previous()
    assertFirstQuestionAnswerCorrectly(provider)

    // move back
    provider.next()
    assertSecondQuestionAnswerCorrectly(provider)
  })

  it('answer second question correctly and click next', () => {
    const assertThirdQuestionNotFinish = () => {
      expect(provider.questionIndex).toEqual(2)
      expect(provider.nextAvailable).toBeFalse()
      expect(provider.prevAvailable).toBeTrue()
      expect(provider.isCompleted).toBeFalse()
      expect(provider.question).not.toBeNull()
      expect(provider.hint).toBeNull()
      expect(provider.answer).toBeNull()
      expect(provider.isCorrect).toBeNull()
    }

    const provider: MultiQuestionsProvider = new MultiQuestionsProvider(
      validDummyData
    )

    provider.submit(0)
    provider.next()
    provider.submit([1, 2])
    provider.next()

    assertThirdQuestionNotFinish()

    // move next shall not take effect
    provider.next()
    assertThirdQuestionNotFinish()

    // move back to second
    provider.previous()
    assertSecondQuestionAnswerCorrectly(provider)

    // move back to first
    provider.previous()
    assertFirstQuestionAnswerCorrectly(provider)

    // move back to third
    provider.next()
    provider.next()
    assertThirdQuestionNotFinish()
  })

  it('answer third question incorrectly', () => {
    const assertThirdQuestionAnswerIncorrectly = () => {
      expect(provider.questionIndex).toEqual(2)
      expect(provider.nextAvailable).toBeFalse()
      expect(provider.prevAvailable).toBeTrue()
      expect(provider.isCompleted).toBeFalse()
      expect(provider.question).not.toBeNull()
      expect(provider.hint?.length).toBeGreaterThan(0)
      expect(provider.answer).toEqual('yo')
      expect(provider.isCorrect).toBeFalse()
    }
    const provider: MultiQuestionsProvider = new MultiQuestionsProvider(
      validDummyData
    )

    provider.submit(0)
    provider.next()
    provider.submit([1, 2])
    provider.next()
    provider.submit('yo')

    assertThirdQuestionAnswerIncorrectly()

    // move next shall not take effect
    provider.next()
    assertThirdQuestionAnswerIncorrectly()

    // move back to second
    provider.previous()
    assertSecondQuestionAnswerCorrectly(provider)

    // move back to first
    provider.previous()
    assertFirstQuestionAnswerCorrectly(provider)

    // move back to third
    provider.next()
    provider.next()
    assertThirdQuestionAnswerIncorrectly()
  })

  const assertThirdQuestionAnswerCorrectly = (
    provider: MultiQuestionsProvider
  ) => {
    expect(provider.questionIndex).toEqual(2)
    expect(provider.nextAvailable).toBeFalse()
    expect(provider.prevAvailable).toBeTrue()
    expect(provider.isCompleted).toBeTrue()
    expect(provider.question).not.toBeNull()
    expect(provider.hint).toBeNull()
    expect(provider.answer).toEqual('hello_world')
    expect(provider.isCorrect).toBeTrue()
  }

  it('answer third question correctly', () => {
    const provider: MultiQuestionsProvider = new MultiQuestionsProvider(
      validDummyData
    )

    provider.submit(0)
    provider.next()
    provider.submit([1, 2])
    provider.next()
    provider.submit('hello_world')

    assertThirdQuestionAnswerCorrectly(provider)

    // move next shall not take effect
    provider.next()
    assertThirdQuestionAnswerCorrectly(provider)
  })
})
