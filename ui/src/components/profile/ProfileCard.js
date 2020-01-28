import React from "react";
import styled from "styled-components";
import profilePic from "../../assets/images/profilePic1.png";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex-grow: 1;
  background-color: #ffffff;
`;

const CardBox = styled.div`
  margin-top: 10vh;
  margin-bottom: 10vh;
`;

const CardBot = styled.div`
  background-color: #101010;
  border-radius: 7px;
`;

const Img = styled.img`
  border-radius: 50%;
  height: 215px;
  width: 215px;
  margin: auto;
  box-shadow: 10px 5px 10px #000000;
`;

const Title = styled.h2`
  color: #ffffff;
`;

const Username = styled.h3`
  color: #ffffff;
  margin-bottom: 22px;
`;

const Button = styled.button`
  background-color: #db202c;

  &:hover {
    background-color: #bc1e28;
  }
`;

const HyperLink = styled.a`
  color: #a5a5a5;

  &:hover {
    color: #cdcdcd;
    text-decoration: none;
  }
`;

export default function ProfileCard(props) {
  const { prenom, nom, username, createdAt } = props;
  return (
    <Container className="row p-0 m-0 justify-content-center">
      <CardBox className="col-10 col-sm-7 col-md-5 col-lg-4 col-xl-2 p-0">
        <CardBot className="card">
          <div className="text-center mt-3 mb-4">
            <Title>Profile</Title>
          </div>
          <Img src={profilePic} className="card-img-top" alt="Profile pic" />
          <div className="card-body mt-3">
            <Username className="card-title">{username}</Username>
            <h5 className="card-subtitle mt-2 mb-2">
              {prenom} {nom}
            </h5>
            <p className="card-text">
              Joined in <Moment format="MMM YYYY">{createdAt}</Moment>
            </p>
            <div className="text-center mt-5 mb-4">
              <Button
                type="button"
                className="btn btn-danger"
                as={Link}
                to={"/edit"}
              >
                Edit profile
              </Button>
            </div>
            <div className="text-center mb-2">
              <HyperLink href="/modifyPassword">Modify your password</HyperLink>
            </div>
          </div>
        </CardBot>
      </CardBox>
    </Container>
  );
}
