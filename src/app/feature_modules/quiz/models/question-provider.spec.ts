import { Box, MultipleChoices, Question, ShortAnswer } from './interfaces'
import { MultipleChoicesProvider, QuestionProvider, ShortAnswerProvider } from './question_provider.class'
import { BoxType } from './enums'

// BOX
const box: Box = {
  type: BoxType.DISPLAY,
  content: 'Content',
  imageURL: 'https://somewhereonearth.com/cat.jpeg'
}

const boxWTypeShortAnswer: Box = {
  type: BoxType.SHORT_ANSWER,
  content: 'Content',
  imageURL: 'https://somewhereonearth.com/cat.jpeg'
}

const boxWTypeMultipleChoices: Box = {
  type: BoxType.MULTIPLE_CHOICES,
  content: 'Content',
  imageURL: 'https://somewhereonearth.com/cat.jpeg'
}

// MULTIPLE-CHOICES
const multipleChoicesCorrectWithNoHint: MultipleChoices = {
  content: 'Content',
  imageURL: 'https://somewhereonearth.com/cat.jpeg',
  choices: [{
    content: 'A',
    isCorrect: false,
    explanation: 'A'
  }, {
    content: 'B',
    isCorrect: true,
    explanation: 'B'
  }, {
    content: 'C',
    isCorrect: false,
    explanation: 'C'
  }, {
    content: 'D',
    isCorrect: false,
    explanation: 'D'
  }],
  type: BoxType.MULTIPLE_CHOICES
}

const multipleChoicesWithHint: MultipleChoices = {
  content: 'Content',
  imageURL: 'https://somewhereonearth.com/cat.jpeg',
  choices: [{
    content: 'A',
    isCorrect: false,
    explanation: 'A'
  }, {
    content: 'B',
    isCorrect: true,
    explanation: 'B'
  }, {
    content: 'C',
    isCorrect: false,
    explanation: 'C'
  }, {
    content: 'D',
    isCorrect: false,
    explanation: 'D'
  }],
  type: BoxType.MULTIPLE_CHOICES,
  hint: 'Hello'
}

// empty choices
const multipleChoicesWithEmptyChoices: MultipleChoices = {
  content: 'Content',
  imageURL: 'https://somewhereonearth.com/cat.jpeg',
  choices: [],
  type: BoxType.MULTIPLE_CHOICES
}

// one choice only -> Valid
const multipleChoicesWithSingleChoice: MultipleChoices = {
  content: 'Content',
  imageURL: 'https://somewhereonearth.com/cat.jpeg',
  choices: [{
    content: 'A',
    isCorrect: true,
    explanation: 'A'
  }],
  type: BoxType.MULTIPLE_CHOICES
}

const multipleChoicesWTypeShortAnswer: MultipleChoices = {
  content: 'Content',
  imageURL: 'https://somewhereonearth.com/cat.jpeg',
  choices: [{
    content: 'A',
    isCorrect: true,
    explanation: 'A'
  }],
  type: BoxType.SHORT_ANSWER
}

const multipleChoicesWTypeBox: MultipleChoices = {
  content: 'Content',
  imageURL: 'https://somewhereonearth.com/cat.jpeg',
  choices: [{
    content: 'A',
    isCorrect: true,
    explanation: 'A'
  }],
  type: BoxType.DISPLAY
}

// no correct answer
const multipleChoicesNoCorrect: MultipleChoices = {
  content: 'Content',
  imageURL: 'https://somewhereonearth.com/cat.jpeg',
  choices: [{
    content: 'A',
    isCorrect: false,
    explanation: 'A'
  }, {
    content: 'B',
    isCorrect: false,
    explanation: 'B'
  }, {
    content: 'C',
    isCorrect: false,
    explanation: 'C'
  }, {
    content: 'D',
    isCorrect: false,
    explanation: 'D'
  }],
  type: BoxType.MULTIPLE_CHOICES
}

// SHORT ANSWER
const shortAnswerQuestion: ShortAnswer = {
  content: 'Content',
  imageURL: 'https://somewhereonearth.com/cat.jpeg',
  answer: 'Hello',
  type: BoxType.SHORT_ANSWER
}

const shortAnswerWithHelp: ShortAnswer = {
  content: 'Content',
  imageURL: 'https://somewhereonearth.com/cat.jpeg',
  answer: 'Hello',
  type: BoxType.SHORT_ANSWER,
  hint: 'Hello'
}

