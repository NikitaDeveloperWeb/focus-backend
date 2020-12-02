"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoose = exports.db = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.mongoose = mongoose_1.default;
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect(process.env.MONGOLAB_URI ||
    'mongodb+srv://UserAdm:kodfg123@cluster0.3ydia.mongodb.net/focus?retryWrites=true&w=majority' ||
    'mongodb://127.0.0.1:27017/focus', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
var db = mongoose_1.default.connection;
exports.db = db;
db.on('error', console.error.bind(console, 'CONNECTION ERROR:'));
