const nodemailer = require('nodemailer')

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'it.project.managment.0371@gmail.com',
                pass: 'ilrtvxnvuwuidyan'
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Активация аккаунта на ' + process.env.API_URL,
            text:'',
            html:
                `
                <div>
                    <h1>Для активации пройдите по ссылке</h1>
                    <a href="${link}">${link}</a>
                </div>

                `            

        })
    }

    async sendRecovery(to, recoverLink) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Восстановление пароля на ' + process.env.API_URL,
            text:'',
            html:
                `
                <div>
                    <h1>Было запрошено восстановление пароля на ${process.env.API_URL}</h1>
                    <h1>Для восстановления пароля пройдите по ссылке, ваш новый пароль будет отправлен в следущем письме. Ссылка: </h1>
                    <a href="${recoverLink}">${recoverLink}</a>                  
                </div>
                `            
        })
    }
}

module.exports = new MailService();