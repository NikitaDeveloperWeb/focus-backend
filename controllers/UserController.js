"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCtrl = void 0;
var express_validator_1 = require("express-validator");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var UserModel_1 = require("../models/UserModel");
var generateHash_1 = require("../utils/generateHash");
var isValidObjectId_1 = require("../utils/isValidObjectId");
var sendEmail_1 = require("../utils/sendEmail");
//controller user
var UserController = /** @class */ (function () {
    function UserController() {
    }
    //первый метод
    //функция является асинхронной
    //получение всех пользователей
    UserController.prototype.index = function (_, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, UserModel_1.UserModel.find({}).exec()];
                    case 1:
                        users = _a.sent();
                        res.json(users);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        res.status(500).json({
                            status: 'error',
                            massages: JSON.stringify(error_1),
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //второй метод регистрации
    UserController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, data, user_1, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        errors = express_validator_1.validationResult(req);
                        if (!errors.isEmpty()) {
                            res.status(400).json({ status: 'error', errors: errors.array() });
                            return [2 /*return*/];
                        }
                        data = {
                            email: req.body.email,
                            username: req.body.username,
                            fullname: req.body.fullname,
                            date: req.body.date,
                            avatarUrl: req.body.avatarUrl,
                            //шифрование пароля с помощью md5 и секретного ключа так,как md5 легко расшивровать
                            password: generateHash_1.generateMD5(req.body.password + process.env.SECRET_KEY),
                            //генерация хеша с помощью md5
                            confirmHash: generateHash_1.generateMD5(process.env.SECRET_KEY || Math.random().toString()),
                        };
                        return [4 /*yield*/, UserModel_1.UserModel.create(data)];
                    case 1:
                        user_1 = _a.sent();
                        console.log(data);
                        res.json({
                            status: 'success',
                            data: user_1,
                        });
                        sendEmail_1.sendEmail({
                            emailFrom: 'admin@focus.com',
                            emailTo: data.email,
                            subject: 'Подтверждение почты Focus',
                            html: "\u0414\u043B\u044F \u0442\u043E\u0433\u043E, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u043F\u043E\u0447\u0442\u0443, \u043F\u0435\u0440\u0435\u0439\u0434\u0438\u0442\u0435 \n             <a href=\"http://localhost:" + (process.env.PORT || 8888) + "/auth/verify?hash=" + data.confirmHash + "\">\u043F\u043E \u044D\u0442\u043E\u0439 \u0441\u0441\u044B\u043B\u043A\u0435</a>",
                        }, function (err) {
                            if (err) {
                                res.status(500).json({
                                    status: 'error',
                                    massages: err,
                                });
                            }
                            else {
                                res.status(201).json({
                                    status: 'success',
                                    data: user_1,
                                });
                            }
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        res.status(500).json({
                            status: 'error',
                            massages: JSON.stringify(error_2),
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //третий метод - верификация
    UserController.prototype.verify = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var hash, user, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        hash = req.query.hash;
                        if (!hash) {
                            res.status(400).send();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, UserModel_1.UserModel.findOne({ confirmHash: hash }).exec()];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            user.confirmed = true;
                            user.save();
                            res.json({
                                status: 'success',
                            });
                        }
                        else {
                            res.status(404).send({ status: 'error', message: 'Пользователь не найден' });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        res.status(500).json({
                            status: 'error',
                            massages: JSON.stringify(error_3),
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //метод четыре
    //получение одного польтзователя по id
    UserController.prototype.show = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userID, user, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userID = req.params.id;
                        //проверка на валидность id
                        if (!isValidObjectId_1.isValidObjectId(userID)) {
                            res.status(400).send();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, UserModel_1.UserModel.findById(userID).exec()];
                    case 1:
                        user = _a.sent();
                        //проверка на существование пользователя по этому id
                        if (!user) {
                            res.status(404).send();
                            return [2 /*return*/];
                        }
                        res.json({
                            status: 'success',
                            data: user,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        res.status(500).json({
                            status: 'error',
                            massages: JSON.stringify(error_4),
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //метод 5
    //создание токена
    UserController.prototype.afterLogin = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                try {
                    user = req.user ? req.user.toJSON() : undefined;
                    res.json({
                        status: 'success',
                        data: __assign(__assign({}, user), { token: jsonwebtoken_1.default.sign({ data: req.user }, process.env.SECRET_KEY || '123', {
                                expiresIn: '30 days',
                            }) }),
                    });
                }
                catch (error) {
                    res.status(500).json({
                        status: 'error',
                        massages: JSON.stringify(error),
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    //метод 6
    //получение информации об определенном пользователе
    UserController.prototype.getUserInfo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                try {
                    user = req.user ? req.user.toJSON() : undefined;
                    res.json({
                        status: 'success',
                        data: user,
                    });
                }
                catch (error) {
                    res.status(500).json({
                        status: 'error',
                        massages: JSON.stringify(error),
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    //update user
    UserController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, userId, userMod, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = req.user;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (!user) return [3 /*break*/, 3];
                        userId = req.params.id;
                        //проверка на валидность id
                        if (!isValidObjectId_1.isValidObjectId(userId)) {
                            res.status(400).send();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, UserModel_1.UserModel.findById(userId)];
                    case 2:
                        userMod = _a.sent();
                        if (userMod) {
                            if (String(userMod._id) === String(user._id)) {
                                userMod.avatarUrl = req.body.avatarUrl;
                                userMod.username = req.body.username;
                                userMod.fullname = req.body.fullname;
                                userMod.date = req.body.date;
                                userMod === null || userMod === void 0 ? void 0 : userMod.save();
                                res.send();
                            }
                            else {
                                res.status(403).send();
                            }
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(404).send();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_5 = _a.sent();
                        res.status(500).json({
                            status: 'error',
                            massages: JSON.stringify(error_5),
                        });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.UserCtrl = new UserController();
