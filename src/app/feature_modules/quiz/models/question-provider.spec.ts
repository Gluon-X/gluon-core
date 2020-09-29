import { Question } from './interfaces'
import { QuestionType } from './enums'
import { QuestionProvider } from './classes'

const validDummyData: { [title: string]: Question } = {
  singleChoice: {
    content: 'Content',
    imageURL: 'https://somewhereonearth.com/cat.jpeg',
    availableAnswers: ['A', 'B', 'C', 'D'],
    type: QuestionType.SINGLE_CHOICE,
    correctAnswers: 0,
  },

  multipleChoices: {
    content: 'Content',
    imageURL: 'https://somewhereonearth.com/cat.jpeg',
    availableAnswers: ['A', 'B', 'C', 'D'],
    type: QuestionType.MULTIPLE_CHOICES,
    correctAnswers: [1, 2],
  },

  multiChoicesWithSingleCorrectAnswer: {
    content: 'Content',
    imageURL: 'https://somewhereonearth.com/cat.jpeg',
    availableAnswers: ['A', 'B', 'C', 'D'],
    type: QuestionType.MULTIPLE_CHOICES,
    correctAnswers: 0,
  },

  text: {
    content: 'Content',
    imageURL: 'https://somewhereonearth.com/cat.jpeg',
    availableAnswers: null,
    type: QuestionType.TEXT,
    correctAnswers: 'hello_world',
  },

  textWithMultipleCorrectAnswers: {
    content: 'Content',
    imageURL: 'https://somewhereonearth.com/cat.jpeg',
    availableAnswers: null,
    type: QuestionType.TEXT,
    correctAnswers: ['hello_world', 'konichiwa', 'xinchao'],
  },

  textWithAvailableAnswers: {
    content: 'Content',
    imageURL: 'https://somewhereonearth.com/cat.jpeg',
    availableAnswers: ['A', 'B', 'C', 'D'],
    type: QuestionType.TEXT,
    correctAnswers: 'hello_world',
  },

  textWithMultiChoicesCorrectAnswers: {
    content: 'Content',
    imageURL: 'https://somewhereonearth.com/cat.jpeg',
    availableAnswers: undefined,
    type: QuestionType.TEXT,
    correctAnswers: [0, 1],
  },

  textWithSingleChoicesCorrectAnswers: {
    content: 'Content',
    imageURL: 'https://somewhereonearth.com/cat.jpeg',
    availableAnswers: ['A', 'B', 'C', 'D'],
    type: QuestionType.TEXT,
    correctAnswers: 1,
  },
}

