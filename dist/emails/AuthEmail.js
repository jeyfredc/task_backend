"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthEmail = void 0;
const nodemailer_1 = require("../config/nodemailer");
class AuthEmail {
    static sendConfirmationEmail = async (user) => {
        const info = await nodemailer_1.transporter.sendMail({
            from: 'UpTask <admin@uptask.com>',
            to: user.email,
            subject: 'UpTask - Confirma tu cuenta',
            text: 'upTask - Confirma tu cuenta',
            html: `<p>Hola: ${user.name}, has creado tu cuenta en UpTask, ya casi esta
            todo listo, solo debes confirmar tu cuenta</p>
            <p>Visita el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
            <p>E ingresa el código: <b>${user.token}</b>  </p>
            <p>Este token expira en 10 minutos</p>
            `
        });
        console.log('Mensaje enviado', info.messageId);
    };
    static sendPasswordResetToken = async (user) => {
        const info = await nodemailer_1.transporter.sendMail({
            from: 'UpTask <admin@uptask.com>',
            to: user.email,
            subject: 'UpTask - Reestablece tu password',
            text: 'upTask - Reestablece tu password',
            html: `<p>Hola: ${user.name}, has solicitado reestablecer tu password</p>
            <p>Visita el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/auth/new-password">Reestablecer Password</a>
            <p>E ingresa el código: <b>${user.token}</b>  </p>
            <p>Este token expira en 10 minutos</p>
            `
        });
        console.log('Mensaje enviado', info.messageId);
    };
}
exports.AuthEmail = AuthEmail;
//# sourceMappingURL=AuthEmail.js.map