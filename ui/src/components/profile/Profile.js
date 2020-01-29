import React, { useContext } from "react";
import styled from "styled-components";
import Header from "../general/Header";
import Footer from "../general/Footer";
import ProfileCard from "./ProfileCard";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../../context/auth";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const FETCH_USER_QUERY = gql`
  query($userId: ID!) {
    getUser(userId: $userId) {
      prenom
      nom
      username
      createdAt
      email
    }
  }
`;

export default function Profile() {
  const user = useContext(AuthContext);
  const userId = user.user.id;

  const {
    data: { getUser }
  } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: userId
    }
  });

  if (!getUser) {
    return <h3>Loading ...</h3>;
  } else {
    const { prenom, nom, username, createdAt, email } = getUser;
    return (
      <Container>
        <Header />
        <ProfileCard
          prenom={prenom}
          nom={nom}
          username={username}
          createdAt={createdAt}
          email={email}
        />
        <Footer />
      </Container>
    );
  }
}
