import {body} from 'express-validator';

export  const updatePostValidations = [
  body('text','Введите текст')
  .isString()
  .withMessage('Неверный тип данных')
  .isLength({
    max:1000,
  }).withMessage('Не верная длинна почтыю.Допустимое кол-во символов от 0 до 1000.'),
]