import React from 'react';
import styled from 'styled-components';

const Footer = styled.div`
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
`

const FooterA = styled.div`
    display: flex;
    align-content: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin: 2rem 5rem 2rem;
    & a {
        color: rgb(112, 112, 112);
        text-decoration: none;
        margin: 0 0 0 0.5rem;
    }
    & a:hover {
        text-decoration: underline;
    }
    & p {
        color: rgb(112, 112, 112);
        text-decoration: none;
    }
`

const FooterB = styled.div`
    display: flex;
    align-content: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    & a {
        color: rgb(112, 112, 112);
        text-decoration: none;
        margin: 0 5rem 2rem;
    }
    & a:hover {
        text-decoration: underline;
    }
`

const FooterC = styled.div`
    width: 200px;
    margin: 0 5rem 2rem;
    color: #000;
    & select {
        background-color: #000;
        color: white;
        padding: 0.7rem;
        width: 100px;
        border: #454545 solid 1px;
        box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
        -webkit-appearance: button;
        appearance: button;
        outline: none;
    }
    & Footer-c:hover::before {
        color: rgba(255, 255, 255, 0.6);
        background-color: rgba(255, 255, 255, 0.2);
    }
`

export default function footer() {
    return (
        <Footer>
            <FooterA>
                <p>Questions? Call</p>
                <a href='/#'>085-220-626</a>
            </FooterA>
            <FooterB>
                <a href='/#'>Gift Card Terms</a>
                <a href='/#'>Terms of Use</a>
                <a href='/#'>Privacy Statement</a>
            </FooterB>
            <FooterC>
                <select>
                    <option value='0'>English</option>
                    <option value='1'>Français</option>
                </select>
            </FooterC>
        </Footer>
    );
}

