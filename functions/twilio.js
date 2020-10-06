const _ = require( './env');
const twilio=require(`twilio`);

const accountSid=process.env.TWILLIO_SID;
const authToken=process.env.TWILLIO_TOKEN;


module.exports =new twilio.Twilio(accountSid,authToken);


