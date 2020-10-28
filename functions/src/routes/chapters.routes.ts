import {Router} from 'express'


class ChapterRoute{
  public routes : Router
  constructor(){
    this.routes = Router()
  }

}
export const chapterRoutes = new ChapterRoute().routes
