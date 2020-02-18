import React, { useState } from 'react';
import styled from 'styled-components';
import MenuBar from '../components/general/MenuBar';
import Footer from '../components/general/Footer';
import Film from './FilmCard';
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { FadeLoader } from "react-spinners";
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
var _ = require('lodash');

function Home () {
    const [page, setPage] = useState(1);
    const { loading } = true;
    const [searchText, setSearchText] = useState("");
    const [list, setList] = useState([]);
    const [genre, setGenre] = useState("");
    const [sort, setSort] = useState("rating");
    const [reverse, setReverse] = useState("desc");

    const handleOnDocumentBottom = () => 
    {
        setList(list.concat(_.get(res.data.getMovies, 'movies')));
        const np = page + 1;
        setPage(np);
    }

    useBottomScrollListener(handleOnDocumentBottom);

    const FETCH_MOVIES = gql`
        query($search: String!, $page: Int!, $genre: String!, $sort: String!, $reverse: String!){
        getMovies(search: $search, page: $page, genre: $genre, sort: $sort, reverse: $reverse){
            page_number
            movies {
                id
                title
                large_cover_image
                rating
                torrents {
                    url
                    hash
                    quality
                }
            }
        }
    }`;

    const res = useQuery(FETCH_MOVIES, { variables: { search: searchText, page: page, genre: genre, sort: sort, reverse: reverse } });
    const movies = list.concat(_.get(res.data.getMovies, 'movies'));
   
    // console.log('movies ' + _.get(movies[0], 'id'))

    if (!movies) {
        return (
            <Override className="sweet-loading">
              <FadeLoader
                size={20}
                color={"#fff"}
                loading={loading}
              />
            </Override>
        );
    }
    return (
        <div>
            <MenuBar fetchMovies={setSearchText} pageReset={setPage} listReset={setList} genreAdd={setGenre} sortAdd={setSort} reverseAdd={setReverse} />
            <List>
                {movies.map((movie, i) => <Film key={i} {...movie} />)}
            </List>
            <Footer />
        </div>
    );
}

const List = styled.div`
    margin: 2vmin auto 0 ;
    width: 70vw;
    min-height: 75vh;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`

const Override = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;


export default Home;
