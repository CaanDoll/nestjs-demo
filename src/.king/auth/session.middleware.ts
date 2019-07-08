import * as passport from 'passport';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
const RedisStore = connectRedis(session);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser(async (user, done) => {
  try {
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export const sessionMiddlewares = redisConfig => {
  const store = new RedisStore(redisConfig);
  return [
    session({
      store,
      name: "opsid",
      secret: 'kunlun-session-secret',
      resave: false,
      saveUninitialized: true,
    }),
    passport.initialize(),
    passport.session(),
  ]
};

