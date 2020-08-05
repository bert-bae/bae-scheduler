import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import DynamoClient from '../clients/dynamodb';
import { createUserParams, getUserByEmail } from './helpers/users';
import { pickKeys } from '../utils/object-modifier';
import { UserType } from '../types/data-model';

dotenv.config();

const saltRounds = 8;

const login = async (req, res, next) => {
  const { email, password } = req.body;

  // TODO: Compare hashed bcrypt password for auth
};

const createUser = async (req, res, next) => {
  const { email, password, firstName, lastName } = <UserType>req.body;
  try {
    await DynamoClient.create(
      createUserParams({
        email,
        firstName,
        lastName,
        password: await bcrypt.hash(password, saltRounds),
      })
    );

    console.log(`User created with email: ${email}`);

    res.status(200).json({});
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const authenticateUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    const verified = user && (await bcrypt.compare(password, user.password));

    if (!verified) {
      res.status(403).json({
        error: 'Password is incorrect',
      });
      return;
    }

    res.status(200).json({
      token: jwt.sign(
        pickKeys(user, ['userId', 'email']),
        process.env.JWT_SECRET
      ),
    });
  } catch (err) {
    console.error(`Encountered an error fetching user data: ${err}`);
    res.status(500).json({
      error: err,
    });
  }
};

export default {
  login,
  createUser,
  authenticateUser,
};
