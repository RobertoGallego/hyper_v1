import React, { useState } from 'react';
import styled from 'styled-components';
import MenuBar from '../components/general/MenuBar';
import Footer from '../components/general/Footer';
import Film from './FilmCard';
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { FadeLoader } from "react-spinners";
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useTranslation } from "react-i18next";

function Home() {
    const [page, setPage] = useState(1);
    const { loading } = true;
    const [searchText, setSearchText] = useState("");
    const [list, setList] = useState([]);
    const [genre, setGenre] = useState("");
    const [sort, setSort] = useState("rating");
    const [reverse, setReverse] = useState("desc");
    const { i18n } = useTranslation();
    let language = i18n.language;

    let setLanguage = "";
    switch (language) {
        case 'en':
            setLanguage = 'en-US';
            break;
        case 'fr':
            setLanguage = 'fr-FR';
            break;
        case 'es':
            setLanguage = 'es-ES';
            break;
        default:
            console.log('Error: language not defined');
    }

    const handleOnDocumentBottom = () => {
        setList(list.concat(res.data.getMovies));
        const np = page + 1;
        setPage(np);
    }

    useBottomScrollListener(handleOnDocumentBottom);

    const FETCH_MOVIES = gql`
        query($search: String!, $page: Int!, $genre: String!, $sort: String!, $reverse: String!, $language: String!){
        getMovies(search: $search, page: $page, genre: $genre, sort: $sort, reverse: $reverse, language: $language){
            id
            title
            poster_path
            vote_average
            overview
            release_date
            runtime
        }
    }`;

    const res = useQuery(FETCH_MOVIES, { variables: { search: searchText, page: page, genre: genre, sort: sort, reverse: reverse, language: setLanguage } });

    const movies = list.concat(res.data.getMovies);

    if (!movies) {
        return (
            <Override className="sweet-loading">
                <FadeLoader
                    size={20}
                    color={"#db202c"}
                    loading={loading}
                />
            </Override>
        );
    }
    return (
        <Homeindex>
            <MenuBar fetchMovies={setSearchText} pageReset={setPage} listReset={setList} genreAdd={setGenre} sortAdd={setSort} reverseAdd={setReverse} />
            <List>
                {movies.map((movie, i) => <Film key={i} {...movie} />)}
            </List>
            <Footer />
        </Homeindex>
    );
}

const Homeindex = styled.div`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    background: ${props => props.theme.colors.backgroungGeneral};
`

const List = styled.div`
    margin: auto;
    width: 80vw;
    /* min-height: 80vh; */
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    flex: 1;
    padding: 2rem 1.5rem; 
    @media (max-width: 768px) {
        width: auto;
        margin: auto;
        flex-direction: column;
    }
`

const Override = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;


export default Home;
