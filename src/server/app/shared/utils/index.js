import bcrypt from 'bcrypt-nodejs';
import twilio from 'twilio';

export const ensureObjectExists = (obj, msg) => new Promise((resolve, reject) => {
  if (obj) {
    resolve(obj);
  } else {
    reject(msg || 'Expected object to exist');
  }
});

export const checkPasswordExists = (user) => new Promise((resolve, reject) => {
  if (user.password) {
    resolve(user.password);
  } else {
    reject('Password has not been set.');
  }
});

export const comparePassword = (providedPassword, storedPassword) => new Promise(
  (resolve, reject) => {
    bcrypt.compare(providedPassword, storedPassword, (err, res) => {
      if (!err) {
        resolve(res);
      } else {
        reject('Password does not match');
      }
    });
  });

export const generateSalt = new Promise((resolve, reject) => {
  bcrypt.genSalt(10, (err, res) => {
    if (!err) {
      resolve(res);
    } else {
      reject('Error generating salt...');
    }
  });
});

export const hashPassword = (nonHashed, salt) => new Promise((resolve, reject) => {
  bcrypt.hash(nonHashed, salt, null, (err, res) => {
    if (!err) {
      resolve(res);
    } else {
      reject('Error generating password');
    }
  });
});

export const sendSMS = (message, phoneNumber) => {
  const sendTwilioSMS = () => new Promise((resolve, reject) => {
    const twilioSID = process.env.TWILIO_SID;
    const twilioToken = process.env.TWILIO_AUTH_TOKEN;
    const client = new twilio(twilioSID, twilioToken);
    client.messages.create({
      body: message,
      to: `+1${phoneNumber}`,  // Text this number
      from: process.env.TWILIO_PHONE_NUMBER, // From a valid Twilio number
    })
    .then((message) => {
      console.log(message.sid);
      resolve();
    })
    .catch((err) => {
      console.log(err);
      reject(err);
    });
  });

  return sendTwilioSMS();
};
