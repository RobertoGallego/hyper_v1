import React from 'react';
import styled from 'styled-components';

export default function FilmCard() {
    return (
        <Card>
            <Picture src='https://images-na.ssl-images-amazon.com/images/I/41g1na32tAL._SX322_BO1,204,203,200_.jpg' alt='filmImage'/>
            <Text>
                7.5/10
            </Text>
            <Text>
                Film Name
            </Text>
        </Card>
    );
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