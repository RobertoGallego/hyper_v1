import jwt from "jsonwebtoken"
const nodemailer = require("nodemailer");
const { SECRET_KEY } = require('../../config');

// import validateResetPassword from '../../util/validators';
const { validateEmailyInput } = require('../../util/validators');
const User = require('../../models/User');
const { UserInputError } = require('apollo-server-express');
// const { ApolloServer, PubSub } = require('apollo-server-express');

// `secret` is passwordHash concatenated with user's createdAt,
// so if someones gets a user token they still need a timestamp to intercept.

function generateToken(userEmail) {
    const secret = userEmail.password + "-" + userEmail.createdAt;
    console.log("token secret", secret);
    return jwt.sign(
        { id: userEmail.id },
        // SECRET_KEY,
        secret,
        { expiresIn: 3600 }
    );
}

// function generateToken(userEmail) {
//     return jwt.sign(
//         {
//             id: userEmail.id,
//             email: userEmail.email,
//             username: userEmail.username
//         },
//         SECRET_KEY,
//         { expiresIn: '3h' }
//     );
// }

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

            // console.log("caca3", user1);
            console.log("check ok findOne");
            console.log("userEmail pw: ", userEmail.password);
            console.log("userEmail cr: ", userEmail.createdAt);
            console.log("userEmail id: ", userEmail.id);
            // console.log("caca3", user.email);
            // console.log("asd", User.email)
            // console.log("caca4", user);

            if (!userEmail) {
                errors.email = "Sorry, we can't find an account with this email. Please try again.";
                throw new UserInputError('User not found', { errors });
            }

            console.log("!userEmail ok");
            const token = generateToken(userEmail);
            console.log("token", token);
            const link = `<a href="http://localhost:3000/password/reset/${userEmail.id}/${token}">Reset Password</a>`;
            var transporter = nodemailer.createTransport({ 
                service: 'gmail', 
                auth: {
                    user: 'willfln34@gmail.com',
                    pass: 'matcha1234'
                }
            });

            var mailOptions = { 
                from: '"Hypertube" <no-reply@hypertube.com>',
                to: userEmail.email,
                subject: 'Request reset Password from Hypertube', 
                text: `Hello ${userEmail.prenom}!. ${link}
                <a href="http://www.facebook.com">link title</a>`
            };
            
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log(`** Email sent **`);
                });
            console.log('\n\n\n');
            console.log("return final", userEmail._doc);
            console.log("id final", userEmail._id);
            console.log("token final ", token);
            return {
                ...userEmail._doc,
                id: userEmail._id,
                token
            };
        },
        // async register(
        //     _,
        //     { registerInput: { password, confirmPassword } }
        // ) {
        //     const { valid, errors } = validateResetInput(
        //         password,
        //         confirmPassword
        //     );
        //     if (!valid) {
        //         throw new UserInputError('Errors', { errors });
        //     }

        //     // hash password and create an auth token
        //     password = await bcrypt.hash(password, 12);

        //     const newPassword = new User({
        //         password,
        //         createdAt: new Date().toISOString()
        //     });

        //     const res = await newUser.save();

        //     const token = generateToken(res);
        //     return {
        //         ...res._doc,
        //         id: res._id,
        //         token
        //     };
        // }
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