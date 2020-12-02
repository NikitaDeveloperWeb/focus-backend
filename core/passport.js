"use strict";
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
exports.passport = void 0;
var passport_1 = __importDefault(require("passport"));
exports.passport = passport_1.default;
var passport_local_1 = require("passport-local");
var passport_jwt_1 = require("passport-jwt");
var UserModel_1 = require("../models/UserModel");
var generateHash_1 = require("../utils/generateHash");
passport_1.default.use(new passport_local_1.Strategy(function (username, password, done) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, UserModel_1.UserModel.findOne({ $or: [{ email: username }, { username: username }] }).exec()];
            case 1:
                user = _a.sent();
                //первая проверка
                if (!user) {
                    return [2 /*return*/, done(null, false)];
                }
                //вторая проверка - проверка совпадания пароля
                if (user.password === generateHash_1.generateMD5(password + process.env.SECRET_KEY)) {
                    done(null, user);
                }
                else {
                    done(null, false);
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                done(error_1, false);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }));
passport_1.default.use(new passport_jwt_1.Strategy({
    secretOrKey: process.env.SECRET_KEY || '123',
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromHeader('token'),
}, function (payload, done) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, UserModel_1.UserModel.findById(payload.data._id).exec()];
            case 1:
                user = _a.sent();
                if (user) {
                    return [2 /*return*/, done(null, user)];
                }
                done(null, false);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                done(error_2, false);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }));
//преобразование пользователя в "объект",который мы будем получать
passport_1.default.serializeUser(function (user, done) {
    done(null, user === null || user === void 0 ? void 0 : user._id);
});
//входе полученного объекта проверяет id
//и если id найден вернет пользователя иначе ошибку
passport_1.default.deserializeUser(function (id, done) {
    UserModel_1.UserModel.findById(id, function (err, user) {
        done(err, user);
    });
});
