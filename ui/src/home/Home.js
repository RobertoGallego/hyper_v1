import React, { useState } from 'react';
import styled from 'styled-components';
import MenuBar from '../components/general/MenuBar';
import Footer from '../components/general/Footer';
import Film from './FilmCard';
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

export default function Home () {

    

    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [list, setList] = useState([]);

    const handleOnDocumentBottom = () => 
    {
        setList(list.concat(res.data.getMovies));
        const np = page + 1;
        setPage(np);
    }

    useBottomScrollListener(handleOnDocumentBottom);

    const FETCH_MOVIES = gql`
        query($search: String!, $page: Int){
        getMovies(search: $search, page: $page){
            id
            title
            poster_path
            vote_average
        }
    }`;

    const res = useQuery(FETCH_MOVIES, { variables: { search: searchText, page: page } });
    const movies = list.concat(res.data.getMovies);
    console.log(movies);
    

    if (!movies) {
        return <h3>Loading ...</h3>;
    }
    return (
        <div>
            <MenuBar fetchMovies={setSearchText} pageReset={setPage} listReset={setList} />
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
