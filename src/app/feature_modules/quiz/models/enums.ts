export enum QuestionType {
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  MULTIPLE_CHOICES = 'MULTIPLE_CHOICES',
  TEXT = 'TEXT',
}

export enum QuizState {
  // No data available.
  EMPTY = 'EMPTY',

  // Data is ready, but no helper or follow up question enable.
  READY = 'READY',

  // HELP!!!
  HELP = 'HELP',

  // Follow up question phase.
  FOLLOW_UP = 'FOLLOW_UP',

  // All is completed.
  FINISHED = 'FINISHED',
}
