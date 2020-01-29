import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    background-color: #191919;
    width: 100%;
    text-align: center
`;

const Text = styled.p`
    padding: 25px;
    margin: 0;
    color: #A5A5A5;
`;

export default function Footer () {
    return (
        <Container>
            <Text>Hypertube by Team YodaDame &copy;</Text>
        </Container>
    )
}

