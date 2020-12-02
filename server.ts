import dotenv from 'dotenv';
dotenv.config();
//import express
import express = require('express');
//констроллеры
import { UserCtrl } from './controllers/UserController';
import { PostCtrl } from './controllers/PostController';
//бд
import './core/db';
//fuction for auth
import { passport } from './core/passport';
//валидаторы
import { createPostValidations } from './validations/createPostValidation';
import { registerValidations } from './validations/register';
import { updatePostValidations } from './validations/updatePost';

//init express
var cors = require('cors');
const app = express();
//use cors
app.use(cors());
//for request axios in frontend
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization ',
//   );
//   res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS,DELETE');
//   res.header('Access-Control-Allow-Headers', '*');
//   next();
// });
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'Authorization',
    'Content-Type',
    'X-Requested-With',
    'Access-Control-Allow-Headers',
  ],
};
//app start
app.use(express.json());
//initial passport
app.use(passport.initialize());

//route

//get list users
app.get('/users', cors(corsOptions), UserCtrl.index);

//auth with token
app.get(
  '/users/me',
  passport.authenticate('jwt', { session: false }),
  cors(corsOptions),
  UserCtrl.getUserInfo,
);

//get one user
app.get('/users/:id', cors(corsOptions), UserCtrl.show);

//get one user
app.patch('/edit/user/:id', passport.authenticate('jwt'), cors(corsOptions), UserCtrl.update);

//get posts
app.get('/posts', cors(corsOptions), PostCtrl.index);

//get post
app.get('/post/:id', cors(corsOptions), PostCtrl.show);

//create posts
app.post(
  '/post',
  passport.authenticate('jwt'),
  cors(corsOptions),
  cors(corsOptions),
  createPostValidations,
  PostCtrl.create,
);

//update posts
app.patch(
  '/post/:id',
  passport.authenticate('jwt'),
  cors(corsOptions),
  updatePostValidations,
  PostCtrl.update,
);

//delete post
app.delete('/post/:id', passport.authenticate('jwt'), cors(corsOptions), PostCtrl.delete);

//verify user
app.get('/auth/verify', registerValidations, cors(corsOptions), UserCtrl.verify);

//registry
app.post('/auth/register', registerValidations, cors(corsOptions), UserCtrl.create);

//auth user
app.post('/auth/login', passport.authenticate('local'), cors(corsOptions), UserCtrl.afterLogin);
//logout
app.get('/logout', cors(corsOptions), function (req: express.Request, res: express.Response) {
  req.logOut();
  res.redirect('/');
  console.log('logout');
});

//проверка ошибки
app.listen(process.env.PORT, (): void => {
  console.log('SERVER RUNNING!');
});
