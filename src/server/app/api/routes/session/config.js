import Joi from 'joi';

const username = {
  validate: {
    payload: {
      phone: Joi.string().required(),
    },
  },
  auth: false,
};

export default {
  username,
};
