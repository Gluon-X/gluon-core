export interface Chapter {
  chapterId: string

  name: string

  description?: string

  thumbnailURL: string

  relatedResources?: []

  questions: []

  // GradeId the chapter belong
  gradeId: string
}

export interface Exercise {
  name: string

  isActive: boolean

  problems: Problem[]
}

export interface Problem {
  name: string

  imageURL: string

  description?: string
}

export interface GradeNav {
  name: string

  isActive: boolean

  chapters: ChapterNav[]
}

export interface ChapterNav {
  name: string

  isActive?: boolean
}