const invalidDummyData: { [title: string]: Question } = {
  // Single choice
  singleChoiceWithNullCorrectAnswer: {
    content: 'Content',
    imageURL: 'https://somewhereonearth.com/cat.jpeg',
    availableAnswers: ['A', 'B', 'C', 'D'],
    type: QuestionType.SINGLE_CHOICE,
    correctAnswers: null,
  },

  singleChoiceWithUndefinedCorrectAnswer: {
    content: 'Content',
    imageURL: 'https://somewhereonearth.com/cat.jpeg',
    availableAnswers: ['A', 'B', 'C', 'D'],
    type: QuestionType.SINGLE_CHOICE,
    correctAnswers: undefined,
  },

  singleChoiceWithMultipleCorrectAnswers: {
    content: 'Content',
    imageURL: 'https://somewhereonearth.com/cat.jpeg',
    availableAnswers: ['A', 'B', 'C', 'D'],
    type: QuestionType.SINGLE_CHOICE,
    correctAnswers: [0, 1],
  },

  singleChoiceWithTextAnswers: {
    content: 'Content',
    imageURL: 'https://somewhereonearth.com/cat.jpeg',
    availableAnswers: ['A', 'B', 'C', 'D'],
    type: QuestionType.SINGLE_CHOICE,
    correctAnswers: 'hello_world',
  },

  singleChoiceWithNullAvailableAnswers: {
    content: 'Content',
    imageURL: 'https://somewhereonearth.com/cat.jpeg',
    availableAnswers: null,
    type: QuestionType.SINGLE_CHOICE,
    correctAnswers: 'hello_world',
  },

  singleChoiceWithUndefinedAvailableAnswers: {
    content: 'Content',
    imageURL: 'https://somewhereonearth.com/cat.jpeg',
    availableAnswers: undefined,
    type: QuestionType.SINGLE_CHOICE,
    correctAnswers: 'hello_world',
  },

  singleChoiceWithEmptyAvailableAnswers: {
    content: 'Content',
    imageURL: 'https://somewhereonearth.com/cat.jpeg',
    availableAnswers: [],
    type: QuestionType.SINGLE_CHOICE,
    correctAnswers: 1,
  },

  singleChoiceWithCorrectAnswersOverflow: {
    content: 'Content',
    imageURL: 'https://somewhereonearth.com/cat.jpeg',
    availableAnswers: ['A', 'B', 'C', 'D'],
    type: QuestionType.SINGLE_CHOICE,
    correctAnswers: 4,
  },

  singleChoiceWithCorrectAnswersUnderflow: {
    content: 'Content',
    imageURL: 'https://somewhereonearth.com/cat.jpeg',
    availableAnswers: ['A', 'B', 'C', 'D'],
    type: QuestionType.SINGLE_CHOICE,
    correctAnswers: -1,
  },

  // Multiple choices
  multiChoicesWithNullCorrectAnswer: {
    content: 'Content',
    imageURL: 'https://somewhereonearth.com/cat.jpeg',
    availableAnswers: ['A', 'B', 'C', 'D'],
    type: QuestionType.MULTIPLE_CHOICES,
    correctAnswers: null,
  },

  multiChoicesWithUndefinedCorrectAnswer: {
    content: 'Content',
    imageURL: 'https://somewhereonearth.com/cat.jpeg',
    availableAnswers: ['A', 'B', 'C', 'D'],
    type: QuestionType.MULTIPLE_CHOICES,
    correctAnswers: undefined,
  },

  multiChoicesWithSingleUnderflowAnswer: {
    content: 'Content',
    imageURL: 'https://somewhereonearth.com/cat.jpeg',
    availableAnswers: ['A', 'B', 'C', 'D'],
    type: QuestionType.MULTIPLE_CHOICES,
    correctAnswers: -1,
  },

  multiChoicesWithSingleOverflowAnswer: {
    content: 'Content',
    imageURL: 'https://somewhereonearth.com/cat.jpeg',
    availableAnswers: ['A', 'B', 'C', 'D'],
    type: QuestionType.MULTIPLE_CHOICES,
    correctAnswers: 4,
  },

  multiChoicesWithTextAnswers: {
    content: 'Content',
    imageURL: 'https://somewhereonearth.com/cat.jpeg',
    availableAnswers: ['A', 'B', 'C', 'D'],
    type: QuestionType.MULTIPLE_CHOICES,
    correctAnswers: 'hello_world',
  },

  multiChoicesWithNullAvailableAnswers: {
    content: 'Content',
    imageURL: 'https://somewhereonearth.com/cat.jpeg',
    availableAnswers: null,
    type: QuestionType.MULTIPLE_CHOICES,
    correctAnswers: [0, 1],
  },

  multiChoicesWithUndefinedAvailableAnswers: {
    content: 'Content',
    imageURL: 'https://somewhereonearth.com/cat.jpeg',
    availableAnswers: undefined,
    type: QuestionType.MULTIPLE_CHOICES,
    correctAnswers: [0, 1],
  },

  multiChoicesWithEmptyAvailableAnswers: {
    content: 'Content',
    imageURL: 'https://somewhereonearth.com/cat.jpeg',
    availableAnswers: [],
    type: QuestionType.MULTIPLE_CHOICES,
    correctAnswers: [0, 1],
  },

  multiChoicesWithEmptyCorrectAnswers: {
    content: 'Content',
    imageURL: 'https://somewhereonearth.com/cat.jpeg',
    availableAnswers: ['A', 'B', 'C', 'D'],
    type: QuestionType.MULTIPLE_CHOICES,
    correctAnswers: [],
  },

  multiChoiceWithCorrectAnswersOverflow: {
    content: 'Content',
    imageURL: 'https://somewhereonearth.com/cat.jpeg',
    availableAnswers: ['A', 'B', 'C', 'D'],
    type: QuestionType.MULTIPLE_CHOICES,
    correctAnswers: [4, 1],
  },

  multiChoiceWithCorrectAnswersUnderflow: {
    content: 'Content',
    imageURL: 'https://somewhereonearth.com/cat.jpeg',
    availableAnswers: ['A', 'B', 'C', 'D'],
    type: QuestionType.MULTIPLE_CHOICES,
    correctAnswers: [-1, 1],
  },

  // Text
  textWithNullCorrectAnswers: {
    content: 'Content',
    imageURL: 'https://somewhereonearth.com/cat.jpeg',
    availableAnswers: null,
    type: QuestionType.TEXT,
    correctAnswers: null,
  },

  textWithUndefinedCorrectAnswers: {
    content: 'Content',
    imageURL: 'https://somewhereonearth.com/cat.jpeg',
    availableAnswers: null,
    type: QuestionType.TEXT,
    correctAnswers: undefined,
  },

  textWithEmptyCorrectAnswers: {
    content: 'Content',
    imageURL: 'https://somewhereonearth.com/cat.jpeg',
    availableAnswers: ['A', 'B', 'C', 'D'],
    type: QuestionType.TEXT,
    correctAnswers: [],
  },
}

