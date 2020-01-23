import React from 'react';
import logoTop from '../../assets/images/logo-top.png';
import styled from 'styled-components';

const Img = styled.img`
    margin: 1rem 2rem;
`;

export default function Header() {
    return (
        <div>
            <a href="/login"><Img src={logoTop} alt='Netflix' /></a>
        </div>
    );
}