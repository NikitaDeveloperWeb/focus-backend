import express = require('express');
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { UserModel, UserModelDocumentInterface, UserModelInterface } from '../models/UserModel';
import { generateMD5 } from '../utils/generateHash';
import { isValidObjectId } from '../utils/isValidObjectId';
import { sendEmail } from '../utils/sendEmail';

//controller user
class UserController {
  //первый метод
  //функция является асинхронной
  //получение всех пользователей
  async index(_: any, res: express.Response): Promise<void> {
    try {
      const users = await UserModel.find({}).exec();

      res.json(users);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        massages: JSON.stringify(error),
      });
    }
  }

  //второй метод регистрации
  async create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ status: 'error', errors: errors.array() });
        return;
      }
      const data: UserModelInterface = {
        email: req.body.email,
        username: req.body.username,
        fullname: req.body.fullname,
        date: req.body.date,
        avatarUrl: req.body.avatarUrl,
        //шифрование пароля с помощью md5 и секретного ключа так,как md5 легко расшивровать
        password: generateMD5(req.body.password + process.env.SECRET_KEY),
        //генерация хеша с помощью md5
        confirmHash: generateMD5(process.env.SECRET_KEY || Math.random().toString()),
      };
      const user = await UserModel.create(data);
      console.log(data);
      res.json({
        status: 'success',
        data: user,
      });
      sendEmail(
        {
          emailFrom: 'admin@focus.com',
          emailTo: data.email,
          subject: 'Подтверждение почты Focus',
          html: `Для того, чтобы подтвердить почту, перейдите 
             <a href="http://localhost:${process.env.PORT || 8888}/auth/verify?hash=${
            data.confirmHash
          }">по этой ссылке</a>`,
        },
        (err: Error | null) => {
          if (err) {
            res.status(500).json({
              status: 'error',
              massages: err,
            });
          } else {
            res.status(201).json({
              status: 'success',
              data: user,
            });
          }
        },
      );
    } catch (error) {
      res.status(500).json({
        status: 'error',
        massages: JSON.stringify(error),
      });
    }
  }

  //третий метод - верификация
  async verify(req: any, res: express.Response): Promise<void> {
    try {
      const hash = req.query.hash;

      if (!hash) {
        res.status(400).send();
        return;
      }

      const user = await UserModel.findOne({ confirmHash: hash }).exec();

      if (user) {
        user.confirmed = true;
        user.save();
        res.json({
          status: 'success',
        });
      } else {
        res.status(404).send({ status: 'error', message: 'Пользователь не найден' });
      }
    } catch (error) {
      res.status(500).json({
        status: 'error',
        massages: JSON.stringify(error),
      });
    }
  }

  //метод четыре
  //получение одного польтзователя по id
  async show(req: any, res: express.Response): Promise<void> {
    try {
      const userID = req.params.id;
      //проверка на валидность id
      if (!isValidObjectId(userID)) {
        res.status(400).send();
        return;
      }

      const user = await UserModel.findById(userID).exec();

      //проверка на существование пользователя по этому id
      if (!user) {
        res.status(404).send();
        return;
      }
      res.json({
        status: 'success',
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        massages: JSON.stringify(error),
      });
    }
  }
  //метод 5
  //создание токена
  async afterLogin(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user ? (req.user as UserModelDocumentInterface).toJSON() : undefined;
      res.json({
        status: 'success',
        data: {
          ...user,
          token: jwt.sign({ data: req.user }, process.env.SECRET_KEY || '123', {
            expiresIn: '30 days',
          }),
        },
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        massages: JSON.stringify(error),
      });
    }
  }
  //метод 6
  //получение информации об определенном пользователе
  async getUserInfo(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user ? (req.user as UserModelDocumentInterface).toJSON() : undefined;
      res.json({
        status: 'success',
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        massages: JSON.stringify(error),
      });
    }
  }

  //update user
  async update(req: express.Request, res: express.Response): Promise<void> {
    const user = req.user as UserModelInterface;

    try {
      if (user) {
        const userId = req.params.id;
        //проверка на валидность id
        if (!isValidObjectId(userId)) {
          res.status(400).send();
          return;
        }
        const userMod = await UserModel.findById(userId);
        if (userMod) {
          if (String(userMod._id) === String(user._id)) {
            userMod.avatarUrl = req.body.avatarUrl;
            userMod.username = req.body.username;
            userMod.fullname = req.body.fullname;
            userMod.date = req.body.date;
            userMod?.save();
            res.send();
          } else {
            res.status(403).send();
          }
        }
      } else {
        res.status(404).send();
      }
    } catch (error) {
      res.status(500).json({
        status: 'error',
        massages: JSON.stringify(error),
      });
    }
  }
}
export const UserCtrl = new UserController();
