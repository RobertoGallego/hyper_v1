import React from "react";
import Moment from "react-moment";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { useTranslation } from "react-i18next";
import {
  Content,
  Card,
  Infos,
  Hr,
  Img,
  Footer,
  Container
} from "./StyleForProfile";
import Header from "../general/Header";

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
      <div>
        <Header />
        <Container>
          <Content>
            <Card>
              <h3>{t("profile.title")}</h3>
              <Hr />
              <Infos>
                <div>
                  <Img src={image} alt="Profile pic" />
                </div>
                <div>
                  <h6>
                    {t("username")}: {username}
                  </h6>
                  <h6>
                    {t("firstName")}: {prenom}
                  </h6>
                  <h6>
                    {t("lastName")}: {nom}
                  </h6>
                  <h6>
                    {t("joinedIn")}:{" "}
                    <Moment format="MMM YYYY">{createdAt}</Moment>
                  </h6>
                </div>
              </Infos>
            </Card>
          </Content>
          <Footer />
        </Container>
      </div>
    );
  }
}
