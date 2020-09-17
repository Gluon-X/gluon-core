export const dummy_data = {
  Q01: {
    title: '',
    author: '',
    content: '',
    image_url: '',
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
