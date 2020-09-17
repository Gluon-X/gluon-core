import { QuestionType } from './enums'
import { MainQuestion, PhaseStack, Question } from './interfaces'

export const dummy_data = {
  Q01: {
    title: '',
    content: '',
    /**
     * correct_answer.
     * - number: if one correct answer only
     * - number[]: if multiple correct answers
     * - string: if correct answer is a text
     */
    correct_answer: 0,
    answers: [], // left blank or null if this question requires keyboard input
    type: '', // enum [SingleChoice, MultipleChoice, Text]
    helps: {
      phase_one: {
        open_question: '',
        sub_questions: [
          {
            content: '',
            correct_answer: 0, // Same as above
            answers: [], // Same as above
            type: '', // enum [SingleChoice, MultipleChoice, Text]
          },
        ],
      },
      phase_two: {
        open_question: '',
        sub_questions: [],
      },
      phase_three: {
        open_question: '',
        sub_questions: [],
      },
    },
    follow_up_questions: [
      {
        content: '',
        correct_answer: 0,
        answers: [],
        type: '', // enum
      },
    ],
  },
}

export const realDummyData = <MainQuestion>{
  title: 'Hello',

  content: 'Lorem Ipsum',

  correctAnswer: '100',

  answers: null,

  type: QuestionType.TEXT,

  helps: <any>{
    phaseOne: <PhaseStack>{
      openQuestion: '',
      subQuestions: <Question[]>[
        {
          content: '',
          correctAnswer: '200',
          answers: null,
          type: QuestionType.TEXT,
        },
      ],
    },
  },

  followUpQuestions: <Question[]>[],
}
