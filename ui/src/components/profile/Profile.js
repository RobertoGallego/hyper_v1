import React, { useContext } from "react";
import styled from "styled-components";
import Header from "../general/Header";
import Footer from "../general/Footer";
import ProfileCard from "./ProfileCard";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../../context/auth";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const FETCH_USER_QUERY = gql`
  query($userId: ID!) {
    getUser(userId: $userId) {
      facebookId
      googleId
      fortytwoId
      email
      username
      prenom
      nom
      createdAt
      image
    }
  }
`;

export default function Profile() {
  const { t } = useTranslation();
  const user = useContext(AuthContext);
  const userId = user.user.id;
  const { data: { getUser }} = useQuery(FETCH_USER_QUERY, { 
    variables: {
      userId: userId
    }
  });

  if (!getUser) {
    return <h3>{t('loading')}</h3>;
  } else {
    const { prenom, nom, username, createdAt, email, image, facebookId, googleId, fortytwoId } = getUser;
    return (
      <Container>
        <Header />
        <ProfileCard
          prenom={prenom}
          nom={nom}
          username={username}
          createdAt={createdAt}
          email={email}
          image={image}
          facebookId={facebookId}
          googleId={googleId}
          fortytwoId={fortytwoId}
        />
        <Footer />
      </Container>
    );
  }
}
