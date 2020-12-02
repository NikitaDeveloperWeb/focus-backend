"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
var mongoose_1 = require("mongoose");
//схема таблицы
var PostSchema = new mongoose_1.Schema({
    text: {
        required: true,
        type: String,
        maxlength: 1000,
    },
    user: {
        required: true,
        type: String,
    },
    userID: {
        required: true,
        ref: 'User',
        type: mongoose_1.Schema.Types.ObjectId,
    },
    imageUrl: {
        required: true,
        type: String,
    },
    published: {
        required: true,
        type: String,
    },
}, {
    timestamps: false,
});
exports.PostModel = mongoose_1.model('Post', PostSchema);
