import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { UserModel, UserModelInterface } from '../models/UserModel';
import { generateMD5 } from '../utils/generateHash';

passport.use(
  new LocalStrategy(
    async (username: string, password: string, done): Promise<void> => {
      try {
        const user = await UserModel.findOne({ $or: [{ email: username }, { username }] }).exec();
        //первая проверка
        if (!user) {
          return done(null, false);
        }
        //вторая проверка - проверка совпадания пароля
        if (user.password === generateMD5(password + process.env.SECRET_KEY)) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (error) {
        done(error, false);
      }
    },
  ),
);

passport.use(
  new JwtStrategy(
    {
      secretOrKey: process.env.SECRET_KEY || '123',
      jwtFromRequest: ExtractJwt.fromHeader('token'),
    },
    async (payload: { data: UserModelInterface }, done): Promise<void> => {
      try {
        const user = await UserModel.findById(payload.data._id).exec();

        if (user) {
          return done(null, user);
        }
        done(null, false);
      } catch (error) {
        done(error, false);
      }
    },
  ),
);

//преобразование пользователя в "объект",который мы будем получать
passport.serializeUser((user: UserModelInterface, done) => {
  done(null, user?._id);
});
//входе полученного объекта проверяет id
//и если id найден вернет пользователя иначе ошибку
passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err, user) => {
    done(err, user);
  });
});

export { passport };
