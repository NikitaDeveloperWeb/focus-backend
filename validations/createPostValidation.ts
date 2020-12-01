import {body} from 'express-validator';

export  const createPostValidations = [
  body('text','Введите текст')
  .isString()
  .withMessage('Неверный тип данных')
  .isLength({
    max:1000,
  }).withMessage('Допустимое кол-во символов от 0 до 1000.'),
  body('imageUrl','Введите путь')
  .isString()
  .withMessage('Неверный тип данных')
]