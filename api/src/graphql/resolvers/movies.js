const axios = require('axios')

module.exports = {
    Query: {
        async getMovies(_, { search, genre, sort, page, reverse }) {
            let res
            if (search)
                res = await axios.get(`https://yts.mx/api/v2/list_movies.json?sort_by=${sort}&order_by=${reverse}&query_term=${search}&limit=20&page=${page}`);
            else if (genre) 
                res = await axios.get(`https://yts.mx/api/v2/list_movies.json?sort_by=${sort}&order_by=${reverse}&genre=${genre}&limit=20&page=${page}`);
            else
                res = await axios.get(`https://yts.mx/api/v2/list_movies.json?sort_by=${sort}&order_by=${reverse}&limit=20&page=${page}`);
            if (res)
                return res.data.data;    
            else 
                throw new Error('No Movie finded ...');
            
        },
        async getOneMovie(_, { id }) {
            const res = await axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
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