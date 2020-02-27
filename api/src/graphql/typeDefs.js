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
        userId: String!
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
        googleId: String!
        fortytwoId: String!
        email: String!
        prenom: String!
        nom: String!
        token: String!
        username: String!
        image: String!
        createdAt: String!
        language: String!
        tokenMail: String!
        seenMovies: [String!]
    }
    type Result_YTS{
        movie_count: Int
        limit: Int
        page_number: Int
        movies: [Movie_YTS]

    }
    type Torrent_YTS {
        url: String
        hash: String
        quality: String

    }
    type Movie_YTS {
        id: ID!
        url: String
        title: String
        rating: Float
        large_cover_image: String
        yt_trailer_code: String
        torrents: [Torrent_YTS]
    }
    type Movie{
        status: String!
        status_message: String!
        data: Result_YTS
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
    type Torrents {
        url: String!
        hash: String!
    }
    type TPBData{
        name: String!
        magnetLink: String!
    }
    type MovieTorrent {
        id: ID!
        year: Int
        title: String!
        runtime: Int
        rating: Float!
        yt_trailer_code: String
        large_cover_image: String
        torrents: [Torrents]
    }
    type Data {
        movie: MovieTorrent
    }
    type Torrent {
        status: String!
        data: Data!
    }
    type Query {
        getPosts: [Post]
        getPost(postId: ID!): Post
        getUsers: [User]
        getUser(userId: ID!): User
        currentUser: User
        getMovies(search: String!, page: Int!, genre: String!, sort: String!, reverse: String!, language: String!): [MovieDetails]
        getInfoTMDB(id: ID!): MovieDetails
        getInfoYTS(name: String!): Result_YTS
        getInfoTPB(name: String!): [TPBData]
        getOneMovie(id: ID!): Torrent
        getComments(movieId: String!): [Comment]
        getTorrentInfos(id: ID!): Torrent
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
        addSeenMovie(userId: ID!, movieId: String!): User!
    }
    type Subscription {
        newPost: Post!
    }
`;
