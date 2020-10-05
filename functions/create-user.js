const admin =require("firebase-admin");

module.exports = (req, res) => {
  //verify the user provided a phone
 
  if (!req.body.phone) {
      return res.status(422).send({error:`Bad Input`});
  }


  //format the phone number to remove dashes and parens

  const phone=String(req.body.phone).replace(/[^\d]/g,"");

  //Create a new user using phone number

  admin.auth().createUser({ uid:phone})
    .then(user=>res.send(user))
    .catch(err=>res.status(422).send({error:err}));

  //Respond to the user request, saying the account was made
  //return res.send(req.body);

};
