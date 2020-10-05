const admin =require("firebase-admin");
const functions = require('firebase-functions');
const createUser=require("./create-user");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.region('europe-west1').https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

var serviceAccount = require("./service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://one-time-password-8f741.firebaseio.com"
});
exports.createUser=functions.region('europe-west1').https.onRequest(createUser);