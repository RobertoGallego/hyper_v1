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
        movieId: String!
    }
    type Like {
        id: ID!
        createdAt: String!
        username: String!
    }
    type User {
        id: ID!
        facebookId: String!
        email: String!
        prenom: String!
        nom: String!
        token: String!
        username: String!
        image: String!
        createdAt: String!
        language: String!
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
        image: String!
    }
    type Query {
        getPosts: [Post]
        getPost(postId: ID!): Post
        getUsers: [User]
        getUser(userId: ID!): User
        currentUser: User
        getMovies(search: String!): [Movie]
        getOneMovie(id: ID!): MovieDetails
        getComments(movieId: String!): [Comment]
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
        editProfile(userId: ID!, username: String!, prenom: String!, nom: String!, email: String!, image: String!): User!
        modifyPassword(userId: ID!, oldPassword: String!, newPassword: String!, confirmPassword: String!): User!
        addComment(movieId: String!, body: String!): Comment!
        setLanguage(userId: ID!, language: String!): User!
    }
    type Subscription {
        newPost: Post!
    }
`;
