import React, { useContext } from "react";
import styled from "styled-components";
import Header from "../general/Header";
// import Footer from "../general/Footer";
import ProfileCard from "./ProfileCard";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../../context/auth";
import { useTranslation } from "react-i18next";
import { FadeLoader } from "react-spinners";
import { Container, Footer } from "./StyleForProfile";

const Override = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  /* border-color: white; */
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
  const { loading } = true;
  const userId = user.user.id;
  const {
    data: { getUser }
  } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: userId
    }
  });

  if (!getUser) {
    return (
      <Override className="sweet-loading">
        <FadeLoader size={20} color={"#db202c"} loading={loading} />
      </Override>
    );
  } else {
    const {
      prenom,
      nom,
      username,
      createdAt,
      email,
      image,
      facebookId,
      googleId,
      fortytwoId
    } = getUser;
    return (
      <div>
        <Header />
        <Container>
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
          <Footer>
            <p>{t("footer")}</p>
          </Footer>
        </Container>
      </div>
    );
  }
}