// empty answer -> Valid
const shortAnswerWithEmptyAnswer: ShortAnswer = {
  content: 'Content',
  imageURL: 'https://somewhereonearth.com/cat.jpeg',
  answer: '',
  type: BoxType.SHORT_ANSWER
}

const shortAnswerWithNumericTypeAndNoApprox: ShortAnswer = {
  content: 'Content',
  imageURL: 'https://somewhereonearth.com/cat.jpeg',
  answer: 10,
  type: BoxType.SHORT_ANSWER
}

const shortAnswerWithNumericTypeAndApprox: ShortAnswer = {
  content: 'Content',
  imageURL: 'https://somewhereonearth.com/cat.jpeg',
  answer: 10,
  approx: 5,
  type: BoxType.SHORT_ANSWER
}

const shortAnswerWTypeBox: ShortAnswer = {
  content: 'Content',
  imageURL: 'https://somewhereonearth.com/cat.jpeg',
  answer: 'Hello',
  type: BoxType.DISPLAY
}

const shortAnswerWTypeMultipleChoices: ShortAnswer = {
  content: 'Content',
  imageURL: 'https://somewhereonearth.com/cat.jpeg',
  answer: 'Hello',
  type: BoxType.MULTIPLE_CHOICES
}

describe('New QuestionProvider test suite', () => {
  // Test utility functions
  const assertDataParseIntegrity = (
    data: Question,
    provider: QuestionProvider
  ) => {
    expect(provider.type).toEqual(data.type)
    expect(provider.content).toEqual(data.content)
    expect(provider.imageURL).toEqual(data.imageURL)
  }

  const assertInitCorrectWithNoHint = (provider: QuestionProvider) => {
    expect(provider.submission).toBeUndefined()
    expect(provider.isCorrect).toBeUndefined()
    expect(provider.hint).toBeUndefined()
    expect(provider.explanation).toBeUndefined()
    expect(provider.isCompleted).toBeFalse()
    expect(provider.type).not.toEqual(BoxType.DISPLAY)
  }

  const assertInitCorrectWithHint = (provider: QuestionProvider) => {
    expect(provider.submission).toBeUndefined()
    expect(provider.isCorrect).toBeUndefined()
    expect(provider.hint).not.toBeUndefined()
    expect(provider.explanation).toBeUndefined()
    expect(provider.isCompleted).toBeFalse()
  }

  const assertEqualChoices = (data: MultipleChoices, provider: MultipleChoicesProvider) => {
    expect(provider.choices).toEqual(data.choices)
    expect(provider.choices.length).toEqual(data.choices.length)
    for (const index in provider.choices)
      expect(provider.choices[index]).toEqual(data.choices[index])
  }

  describe('Initialization', () => {

    describe('with Multiple Choices instance as input', () => {
      // Valid cases.
      it('should parse multiple choices no help correctly', () => {
        const data: Question = multipleChoicesCorrectWithNoHint
        const provider = QuestionProvider.fromBox(data)

        expect(provider).toBeInstanceOf(MultipleChoicesProvider)
        assertDataParseIntegrity(data, provider as QuestionProvider)
        assertInitCorrectWithNoHint(provider as QuestionProvider)
        assertEqualChoices(data as MultipleChoices, provider as MultipleChoicesProvider)
      })

      it('should parse multiple choices with hint correctly', () => {
        const data: Question = multipleChoicesWithHint
        const provider = QuestionProvider.fromBox(data)

        expect(provider).toBeInstanceOf(MultipleChoicesProvider)
        assertDataParseIntegrity(data, provider as QuestionProvider)
        assertInitCorrectWithHint(provider as QuestionProvider)
        assertEqualChoices(data as MultipleChoices, provider as MultipleChoicesProvider)
      })

      it('should parse multiple choices w one choice correctly', () => {
        const data: Question = multipleChoicesWithSingleChoice
        const provider = QuestionProvider.fromBox(data)

        expect(provider).toBeInstanceOf(MultipleChoicesProvider)
        assertDataParseIntegrity(data, provider as QuestionProvider)
        assertInitCorrectWithNoHint(provider as QuestionProvider)
        assertEqualChoices(data as MultipleChoices, provider as MultipleChoicesProvider)
      })

      // Invalid cases.
      it('should return undefined for empty choices', () => {
        const data: Question = multipleChoicesWithEmptyChoices
        const provider = QuestionProvider.fromBox(data)

        expect(provider).toBeUndefined()
      })

      it('should return undefined for no correct choice', () => {
        const data: Question = multipleChoicesNoCorrect
        const provider = QuestionProvider.fromBox(data)

        expect(provider).toBeUndefined()
      })
    })

    describe('with Short Answer as input', () => {
      it('should parse short answer correctly', () => {
        const data: Question = shortAnswerQuestion
        const provider = QuestionProvider.fromBox(data)

        expect(provider).toBeInstanceOf(ShortAnswerProvider)
        assertDataParseIntegrity(data, provider as QuestionProvider)
        assertInitCorrectWithNoHint(provider as QuestionProvider)
      })

      it('should parse short answer w empty answer correctly', () => {
        const data: Question = shortAnswerWithEmptyAnswer
        const provider = QuestionProvider.fromBox(data)

        expect(provider).toBeInstanceOf(ShortAnswerProvider)
        assertDataParseIntegrity(data, provider as QuestionProvider)
        assertInitCorrectWithNoHint(provider as QuestionProvider)
      })

      it('should parse short answer w numeric answer correctly', () => {
        const data: Question = shortAnswerWithNumericTypeAndNoApprox
        const provider = QuestionProvider.fromBox(data)

        expect(provider).toBeInstanceOf(ShortAnswerProvider)
        assertDataParseIntegrity(data, provider as QuestionProvider)
        assertInitCorrectWithNoHint(provider as QuestionProvider)
      })

      it('should parse short answer w numeric answer & approx correctly', () => {
        const data: Question = shortAnswerWithNumericTypeAndApprox
        const provider = QuestionProvider.fromBox(data)

        expect(provider).toBeInstanceOf(ShortAnswerProvider)
        assertDataParseIntegrity(data, provider as QuestionProvider)
        assertInitCorrectWithNoHint(provider as QuestionProvider)
      })
    })

    describe('with Box as input', () => {
      it('should return box instance', () => {
        const data: Question = box
        const provider = QuestionProvider.fromBox(data)

        expect(provider).not.toBeInstanceOf(QuestionProvider)
        expect(provider).not.toBeInstanceOf(ShortAnswerProvider)
        expect(provider).not.toBeInstanceOf(MultipleChoicesProvider)
        expect(data.content).toEqual(provider.content)
        expect(data.type).toEqual(provider.type)
        expect(data.imageURL).toEqual(provider.imageURL)
      })

      it('should return undefined for box instance with type SHORT_ANSWER; because of the missing `answer` field.', () => {
        const data: Question = boxWTypeShortAnswer
        const provider = QuestionProvider.fromBox(data)

        expect(provider).toBeUndefined()
      })

      it('should return undefined for box instance with type MULTIPLE_CHOICES; because of the missing `choices` field.', () => {
        const data: Question = boxWTypeMultipleChoices
        const provider = QuestionProvider.fromBox(data)

        expect(provider).toBeUndefined()
      })
    })
  })

  describe('In Action', () => {
    describe('with Multiple Choices as input', () => {

      describe('with no hint', () => {
        it('should not mark as complete when submit wrong answer', () => {
          const provider = QuestionProvider.fromBox(multipleChoicesCorrectWithNoHint) as MultipleChoicesProvider
          const choice = 0
          const explanation = multipleChoicesCorrectWithNoHint.choices[choice].explanation

          provider.submit(choice)
          expect(provider.submission).toEqual(choice)
          expect(provider.isCorrect).toBeFalse()
          expect(provider.isCompleted).toBeFalse()
          expect(provider.explanation).toEqual(explanation)
        })

        it('should do nothing when submit string as input', () => {
          const provider = QuestionProvider.fromBox(multipleChoicesCorrectWithNoHint) as QuestionProvider
          const choice = '0'

          provider.submit(choice)
          expect(provider.isCompleted).toBeFalse()
          expect(provider.explanation).toBeUndefined()
          expect(provider.submission).toBeUndefined()
          expect(provider.isCorrect).toBeUndefined()
          expect(provider.hint).toBeUndefined()
        })

        it('should mark as complete when submit correct answer', () => {
          const provider = QuestionProvider.fromBox(multipleChoicesCorrectWithNoHint) as QuestionProvider
          const choice = 1
          const explanation = multipleChoicesCorrectWithNoHint.choices[choice].explanation

          provider.submit(choice)
          expect(provider.submission).toEqual(choice)
          expect(provider.isCorrect).toBeTrue()
          expect(provider.isCompleted).toBeTrue()
          expect(provider.explanation).toEqual(explanation)
        })

        it('should do nothing when submit an index greater than the choices`s count.', () => {
          const provider = QuestionProvider.fromBox(multipleChoicesCorrectWithNoHint) as QuestionProvider
          const choice = 7

          provider.submit(choice)
          expect(provider.isCompleted).toBeFalse()
          expect(provider.explanation).toBeUndefined()
          expect(provider.submission).toBeUndefined()
          expect(provider.isCorrect).toBeUndefined()
          expect(provider.hint).toBeUndefined()
        })

        it('should change states when first submit wrong and then submit correct', () => {
          // Init
          const provider = QuestionProvider.fromBox(multipleChoicesCorrectWithNoHint) as MultipleChoicesProvider

          // Submit wrong answer
          let choice = 0
          let explanation = multipleChoicesCorrectWithNoHint.choices[choice].explanation

          provider.submit(choice)
          expect(provider.submission).toEqual(choice)
          expect(provider.isCorrect).toBeFalse()
          expect(provider.isCompleted).toBeFalse()
          expect(provider.explanation).toEqual(explanation)

          // Resubmit with correct answer
          choice = 1
          explanation = multipleChoicesCorrectWithNoHint.choices[choice].explanation

          provider.submit(choice)
          expect(provider.submission).toEqual(choice)
          expect(provider.isCorrect).toBeTrue()
          expect(provider.isCompleted).toBeTrue()
          expect(provider.explanation).toEqual(explanation)
        })
      })

      describe('with hint', () => {
        // TODO implement this
      })
    })

    describe('with Short Answer as input', () => {

      describe('with `answer` is of numeric type', () => {

        it('should not mark as complete when submit wrong answer', () => {
          const provider = QuestionProvider.fromBox(shortAnswerWithNumericTypeAndNoApprox) as ShortAnswerProvider

          expect(provider).not.toBeUndefined()
          provider.submit(11)

          expect(provider.submission).toEqual('11')
          expect(provider.explanation).toBeUndefined()
          expect(provider.hint).toBeUndefined()
          expect(provider.isCompleted).toBeFalse()
          expect(provider.isCorrect).toBeFalse()
          expect(provider.type).toEqual(BoxType.SHORT_ANSWER)
        })

        it('should mark as complete when submit correct answer', () => {
          const provider = QuestionProvider.fromBox(shortAnswerWithNumericTypeAndNoApprox) as ShortAnswerProvider

          expect(provider).not.toBeUndefined()
          provider.submit(10)

          expect(provider.submission).toEqual('10')
          expect(provider.explanation).toBeUndefined()
          expect(provider.hint).toBeUndefined()
          expect(provider.isCompleted).toBeTrue()
          expect(provider.isCorrect).toBeTrue()
          expect(provider.type).toEqual(BoxType.SHORT_ANSWER)
        })

        it('should parse string submission to number and conversion successful', () => {
          const provider = QuestionProvider.fromBox(shortAnswerWithNumericTypeAndNoApprox) as ShortAnswerProvider

          expect(provider).not.toBeUndefined()
          provider.submit('10')

          expect(provider.submission).toEqual('10')
          expect(provider.explanation).toBeUndefined()
          expect(provider.hint).toBeUndefined()
          expect(provider.isCompleted).toBeTrue()
          expect(provider.isCorrect).toBeTrue()
          expect(provider.type).toEqual(BoxType.SHORT_ANSWER)
        })

        it('should parse string submission to number and conversion failed', () => {
          const provider = QuestionProvider.fromBox(shortAnswerWithNumericTypeAndNoApprox) as ShortAnswerProvider

          expect(provider).not.toBeUndefined()
          provider.submit('10E')

          expect(provider.submission).toBeUndefined()
          expect(provider.explanation).toBeUndefined()
          expect(provider.hint).toBeUndefined()
          expect(provider.isCompleted).toBeFalse()
          expect(provider.isCorrect).toBeFalse()
          expect(provider.type).toEqual(BoxType.SHORT_ANSWER)
        })

        it('should change states when first submit wrong and then submit correct', () => {
          const provider = QuestionProvider.fromBox(shortAnswerWithNumericTypeAndNoApprox) as ShortAnswerProvider

          expect(provider).not.toBeUndefined()
          provider.submit(11)
          provider.submit(10)

          expect(provider.submission).toEqual('10')
          expect(provider.explanation).toBeUndefined()
          expect(provider.hint).toBeUndefined()
          expect(provider.isCompleted).toBeTrue()
          expect(provider.isCorrect).toBeTrue()
          expect(provider.type).toEqual(BoxType.SHORT_ANSWER)
        })

        it('should mark as correct when submit with upper approx boundary', () => {
          const provider = QuestionProvider.fromBox(shortAnswerWithNumericTypeAndApprox) as ShortAnswerProvider

          expect(provider).not.toBeUndefined()
          provider.submit(11)

          expect(provider.submission).toEqual('11')
          expect(provider.explanation).toBeUndefined()
          expect(provider.hint).toBeUndefined()
          expect(provider.isCompleted).toBeTrue()
          expect(provider.isCorrect).toBeTrue()
          expect(provider.type).toEqual(BoxType.SHORT_ANSWER)
        })

        it('should mark as correct when submit with lower approx boundary', () => {
          const provider = QuestionProvider.fromBox(shortAnswerWithNumericTypeAndApprox) as ShortAnswerProvider

          expect(provider).not.toBeUndefined()
          provider.submit(8)

          expect(provider.submission).toEqual('8')
          expect(provider.explanation).toBeUndefined()
          expect(provider.hint).toBeUndefined()
          expect(provider.isCompleted).toBeTrue()
          expect(provider.isCorrect).toBeTrue()
          expect(provider.type).toEqual(BoxType.SHORT_ANSWER)
        })

      })

      describe('with `answer` is of string type', () => {
        it('should allow string submission when answer is string', () => {
          const provider = QuestionProvider.fromBox(shortAnswerQuestion) as ShortAnswerProvider

          expect(provider).not.toBeUndefined()
          provider.submit('Hello')

          expect(provider.submission).toEqual('Hello')
          expect(provider.explanation).toBeUndefined()
          expect(provider.hint).toBeUndefined()
          expect(provider.isCompleted).toBeTrue()
          expect(provider.isCorrect).toBeTrue()
          expect(provider.type).toEqual(BoxType.SHORT_ANSWER)
        })

        it('should not mark as complete when submit wrong answer', () => {
          const provider = QuestionProvider.fromBox(shortAnswerQuestion) as ShortAnswerProvider

          expect(provider).not.toBeUndefined()
          provider.submit('Yoyo')

          expect(provider.submission).toEqual('Yoyo')
          expect(provider.explanation).toBeUndefined()
          expect(provider.hint).toBeUndefined()
          expect(provider.isCompleted).toBeFalse()
          expect(provider.isCorrect).toBeFalse()
          expect(provider.type).toEqual(BoxType.SHORT_ANSWER)
        })

        it('should convert numeric submission to string', () => {
          const provider = QuestionProvider.fromBox(shortAnswerQuestion) as ShortAnswerProvider

          expect(provider).not.toBeUndefined()
          provider.submit(120)

          expect(provider.submission).toEqual('120')
          expect(provider.explanation).toBeUndefined()
          expect(provider.hint).toBeUndefined()
          expect(provider.isCompleted).toBeFalse()
          expect(provider.isCorrect).toBeFalse()
          expect(provider.type).toEqual(BoxType.SHORT_ANSWER)
        })

        it('should change states when first submit wrong and then submit correct', () => {
          const provider = QuestionProvider.fromBox(shortAnswerQuestion) as ShortAnswerProvider

          expect(provider).not.toBeUndefined()
          provider.submit(120)
          provider.submit('Hello')

          expect(provider.submission).toEqual('Hello')
          expect(provider.explanation).toBeUndefined()
          expect(provider.hint).toBeUndefined()
          expect(provider.isCompleted).toBeTrue()
          expect(provider.isCorrect).toBeTrue()
          expect(provider.type).toEqual(BoxType.SHORT_ANSWER)
        })
      })
    })
  })
})
