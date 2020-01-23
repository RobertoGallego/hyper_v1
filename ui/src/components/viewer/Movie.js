import React from 'react';
import styled from 'styled-components';
import Header from '../general/Header';
import Footer from '../general/Footer';
import Com from './Comment';

export default function Movie() {
    return (
        <MoviePage>
            <Header/>
                <Content>
                    <Title>Movie Title</Title>
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
                            <Text>Casting: </Text>
                            <Text>Production Year: </Text>
                            <Text>Duration: </Text>
                            <Picture src='https://images-na.ssl-images-amazon.com/images/I/41g1na32tAL._SX322_BO1,204,203,200_.jpg' alt='MoviePageImage'/>
                            <Text>Grade: </Text>
                            {/* ⭐⭐⭐⭐⭐ */}
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