describe('QuestionProvider test suite', () => {
  // Test utility functions
  const assertDataParseIntegrity = (
    data: Question,
    provider: QuestionProvider
  ) => {
    expect(provider.type).toEqual(data.type)
    expect(provider.content).toEqual(data.content)
    expect(provider.correctAnswers).toEqual(data.correctAnswers)
    expect(provider.availableAnswers).toEqual(data.availableAnswers)
    expect(provider.imageURL).toEqual(data.imageURL)
  }

  const assertDataInitializationCorrect = (provider: QuestionProvider) => {
    expect(provider.hint).toBeNull()
    expect(provider.isCorrect).toBeNull()
    expect(provider.answer).toBeNull()
    expect(provider.isCompleted).toBeFalse()
  }

  describe('Initialization', () => {
    // Valid
    it('should parse data correctly for single choice', () => {
      const data: Question = validDummyData.singleChoice
      const provider = QuestionProvider.fromBaseQuestion(data)

      assertDataParseIntegrity(data, provider)
      assertDataInitializationCorrect(provider)
    })

    it('should parse data correctly for multi choices', () => {
      const data: Question = validDummyData.multipleChoices
      const provider = QuestionProvider.fromBaseQuestion(data)

      assertDataParseIntegrity(data, provider)
      assertDataInitializationCorrect(provider)
    })

    it('should parse correct answer type of `number` to single-element array', () => {
      const data: Question = validDummyData.multiChoicesWithSingleCorrectAnswer
      const provider = QuestionProvider.fromBaseQuestion(data)

      expect(provider.type).toEqual(data.type)
      expect(provider.content).toEqual(data.content)
      expect(provider.correctAnswers).toEqual([data.correctAnswers] as number[])
      expect(provider.availableAnswers).toEqual(data.availableAnswers)
      expect(provider.imageURL).toEqual(data.imageURL)
      assertDataInitializationCorrect(provider)
    })

    it('should parse data correctly for text', () => {
      const data: Question = validDummyData.text
      const provider = QuestionProvider.fromBaseQuestion(data)

      assertDataParseIntegrity(data, provider)
      assertDataInitializationCorrect(provider)
    })

    it('should parse data correctly for text with multiple correct answers', () => {
      const data: Question = validDummyData.textWithMultipleCorrectAnswers
      const provider = QuestionProvider.fromBaseQuestion(data)

      assertDataParseIntegrity(data, provider)
      assertDataInitializationCorrect(provider)
    })

    it('should parse data correctly for text with available answers', () => {
      const data: Question = validDummyData.textWithAvailableAnswers
      const provider = QuestionProvider.fromBaseQuestion(data)

      assertDataParseIntegrity(data, provider)
      assertDataInitializationCorrect(provider)
    })

    it('should parse numbers into strings for text with multi-choices answers', () => {
      const data: Question = validDummyData.textWithMultiChoicesCorrectAnswers
      const provider = QuestionProvider.fromBaseQuestion(data)

      expect(provider.type).toEqual(data.type)
      expect(provider.content).toEqual(data.content)
      expect(provider.correctAnswers).toEqual(
        (data.correctAnswers as number[]).map((a) => a.toString())
      )
      expect(provider.availableAnswers).toEqual(data.availableAnswers)
      expect(provider.imageURL).toEqual(data.imageURL)
      assertDataInitializationCorrect(provider)
    })

    it('should parse numeric correct answer to single-element string array', () => {
      const data: Question = validDummyData.textWithSingleChoicesCorrectAnswers
      const provider = QuestionProvider.fromBaseQuestion(data)

      expect(provider.type).toEqual(data.type)
      expect(provider.content).toEqual(data.content)
      expect(provider.correctAnswers).toEqual(data.correctAnswers.toString())
      expect(provider.availableAnswers).toEqual(data.availableAnswers)
      expect(provider.imageURL).toEqual(data.imageURL)
      assertDataInitializationCorrect(provider)
    })

    // Invalid
    it('should return null for null value of correct answers', () => {
      const data: Question = invalidDummyData.singleChoiceWithNullCorrectAnswer
      const provider = QuestionProvider.fromBaseQuestion(data)

      expect(provider).toBeNull()
    })

    it('should return null for undefined value of correct answers', () => {
      const data: Question =
        invalidDummyData.singleChoiceWithUndefinedCorrectAnswer
      const provider = QuestionProvider.fromBaseQuestion(data)

      expect(provider).toBeNull()
    })

    it('should return null for single choice question but multiple correct answers', () => {
      const data: Question =
        invalidDummyData.singleChoiceWithMultipleCorrectAnswers
      const provider = QuestionProvider.fromBaseQuestion(data)

      expect(provider).toBeNull()
    })

    it('should return null for single choice question with text correct answer', () => {
      const data: Question = invalidDummyData.singleChoiceWithTextAnswers
      const provider = QuestionProvider.fromBaseQuestion(data)

      expect(provider).toBeNull()
    })

    it('should return null for single choice question with null available answers', () => {
      const data: Question =
        invalidDummyData.singleChoiceWithNullAvailableAnswers
      const provider = QuestionProvider.fromBaseQuestion(data)

      expect(provider).toBeNull()
    })

    it('should return null for single choice question with undefined available answers', () => {
      const data: Question =
        invalidDummyData.singleChoiceWithUndefinedAvailableAnswers
      const provider = QuestionProvider.fromBaseQuestion(data)

      expect(provider).toBeNull()
    })

    it('should return null for single choice question with empty available answers', () => {
      const data: Question =
        invalidDummyData.singleChoiceWithEmptyAvailableAnswers
      const provider = QuestionProvider.fromBaseQuestion(data)

      expect(provider).toBeNull()
    })

    it('should return null for single choice question with correct answer overflow', () => {
      const data: Question =
        invalidDummyData.singleChoiceWithCorrectAnswersOverflow
      const provider = QuestionProvider.fromBaseQuestion(data)

      expect(provider).toBeNull()
    })

    it('should return null for single choice question with correct answer underflow', () => {
      const data: Question =
        invalidDummyData.singleChoiceWithCorrectAnswersUnderflow
      const provider = QuestionProvider.fromBaseQuestion(data)

      expect(provider).toBeNull()
    })

    it('should return null for multi choices with null correct answers', () => {
      const data: Question = invalidDummyData.multiChoicesWithNullCorrectAnswer
      const provider = QuestionProvider.fromBaseQuestion(data)

      expect(provider).toBeNull()
    })

    it('should return null for multi choices with undefined correct answers', () => {
      const data: Question =
        invalidDummyData.multiChoicesWithUndefinedCorrectAnswer
      const provider = QuestionProvider.fromBaseQuestion(data)

      expect(provider).toBeNull()
    })

    it('should return null for multi choices with 1 overflow correct answers', () => {
      const data: Question =
        invalidDummyData.multiChoicesWithSingleOverflowAnswer
      const provider = QuestionProvider.fromBaseQuestion(data)

      expect(provider).toBeNull()
    })

    it('should return null for multi choices with 1 underflow correct answers', () => {
      const data: Question =
        invalidDummyData.multiChoicesWithSingleUnderflowAnswer
      const provider = QuestionProvider.fromBaseQuestion(data)

      expect(provider).toBeNull()
    })

    it('should return null for multi choices with textual correct answers', () => {
      const data: Question = invalidDummyData.multiChoicesWithTextAnswers
      const provider = QuestionProvider.fromBaseQuestion(data)

      expect(provider).toBeNull()
    })

    it('should return null for multi choices with null available answers', () => {
      const data: Question =
        invalidDummyData.multiChoicesWithNullAvailableAnswers
      const provider = QuestionProvider.fromBaseQuestion(data)

      expect(provider).toBeNull()
    })

    it('should return null for multi choices with undefined available answers', () => {
      const data: Question =
        invalidDummyData.multiChoicesWithUndefinedAvailableAnswers
      const provider = QuestionProvider.fromBaseQuestion(data)

      expect(provider).toBeNull()
    })

    it('should return null for multi choices with empty available answers', () => {
      const data: Question =
        invalidDummyData.multiChoicesWithEmptyAvailableAnswers
      const provider = QuestionProvider.fromBaseQuestion(data)

      expect(provider).toBeNull()
    })

    it('should return null for multi choices with empty correct answers', () => {
      const data: Question =
        invalidDummyData.multiChoicesWithEmptyCorrectAnswers
      const provider = QuestionProvider.fromBaseQuestion(data)

      expect(provider).toBeNull()
    })

    it('should return null for multi choices with correct answers overflow', () => {
      const data: Question =
        invalidDummyData.multiChoiceWithCorrectAnswersOverflow
      const provider = QuestionProvider.fromBaseQuestion(data)

      expect(provider).toBeNull()
    })

    it('should return null for multi choices with correct answers underflow', () => {
      const data: Question =
        invalidDummyData.multiChoiceWithCorrectAnswersUnderflow
      const provider = QuestionProvider.fromBaseQuestion(data)

      expect(provider).toBeNull()
    })

    it('should return null for text with null correct answers', () => {
      const data: Question = invalidDummyData.textWithNullCorrectAnswers
      const provider = QuestionProvider.fromBaseQuestion(data)

      expect(provider).toBeNull()
    })

    it('should return null for text with undefined correct answers', () => {
      const data: Question = invalidDummyData.textWithUndefinedCorrectAnswers
      const provider = QuestionProvider.fromBaseQuestion(data)

      expect(provider).toBeNull()
    })

    it('should return null for text with empty correct answers', () => {
      const data: Question = invalidDummyData.textWithEmptyCorrectAnswers
      const provider = QuestionProvider.fromBaseQuestion(data)

      expect(provider).toBeNull()
    })
  })

  describe('After submit incorrect', () => {
    const assertIncorrectAnswer = (
      provider: QuestionProvider,
      answer: number | number[] | string
    ) => {
      expect(provider.answer).toEqual(answer)
      expect(provider.isCorrect).toBeFalse()
      expect(provider.isCompleted).toBeFalse()
      expect(provider.hint?.length).not.toBeNull()
      expect(provider.hint?.length > 0).toBeTrue()
    }

    // Valid
    it('should also save the incorrect answer in single choice question', () => {
      // Correct answer is 0
      const data: Question = validDummyData.singleChoice
      const provider = QuestionProvider.fromBaseQuestion(data)
      const answer = 1

      provider.submit(answer)
      assertIncorrectAnswer(provider, answer)
    })

    it('should also save the incorrect answer in multi choice question, one of the two answers is incorrect.', () => {
      const data: Question = validDummyData.multipleChoices
      const provider = QuestionProvider.fromBaseQuestion(data)
      const answer = [1, 3]

      provider.submit(answer)
      assertIncorrectAnswer(provider, answer)
    })

    it('should also save the incorrect answer in multi choice question, both answers is incorrect.', () => {
      const data: Question = validDummyData.multipleChoices
      const provider = QuestionProvider.fromBaseQuestion(data)
      const answer = [0, 3]

      provider.submit(answer)
      assertIncorrectAnswer(provider, answer)
    })

    it('should also save the numeric answer in multi choices question by converting it into numbers', () => {
      const data: Question = validDummyData.multipleChoices
      const provider = QuestionProvider.fromBaseQuestion(data)
      const answer: number = 0

      provider.submit(answer)
      expect(provider.answer).toBeNull()
      expect(provider.isCorrect).toBeNull()
      expect(provider.isCompleted).toBeFalse()
      expect(provider.hint).toBeNull()
    })

    it('should also save the incorrect answer in textual question', () => {
      const data: Question = validDummyData.text
      const provider = QuestionProvider.fromBaseQuestion(data)
      const answer = 'yoo'

      provider.submit(answer)
      assertIncorrectAnswer(provider, answer)
    })

    // Invalid: do nothing
    it('should do nothing when submit numbers to single choice question', () => {
      const data: Question = validDummyData.singleChoice
      const provider = QuestionProvider.fromBaseQuestion(data)
      const answer = [0, 1]

      provider.submit(answer)
      expect(provider.answer).toBeNull()
      expect(provider.isCorrect).toBeNull()
      expect(provider.isCompleted).toBeFalse()
      expect(provider.hint).toBeNull()
    })

    it('should do nothing when submit text to single choice question', () => {
      const data: Question = validDummyData.singleChoice
      const provider = QuestionProvider.fromBaseQuestion(data)
      const answer = 'hello'

      provider.submit(answer)
      expect(provider.answer).toBeNull()
      expect(provider.isCorrect).toBeNull()
      expect(provider.isCompleted).toBeFalse()
      expect(provider.hint).toBeNull()
    })

    it('should do nothing when submit an index greater than length of available answers to single choice question', () => {
      const data: Question = validDummyData.singleChoice
      const provider = QuestionProvider.fromBaseQuestion(data)
      const answer = 5

      provider.submit(answer)
      expect(provider.answer).toBeNull()
      expect(provider.isCorrect).toBeNull()
      expect(provider.isCompleted).toBeFalse()
      expect(provider.hint).toBeNull()
    })

    it('should do nothing when submit an index smaller than 0 to single choice question', () => {
      const data: Question = validDummyData.singleChoice
      const provider = QuestionProvider.fromBaseQuestion(data)
      const answer = -1

      provider.submit(answer)
      expect(provider.answer).toBeNull()
      expect(provider.isCorrect).toBeNull()
      expect(provider.isCompleted).toBeFalse()
      expect(provider.hint).toBeNull()
    })

    it('should exclude index greater than length of available answers to multi choices question', () => {
      const data: Question = validDummyData.multipleChoices
      const provider = QuestionProvider.fromBaseQuestion(data)
      const answer = [1, 5]

      provider.submit(answer)
      expect(provider.answer).toBeNull()
      expect(provider.isCorrect).toBeNull()
      expect(provider.isCompleted).toBeFalse()
      expect(provider.hint).toBeNull()
    })

    it('should exclude both indices greater than length of available answers to multi choices question', () => {
      const data: Question = validDummyData.multipleChoices
      const provider = QuestionProvider.fromBaseQuestion(data)
      const answer = [7, 5]

      provider.submit(answer)
      expect(provider.answer).toBeNull()
      expect(provider.isCorrect).toBeNull()
      expect(provider.isCompleted).toBeFalse()
      expect(provider.hint).toBeNull()
    })

    it('should exclude the index smaller than 0 to multi choices question', () => {
      const data: Question = validDummyData.multipleChoices
      const provider = QuestionProvider.fromBaseQuestion(data)
      const answer = [1, -5]

      provider.submit(answer)
      expect(provider.answer).toBeNull()
      expect(provider.isCorrect).toBeNull()
      expect(provider.isCompleted).toBeFalse()
      expect(provider.hint).toBeNull()
    })

    it('should exclude both indices smaller than 0 to multi choices question', () => {
      const data: Question = validDummyData.multipleChoices
      const provider = QuestionProvider.fromBaseQuestion(data)
      const answer = [-1, -5]

      provider.submit(answer)
      expect(provider.answer).toBeNull()
      expect(provider.isCorrect).toBeNull()
      expect(provider.isCompleted).toBeFalse()
      expect(provider.hint).toBeNull()
    })

    it('should do nothing when submit text to multi choice question', () => {
      const data: Question = validDummyData.multipleChoices
      const provider = QuestionProvider.fromBaseQuestion(data)
      const answer = 'hello'

      provider.submit(answer)
      expect(provider.answer).toBeNull()
      expect(provider.isCorrect).toBeNull()
      expect(provider.isCompleted).toBeFalse()
      expect(provider.hint).toBeNull()
    })

    it('should do nothing when submit a number to text question', () => {
      const data: Question = validDummyData.text
      const provider = QuestionProvider.fromBaseQuestion(data)
      const answer = 0

      expect(provider.answer).toBeNull()
      expect(provider.isCorrect).toBeNull()
      expect(provider.isCompleted).toBeFalse()
      expect(provider.hint).toBeNull()
    })

    it('should do nothing when submit numbers to text question', () => {
      const data: Question = validDummyData.text
      const provider = QuestionProvider.fromBaseQuestion(data)
      const answer = [0, 1]

      expect(provider.answer).toBeNull()
      expect(provider.isCorrect).toBeNull()
      expect(provider.isCompleted).toBeFalse()
      expect(provider.hint).toBeNull()
    })
  })

  describe('After submit correct', () => {
    const assertCorrectAnswer = (
      provider: QuestionProvider,
      answer: number | number[] | string
    ) => {
      expect(provider.answer).toEqual(answer)
      expect(provider.isCorrect).toBeTrue()
      expect(provider.isCompleted).toBeTrue()
      expect(provider.hint).toBeNull()
    }

    it('should also save the correct answer in single choice question', () => {
      // Correct answer is 0
      const data: Question = validDummyData.singleChoice
      const provider = QuestionProvider.fromBaseQuestion(data)
      const answer = 0

      provider.submit(answer)
      assertCorrectAnswer(provider, answer)
    })

    it('should also save the correct answer in multi choice question', () => {
      const data: Question = validDummyData.multipleChoices
      const provider = QuestionProvider.fromBaseQuestion(data)
      const answer = [1, 2]

      provider.submit(answer)
      assertCorrectAnswer(provider, answer)
    })

    it('should also save the correct answer in textual question', () => {
      const data: Question = validDummyData.text
      const provider = QuestionProvider.fromBaseQuestion(data)
      const answer = 'hello_world'

      provider.submit(answer)
      assertCorrectAnswer(provider, answer)
    })
  })
})
