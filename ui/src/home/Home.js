import React, {useState} from 'react';
import styled from 'styled-components';
import MenuBar from '../components/general/MenuBar';
import Footer from '../components/general/Footer';
import Film from './FilmCard';
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

function Home() {

    const [searchText, setSearchText] = useState("");

    const FETCH_MOVIES = gql`
        query($search: String!){
        getMovies(search: $search){
            id
            title
            poster_path
            vote_average
        }
    }`;
    
    const res = useQuery(FETCH_MOVIES, {variables : {search : searchText}});
    const movies = res.data.getMovies;

    if (!movies) {
        return <h3>Loading ...</h3>;
    }
    return (
        <div>
            <MenuBar fetchMovies={setSearchText}/>
            <List>
                {movies.map((movie,i) => <Film key={i} {...movie}/>)}
            </List>
            <Footer/>
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

export default Home;
