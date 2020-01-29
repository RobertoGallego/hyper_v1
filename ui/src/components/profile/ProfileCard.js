import React from "react";
import {
  Container,
  Hr,
  Img,
  Button,
  Select,
  HyperLink
} from "./StyledComponentsProfile";
import profilePic from "../../assets/images/profilePic2.png";
import Moment from "react-moment";
import { Link } from "react-router-dom";

export default function ProfileCard(props) {
  const { username, prenom, nom, email, createdAt } = props;

  return (
    <Container className="container-fluid">
      <div className="row mt-5 justify-content-center">
        <div className="col-xl-4">
          <h2>Profile</h2>
          <Hr />
        </div>
      </div>
      <div className="row mt-4 justify-content-center">
        <div className="col-xl-2 text-center">
          <Img src={profilePic} className="card-img-top" alt="Profile pic" />
        </div>
        <div className="col-xl-2">
          <h6>Username: {username}</h6>
          <h6 className="mt-4">First name: {prenom}</h6>
          <h6 className="mt-4">Last name: {nom}</h6>
          <h6 className="mt-4">Email: {email}</h6>
          <h6 className="mt-4">
            Joined in <Moment format="MMM YYYY">{createdAt}</Moment>
          </h6>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        <div className="col-xl-4 text-center">
          <Button
            type="button"
            className="btn btn-danger"
            as={Link}
            to={"/edit"}
          >
            Edit profile
          </Button>
        </div>
      </div>
      <div className="row mt-4 justify-content-center">
        <div className="col-xl-4 text-center">
          <HyperLink href="/modifypassword">Modify your password</HyperLink>
        </div>
      </div>
      <div className="row mt-4 justify-content-center">
        <div className="col-xl-4">
          <h2>Preferences</h2>
          <Hr />
        </div>
      </div>
      <div className="row mt-4 justify-content-center">
        <div className="col-xl-2 text-center">
          <h6>Change language:</h6>
        </div>
        <div className="col-xl-2 text-center">
          <Select>
            <option value="0">English</option>
            <option value="1">French</option>
            <option value="2">Spanish</option>
          </Select>
        </div>
      </div>
    </Container>
  );
}
