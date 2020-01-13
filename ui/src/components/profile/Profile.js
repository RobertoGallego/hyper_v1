import React from 'react';
import styled from 'styled-components';
import Header from '../general/Header';
import Footer from '../general/Footer';

export default function Profile() {
    return (
        <Profil>
            <Header/>
                <Content>
                    <Title>Profile</Title>
                    <hr/>
                    <Text>
                        Username: 
                    </Text>
                    <Picture src='https://images-na.ssl-images-amazon.com/images/I/41g1na32tAL._SX322_BO1,204,203,200_.jpg' alt='profileImage'/>
                    <Text>
                        First Name:
                    </Text>
                    <Text>
                        Last Name:
                    </Text>
                </Content>
            <Footer/>
        </Profil>
    );
}

const Profil = styled.div`
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

const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 70vmin;
    margin: 0 auto;
`

const Title = styled.h1`
font-size: 5em;
`;

const Picture = styled.img`
width: 25vmin;
height: 25min;
margin: 0 auto;
`;

const Text = styled.span`
text-align: center;
margin: 30px 0;
font-size: 1.5em;
`;