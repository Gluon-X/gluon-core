import { Injectable, InjectionToken } from '@angular/core'
import { isNull } from 'src/app/shared'
import { Chapter } from '../models/interfaces'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment'
import { map } from 'rxjs/operators'
import {chapterFakeData} from '../models/dummy_data'

// Doing the same as Minh
export const useServer = true

// The API will always return your data in this manner
interface ChapterResponse {
  data: []
}

@Injectable()
export class ChaptersHandler {
  constructor(private _http: HttpClient) {}

  private _cid: string = undefined
  private _description? : string = undefined
  private _name?: string = undefined
  private _thumbnailURL?: string = undefined
  private _relatedResources?: [] = undefined
  private _questions : [] = undefined
  private _gradeId: string = undefined
  private _path: string = undefined

  // SETTER

  // Set the chapter id and get the chapter from server cloud function
  set cid(value: string) {
    if (this._cid == value) {
      return
    }
    this._cid = value
    if (useServer) {
      this._http
        .get<ChapterResponse>(`{environment.serverAPI}/api/v1/chapters`)
        .pipe(
          map((data) => data),
          map((v) => v[0])
        )
        .toPromise()
        .then((v) => this.parse(v))
        .catch(console.error)
    }else{
      this.parse(chapterFakeData)
    }
  }

  // GETTER

  get cid(){
    return this._cid
  }

  get name(){
    return this._name
  }

  get thumbnailURL(){
    return this._thumbnailURL
  }

  get questions(){
    return this._questions
  }

  get description(){
    return this._description
  }

  // TODO: Should check gradeId if it is showable or not
  // If not then return something that legit for fontend not to render it
  get gradeId(){
    return this._gradeId
  }
  get relatedResources(){
    return this._relatedResources
  }

  get path(){
    return this._path
  }

  // Parsing the http request to properties of Chapter
  private parse(chapter: Chapter) {
    console.log("Parsing works!")
    const path = chapter.name + "/" + chapter.gradeId
    this._name = chapter.name
    this._description = chapter.description
    this._thumbnailURL = chapter.thumbnailURL
    this._relatedResources = chapter.relatedResources
    this._questions = chapter.questions
    this._gradeId = chapter.gradeId

    // Parsing path for Minh
    // The path is "lop1"+"/"+"chuong1" lop1/chuong1
    // Path for angular routing

    this._path = path
  }
}
