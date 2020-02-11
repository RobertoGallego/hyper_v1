import React, { useState } from 'react';
import styled from 'styled-components';
import MenuBar from '../components/general/MenuBar';
import Footer from '../components/general/Footer';
import Film from './FilmCard';
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

function Home() {

    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);

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
    const movies = res.data.getMovies;

    if (!movies) {
        return <h3>Loading ...</h3>;
    }
    return (
        <div>
            <MenuBar fetchMovies={setSearchText} />
            <List>
                {movies.map((movie, i) => <Film key={i} {...movie} />)}
            </List>
            <Page>
                <Button onClick={() => { if (page > 1 && page < 1000) setPage(page - 1) }}>Previous</Button>
                <span>Page {page}</span>
                <Button onClick={() => setPage(page + 1)}>Next</Button>
            </Page>
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
const Page = styled.div`
    margin: 20px auto;
    width: 30vw;
    display: flex;
    justify-content: space-between;
    text-align: center;
`;

const Button = styled.button`
border-color: #DB202C;
background-color: #DB202C;
color: white;
border-radius: 5px;
padding: 10px 15px;
transition-duration: 0.3s;

&:hover {
  
  color: black;
}
`;

export default Home;
