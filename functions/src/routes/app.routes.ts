import { Router } from 'express'

class AppRoutes {
  public routes: Router
  constructor() {
    this.routes = Router()
    this._init()
  }

  private _init() {}
}

export const appRoutes = new AppRoutes().routes
