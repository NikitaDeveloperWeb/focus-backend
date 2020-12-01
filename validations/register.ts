import { body } from 'express-validator';

export const registerValidations = [
  body('email', 'Укажите E-mail')
    .isString()
    .isEmail()
    .withMessage('Неверный E-mail')
    .isLength({
      min: 10,
      max: 40,
    })
    .withMessage('Не верная длинна почтыю.Допустимое кол-во символов от 10 до 40.'),
  body('fullname', 'Введите имя')
    .isString()
    .isLength({
      min: 2,
      max: 40,
    })
    .withMessage('Не верная длинна имени.Допустимое кол-во символов от 2 до 40.'),
  body('username', 'Укажите логин')
    .isString()
    .isLength({
      min: 2,
      max: 40,
    })
    .withMessage('Не верная длинна логина.Допустимое кол-во символов от 2 до 40.'),
  body('date', 'Укажите дату').isString(),
  body('avatarUrl', 'Укажите ссылку на аватар').isString(),
  body('password', 'Укажите пароль')
    .isString()
    .isLength({
      min: 6,
    })
    .withMessage('Не верная длинна пароля.Миниму символов 6.')
    .custom((value, { req }) => {
      if (value != req.body.password2) {
        throw new Error('Пароли не совпадают');
      } else {
        return value;
      }
    }),
];
