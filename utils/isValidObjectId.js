"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidObjectId = void 0;
var db_1 = require("../core/db");
exports.isValidObjectId = db_1.mongoose.Types.ObjectId.isValid;
