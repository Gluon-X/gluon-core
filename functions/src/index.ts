import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as serviceAccount from './configs/config'

// App routes
const appRoutes = require('./routes/app.routes')
import * as cors from 'cors'

const PORT = process.env.PORT || 3001

// Connect with firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount.default as admin.ServiceAccount),
  databaseURL: 'https://enq-mobile.firebaseio.com'
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

    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(cors)
  }
}

const app = new ExpressApp().app

app.get('/', (req: any, res: any) => {
  res.send('<h1>Can do </h1>')
})
// Use app routes
// Why this isn't work
app.use('/api/v1/something', appRoutes)

// Listen Express app
app.listen(PORT, () => console.log(`server running on port ${PORT}`))

export const gluonApi = functions.https.onRequest(app)
