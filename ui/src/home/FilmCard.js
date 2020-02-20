import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import noImage from "../assets/images/noImage.png";


export default function FilmCard({id, title, poster_path, vote_average, overview, release_date, runtime}) {
    var image;
    if (!poster_path)
        image = noImage
    else
        image = `https://image.tmdb.org/t/p/original${poster_path}`;
    if (id) {
        return (
            <Link to={`/movie/${id}`}>
                <Card>
                    <Text>
                        {title}<br></br>{vote_average}<br></br>{release_date}<br></br>{runtime}<br></br>{overview}
                    </Text>
                    <Picture src={image} alt={`${title}Image`}/>
                </Card>
            </Link>
        );
    }
    return '';
}

const Picture = styled.img`
    width: 20vmin;
    height: 25min;
    margin: -50vmin auto;
    opacity: 0.3;
`;

const Text = styled.div`
    text-align: center;
    opacity: 0;
    height: 50vmin;
    font-size: 1.2vmin;
    overflow: auto;
    transition-duration: .5s;
    background-color: black;
`;

const Card = styled.div`
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
    background-color: #111111;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    display: flex;
    height: 25vmin;
    width: 20vmin;
    flex-direction: column;
    color: white;
    &:hover ${Picture} {
        opacity: 0;
    }
    &:hover ${Text} {
        opacity: 1;
    }
    margin: 0 0 8vmin 0;
`