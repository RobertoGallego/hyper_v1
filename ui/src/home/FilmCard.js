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
                    <Picture src={image} alt={`${title}Image`}/>
                    <Text>
                        {vote_average}
                    </Text>
                    <Text>
                        {title}
                    </Text>
                </Card>
            </Link>
        );
    }
    return '';
}

const Picture = styled.img`
width: 20vmin;
height: 25min;
margin: 0 auto;
`;

const Text = styled.span`
text-align: center;
margin: -4vmin 0 0 0 ;
font-size: 1.5vmin;
opacity: 0;
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
    &:hover ${Text} {
        opacity: 1;
    }
    margin: 0 0 8vmin 0;
`