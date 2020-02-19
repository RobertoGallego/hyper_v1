import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../general/Header';
import Footer from '../general/Footer';
import Com from './Comment';
import gql from "graphql-tag";
import noImage from "../../assets/images/noImage.png";
import { useQuery } from "@apollo/react-hooks";
import { FadeLoader } from "react-spinners";
import axios from 'axios';
var _ = require('lodash');

export default function Movie() {

    const FETCH_ONE_MOVIE = gql`
        query($id: ID!){
        getOneMovie(id: $id){
            status
            data {
                movie {
                    id
                    yt_trailer_code
                    title
                    year
                    rating
                    runtime
                    large_cover_image
                    torrents {
                        url
                        hash
                    }
                }
            }
        }
    }`;

    const movieID = useParams().id;
    const { loading } = true;

    const startPlaying = async () => {
        console.log(movieID + "    " + torrentHash)
        await axios.get(`http://localhost:5000/downloadMovie/${movieID}/${torrentHash}`).then(data => {
            // console.log("data =>" + JSON.stringify(data.data.status));
            if (data.data.status === "OK") {
                setmovieLink(`http://localhost:5000/playMovie/${movieID}`)
            }
            else
                console.log("error to get download")
        });
    }
    const [movieLink, setmovieLink] = useState("");
    const movieID = useParams().id;
    console.log("Movie link " + movieLink)
    const res = useQuery(FETCH_ONE_MOVIE, { variables: { id: movieID } })
    let movie = res.data.getOneMovie;
    movie = Object.assign({}, _.get(movie, 'data.movie'))
    const torrentHash = _.get(movie, 'torrents[0].hash')
    if (torrentHash)
        console.log("Hash is here => " + torrentHash)
    // console.log(JSON.stringify(movie))

    if (!movie) {
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

    var image;
    if (!movie.large_cover_image)
        image = noImage
    else
        image = `${movie.large_cover_image}`
    return (
        <MoviePage>
            <Header />
            <Content>
                <Title>{movie.title}</Title>
                <HR />
                <Split>
                    <Left>
                        {movie.yt_trailer_code && <Iframe src={"https://www.youtube.com/embed/" + movie.yt_trailer_code} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></Iframe>}
                        <Video controls autoPlay src={movieLink}>
                        </Video>
                        <Text>Torrents: </Text>
                        {torrentHash && <span><Link onClick={startPlaying}>YTS Torrent</Link></span>}
                        <Text>Comments: </Text>
                        <Com movie={movieID} />
                    </Left>
                    <Right>
                        <Text>Grade: {movie.rating}</Text>
                        <Picture src={image} alt={`${movie.title}Image`} />
                        <Text>Release Date: {movie.year}</Text>
                        <Text>Duration: {movie.runtime}min</Text>
                    </Right>
                </Split>
            </Content>
            <Footer />
        </MoviePage >
    );
}

const Link = styled.button`
  border-color: blue;
  background-color: blue;
  color: white;
  border-radius: 5px;
  padding: 10px 15px;
  transition-duration: 0.3s;
  &:hover {
    color: black;
    background-color: white;
    border-color: white
  }
`;

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
const Iframe = styled.iframe`
    margin: 5vmin; 
    width: 60vmin;
    height: 30vmin;
`;

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
    height: 40vmin;

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

const Override = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;