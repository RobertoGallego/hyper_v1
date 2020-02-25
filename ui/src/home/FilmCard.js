import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import noImage from "../assets/images/noImage.png";
import { Hr } from "../components/profile/StyleForProfile";
import { useTranslation } from "react-i18next";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";

const SEEN_MOVIES_QUERY = gql`
  query($userId: ID!) {
    getUser(userId: $userId) {
      seenMovies
    }
  }
`;

export default function FilmCard({id, title, poster_path, vote_average, overview, release_date}) {
    const { t } = useTranslation();
    // const user = useContext(AuthContext);
    // const userId = user.user.id;
    // const { data: { seenMovies } } = useQuery(SEEN_MOVIES_QUERY, {
    //     variables: {
    //       userId: userId
    //     }
    // });

    // const seen = seenMovies.includes(id);

    var image;
    if (!poster_path)
        image = noImage
    else
        image = `https://image.tmdb.org/t/p/original${poster_path}`;
    if (id) {
        return (
            <Link to={`/movie/${id}`}>
                <Card>
                    {/* {seen ? <Picture seen src={image} alt={`${title}Image`}/> : <Picture src={image} alt={`${title}Image`}/>} */}
                    <Picture src={image} alt={`${title}Image`}/>
                    <Overlay>
                        <Text>
                            <Title>{title}</Title>
                            <Hr />
                            <Details>
                                {t('viewer.date')}: {release_date}
                                <br />
                                {t('viewer.grade')}: {vote_average}
                            </Details>
                            <Overview>
                                <br />
                                {overview}
                            </Overview>
                        </Text>
                    </Overlay>
                </Card>
            </Link>
        );
    }
    return '';
}

const Picture = styled.img`
    width: 100%;
    height: 100%;

    opacity: ${props => props.seen ? "0.4" : "1"};
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: .5s ease;
    overflow: auto;
`;

const Card = styled.div`
    position: relative;
    margin-bottom: 1vh;
    width: 20vmin;
    height: 30vmin;

    &:hover ${Overlay} {
        opacity: 0.85;
        background-color: #000000;
    }
`;

const Text = styled.div`
    color: white;
    margin: 1vmin;
`;

const Title = styled.div`
    text-align: center;
    font-size: 2vmin;
`;

const Details = styled.div`
    font-size: 0.9vmin;
`;

const Overview = styled.div`
    font-size: 1.1vmin;
`;
