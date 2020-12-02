"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailer = void 0;
var nodemailer_1 = __importDefault(require("nodemailer"));
var options = {
    host: process.env.NODEMAILER_HOST || 'smtp.mailtrap.io',
    port: Number(process.env.NODEMAILER_PORT) || 2525,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    }
};
console.log();
exports.mailer = nodemailer_1.default.createTransport(options);
