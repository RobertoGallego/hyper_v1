import nodemailer from 'nodemailer';

const sendMailto = async (to, subject, indication, link) => {
    let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                    user: 'willfln34@gmail.com',
                    pass: 'matcha1234'
    }
});
   
let mailOptions = {
        from: '"Hypertube" <no-reply@hypertube.com>',
        to,
        subject,
        html: `<table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tbody>
                        <tr>
                            <td style="text-align:center">
                                <h1>${subject}</h1>
                                <p>${indication}</p>
                                <p>${link}</p>
                            </td>
                        </tr>
                    </tbody>
                <table>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);

            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
};

module.exports = sendMailto;