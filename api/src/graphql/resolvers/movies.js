const axios = require('axios')

module.exports = {
    Query: {
        async getMovies(_, { search }) {
            let res
            if (search)
                res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=3cbc26720809cfa6649145e5d10a0b7c&language=en-US&query=${search}`);
            else 
                res = await axios.get(`https://yts.mx/api/v2/list_movies.json?sort=rating`);
            if (res)
                return res.data.data;    
            else 
                throw new Error('No Movie finded ...');
            
        },
        async getOneMovie(_, { id }) {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=3cbc26720809cfa6649145e5d10a0b7c&language=en-US`);
            if (res) {
                return res.data;
            } else {
                throw new Error('No Movie finded ...');
            }
        },
        async getTorrentInfos(_, { id }) {
            const res = await axios.get(`https://yts.am/api/v2/movie_details.json?movie_id=${id}`);
            if (res) {
                return res.data;
            } else {
                throw new Error('No Movie finded ...');
            }
        }
    }
}