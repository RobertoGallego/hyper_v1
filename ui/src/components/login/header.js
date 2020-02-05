import React from 'react';
import logoTop from '../../assets/images/logo-top.png';
import styled from 'styled-components';

const Img = styled.img`
    margin: 1rem 2rem;
    @media (max-width: 768px) {
        display: block;
        align-items: center;
        margin: auto;
        padding-left: 1rem;
    }
`;

export default function Header() {
    return (
        <div>
            <a href="/login"><Img src={logoTop} alt='Netflix' /></a>
        </div>
    );
}