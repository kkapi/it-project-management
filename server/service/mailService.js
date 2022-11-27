const nodemailer = require('nodemailer')

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
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
                    <h1>Для активации аккаунта перейдите по ссылке</h1>
                    <h2>Ссылка: <a href="${link}">${link}</a></h2>
                    <h2>Если вы не регистрировали аккаунт на ${process.env.API_URL}, проигнорируйте данное письмо</h2>
                </div>
                `            
        })
    }

    async sendRecoveryMail(to, link) {
        console.log('to: ' + to)
        console.log('link: ' + link)
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Восстановление пароля на ' + process.env.API_URL,
            text:'',
            html:
                `
                <div>
                    <h1>Для восстановления пароля перейдите по ссылке</h1>
                    <h2>Ссылка: <a href="${link}">${link}</a></h2>
                    <h2>Если вы не запрашивали воостановление пароля на ${process.env.API_URL}, проигнорируйте данное письмо</h2>
                </div>
                `           
        })
        return 'sucess'
    }
}

module.exports = new MailService();