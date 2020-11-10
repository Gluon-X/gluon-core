// Note: field `creationDate` and `lastEdited` are uneccessary yet, by now.
export const courses = {
  gradeId: {
    name: 'Lớp 11',
    thumbnailURL: '',
    description: 'Non veniam excepteur culpa qui id proident laboris.',
    creationDate: Date.now,
    lastEdited: Date.now,
    /**
     * Should `chapters` field has type `object` or `array`?
     */
    chapters: {
      chapterId: {
        name: 'Động lực học chất điểm',
        description: 'Fugiat dolor laboris irure do.',
        thumbnailURL: '',

        /**
         * 1. Should `problems` field has type `object` or `array`?
         * 2. Exclude `problems` field when querying grades in `Courses` view.
         */
        questions: {
          problemId: {
            name: 'Tính vận tốc di chuyển',
            description:
              'Cupidatat laborum nulla consectetur minim aliquip proident laboris officia veniam commodo sint.',
            thumbnailURL: '',
            problemId: 'GID11060001',
            creationDate: Date.now,
            lastEdited: Date.now
          },
        },
      },
    },
  },
}
