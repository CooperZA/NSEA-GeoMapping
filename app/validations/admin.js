const Joi = require('joi');

const Username = Joi.string().alphanum().min(3).max(30).required();

const message = 'must be between 6-16 characters, ' +
  'have at least one capital letter, ' +
  'one lowercase letter, one digit, ' +
  'and one special character';

const Password = Joi.string()
  .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/)
  .options({
    language: {
      string: {
        regex: {
          base: message
        }
      }
    }
  });

module.exports = {
  signUp: Joi.object().keys({
    Username,
    Password
  }),
  signIn: Joi.object().keys({
    Username,
    Password
  })
}

// export const signUp = Joi.object().keys({
//   Username,
//   Password
// });

// export const signIn = Joi.object().keys({
//   Username,
//   Password
// });