import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();

    return (
        <Container>
            <Text>{t('footer')}</Text>
        </Container>
    )
}

