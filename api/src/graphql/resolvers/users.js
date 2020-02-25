const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const {
    validateRegisterInput,
    validateLoginInput,
    validateEditInput,
    validatePasswordsInput
} = require('../../util/validators');
const { SECRET_KEY } = require('../../config');
const User = require('../../models/User');
const nodemailer = require("nodemailer");
var ip = require('ip');

function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username
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
        },
        async getUser(_, { userId }) {
            try {
                const user = await User.findById(userId);
                if (user) {
                    return user;
                } else {
                    throw new Error('User not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async login(_, { username, password }, context) {
            const { errors, valid } = validateLoginInput(username, password);

            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            // console.log(username);
            // console.log(password);

            const user = await User.findOne({ username });
            if (!user) {
                errors.username = "Sorry, we can't find an account with this username. Please try again.";
                throw new UserInputError('User not found', { errors });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.password = 'Wrong password';
                throw new UserInputError('Wrong crendetials', { errors });
            }

            const isVerified = await user.isVerified;
            if (isVerified === true) {
                errors.password = 'Your account has not been verified.';
                throw new UserInputError('Not been verified', { errors });
            }

            const ipman = ip.address()
            const token = generateToken(user);
            
            let date_ob = new Date();

            let date = ("0" + date_ob.getDate()).slice(-2);
            let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            let year = date_ob.getFullYear();
            let hours = date_ob.getHours();
            let minutes = date_ob.getMinutes();
            let seconds = date_ob.getSeconds();
            const teatime = hours + ":" + minutes + ":" + seconds + " " + date + "-" + month + "-" + year;

            var transporter = nodemailer.createTransport({ 
                service: 'gmail', 
                auth: {
                    user: 'willfln34@gmail.com',
                    pass: 'matcha1234'
                }
            });

            var mailOptions = { 
                from: '"Hypertube" <no-reply@hypertube.com>',
                to: user.email,
                subject: `[Sign In] You signed in from ${ipman} at ${teatime}`, 
                text: `Hello!,\nYou signed in from\n${ipman} ip at ${teatime}\nthis email is just for protect your account, please do not reply`};
            
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);
                });

            return {
                ...user._doc,
                id: user._id,
                token,
            };
        },
        async register(
            _,
            { registerInput: { username, prenom, nom, email, password, confirmPassword, image } }
        ) {
            // Validate user data
            // console.log("Holaaaa");
            // console.log({username});

            // console.log({image});
            
            const { valid, errors } = validateRegisterInput(
                username,
                prenom,
                nom,
                email,
                password,
                confirmPassword,
                image
            );
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }

            // TODO: Make sure user doesnt already exist
            const user = await User.findOne({ username, email });
            if (user) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken',
                        email: "This Email is taken"
                    }
                });
            }
            // hash password and create an auth token
            password = await bcrypt.hash(password, 12);
            const facebookId = "";
            const fortytwoId = "";
            const googleId = "";
            const seenMovies = [];

            const newUser = new User({
                facebookId,
                fortytwoId,
                googleId,
                email,
                username,
                prenom,
                nom,
                password,
                createdAt: new Date().toISOString(),
                image,
                seenMovies
            });

            const res = await newUser.save();

            const token = generateToken(res);

            // const newtoken = new Token({
            //     id: user.id,
            // email: user.email,
            // username: user.username
            //     _userId: user._id,
            //     token: crypto.randomBytes(16).toString('hex') 
            // });

            // console.log("IMAGEN:", image);

            // const tokenMail = await token.save()

            // console.log("token mail:", user.email);
            // console.log("mail:", newUser.email);
            // console.log("token mail:", valid.email);
            // console.log("token mail:", email);
            // console.log("token:", token);
            
            // const link = `<a href="http://localhost:3000/confirmation/${token}">Activate</a>`;
            // // Send the email

            // var transporter = nodemailer.createTransport({ 
            //     service: 'gmail', 
            //     auth: {
            //         user: 'willfln34@gmail.com',
            //         pass: 'matcha1234'
            //     }
            // });

            // var mailOptions = { 
            //     from: '"Hypertube" <no-reply@hypertube.com>',
            //     to: newUser.email,
            //     subject: 'Account Verification', 
            //     text: `Hello!,\n . ${link} `};
            
            //     transporter.sendMail(mailOptions, (error, info) => {
            //         if (error) {
            //             return console.log(error);
            //         }
            //         console.log('Message sent: %s', info.messageId);
            //     });

            return {
                ...res._doc,
                id: res._id,
                token
            };
        },
        async modifyPassword ( _, { userId, oldPassword, newPassword, confirmPassword }) {
            const { valid, errors } = validatePasswordsInput(
                oldPassword,
                newPassword,
                confirmPassword,
            )
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            const user = await User.findById(userId);
            const match = await bcrypt.compare(oldPassword, user.password);
            if (!match) {
                errors.oldPassword = 'Wrong password';
                throw new UserInputError('Wrong crendetials', { errors });
            } else {
                newPassword = await bcrypt.hash(newPassword, 12);
                const res = await User.findByIdAndUpdate({ _id: user.id }, { password: newPassword }, {new: true})
                const token = generateToken(user);

                return {
                    ...res._doc,
                    id: res._id,
                    token,
                }
            }
        },
        async editProfile( _, { userId, username, prenom, nom, email, image }) {
            const { valid, errors } = validateEditInput(
                username,
                prenom,
                nom,
                email,
                image
            )
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            const user = await User.findById(userId);
            if (user.email !== email) {
                const verifyEmail = await User.findOne({ email });
                if (verifyEmail) {
                    throw new UserInputError('Email is taken', {
                        errors: {
                            email: "This email is taken"
                        }
                    });
                }
            }
            if (user.username !== username) {
                const verifyUsername = await User.findOne({ username });
                if (verifyUsername) {
                    throw new UserInputError('Username is taken', {
                        errors: {
                            email: "This username is taken"
                        }
                    });
                }
            }
            const res = await User.findByIdAndUpdate({ _id: userId }, { email: email, username: username, prenom: prenom, nom: nom, image: image }, {new: true})
            const token = generateToken(user);
            return {
                ...res._doc,
                id: res._id,
                token,
            }
        },
        async addSeenMovie( _, {userId, movieId}) {
            const res = await User.findByIdAndUpdate({ _id: userId }, {$push: {seenMovies: movieId }}, {new: true})
            return {
                ...res._doc,
                id: res._id
            }
        }
    }
};
