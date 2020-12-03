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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCtrl = void 0;
var express_validator_1 = require("express-validator");
var PostModel_1 = require("../models/PostModel");
var isValidObjectId_1 = require("../utils/isValidObjectId");
//controller user
var PostController = /** @class */ (function () {
    function PostController() {
    }
    //get all posts
    PostController.prototype.index = function (_, res) {
        return __awaiter(this, void 0, void 0, function () {
            var posts, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, PostModel_1.PostModel.find({}).exec()];
                    case 1:
                        posts = _a.sent();
                        posts.reverse();
                        res.json(posts);
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
    // async like(_: any, res: express.Response): Promise<void> {
    //   try {
    //     const posts = await PostModel.find({}).exec();
    //     res.json(posts);
    //   } catch (error) {
    //     res.status(500).json({
    //       status: 'error',
    //       massages: JSON.stringify(error),
    //     });
    //   }
    // }
    //create post
    PostController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, errors, data, post, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        user = req.user;
                        if (!(user === null || user === void 0 ? void 0 : user._id)) return [3 /*break*/, 2];
                        errors = express_validator_1.validationResult(req);
                        if (!errors.isEmpty()) {
                            res.status(400).json({ status: 'error', errors: errors.array() });
                            return [2 /*return*/];
                        }
                        data = {
                            text: req.body.text,
                            imageUrl: req.body.imageUrl,
                            user: req.body.user,
                            userID: user._id,
                            published: req.body.published,
                        };
                        console.log(data);
                        return [4 /*yield*/, PostModel_1.PostModel.create(data)];
                    case 1:
                        post = _a.sent();
                        // console.log(post);
                        res.json({
                            status: 'success',
                            data: post,
                        });
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        res.status(500).json({
                            status: 'error',
                            massages: JSON.stringify(error_2),
                        });
                        console.log(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // delete post
    PostController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, postId, post, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = req.user;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        if (!user) return [3 /*break*/, 3];
                        postId = req.params.id;
                        //проверка на валидность id
                        if (!isValidObjectId_1.isValidObjectId(postId)) {
                            res.status(400).send();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, PostModel_1.PostModel.findById(postId)];
                    case 2:
                        post = _a.sent();
                        if (post) {
                            if (String(post.user._id) === String(user._id)) {
                                post.remove();
                                res.send();
                            }
                            else {
                                res.status(403).send();
                            }
                        }
                        else {
                            res.status(404).send();
                        }
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_3 = _a.sent();
                        res.status(500).json({
                            status: 'error',
                            massages: JSON.stringify(error_3),
                        });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    //get one post
    PostController.prototype.show = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var postId, post, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        postId = req.params.id;
                        //проверка на валидность id
                        if (!isValidObjectId_1.isValidObjectId(postId)) {
                            res.status(400).send();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, PostModel_1.PostModel.findById(postId).exec()];
                    case 1:
                        post = _a.sent();
                        //проверка на существование пользователя по этому id
                        if (!post) {
                            res.status(404).send();
                            return [2 /*return*/];
                        }
                        res.json({
                            status: 'success',
                            data: post,
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
    //update post
    PostController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, postId, post, text, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = req.user;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        if (!user) return [3 /*break*/, 3];
                        postId = req.params.id;
                        //проверка на валидность id
                        if (!isValidObjectId_1.isValidObjectId(postId)) {
                            res.status(400).send();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, PostModel_1.PostModel.findById(postId)];
                    case 2:
                        post = _a.sent();
                        if (post) {
                            if (String(post.user._id) === String(user._id)) {
                                text = req.body.text;
                                post.text = text;
                                post.save();
                                res.send();
                            }
                            else {
                                res.status(403).send();
                            }
                        }
                        else {
                            res.status(404).send();
                        }
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_5 = _a.sent();
                        res.status(500).json({
                            status: 'error',
                            massages: JSON.stringify(error_5),
                        });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return PostController;
}());
exports.PostCtrl = new PostController();
