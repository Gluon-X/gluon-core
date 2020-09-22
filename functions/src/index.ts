import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
const db = admin.initializeApp().firestore();
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const getQuiz = functions.https.onRequest(async(req,res)=>{
  try {
    let result = db.collection('').doc

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send();
  }
})
//this is the get all quiz


