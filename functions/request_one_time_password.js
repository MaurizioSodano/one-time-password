const _ = require("./env");
const admin = require("firebase-admin");
const twilio = require(`./twilio`);

module.exports = function (req, res) {
  console.log(`req.body:${req.body}`);
  if (!req.body.phone) {
    return res.status(422).send({ error: `You must provide a phone number` });
  }

  //format the phone number to remove dashes and parens

  const phone = String(req.body.phone).replace(/[^\d+]/g, "");
  console.log(`phone:${phone}`);
  return admin
    .auth()
    .getUser(phone)
    .then((userRecord) => {
      console.log(`userRecord:${userRecord.uid}`);
      const code = Math.floor(Math.random() * 8999 + 1000);
      console.log(`code:${code}`);

      return twilio.messages.create(
        {
          body: `Your code is ${code}`,
          to: `${phone}`,
          from: `${process.env.TWILLIO_NUMBER}`,
        },
        (err) => {
          if (err) {
            res.status(422).send({ error: "not sended text message" });
          }
          admin
            .database()
            .ref(`users/${phone}`)
            .update({ code: code, codeValid: true }, () => {
              res.send({ success: true });
            });
        }
      );
    })
    .catch((err) => {
      console.log(err);
      res.status(422).send({ error: err });
    });
};
