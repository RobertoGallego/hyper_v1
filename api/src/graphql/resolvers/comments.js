const { AuthenticationError, UserInputError } = require('apollo-server');

const checkAuth = require('../../util/check-auth');
const Comment = require('../../models/Comments');

module.exports = {
    Query: {
        async getComments(_, {movieId}) {
            console.log("Je fetch mes comments");
            console.log(movieId);
            try {
                const comments = await Comment.find(movieId).sort({ createdAt: -1 });
                return comments;
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async addComment(_, { movieId, body }, context) {
            console.log(movieId);
            console.log(body); 
            console.log("BON J'appelle ma mutatiomnn");
            
            const { username } = checkAuth(context);
            if (body.trim() === '') {
                throw new UserInputError('Empty comment', {
                    errors: {
                        body: 'Comment body must not empty'
                    }
                });
            }

            const newComment = new Comment({
                body,
                username,
                createdAt: new Date().toISOString(),
                movieId
            });

            const comment = await newComment.save();

            context.pubsub.publish('NEW_COMMENT', {
                newComment: comment
            });

            return comment;
        }
    }
};
