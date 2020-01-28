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

function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username
        },
        SECRET_KEY,
        { expiresIn: '1h' }
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
        async login(_, { username, password }) {
            const { errors, valid } = validateLoginInput(username, password);

            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }

            const user = await User.findOne({ username });

            if (!user) {
                errors.username = "Sorry, we can't find an account with this email address. Please try again.";
                throw new UserInputError('User not found', { errors });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.password = 'Wrong password';
                throw new UserInputError('Wrong crendetials', { errors });
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            };
        },
        async register(
            _,
            { registerInput: { username, prenom, nom, email, password, confirmPassword } }
        ) {
            // Validate user data
            const { valid, errors } = validateRegisterInput(
                username,
                prenom,
                nom,
                email,
                password,
                confirmPassword
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

            const newUser = new User({
                email,
                username,
                prenom,
                nom,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = generateToken(res);

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
        // async editProfile(
        //     _,
        //     id,
        //     { editInput: { username, prenom, nom, email, } }
        // ) {
        //     const { valid, errors } = validateEditInput(
        //         username,
        //         prenom,
        //         nom,
        //         email,
        //         oldPassword,
        //         newPassword,
        //         confirmPassword
        //     );
        //     if (!valid) {
        //         throw new UserInputError('Errors', { errors });
        //     }

        //     const user = await User.findById(id);
        //     if (user) {
        //         const userVerify = await User.findOne({ username, email });
        //         if (userVerify) {
        //             throw new UserInputError('Username is taken', {
        //                 errors: {
        //                     username: 'This username is taken',
        //                     email: "This email is taken"
        //                 }
        //             });
        //         } else {
        //             newPassword = await bcrypt.hash(newPassword, 12);

        //             const res = await User.findIdAndUpdate({ _id: user.id }, { username: username }, {new: true})

        //             return {
        //                 ...res._doc,
        //                 id: res._id
        //             }
        //         } 
        //     } else throw new UserInputError('There was an error while looking for your profile');
        // }
    }
};
