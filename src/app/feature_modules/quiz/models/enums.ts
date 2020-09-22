export enum QuestionType {
  SINGLE_CHOICE,
  MULTIPLE_CHOICES,
  TEXT,
}

export enum QuizState {
  // No data available.
  EMPTY,

  // Data is ready, but no helper or follow up question enable.
  READY,

  // HELP!!!
  HELP,

  // Follow up question phase.
  FOLLOW_UP,

  // All is completed.
  FINISHED,
}
