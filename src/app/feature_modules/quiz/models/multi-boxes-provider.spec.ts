import { Box, MultipleChoices, Phase, ShortAnswer } from './interfaces.new'
import { BoxType } from './enums.new'
import { MultiBoxesProvider } from './multi_boxes_provider.class'

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

const samplePhase: Phase = {
  title: 'Sample',
  content: 'Sample',
  boxes
}

describe('MultiBoxesProvider test suite', () => {
  it('should return undefined when passing null param', () => {
    const provider = MultiBoxesProvider.fromPhase(null)
    expect(provider).toBeUndefined()
  })

  it('should return undefined when passing undefined param', () => {
    const provider = MultiBoxesProvider.fromPhase(undefined)
    expect(provider).toBeUndefined()
  })

  it('should return undefined when passing empty param', () => {
    const sampleEmptyPhase: Phase = {
      title: 'Sample',
      content: 'Sample',
      boxes: []
    }

    const provider = MultiBoxesProvider.fromPhase(sampleEmptyPhase)
    expect(provider).toBeUndefined()
  })

  const assertFirstBoxAsDisplayable = (provider: MultiBoxesProvider) => {
    expect(provider).not.toBeUndefined()
    expect(provider.count).toEqual(boxes.length)
    expect(provider.index).toEqual(0)
    expect(provider.nextAvailable).toBeTrue()
    expect(provider.prevAvailable).toBeFalse()
    expect(provider.isCompleted).toBeFalse()
    expect(provider.current).not.toBeUndefined()
    expect(provider.hint).toBeUndefined()
    expect(provider.explanation).toBeUndefined()
    expect(provider.isCorrect).toBeUndefined()
    expect(provider.submission).toBeUndefined()
    expect(provider.content).toEqual(samplePhase.content)
    expect(provider.title).toEqual(samplePhase.title)
    expect(provider.current.type).toEqual(BoxType.DISPLAY)
  }

  it('should return first box as displayable', () => {
    const provider = MultiBoxesProvider.fromPhase(samplePhase)
    assertFirstBoxAsDisplayable(provider)

    // Try calling prev, but nothing change.
    provider.previous()
    assertFirstBoxAsDisplayable(provider)

    // It should not do anything when calling submit
    provider.submit(undefined)
    assertFirstBoxAsDisplayable(provider)

    provider.submit('Hello')
    assertFirstBoxAsDisplayable(provider)

    provider.submit(0)
    assertFirstBoxAsDisplayable(provider)

    provider.submit(null)
    assertFirstBoxAsDisplayable(provider)
  })

  it('should move on when calling `next` method', () => {
    const assertSecondBoxNotFinish = () => {
      expect(provider).not.toBeUndefined()
      expect(provider.count).toEqual(boxes.length)
      expect(provider.index).toEqual(1)
      expect(provider.nextAvailable).toBeFalse()
      expect(provider.prevAvailable).toBeTrue()
      expect(provider.isCompleted).toBeFalse()
      expect(provider.current).not.toBeUndefined()
      expect(provider.hint).not.toBeUndefined()
      expect(provider.submission).toBeUndefined()
      expect(provider.isCorrect).toBeUndefined()
      expect(provider.explanation).toBeUndefined()
      expect(provider.content).toEqual(samplePhase.content)
      expect(provider.title).toEqual(samplePhase.title)
      expect(provider.current.type).toEqual(BoxType.MULTIPLE_CHOICES)
    }

    const provider = MultiBoxesProvider.fromPhase(samplePhase)

    provider.next()
    assertSecondBoxNotFinish()

    // rollback to first box
    provider.previous()
    assertFirstBoxAsDisplayable(provider)

    // move next to second box
    provider.next()
    assertSecondBoxNotFinish()
  })

  it('should not allow to pass w answer second question incorrectly', () => {
    const assertSecondQuestionAnswerIncorrectly = () => {
      expect(provider).not.toBeUndefined()
      expect(provider.count).toEqual(boxes.length)
      expect(provider.index).toEqual(1)
      expect(provider.nextAvailable).toBeFalse()
      expect(provider.prevAvailable).toBeTrue()
      expect(provider.isCompleted).toBeFalse()
      expect(provider.current).not.toBeUndefined()
      expect(provider.hint).not.toBeUndefined()
      expect(provider.submission).toEqual(0)
      expect(provider.isCorrect).toBeFalse()
      expect(provider.explanation).toEqual((boxes[1] as MultipleChoices).choices[0].explanation)
      expect(provider.content).toEqual(samplePhase.content)
      expect(provider.title).toEqual(samplePhase.title)
      expect(provider.current.type).toEqual(BoxType.MULTIPLE_CHOICES)
    }

    const provider = MultiBoxesProvider.fromPhase(samplePhase)
    provider.next()
    provider.submit(0)

    assertSecondQuestionAnswerIncorrectly()

    // rollback to first question
    provider.previous()
    assertFirstBoxAsDisplayable(provider)

    // move next to second question
    provider.next()
    assertSecondQuestionAnswerIncorrectly()
  })

  const assertSecondBoxAnswerCorrectly = (
    provider: MultiBoxesProvider
  ) => {
    expect(provider).not.toBeUndefined()
    expect(provider.count).toEqual(boxes.length)
    expect(provider.index).toEqual(1)
    expect(provider.nextAvailable).toBeTrue()
    expect(provider.prevAvailable).toBeTrue()
    expect(provider.isCompleted).toBeFalse()
    expect(provider.current).not.toBeUndefined()
    expect(provider.hint).not.toBeUndefined()
    expect(provider.submission).toEqual(1)
    expect(provider.isCorrect).toBeTrue()
    expect(provider.explanation).toEqual((boxes[1] as MultipleChoices).choices[1].explanation)
    expect(provider.content).toEqual(samplePhase.content)
    expect(provider.title).toEqual(samplePhase.title)
    expect(provider.current.type).toEqual(BoxType.MULTIPLE_CHOICES)
  }

  it('should allow to pass when answer second question correctly', () => {
    const provider = MultiBoxesProvider.fromPhase(samplePhase)

    provider.next()
    provider.submit(1)

    assertSecondBoxAnswerCorrectly(provider)
    // rollback to first box
    provider.previous()
    assertFirstBoxAsDisplayable(provider)

    // move back to second box
    provider.next()
    assertSecondBoxAnswerCorrectly(provider)
  })

  it('answer second question correctly and click next', () => {
    const assertThirdQuestionNotFinish = () => {
      expect(provider).not.toBeUndefined()
      expect(provider.count).toEqual(boxes.length)
      expect(provider.index).toEqual(2)
      expect(provider.nextAvailable).toBeFalse()
      expect(provider.prevAvailable).toBeTrue()
      expect(provider.isCompleted).toBeFalse()
      expect(provider.current).not.toBeUndefined()
      expect(provider.hint).not.toBeUndefined()
      expect(provider.submission).toBeUndefined()
      expect(provider.isCorrect).toBeUndefined()
      expect(provider.explanation).toBeUndefined()
      expect(provider.content).toEqual(samplePhase.content)
      expect(provider.title).toEqual(samplePhase.title)
      expect(provider.current.type).toEqual(BoxType.SHORT_ANSWER)
    }

    const provider = MultiBoxesProvider.fromPhase(samplePhase)

    provider.next()
    provider.submit(1)
    provider.next()

    assertThirdQuestionNotFinish()

    // move next shall not take effect
    provider.next()
    assertThirdQuestionNotFinish()

    // move back to second
    provider.previous()
    assertSecondBoxAnswerCorrectly(provider)

    // move back to first
    provider.previous()
    assertFirstBoxAsDisplayable(provider)

    // move back to third
    provider.next()
    provider.next()
    assertThirdQuestionNotFinish()
  })

  it('should not mark as completed when answer third question incorrectly', () => {
    const assertThirdQuestionAnswerIncorrectly = () => {
      expect(provider).not.toBeUndefined()
      expect(provider.count).toEqual(boxes.length)
      expect(provider.index).toEqual(2)
      expect(provider.nextAvailable).toBeFalse()
      expect(provider.prevAvailable).toBeTrue()
      expect(provider.isCompleted).toBeFalse()
      expect(provider.current).not.toBeUndefined()
      expect(provider.hint).not.toBeUndefined()
      expect(provider.submission).toEqual('yo')
      expect(provider.isCorrect).toBeFalse()
      expect(provider.explanation).toBeUndefined()
      expect(provider.content).toEqual(samplePhase.content)
      expect(provider.title).toEqual(samplePhase.title)
      expect(provider.current.type).toEqual(BoxType.SHORT_ANSWER)
    }

    const provider = MultiBoxesProvider.fromPhase(samplePhase)

    provider.next()
    provider.submit(1)
    provider.next()
    provider.submit('yo')

    assertThirdQuestionAnswerIncorrectly()

    // move next shall not take effect
    provider.next()
    assertThirdQuestionAnswerIncorrectly()

    // move back to second
    provider.previous()
    assertSecondBoxAnswerCorrectly(provider)

    // move back to first
    provider.previous()
    assertFirstBoxAsDisplayable(provider)

    // move back to third
    provider.next()
    provider.next()
    assertThirdQuestionAnswerIncorrectly()
  })

  const assertThirdQuestionAnswerCorrectly = (
    provider: MultiBoxesProvider
  ) => {
    expect(provider).not.toBeUndefined()
    expect(provider.count).toEqual(boxes.length)
    expect(provider.index).toEqual(2)
    expect(provider.nextAvailable).toBeFalse()
    expect(provider.prevAvailable).toBeTrue()
    expect(provider.isCompleted).toBeTrue()
    expect(provider.current).not.toBeUndefined()
    expect(provider.hint).not.toBeUndefined()
    expect(provider.submission).toEqual('Hello')
    expect(provider.isCorrect).toBeTrue()
    expect(provider.explanation).toBeUndefined()
    expect(provider.content).toEqual(samplePhase.content)
    expect(provider.title).toEqual(samplePhase.title)
    expect(provider.current.type).toEqual(BoxType.SHORT_ANSWER)
  }

  it('should allow to pass w answer third question correctly', () => {
    const provider = MultiBoxesProvider.fromPhase(samplePhase)

    provider.next()
    provider.submit(1)
    provider.next()
    provider.submit('Hello')

    assertThirdQuestionAnswerCorrectly(provider)

    // move next shall not take effect
    provider.next()
    assertThirdQuestionAnswerCorrectly(provider)
  })
})
