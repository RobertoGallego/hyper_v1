import React from 'react';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';
import Header from '../general/Header';
import Footer from '../general/Footer';
import Com from './Comment';
import gql from "graphql-tag";
import noImage from "../../assets/images/noImage.png";
import { useQuery } from "@apollo/react-hooks";

export default function Movie() {

    const FETCH_ONE_MOVIE = gql`
        query($id: ID!){
        getOneMovie(id: $id){
            id
            title
            poster_path
            vote_average
            overview
            release_date
            runtime
        }
    }`;

    const movieID = useParams().id;
    
    const res = useQuery(FETCH_ONE_MOVIE, {variables : {id : movieID}});
    const movie = res.data.getOneMovie;
    
    if (!movie) {
        return <h3>Loading ...</h3>;
    }
    var image;
    if (!movie.poster_path)
        image = noImage
    else
        image = `https://image.tmdb.org/t/p/original${movie.poster_path}`
    return (
        <MoviePage>
            <Header/>
                <Content>
                    <Title>{movie.title}</Title>
                    <HR/>
                    <Split>
                        <Left>
                            <Video controls>
                            </Video>
                            <Text>Torrents: </Text>
                            <span>Link for Torrent</span>
                            <Text>Comments: </Text>
                            <Com/>
                        </Left>
                        <Right>
                            <Text>Grade: {movie.vote_average}</Text>
                            <Picture src={image} alt={`${movie.title}Image`}/>
                            <Text>Release Date: {movie.release_date}</Text>
                            <Text>Duration: {movie.runtime}min</Text>
                        </Right>
                    </Split>
                </Content>
            <Footer/>
        </MoviePage>
    );
}

const MoviePage = styled.div`
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
    background-color: #111111;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;

    display: flex;
    min-height: 100vh;
    flex-direction: column;
    color: white;
`

const HR = styled.hr`
    border: 1px solid white;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 90vmin;
    margin: 0 auto;
`
const Split = styled.div`
    display: flex;
`

const Left = styled.div`
    width: 70vmin;
    display: flex;
    flex-direction: column;
    text-align: center;
`

const Video = styled.video`
    margin: 5vmin;
    width: 60vmin;

`

const Right = styled.div`
    display: flex;
    flex-direction: column;
    width: 20vmin;
`

const Title = styled.h1`
font-size: 5vmin;
`;

const Picture = styled.img`
width: 25vmin;
height: 25min;
margin: 0 auto;
`;

const Text = styled.span`
margin: 30px 0;
font-size: 1.5em;
`;