import * as bcrypt from 'bcrypt';
import * as passport from 'passport';
import { v4 as uuidv4 } from 'uuid';

import { create, get } from '../clients/dynamodb';
import { createUserParams, getUserParams } from './helpers/user';

const saltRounds = 8;

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  // TODO: Compare hashed bcrypt password for auth
};

export const createUser = async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;

  await create(
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
};

export const verifyUser = async (req, res, next) => {
  // TODO: Send email to verify user creation
  const { email, password } = req.body;

  try {
    const user = await get(getUserParams(email, password));
    console.log(user);
  } catch (err) {
    console.error(`Encountered an error fetching user data: ${err}`);
  }
};
