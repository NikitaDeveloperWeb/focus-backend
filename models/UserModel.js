"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
//схема таблицы
var UserSchema = new mongoose_1.Schema({
    email: {
        unique: true,
        required: true,
        type: String,
    },
    fullname: {
        required: true,
        type: String,
    },
    username: {
        unique: true,
        required: true,
        type: String,
    },
    date: {
        required: true,
        type: String,
    },
    avatarUrl: {
        required: false,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    confirmHash: {
        required: true,
        type: String,
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
//скрытие из базы данных пароля и хеша
UserSchema.set('toJSON', {
    transform: function (_, obj) {
        delete obj.password;
        delete obj.confirmHash;
        return obj;
    },
});
exports.UserModel = mongoose_1.model('User', UserSchema);
