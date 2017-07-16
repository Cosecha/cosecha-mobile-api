import Boom from 'boom';
import sessionStore from '../stores/sessionStore';
import userStore from '../stores/userStore';
import bcrypt from 'bcrypt-nodejs';
import { 
  comparePassword, 
  checkPasswordExists,
  sendSMS,
} from '../../shared/utils';

const sessionController = {
  createSession(req, reply) {
    console.log(req.payload);
    sendSMS('Cosecha Login Code: 1234', req.payload.phone)
      .then(() => reply().code(204))
      .catch((err) => reply(Boom.badRequest(err)));
  },
  deleteSession(req, reply) {
    reply('deleted session');
  },
};

const getUserIfPasswordMatches = (matches, username) => {
  if (matches) {
    return userStore.getUserByPhoneOrEmail(username);
  } else {
    throw new Error('Password does not match');
  }
};

const createSession = (user) => sessionStore.createSession(user);

export default sessionController;
