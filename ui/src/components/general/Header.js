import React from 'react';
import styled from 'styled-components';
import Nav from './MenuBar'

const Img = styled.img`
    margin: 1rem 2rem;
`;

export default function Header() {
    return (
        <div>
            <Nav/>
        </div>
    );
}