import React from "react";
import styled from "styled-components";
import profilePic from "../../assets/images/profilePic1.png";
// import gql from 'graphql-tag';
// import { Query } from 'react-apollo';

const Container = styled.div`
  flex-grow: 1;
`;

const Card = styled.div`
  background-color: #101010;
  border-radius: 7px;
`;

const Img = styled.img`
  border-radius: 50%;
  height: 215px;
  width: 215px;
  margin: auto;
  border: 1px solid;
  border-color: #000000;
  box-shadow: 10px 5px 10px #000000;
`;

const Header = styled.h5`
  color: #ffffff;
  background-color: #101010;
`;

const Username = styled.h4`
  color: #ffffff;
`;

const Button = styled.button`
  background-color: #DB202C;

  &:hover {
    background-color: #BC1E28;
  }
`;

// const USER_QUERY = gql`
//     query getUser($userId: ID!) {
//         User(userId: $userId) {
//           username
//         }
//     }
// `;

export default function ProfileCard(props) {
  // let userID = props.id;
  // userID = parseInt(userID);
  return (
    <Container className="row p-0 m-0 justify-content-center mt-5 mb-5">
      <div className="col-10 col-sm-7 col-md-5 col-lg-4 col-xl-2 p-0">
        <Card className="card">
          <Header className="card-header text-center mb-3">
            Profile
          </Header>
          <Img src={profilePic} className="card-img-top" alt="Profile pic" />
          <div className="card-body mt-3">
            <Username className="card-title">kwatanab</Username>
            <h6 className="card-subtitle mb-2 text-muted">Kyoya Watanabe</h6>
            <p className="card-text text-muted">Joined in 2020</p>
            <div className="text-center">
              <Button type="button" className="btn btn-danger">Edit</Button>
            </div>
          </div>
        </Card>
      </div>
    </Container>
    // <Query query={USER_QUERY} variables={{userID}}>
    //   {
    //     ({loading, error, data}) => {
    //       if (loading) return (<h4>Loading ...</h4>);
    //       if (error) console.log(error);
    //       const username = data.User;
    //       return (<h4>{username}</h4>)
    //     }
    //   }
    // </Query>
  );
}
