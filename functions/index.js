const _ = require("./env");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const createUser = require("./create-user");
const serviceAccount = require("./service-account.json");

const requestOneTimePassword = require("./request_one_time_password");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.region('europe-west1').https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
});

exports.createUser = functions
  .region("europe-west3")
  .https.onRequest(createUser);

exports.requestOneTimePassword = functions
  .region("europe-west3")
  .https.onRequest(requestOneTimePassword);
