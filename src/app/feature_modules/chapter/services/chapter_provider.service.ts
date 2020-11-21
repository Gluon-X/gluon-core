import { Injectable } from '@angular/core'
import { Chapter, Exercise } from '../models/interfaces'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment'
import { map } from 'rxjs/operators'
import { chapterFakeData, sampleExercises } from '../models/dummy_data'

// Doing the same as Minh
export const useServer = false

// The API will always return your data in this manner
interface ChapterResponse {
  data: []
}

export interface ExercisePickable {
  qid?: string

  exercises: Exercise[]
}

@Injectable()
export class ChaptersHandler implements ExercisePickable {
  public qid?: string

  exercises: Exercise[] = sampleExercises

  constructor(private _http: HttpClient) {}

  private _cid?: string

  private _description?: string

  private _name?: string

  private _thumbnailURL?: string

  private _relatedResources?: []

  private _questions?: []

  private _gradeId?: string

  // SETTER

  // Set the chapter id and get the chapter from server cloud function
  set cid(value: string) {
    if (this._cid === value) {
      return
    }
    this._cid = value
    if (useServer) {
      this._http
        .get<ChapterResponse>(`${environment.serverAPI}/api/v1/chapters`)
        .pipe(
          map((data) => data),
          map((v) => v[0])
        )
        .toPromise()
        .then((v) => this.parse(v))
        .catch(console.error)
    } else {
      this.parse(chapterFakeData)
    }
  }

  // GETTER
  get cid() {
    return this._cid
  }

  get name() {
    return this._name
  }

  get thumbnailURL() {
    return this._thumbnailURL
  }

  get questions() {
    return this._questions
  }

  get description() {
    return this._description
  }

  // TODO: Should check gradeId if it is showable or not
  // If not then return something that legit for fontend not to render it
  get gradeId() {
    return this._gradeId
  }

  get relatedResources() {
    return this._relatedResources
  }

  // Parsing the http request to properties of Chapter
  private parse(chapter: Chapter) {
    this._name = chapter.name
    this._description = chapter.description
    this._thumbnailURL = chapter.thumbnailURL
    this._relatedResources = chapter.relatedResources
    this._questions = chapter.questions
    this._gradeId = chapter.gradeId
  }
}
