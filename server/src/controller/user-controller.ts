import * as bcrypt from 'bcrypt';
import * as passport from 'passport';
import { v4 as uuidv4 } from 'uuid';

import DynamoClient from '../clients/dynamodb';
import { createUserParams, getUser } from './helpers/user';
import { omitKeys } from '../utils/object-modifier';

const saltRounds = 8;

const login = async (req, res, next) => {
  const { email, password } = req.body;

  // TODO: Compare hashed bcrypt password for auth
};

const createUser = async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;
  console.log(
    createUserParams({
      userId: uuidv4(),
      email,
      firstName,
      lastName,
      password: await bcrypt.hash(password, saltRounds),
    })
  );
  try {
    await DynamoClient.create(
      createUserParams({
        userId: uuidv4(),
        email,
        firstName,
        lastName,
        password: await bcrypt.hash(password, saltRounds),
      })
    );

    console.log(`User created with email: ${email}`);

    res.status(200).send({
      success: true,
    });
  } catch (err) {
    res.status(500).send({
      error: err,
    });
  }
};

const verifyUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await getUser(email);
    const verified = user && (await bcrypt.compare(password, user.password));

    if (!verified) {
      res.status(403).send({
        error: 'Password is incorrect',
      });
      return;
    }

    res.status(200).send({
      success: true,
      data: omitKeys(user, ['password']),
    });
  } catch (err) {
    console.error(`Encountered an error fetching user data: ${err}`);
    res.status(500).send({
      error: err,
    });
  }
};

export default {
  login,
  createUser,
  verifyUser,
};
