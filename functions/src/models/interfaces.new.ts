import { BoxType } from './enums.new'

export type PossibleInputAnswer = number | string

export interface Choice {
  content: string

  isCorrect: boolean

  explanation?: string
}

export interface Box {
  content: string

  imageURL?: string

  type: BoxType
}

export interface Question extends Box {
  hint?: string
}

export interface MultipleChoices extends Question {
  choices: Choice[]
}

export interface ShortAnswer extends Question {
  answer: string | number,

  approx?: number
}

export interface Phase {
  title: string

  content: string

  boxes: Box[]
}

export interface Quiz {
  title: string

  core: Question

  helps: Phase[]

  followUp?: Phase
}

