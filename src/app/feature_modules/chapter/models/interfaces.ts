export interface Chapter{
  chapterId: string

  name: string

  description?: string

  thumbnailURL: string

  relatedResources?:[]

  questions:[]

  //GradeId the chapter belong
  gradeId: string
}

