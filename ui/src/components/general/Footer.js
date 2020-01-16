import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    background-color: #101010;
    width: 100%;
`;

const Text = styled.p`
    padding: 25px;
    margin: 0;
`;

export default function Footer () {
    return (
        <Container>
            <Text className="text-muted text-center">Hypertube by kwatanab, groberto, qfadene and oumaysou &copy;</Text>
        </Container>
    )
}

