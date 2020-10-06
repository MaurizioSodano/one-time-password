const admin =require("firebase-admin");

module.exports = function (req, res) {
  if (!req.body.phone || !req.body.code) {
    return res.status(422).send({ error: `Phone and code must be provided` });
  }

  const phone = String(req.body.phone).replace(/[^\d+]/g, "");
  console.log(`phone:${phone}`);
  const code = parseInt(req.body.code);
  console.log(`code:${code}`);

  return (
    admin
      .auth()
      .getUser(phone)

      // eslint-disable-next-line promise/always-return
      .then(() => {
        const ref = admin.database().ref(`users/${phone}`);
        ref.on(`value`, (snapshot) => {
          ref.off();
          const user = snapshot.val();
          console.log(`user.code:${user.code}`);
          console.log(`user.codeValid:${user.codeValid}`);
          if (user.code !== code || !user.codeValid) {
            return res.status(422).send({ error: "Code not valid!" });
          }
          ref.update({ codeValid: false });

          admin
            .auth()
            .createCustomToken(phone)
            .then((token) => res.send({ token: token }))
            .catch((err) => res.status(422).send({ error: err }));
        });
      })
      .catch((err) => res.status(422).send({ error: err }))
  );
};
