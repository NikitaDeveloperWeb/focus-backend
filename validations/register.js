"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidations = void 0;
var express_validator_1 = require("express-validator");
exports.registerValidations = [
    express_validator_1.body('email', 'Укажите E-mail')
        .isString()
        .isEmail()
        .withMessage('Неверный E-mail')
        .isLength({
        min: 10,
        max: 40,
    })
        .withMessage('Не верная длинна почтыю.Допустимое кол-во символов от 10 до 40.'),
    express_validator_1.body('fullname', 'Введите имя')
        .isString()
        .isLength({
        min: 2,
        max: 40,
    })
        .withMessage('Не верная длинна имени.Допустимое кол-во символов от 2 до 40.'),
    express_validator_1.body('username', 'Укажите логин')
        .isString()
        .isLength({
        min: 2,
        max: 40,
    })
        .withMessage('Не верная длинна логина.Допустимое кол-во символов от 2 до 40.'),
    express_validator_1.body('date', 'Укажите дату').isString(),
    express_validator_1.body('avatarUrl', 'Укажите ссылку на аватар').isString(),
    express_validator_1.body('password', 'Укажите пароль')
        .isString()
        .isLength({
        min: 6,
    })
        .withMessage('Не верная длинна пароля.Миниму символов 6.')
        .custom(function (value, _a) {
        var req = _a.req;
        if (value != req.body.password2) {
            throw new Error('Пароли не совпадают');
        }
        else {
            return value;
        }
    }),
];
