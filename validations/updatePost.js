"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostValidations = void 0;
var express_validator_1 = require("express-validator");
exports.updatePostValidations = [
    express_validator_1.body('text', 'Введите текст')
        .isString()
        .withMessage('Неверный тип данных')
        .isLength({
        max: 1000,
    }).withMessage('Не верная длинна почтыю.Допустимое кол-во символов от 0 до 1000.'),
];
