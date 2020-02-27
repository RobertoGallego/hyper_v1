import React, { useContext } from "react";
import styled from "styled-components";
import Header from "../general/Header";
import EditCard from "./EditCard";
import { AuthContext } from "../../context/auth";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { useTranslation } from 'react-i18next';
import { FadeLoader } from "react-spinners";
import { Container, Footer } from "./StyleForProfile";

const Override = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const FETCH_USER_QUERY = gql`
  query($userId: ID!) {
    getUser(userId: $userId) {
      email
      prenom
      nom
      username
      image
    }
  }
`;

export default function Edit() {
  const { t } = useTranslation();
  const user = useContext(AuthContext);
  const userId = user.user.id;
  const { loading } = true;

  const {
    data: { getUser }
  } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId
    }
  });

  if (!getUser) {
    return (
      <Override className="sweet-loading">
        <FadeLoader size={20} color={"#db202c"} loading={loading} />
      </Override>
    );
  } else {
    const { email, prenom, nom, username, image } = getUser;
    return (
      <div>
        <Header />
        <Container>
          <EditCard
            email={email}
            prenom={prenom}
            nom={nom}
            username={username}
            image={image}
          />
          <Footer>
            <p>{t("footer")}</p>
          </Footer>
        </Container>
      </div>
    );
  }
}
