import React, {
    useState
} from 'react';
import {
    useParams
} from 'react-router-dom';
import styled from 'styled-components';
import Header from '../general/Header';
import Footer from '../general/Footer';
import Com from './Comment';
import gql from "graphql-tag";
import noImage from "../../assets/images/noImage.png";
import {
    useQuery
} from "@apollo/react-hooks";
import axios from 'axios';
import Countdown from 'react-countdown-now';
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
    const movieLink = useState("");
    const [Show, setShow] = useState(false);
    const [Go, setGo] = useState(false);
    const movieID = useParams().id;
    const res = useQuery(FETCH_ONE_MOVIE, {
        variables: {
            id: movieID
        }
    })
    let movie = res.data.getOneMovie;
    movie = Object.assign({}, _.get(movie, 'data.movie'))
    const torrentHash = _.get(movie, 'torrents[0].hash')
    if (torrentHash)
        console.log("Hash is here => " + torrentHash)
    if (!movie) {
        return <h3> Loading... </h3>;
    }
    const renderer = ({ seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <Completionist />;
        } else {
            // Render a countdown
            return <span>{seconds}</span>;
        }
    };
    const Completionist = () => <span>Let's START</span>;
    // const { loading } = true;
    const startDownloading = async () => {
        setGo(true);
        await axios.get(`http://localhost:5000/downloadMovie/${movieID}/${torrentHash}`);
    }

    var image;
    if (!movie.large_cover_image)
        image = noImage
    else
        image = `${movie.large_cover_image}`

    return (<MoviePage >
        <Header />
        <Content >
            <Split >
                <Left > {movie.yt_trailer_code && < Iframe src={"https://www.youtube.com/embed/" + movie.yt_trailer_code}
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen > </Iframe>}
                    {!Show && <Video controls autoPlay loop="" >
                        <source src={movieLink} type="video/mp4" />
                    </Video>}
                    {Show && <Video controls autoPlay loop="" >
                        <source src={`http://localhost:5000/playMovie/${movieID}`} type="video/mp4" />
                        {/* <source src={`http://localhost:5000/playMovie/${movieID}`} type="video/webm" /> */}
                    </Video>}
                    <Text > Torrents: </Text>
                    {!Go && torrentHash && <span> <Link1 onClick={startDownloading}> YTS TORRENT </Link1></span>}
                    {Go && <span> <Link2 onClick={() => setShow(true)}><Countdown date={Date.now() + 10000} renderer={renderer} /></Link2></span>}

                    <Text > Comments: </Text> <
                        Com movie={
                            movieID
                        }
                    /> </Left> <Right >
                    <Text > Grade: {
                        movie.rating
                    } </Text> <
                        Picture src={
                            image
                        }
                        alt={
                            `${movie.title}Image`
                        }
                    /> <Text> Release Date: {
                        movie.year
                    } </Text> <Text> Duration: {
                        movie.runtime
                    }
                        min </Text> </Right> </Split> </Content>
        <Footer />
    </MoviePage >
    );
}
const Link2 = styled.button`
  border-color: red;
  background-color: red;
  color: black;
  border-radius: 5px;
  padding: 10px 15px;
  transition-duration: 0.3s;
  &:hover {
    color: black;
    background-color: white;
    border-color: white
  }
`;
const Link1 = styled.button`
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
// const HR = styled.hr`
//     border: 1px solid white;
// `
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
// const Title = styled.h1`
// font-size: 5vmin;
// `;
const Picture = styled.img`
width: 25vmin;
height: 25min;
margin: 0 auto;
`;
const Text = styled.span`
margin: 30px 0;
font-size: 1.5em;
`;