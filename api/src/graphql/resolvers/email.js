import jwt from "jsonwebtoken"
const nodemailer = require("nodemailer");
var generator = require('generate-password');
const { SECRET_KEY } = require('../../config');
const { validateEmailyInput } = require('../../util/validators');
const User = require('../../models/User');
const { UserInputError } = require('apollo-server-express');
const bcrypt = require('bcryptjs');

function generateToken(res) {
    return jwt.sign(
        {
            id: res.id,
            email: res.email,
            username: res.username
        },
        SECRET_KEY,
        { expiresIn: '3h' }
    );
}

module.exports = {
    Query: {
        async getUsers() {
            try {
                const users = await User.find().sort({ createdAt: -1 });
                return users;
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async emaily(_, { email }) {
            console.log("email", email);
            const { errors, valid } = validateEmailyInput(email);
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            const userEmail = await User.findOne({ email });
            
            // console.log("check ok findOne");
            // console.log("userEmail pw: ", userEmail.password);

            if (!userEmail) {
                errors.email = "Sorry, we can't find an account with this email. Please try again.";
                throw new UserInputError('User not found', { errors });
            }

            const newPassword = generator.generate({
                length: 15,
                uppercase: true,
                numbers: true
            });

            const resetPassword = await bcrypt.hash(newPassword, 12);
            const res = await User.findOneAndUpdate({ _id: userEmail.id }, { password: resetPassword }, {new: true})

            // console.log("B", res.password);
            const token = generateToken(res);
            // console.log("token", token);
            // const link = `<a href="http://localhost:3000/password/reset/${res.id}/${token}">Reset Password</a>`;
            var transporter = nodemailer.createTransport({ 
                service: 'gmail', 
                auth: {
                    user: 'willfln34@gmail.com',
                    pass: 'matcha1234'
                }
            });

            var mailOptions = { 
                from: '"Hypertube" <no-reply@hypertube.com>',
                to: res.email,
                subject: 'Reset Password successful! from Hypertube', 
                text: `\n
                Hello ${res.prenom}!. your password was reset successfuly, 
                for your security safety we advice you to change yout temporal password in your profile setting.
                \n
                TEMPORAL PASSWORD: ${newPassword}
                \n
                Have fun with hypertube!`
            };
            
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log(`** Email sent **`);
                });

            // console.log('\n\n\n');
            // console.log("token final ", token);
            return {
                ...res._doc,
                id: res._id,
                token
            };
        }
    }
};
