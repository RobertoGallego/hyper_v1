import React from 'react';
import styled from "styled-components";
import { useTranslation } from 'react-i18next';

export default function Footer () {
    const { t } = useTranslation();

    return (
        <Container>
            <Text>{t('footer')}</Text>
        </Container>
    )
}

// const Button = styled.button`
// background: ${props => props.theme.colors.buttonBackground};
// color: ${props => props.theme.colors.buttonColor};
// display: block;
// margin-top: 24px;
// max-width: 100%;
// border: none;
// line-height: 36px;
// padding: 0 12px;
// border-radius: 4px;
// font-size: 14px;
// `;

const Container = styled.div`
    background: ${props => props.theme.colors.cardBackground};
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    text-align: center
`;

const Text = styled.p`
    padding: 25px;
    margin: 0;
    color: #A5A5A5;
`;