import React from "react";
import Moment from "react-moment";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { useTranslation } from "react-i18next";
import { Container, Hr, Img } from "./StyledComponentsProfile";
import Header from "../general/Header";
import Footer from "../general/Footer";
import styled from "styled-components";

const FETCH_USER_QUERY = gql`
  query($userId: ID!) {
    getUser(userId: $userId) {
      username
      prenom
      nom
      createdAt
      image
    }
  }
`;

export default function ProfileView(props) {
  const { t } = useTranslation();
  const userId = props.match.params.id;
  const {
    data: { getUser }
  } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: userId
    }
  });
  if (!getUser) {
    return <h3>{t("loading")}</h3>;
  } else {
    const { prenom, nom, username, createdAt, image } = getUser;
    return (
      <BigContainer>
        <Header />
        <Container className="container-fluid">
          <div className="row mt-5 justify-content-center">
            <div className="col-11 col-xl-4">
              <h2>{t("profile.title")}</h2>
              <Hr />
            </div>
          </div>
          <div className="row mt-4 justify-content-center">
            <div className="col-11 col-md-4 col-xl-2 text-center">
              <Img
                src={image}
                className="card-img-top mb-4"
                alt="Profile pic"
              />
            </div>
            <div className="col-11 col-md-4 col-xl-2">
              <h6>
                {t("username")}: {username}
              </h6>
              <h6 className="mt-4">
                {t("firstName")}: {prenom}
              </h6>
              <h6 className="mt-4">
                {t("lastName")}: {nom}
              </h6>
              <h6 className="mt-4">
                {t("joinedIn")} <Moment format="MMM YYYY">{createdAt}</Moment>
              </h6>
            </div>
          </div>
        </Container>
        <Footer />
      </BigContainer>
    );
  }
}

const BigContainer = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;
