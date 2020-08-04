import Joi from 'joi';

const email = Joi.string().email().required();

const message = 'must be between 6-16 characters, ' +
  'have at least one capital letter, ' +
  'one lowercase letter, one digit, ' +
  'and one special character';

const password = Joi.string()
  .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
  .options({
    language: {
      string: {
        regex: {
          base: message
        }
      }
    }
});

export const signIn = Joi.object().keys({
  email,
  password
});