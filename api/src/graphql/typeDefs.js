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
        createdAt: String!
        tokenMail: String!
    }
    type Movie{
        id: ID!
        title: String!
        poster_path: String
        vote_average: Float!
    }
    type MovieDetails{
        id: ID!
        title: String!
        poster_path: String
        vote_average: Float
        overview: String
        release_date: String
        runtime: Float
    }
    input RegisterInput {
        username: String!
        prenom: String!
        nom: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    input EditInput {
        username: String!
        prenom: String!
        nom: String!
        email: String!
    }
    type Query {
        getPosts: [Post]
        getPost(postId: ID!): Post
        getUsers: [User]
        getUser(userId: ID!): User
        getMovies(search: String!): [Movie]
        getOneMovie(id: ID!): MovieDetails
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
        editProfile(userId: ID!): User!
        modifyPassword(userId: ID!, oldPassword: String!, newPassword: String!, confirmPassword: String!): User!
    }
    type Subscription {
        newPost: Post!
    }
`;
