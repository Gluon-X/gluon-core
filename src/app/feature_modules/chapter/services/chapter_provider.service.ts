import { Injectable } from '@angular/core'
import { Exercise } from '../models/interfaces'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment'
import { map } from 'rxjs/operators'
import { sampleExercises } from '../models/dummy_data'

// Doing the same as Minh
export const useServer = false

// The API will always return your data in this manner
interface ChapterResponse {
  data: Exercise[]
}

export interface ExercisePickable {
  qid?: string

  exercises: Exercise[]
}

@Injectable()
export class ChaptersHandler implements ExercisePickable {
  public qid?: string

  // public qid?= "GID11060001"

  // TODO load & parse exercises data here
  private _exercises?: Exercise[]

  get exercises(): Exercise[] {
    return this._exercises
  }

  constructor(private _http: HttpClient) {
  }

  private _cid?: string

  // private _description?: string

  // private _name?: string

  // private _thumbnailURL?: string

  // private _relatedResources?: []

  // private _questions?: []

  // private _gradeId?: string

  // private _path: string

  private _isProcessing = false

  get isProcessing(): boolean {
    return this._isProcessing
  }

  // Set the chapter id and get the chapter from server cloud function
  set cid(value: string) {
    this._exercises = undefined
    this._isProcessing = true

    if (this._cid === value) {
      return
    }
    this._cid = value
    if (useServer) {
      this._http
        .get<ChapterResponse>(`${environment.serverAPI}/api/v1/exercises/Hello`)
        .pipe(
          map((data) => data.data),
          map((exercise) =>
            exercise.map((v) => {
              const builder = Exercise.builder()
                .setName(v.name)
                .setActive(true)

              v.questions.forEach((p) => {
                builder.addProblem(p)
              })

              return builder.build()
            })
          )
        )
        .toPromise()
        .then((v) => this.parse(v))
        .catch(console.error)
        .finally(() => {
          this._isProcessing = false
        })
    } else {
      setTimeout(() => {
        this._exercises = sampleExercises[value]
        this._isProcessing = false
      }, 1500)
    }
  }

  // GETTER
  get cid() {
    return this._cid
  }

  private parse(value: Exercise[]) {
    this._exercises = value
  }

  // get name() {
  //   return this._name
  // }

  // get thumbnailURL() {
  //   return this._thumbnailURL
  // }

  // get questions() {
  //   return this._questions
  // }

  // get description() {
  //   return this._description
  // }

  // TODO: Should check gradeId if it is showable or not
  // If not then return something that legit for fontend not to render it
  // get gradeId() {
  //   return this._gradeId
  // }

  // get relatedResources() {
  //   return this._relatedResources
  // }

  // get path() {
  //   return this._path
  // }

  // Parsing the http request to properties of Chapter
  // private parse(chapter: Chapter) {
  //   console.log('Parsing works!')
  //   const path = chapter.name + '/' + chapter.gradeId
  //   this._name = chapter.name
  //   this._description = chapter.description
  //   this._thumbnailURL = chapter.thumbnailURL
  //   this._relatedResources = chapter.relatedResources
  //   this._questions = chapter.questions
  //   this._gradeId = chapter.gradeId

  //   // Parsing path for Minh
  //   // The path is "lop1"+"/"+"chuong1" lop1/chuong1
  //   // Path for angular routing

  //   this._path = path
  // }
}
