import * as passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { getUserByEmail } from './helpers/users';
import { omitKeys } from '../utils/object-modifier';
import * as dotenv from 'dotenv';

dotenv.config();

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await getUserByEmail(payload.email);
        if (!user) {
          console.warn('User could not be found');
          return done(null, false);
        }
        return done(null, omitKeys(user, ['password']));
      } catch (err) {
        console.error(`Encountered an error authorizing user: ${err}`);
        return done(err, false);
      }
    }
  )
);

export default {
  passport,
};
