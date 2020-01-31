import React, { useContext } from "react";
import styled from "styled-components";
import Header from "../general/Header";
import Footer from "../general/Footer";
import EditCard from "./EditCard";
import { AuthContext } from "../../context/auth";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const FETCH_USER_QUERY = gql`
  query($userId: ID!) {
    getUser(userId: $userId) {
      email
      prenom
      nom
      username
    }
  }
`;

export default function Edit() {
  const { t } = useTranslation();
  const user = useContext(AuthContext);
  const userId = user.user.id;

  const {
    data: { getUser }
  } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId
    }
  });

  if (!getUser) {
    return <h3>{t('loading')}</h3>;
  } else {
    const { email, prenom, nom, username } = getUser;
    return (
      <Container>
        <Header />
        <EditCard
          email={email}
          prenom={prenom}
          nom={nom}
          username={username}
        />
        <Footer />
      </Container>
    );
  }
}
