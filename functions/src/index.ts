import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as express from 'express'
import * as bodyParser from 'body-parser'

// App routes
import { appRoutes } from './routes/app.routes'

const PORT = process.env.PORT || 3000

// Connect with firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: 'https://enq-mobile.firebaseio.com',
})

// Express app
class ExpressApp {
  public app: express.Application

  constructor() {
    this.app = express()
    this._init()
  }

  // Init configs
  private _init() {
    // tslint:disable-next-line: deprecation
    this.app.use(bodyParser.json())
    // tslint:disable-next-line: deprecation
    this.app.use(bodyParser.urlencoded({ extended: false }))
  }
}

const app = new ExpressApp().app

// Use app routes
app.use('/api/v1', appRoutes)

// Listen Express app
app.listen(PORT, () => console.log(`server running on port ${PORT}`))

export const gluonApi = functions.https.onRequest(app)
