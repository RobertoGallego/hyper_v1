const axios = require('axios')

module.exports = {
    Query: {
        async getMovies(_, { search, page }) {
            let res
            if (search)
                res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=3cbc26720809cfa6649145e5d10a0b7c&language=en-US&query=${search}&page=1`);
            else
                res = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=3cbc26720809cfa6649145e5d10a0b7c&language=en-US&page=${page}`);
            if (res) {
                return res.data.results;
            } else {
                throw new Error('No Movie finded ...');
            }
        },
        async getOneMovie(_, { id }) {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=3cbc26720809cfa6649145e5d10a0b7c&language=en-US`);
            if (res) {
                return res.data;
            } else {
                throw new Error('No Movie finded ...');
            }
        }
    }
}