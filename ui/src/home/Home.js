import React from 'react';
import styled from 'styled-components';
import MenuBar from '../components/general/MenuBar';
import Footer from '../components/general/Footer';
import Film from './FilmCard';

function Home() {
    return (
        <div>
            <MenuBar />
            <List>
                <Film />
                <Film />
                <Film />
                <Film />
                <Film />
                <Film />
                <Film />
                <Film />
                <Film />
                <Film />
                <Film />
                <Film />
                <Film />
                <Film />
                <Film />
                <Film />
                <Film />
                <Film />
                <Film />
                <Film />
                <Film />
                <Film />
                <Film />
                <Film />
            </List>
            <Footer/>
        </div>
    );
}

const List = styled.div`
    margin: 2vmin auto 0 ;
    width: 70vw;
    min-height: 75vh;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`

export default Home;
