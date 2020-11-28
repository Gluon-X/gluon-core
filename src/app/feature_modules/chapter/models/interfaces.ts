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

export abstract class Exercise {
  name: string

  isActive: boolean

  problems: Problem[]

  static builder(): ExerciseBuilder {
    return new ExerciseBuilder()
  }

  abstract toggleCollapse()
}

class ExerciseBuilder {
  name: string

  isActive: boolean = false

  problems: Problem[] = []

  addProblem(problem: Problem): ExerciseBuilder {
    this.problems.push(problem)
    return this
  }

  setName(name: string): ExerciseBuilder {
    this.name = name
    return this
  }

  setActive(state: boolean): ExerciseBuilder {
    this.isActive = state
    return this
  }

  build(): Exercise {
    const instance = new ConcreteExercise()
    instance.name = this.name
    instance.isActive = this.isActive
    instance.problems = this.problems
    return instance
  }
}

class ConcreteExercise extends Exercise {
  toggleCollapse() {
    this.isActive = !this.isActive
  }
}

export interface Problem {
  pid: string

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

  description?: string

  isActive?: boolean
}
