"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
var mailer_1 = require("../core/mailer");
var sendEmail = function (_a, callback) {
    var emailFrom = _a.emailFrom, emailTo = _a.emailTo, subject = _a.subject, html = _a.html;
    mailer_1.mailer.sendMail({
        from: emailFrom,
        to: emailTo,
        subject: subject,
        html: html,
    }, callback ||
        function (err, info) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(info);
            }
        });
};
exports.sendEmail = sendEmail;
