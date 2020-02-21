const axios = require('axios');

module.exports = {
    Query: {
        async getMovies(_, { search, genre, sort, page, reverse}) {
            let res
            if (search)
                res = await axios.get(`https://api.themoviedb.org/3/search/movie?sort_by=${sort}.${reverse}&api_key=3cbc26720809cfa6649145e5d10a0b7c&language=en-US&query=${search}&page=${page}`);
            else if (genre) 
                res = await axios.get(`https://api.themoviedb.org/3/discover/movie?sort_by=${sort}.${reverse}&api_key=3cbc26720809cfa6649145e5d10a0b7c&with_genres=${genre}&page=${page}`);
            else
                res = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?sort_by=${sort}.${reverse}&api_key=3cbc26720809cfa6649145e5d10a0b7c&language=en-US&page=${page}`);
            if (res)
                return res.data.results
            else 
                throw new Error('No Movie finded ...');
        },
        async getOneMovie(_, { id }) {
            const res = await axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}&with_images=true`);
            if (res) {
                return res.data;
            } else {
                throw new Error('No Movie finded ...');
            }
        },
        async getTorrentInfos(_, { id }) {
            const res = await axios.get(`https://yts.am/api/v2/movie_details.json?movie_id=${id}&with_images=true`);
            if (res) {
                return res.data;
            } else {
                throw new Error('No Movie finded ...');
            }
        }
    }
}