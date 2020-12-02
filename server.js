"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//import express
var express = require("express");
//констроллеры
var UserController_1 = require("./controllers/UserController");
var PostController_1 = require("./controllers/PostController");
//бд
require("./core/db");
//fuction for auth
var passport_1 = require("./core/passport");
//валидаторы
var createPostValidation_1 = require("./validations/createPostValidation");
var register_1 = require("./validations/register");
var updatePost_1 = require("./validations/updatePost");
//init express
var cors = require('cors');
var app = express();
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
    optionsSuccessStatus: 200,
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
app.use(passport_1.passport.initialize());
//route
//get list users
app.get('/users', cors(corsOptions), UserController_1.UserCtrl.index);
//auth with token
app.get('/users/me', passport_1.passport.authenticate('jwt', { session: false }), cors(corsOptions), UserController_1.UserCtrl.getUserInfo);
//get one user
app.get('/users/:id', cors(corsOptions), UserController_1.UserCtrl.show);
//get one user
app.patch('/edit/user/:id', passport_1.passport.authenticate('jwt'), cors(corsOptions), UserController_1.UserCtrl.update);
//get posts
app.get('/posts', cors(corsOptions), PostController_1.PostCtrl.index);
//get post
app.get('/post/:id', cors(corsOptions), PostController_1.PostCtrl.show);
//create posts
app.post('/post', passport_1.passport.authenticate('jwt'), cors(corsOptions), cors(corsOptions), createPostValidation_1.createPostValidations, PostController_1.PostCtrl.create);
//update posts
app.patch('/post/:id', passport_1.passport.authenticate('jwt'), cors(corsOptions), updatePost_1.updatePostValidations, PostController_1.PostCtrl.update);
//delete post
app.delete('/post/:id', passport_1.passport.authenticate('jwt'), cors(corsOptions), PostController_1.PostCtrl.delete);
//verify user
app.get('/auth/verify', register_1.registerValidations, cors(corsOptions), UserController_1.UserCtrl.verify);
//registry
app.post('/auth/register', register_1.registerValidations, cors(corsOptions), UserController_1.UserCtrl.create);
//auth user
app.post('/auth/login', passport_1.passport.authenticate('local'), cors(corsOptions), UserController_1.UserCtrl.afterLogin);
//logout
app.get('/logout', cors(corsOptions), function (req, res) {
    req.logOut();
    res.redirect('/');
    console.log('logout');
});
//проверка ошибки
app.listen(process.env.PORT, function () {
    console.log('SERVER RUNNING!');
});
