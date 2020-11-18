import { MultiPhasesProvider } from './multi_phases_provider.class'
import { Box, MultipleChoices, Phase, ShortAnswer } from './interfaces'
import { BoxType } from './enums'

const boxes: Box[] = [
  {
    content: 'Content',
    imageURL: 'https://somewhereonearth.com/cat.jpeg',
    type: BoxType.DISPLAY
  },

  {
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
    hint: 'Hello',
    type: BoxType.MULTIPLE_CHOICES
  } as MultipleChoices,

  {
    content: 'Content',
    imageURL: 'https://somewhereonearth.com/cat.jpeg',
    answer: 'Hello',
    hint: 'Hello',
    type: BoxType.SHORT_ANSWER
  } as ShortAnswer
]

const phases: Phase[] = [
  {
    title: 'Phase One',
    content: 'Phase One',
    boxes: [boxes[0]]
  },
  {
    title: 'Phase Two',
    content: 'Phase Two',
    boxes: [boxes[0], boxes[1]]
  },
  {
    title: 'Phase Three',
    content: 'Phase Three',
    boxes
  }
]

describe('MultiPhasesProvider tests', () => {
  const assertPhaseOneFirstBoxAsDisplayable = (provider: MultiPhasesProvider) => {
    expect(provider).not.toBeUndefined()
    expect(provider.count).toEqual(3)
    expect(provider.index).toEqual(0)
    expect(provider.title).toEqual(phases[0].title)
    expect(provider.content).toEqual(phases[0].content)
    expect(provider.prevAvailable).toBeFalse()
    expect(provider.nextAvailable).toBeTrue()
    expect(provider.submission).toBeUndefined()
    expect(provider.hint).toBeUndefined()
    expect(provider.isCompleted).toBeFalse()
    expect(provider.isCorrect).toBeUndefined()
    expect(provider.current).not.toBeUndefined()
    expect(provider.boxIndex).toEqual(0)
    expect(provider.boxesCount).toEqual(1)
  }

  describe('with first phase', () => {

    it('should return undefined w passing null as param', () => {
      const provider = MultiPhasesProvider.fromPhases(null)

      expect(provider).toBeUndefined()
    })

    it('should return undefined w passing undefined as param ', () => {
      const provider = MultiPhasesProvider.fromPhases(undefined)

      expect(provider).toBeUndefined()
    })

    it('should return undefined w passing empty as param ', () => {
      const provider = MultiPhasesProvider.fromPhases([])

      expect(provider).toBeUndefined()
    })

    it('first question first phase', () => {
      const provider = MultiPhasesProvider.fromPhases(phases)

      assertPhaseOneFirstBoxAsDisplayable(provider)

      provider.previous()
      assertPhaseOneFirstBoxAsDisplayable(provider)

      provider.submit(0)
      assertPhaseOneFirstBoxAsDisplayable(provider)

      provider.submit('0')
      assertPhaseOneFirstBoxAsDisplayable(provider)

      provider.submit(undefined)
      assertPhaseOneFirstBoxAsDisplayable(provider)

      provider.submit(null)
      assertPhaseOneFirstBoxAsDisplayable(provider)
    })

  })

  const assertPhaseTwoFirstBoxAsDisplayable = (provider: MultiPhasesProvider) => {
    expect(provider).not.toBeUndefined()
    expect(provider.count).toEqual(3)
    expect(provider.index).toEqual(1)
    expect(provider.title).toEqual(phases[1].title)
    expect(provider.content).toEqual(phases[1].content)
    expect(provider.prevAvailable).toBeTrue()
    expect(provider.nextAvailable).toBeTrue()
    expect(provider.submission).toBeUndefined()
    expect(provider.hint).toBeUndefined()
    expect(provider.isCompleted).toBeFalse()
    expect(provider.isCorrect).toBeUndefined()
    expect(provider.current).not.toBeUndefined()
    expect(provider.boxIndex).toEqual(0)
    expect(provider.boxesCount).toEqual(2)
  }

  it('first question second phase', () => {
    const provider = MultiPhasesProvider.fromPhases(phases)

    provider.next()
    assertPhaseTwoFirstBoxAsDisplayable(provider)

    provider.previous()
    assertPhaseOneFirstBoxAsDisplayable(provider)

    provider.next()
    assertPhaseTwoFirstBoxAsDisplayable(provider)
  })

  const assertPhaseTwoSecondBoxAnswerCorrectly = (
    provider: MultiPhasesProvider
  ) => {
    expect(provider.count).toEqual(3)
    expect(provider.index).toEqual(1)
    expect(provider.title).toEqual(phases[1].title)
    expect(provider.prevAvailable).toBeTrue()
    expect(provider.nextAvailable).toBeTrue()
    expect(provider.submission).toEqual(1)
    expect(provider.hint).not.toBeUndefined()
    expect(provider.explanation).not.toBeUndefined()
    expect(provider.isCompleted).toBeFalse()
    expect(provider.isCorrect).toBeTrue()
    expect(provider.current).not.toBeUndefined()
    expect(provider.boxIndex).toEqual(1)
    expect(provider.boxesCount).toEqual(2)
  }

  it('should mark as correct when answer second box of second phase correctly', () => {
    const provider = MultiPhasesProvider.fromPhases(phases)

    // P1 Q1
    provider.next()

    // P2 Q1
    provider.next()

    // P2 Q2
    provider.submit(1)

    assertPhaseTwoSecondBoxAnswerCorrectly(provider)

    provider.previous()
    assertPhaseTwoFirstBoxAsDisplayable(provider)

    provider.next()
    assertPhaseTwoSecondBoxAnswerCorrectly(provider)
  })

  const assertPhaseThreeFirstBoxAsDisplayable = (
    provider: MultiPhasesProvider
  ) => {
    expect(provider.count).toEqual(3)
    expect(provider.index).toEqual(2)
    expect(provider.title).toEqual(phases[2].title)
    expect(provider.content).toEqual(phases[2].content)
    expect(provider.prevAvailable).toBeTrue()
    expect(provider.nextAvailable).toBeTrue()
    expect(provider.submission).toBeUndefined()
    expect(provider.hint).toBeUndefined()
    expect(provider.isCompleted).toBeFalse()
    expect(provider.isCorrect).toBeUndefined()
    expect(provider.current).not.toBeUndefined()
    expect(provider.boxIndex).toEqual(0)
    expect(provider.boxesCount).toEqual(3)
    // TODO add more expectation. Current is not enough
  }

  const assertPhaseThreeSecondBoxAnswerCorrectly = (
    provider: MultiPhasesProvider
  ) => {
    expect(provider.count).toEqual(3)
    expect(provider.index).toEqual(2)
    expect(provider.title).toEqual(phases[2].title)
    expect(provider.content).toEqual(phases[2].content)
    expect(provider.prevAvailable).toBeTrue()
    expect(provider.nextAvailable).toBeTrue()
    expect(provider.submission).toEqual(1)
    expect(provider.hint).not.toBeUndefined()
    expect(provider.isCompleted).toBeFalse()
    expect(provider.isCorrect).toBeTrue()
    expect(provider.current).not.toBeUndefined()
    expect(provider.boxIndex).toEqual(1)
    expect(provider.boxesCount).toEqual(3)
    // TODO add more expectation. Current is not enough
  }

  const assertPhaseThreeThirdQuestionAnswerCorrectly = (
    provider: MultiPhasesProvider
  ) => {
    expect(provider.count).toEqual(3)
    expect(provider.index).toEqual(2)
    expect(provider.title).toEqual(phases[2].title)
    expect(provider.content).toEqual(phases[2].content)
    expect(provider.prevAvailable).toBeTrue()
    expect(provider.nextAvailable).toBeFalse()
    expect(provider.submission).toEqual('Hello')
    expect(provider.hint).not.toBeUndefined()
    expect(provider.isCompleted).toBeTrue()
    expect(provider.isCorrect).toBeTrue()
    expect(provider.boxIndex).toEqual(2)
    expect(provider.boxesCount).toEqual(3)
    // TODO add more expectation. Current is not enough
  }

  it('first question third phase', () => {
    const provider = MultiPhasesProvider.fromPhases(phases)

    // First box First Phase
    provider.next()

    // First box Second Phase
    provider.next()

    // Second box Second Phase
    provider.submit(1)
    provider.next()

    // First box Third Phase
    assertPhaseThreeFirstBoxAsDisplayable(provider)

    provider.previous()
    assertPhaseTwoSecondBoxAnswerCorrectly(provider)

    provider.previous()
    assertPhaseTwoFirstBoxAsDisplayable(provider)
  })

  it('third question correct third phase', () => {
    const provider = MultiPhasesProvider.fromPhases(phases)

    // First box First Phase
    provider.next()

    // First box Second Phase
    provider.next()

    // Second box Second Phase
    provider.submit(1)
    provider.next()

    // First box Third Phase
    provider.next()

    // Second box Third Phase
    provider.submit(1)
    provider.next()

    // Third box Third Phase
    provider.submit('Hello')

    assertPhaseThreeThirdQuestionAnswerCorrectly(provider)

    provider.next()
    assertPhaseThreeThirdQuestionAnswerCorrectly(provider)

    provider.previous()
    // assertPhaseThreeSecondBoxAnswerCorrectly(provider)
    expect(provider.count).toEqual(3)
    expect(provider.index).toEqual(2)
    expect(provider.title).toEqual(phases[2].title)
    expect(provider.content).toEqual(phases[2].content)
    expect(provider.prevAvailable).toBeTrue()
    expect(provider.nextAvailable).toBeTrue()
    expect(provider.submission).toEqual(1)
    expect(provider.hint).not.toBeUndefined()
    expect(provider.isCompleted).toBeTrue()
    expect(provider.isCorrect).toBeTrue()
    expect(provider.current).not.toBeUndefined()
    expect(provider.boxIndex).toEqual(1)
    expect(provider.boxesCount).toEqual(3)

    provider.previous()
    // assertPhaseThreeFirstBoxAsDisplayable(provider)
    expect(provider.count).toEqual(3)
    expect(provider.index).toEqual(2)
    expect(provider.title).toEqual(phases[2].title)
    expect(provider.content).toEqual(phases[2].content)
    expect(provider.prevAvailable).toBeTrue()
    expect(provider.nextAvailable).toBeTrue()
    expect(provider.submission).toBeUndefined()
    expect(provider.hint).toBeUndefined()
    expect(provider.isCompleted).toBeTrue()
    expect(provider.isCorrect).toBeUndefined()
    expect(provider.current).not.toBeUndefined()
    expect(provider.boxIndex).toEqual(0)
    expect(provider.boxesCount).toEqual(3)

    provider.previous()
    // assertPhaseTwoSecondBoxAnswerCorrectly(provider)

    expect(provider.count).toEqual(3)
    expect(provider.index).toEqual(1)
    expect(provider.title).toEqual(phases[1].title)
    expect(provider.prevAvailable).toBeTrue()
    expect(provider.nextAvailable).toBeTrue()
    expect(provider.submission).toEqual(1)
    expect(provider.hint).not.toBeUndefined()
    expect(provider.explanation).not.toBeUndefined()
    expect(provider.isCompleted).toBeTrue()
    expect(provider.isCorrect).toBeTrue()
    expect(provider.current).not.toBeUndefined()
    expect(provider.boxIndex).toEqual(1)
    expect(provider.boxesCount).toEqual(2)

  })
})
