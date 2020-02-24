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

    const FETCH_INFO_TMDB = gql`
    query($id: ID!){
        getInfoTMDB(id: $id){
            id
            title
            poster_path
            vote_average
            overview
            release_date
            runtime
        }
    }`;

    const FETCH_INFO_YTS = gql`
    query($name: String!){
        getInfoYTS(name: $name){
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

    const FETCH_INFO_TPB = gql`
    query($name: String!){
        getInfoTPB(name: $name){
            name
            magnetLink
        }
    }`;
    
    const movieLink = useState("");
    const [Show, setShow] = useState(false);
    const [Go, setGo] = useState(false);
    const Finisheds = () => {
        console.log("Waiting ...");
    }
    const [Finished, setFinished] = useState(Finisheds);
    const [nameMovie, setNameMovie] = useState("");

    const movieID = useParams().id;
    const infoTMDB = useQuery(FETCH_INFO_TMDB, {
        variables: {
            id: movieID
        }
    });
    
    const Tmdb = infoTMDB.data.getInfoTMDB;
    if (Tmdb && nameMovie === ""){
        setNameMovie(Tmdb.title);
    }
    
    const infoTpb = useQuery(FETCH_INFO_TPB, {
        variables: {
            name: nameMovie
        }
    });
    const infoYts = useQuery(FETCH_INFO_YTS, {
        variables: {
            name: nameMovie
        }
    });

    const ytsMovies = _.get(infoYts.data.getInfoYTS, 'movies');
    const tpbMovies = infoTpb.data.getInfoTPB;
    
    let ytsMov
    let ytsHash
    if (ytsMovies){
        ytsMov = ytsMovies.find(e => e.title === nameMovie);
        if (ytsMov)
            ytsHash = ytsMov.torrents[0];
    }

    let tpbMov
    let tpbHash
    if (tpbMovies){
        tpbMov = tpbMovies.find(e => e.name.includes(nameMovie + " ("));
        if (tpbMov)
            tpbHash = tpbMov.magnetLink;
    }

    let movie = infoTMDB.data.getOneMovie;
    movie = Object.assign({}, _.get(movie, 'data.movie'))
    const torrentHash = _.get(movie, 'torrents[0].hash')
    if (torrentHash)
        console.log("Hash is here => " + torrentHash)
    if (!Tmdb) {
        return <h3> Loading... </h3>;
    }
    const renderer = ({ seconds, completed }) => {
        if (completed) {
            // Render a completed state
            setFinished(Finish())
            return <Completionist />;
        } else {
            // Render a countdown
            return <span>Wait ... {seconds}</span>;
        }
    };
    const Completionist = () => <span>Let's START</span>;
    let Texton = <Countdown date={Date.now() + 40000} renderer={renderer} />
    function startDownloading() {
        setGo(true);
        axios.get(`http://localhost:5000/downloadMovie/${movieID}/${torrentHash}`)
            .then(data => {
                console.log("\n\n DATA : " + JSON.stringify(data))
                if (data.data.status === "Downloading") {
                    console.log(data.data.message + " " + data.data.percentage + " %");
                }
                else
                    console.log("Erro Downloading ??")
            })
            .catch(error => {
                console.log(error)
            });
    }
    const Finish = () => {
        setShow(true);
        setGo(false)
    }
    var image;
    if (!Tmdb.poster_path)
        image = noImage
    else
        image = `https://image.tmdb.org/t/p/original${Tmdb.poster_path}`

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
                        <source src={`http://localhost:5000/playMovie/${movieID}`} type="video/webm" />
                    </Video>}
                    <Text > Torrents: </Text>
                    {!Go && torrentHash && <span> <Link1 onClick={startDownloading}> YTS TORRENT </Link1></span>}
                    {Go && <span> <Link2 onClick={Finished}>{Texton}</Link2></span>}

                    <Text > Comments: </Text> 
                    <Com movie={movieID}/>
                </Left> 
                <Right >
                    <Text > Grade: {
                        Tmdb.vote_average
                    } </Text> <
                        Picture src={
                            image
                        }
                        alt={
                            `${Tmdb.title}Image`
                        }
                    /> <Text> Release Date: {
                        Tmdb.release_date
                    } </Text> <Text> Duration: {
                        Tmdb.runtime
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
  border-radius: 80px;
  padding: 20px 20px;
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
  border-radius: 50px;
  padding: 20px 250px;
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