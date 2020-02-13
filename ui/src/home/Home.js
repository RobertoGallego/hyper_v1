import React, { useState } from 'react';
import styled from 'styled-components';
import MenuBar from '../components/general/MenuBar';
import Footer from '../components/general/Footer';
import Film from './FilmCard';
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { FadeLoader } from "react-spinners";

function Home() {

    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const { loading } = true;

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
            <MenuBar fetchMovies={setSearchText} />
            <List>
                {movies.map((movie, i) => <Film key={i} {...movie} />)}
            </List>
            <Page>
                {!searchText && (
                    <Paginator>
                        <Button onClick={() => { if (page > 1 && page < 1000) setPage(page - 1) }}>Previous</Button>
                        <span>Page {page}</span>
                        <Button onClick={() => setPage(page + 1)}>Next</Button>
                    </Paginator>
                )}
            </Page>

            <Footer />
        </div>
    );
}

const Paginator = styled.div`
    margin: auto ;
    display: flex;
    justify-content: space-between;
`

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

const Override = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const Button = styled.button`
margin: 0 10vmin;
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
