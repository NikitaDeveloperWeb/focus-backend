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
const app = express();
//for request axios in frontend
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Origin', 'https://focus-front.herokuapp.com/'); // update to match the domain you will make the request from
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization ',
  );
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS,DELETE');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

//app start
app.use(express.json());
//initial passport
app.use(passport.initialize());

//route

//get list users
app.get('/users', UserCtrl.index);

//auth with token
app.get('/users/me', passport.authenticate('jwt', { session: false }), UserCtrl.getUserInfo);

//get one user
app.get('/users/:id', UserCtrl.show);

//get one user
app.patch('/edit/user/:id', passport.authenticate('jwt'), UserCtrl.update);

//get posts
app.get('/posts', PostCtrl.index);

//get post
app.get('/post/:id', PostCtrl.show);

//create posts
app.post('/post', passport.authenticate('jwt'), createPostValidations, PostCtrl.create);

//update posts
app.patch('/post/:id', passport.authenticate('jwt'), updatePostValidations, PostCtrl.update);

//delete post
app.delete('/post/:id', passport.authenticate('jwt'), PostCtrl.delete);

//verify user
app.get('/auth/verify', registerValidations, UserCtrl.verify);

//registry
app.post('/auth/register', registerValidations, UserCtrl.create);

//auth user
app.post('/auth/login', passport.authenticate('local'), UserCtrl.afterLogin);
//logout
app.get('/logout', function (req: express.Request, res: express.Response) {
  req.logOut();
  res.redirect('/');
  console.log('logout');
});

//проверка ошибки
app.listen(process.env.PORT, (): void => {
  console.log('SERVER RUNNING!');
});
