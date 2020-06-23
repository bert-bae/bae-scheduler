import * as passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { getUserById } from './helpers/users';
import * as dotenv from 'dotenv';

dotenv.config();

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'local-development-jwt-secret',
    },
    async function (payload, done) {
      try {
        const user = await getUserById(payload.userId);
        if (!user) {
          console.warn('User could not be found');
          return done(null, false);
        }
        return done(null, {
          userId: user.userId,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          verified: user.verified,
        });
      } catch (err) {
        console.error(`Encountered an error authorizing user: ${err}`);
        return done(err, false);
      }
    }
  )
);

export default passport;
