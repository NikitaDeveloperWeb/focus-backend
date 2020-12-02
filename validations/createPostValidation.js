"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostValidations = void 0;
var express_validator_1 = require("express-validator");
exports.createPostValidations = [
    express_validator_1.body('text', 'Введите текст')
        .isString()
        .withMessage('Неверный тип данных')
        .isLength({
        max: 1000,
    }).withMessage('Допустимое кол-во символов от 0 до 1000.'),
    express_validator_1.body('imageUrl', 'Введите путь')
        .isString()
        .withMessage('Неверный тип данных')
];
