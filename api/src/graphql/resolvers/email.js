import jwt from "jsonwebtoken"
const nodemailer = require("nodemailer");
const { SECRET_KEY } = require('../../config');
// import validateResetPassword from '../../util/validators';
const { validateEmailyInput } = require('../../util/validators');
const User = require('../../models/User');
const { UserInputError } = require('apollo-server');
// const { ApolloServer, PubSub } = require('apollo-server-express');

// `secret` is passwordHash concatenated with user's createdAt,
// so if someones gets a user token they still need a timestamp to intercept.
// export const usePasswordHashToMakeToken = ({
//   password: passwordHash,
//   _id: userId,
//   createdAt
// }) => {
//   const secret = passwordHash + "-" + createdAt
//   const token = jwt.sign(
//       { userId }
//       , secret, {
//     expiresIn: 3600 // 1 hour
//   })
//   return token
// }
console.log("caca");
function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            password: user.password,
            create: user.createdAt
        },
        SECRET_KEY,
        { expiresIn: 3600 }
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
            console.log("caca3", email);
            console.log("caca3.5", email);
            const { errors, valid } = validateEmailyInput(email);
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            const userEmail = await User.findOne({ email });

            // console.log("caca3", user1);
            console.log("caca32");

            // console.log("caca3", user.email);
            // console.log("asd", User.email)
            // console.log("caca4", user);

            if (!userEmail) {
                errors.email = "Sorry, we can't find an account with this email. Please try again.";
                throw new UserInputError('User not found', { errors });
            }

            console.log("caca4", email);
            const token = generateToken(user);
            const link = `http://localhost:3000/password/reset/${user._id}/${token}`;
            
            var transporter = nodemailer.createTransport({ 
                service: 'gmail', 
                auth: {
                    user: 'willfln34@gmail.com',
                    pass: 'matcha1234'
                }
            });

            var mailOptions = { 
                from: '"Hypertube" <no-reply@hypertube.com>',
                to: User.email,
                subject: 'Account Verification', 
                text: `Hello!,\n . <a href="${link}">${link}</a> `};
            
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);
                });

            return {
                ...userEmail._doc,
                id: userEmail._id,
                // email: user1._email,
                token
            };
        }
    }
};
/*** Calling this function with a registered user's email sends an email IRL ***/
/*** I think Nodemail has a free service specifically designed for mocking   ***/
// export const sendPasswordResetEmail = async (req, res) => {
//   const { email } = req.params
//   let user
//   try {
//     user = await User.findOne({ email }).exec()
//   } catch (err) {
//     res.status(404).json("No user with that email")
//   }
//   const token = usePasswordHashToMakeToken(user)
//   const url = getPasswordResetURL(user, token)
//   const emailTemplate = resetPasswordTemplate(user, url)

//   const sendEmail = () => {
//     transporter.sendMail(emailTemplate, (err, info) => {
//       if (err) {
//         res.status(500).json("Error sending email")
//       }
//       console.log(`** Email sent **`, info.response)
//     })
//   }
//   sendEmail()
// }

// export const receiveNewPassword = (req, res) => {
//   const { userId, token } = req.params
//   const { password } = req.body

//   User.findOne({ _id: userId })

//     .then(user => {
//       const secret = user.password + "-" + user.createdAt
//       const payload = jwt.decode(token, secret)
//       if (payload.userId === user.id) {
//         bcrypt.genSalt(10, function(err, salt) {
//           if (err) return
//           bcrypt.hash(password, salt, function(err, hash) {
//             if (err) return
//             User.findOneAndUpdate({ _id: userId }, { password: hash })
//               .then(() => res.status(202).json("Password changed accepted"))
//               .catch(err => res.status(500).json(err))
//           })
//         })
//       }
//     })

//     .catch(() => {
//       res.status(404).json("Invalid user")
//     })
// }