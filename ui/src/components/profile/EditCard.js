import React from "react";
import styled from "styled-components";
import profilePic from "../../assets/images/profilePic1.png";

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

export default function EditCard(props) {
  const { prenom, nom, username, email } = props;
  return (
    <Container className="row p-0 m-0 justify-content-center">
      <CardBox className="col-10 col-sm-7 col-md-5 col-lg-4 col-xl-2 p-0">
        <CardBot className="card">
          <div className="text-center mt-3 mb-4">
            <h2>Edit</h2>
          </div>
          <Img
            src={profilePic}
            className="card-img-top"
            alt="Profile pic"
          />
          <div className="card-body mt-3">
            <form>
              <div class="form-group">
                <label for="usernameInput">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="usernameInput"
                  value={username}
                />
              </div>
              <div class="row mt-3">
                <div class="col">
                  <div class="form-group">
                    <label for="firstNameInput">First name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="firstNameInput"
                      value={prenom}
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label for="lastNameInput">Last name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="lastNameInput"
                      value={nom}
                    />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="emailInput">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="emailInput"
                  value={email}
                />
              </div>
              <div className="text-center mt-5 mb-4">
                <Button type="button" className="btn btn-danger">
                  Save
                </Button>
              </div>
            </form>
            <div className="text-center mb-2">
              <HyperLink href="/profile">Return to profile</HyperLink>
            </div>
          </div>
        </CardBot>
      </CardBox>
    </Container>
  );
}
