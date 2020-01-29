const { gql } = require('apollo-server-express');

module.exports = gql`
    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
        comments: [Comment]!
        likes: [Like]!
        likeCount: Int!
        commentCount: Int!
    }
    type Comment {
        id: ID!
        createdAt: String!
        username: String!
        body: String!
    }
    type Like {
        id: ID!
        createdAt: String!
        username: String!
    }
    type User {
        id: ID!
        email: String!
        prenom: String!
        nom: String!
        token: String!
        username: String!
        image: String!
        createdAt: String!
        tokenMail: String!
    }
    input RegisterInput {
        username: String!
        prenom: String!
        nom: String!
        password: String!
        confirmPassword: String!
        email: String!
        image: String!
    }
    type Query {
        getPosts: [Post]
        getPost(postId: ID!): Post
        getUsers: [User]
        getUser(userId: ID!): User
        currentUser: User
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        emaily(email: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        createComment(postId: String!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        likePost(postId: ID!): Post!
        logout: Boolean
    }
    type Subscription {
        newPost: Post!
    }
`;
