import React from 'react';
import styled from 'styled-components';
import Header from './header';
import Formin from './form';
import Footer from './footer';
import background from '../../assets/images/background.jpg';

const Signin = styled.div`
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${background}) no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;

    display: flex;
    min-height: 100vh;
    flex-direction: column;
`

export default function signin() {
    return (
        <Signin>
            <Header/>
            <Formin/>
            <Footer/>
        </Signin>
    );
}
