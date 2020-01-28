import React, { useContext, useState } from "react";
import {
  Container,
  CardBox,
  CardBot,
  Input,
  Alert,
  Button,
  HyperLink,
  Loading
} from "./StyledComponentsProfile";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../../context/auth";
import { useForForm } from "../../util/hooks";

export default function ModifyPasswordCard(props) {
  const context = useContext(AuthContext);
  const userId = context.user.id;
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const { onChange, onSubmit, values } = useForForm(modifyPasswordCallback, {
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [modifyPassword, { loading }] = useMutation(MODIFY_PASSWORD_MUTATION, {
    update(_, { data: { modifyPassword: userData }}) {
      setSuccess(!success);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {
      userId: userId,
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword
    }
  });

  function modifyPasswordCallback() {
    modifyPassword();
  }

  const Render = success ? (
    <Container className="row p-0 m-0 justify-content-center">
      <CardBox className="col-10 col-sm-7 col-md-5 col-lg-4 col-xl-2 p-0">
        <CardBot className="card">
          <div className="text-center mt-4 p-2">
            <h2>Modify your password</h2>
          </div>
          <div className="card-body mt-3 text-center">
            <p>Your password has been successfully modified !</p>
            <HyperLink href="/">Return to home</HyperLink>
          </div>
        </CardBot>
      </CardBox>
    </Container>
  ) : (
    <Container className="row p-0 m-0 justify-content-center">
      <CardBox className="col-10 col-sm-7 col-md-5 col-lg-4 col-xl-2 p-0">
        <CardBot className="card">
          <div className="text-center mt-4 p-2">
            <h2>Modify your password</h2>
          </div>
          <div className="card-body mt-3">
            <form onSubmit={onSubmit}>
              <Input
                name="oldPassword"
                required="required"
                type="password"
                placeholder="Old password"
                value={values.oldPassword}
                error={errors.oldPassword ? true : false}
                onChange={onChange}
              />
              {Object.keys(errors).length > 0 && (
                <Alert>{errors.oldPassword}</Alert>
              )}
              <Input
                name="newPassword"
                required="required"
                type="password"
                placeholder="New password"
                value={values.newPassword}
                error={errors.newPassword ? true : false}
                onChange={onChange}
              />
              {Object.keys(errors).length > 0 && (
                <Alert>{errors.newPassword}</Alert>
              )}
              <Input
                name="confirmPassword"
                required="required"
                type="password"
                placeholder="Confirm new password"
                value={values.confirmPassword}
                error={errors.confirmPassword ? true : false}
                onChange={onChange}
              />
              {Object.keys(errors).length > 0 && (
                <Alert>{errors.confirmPassword}</Alert>
              )}
              <div className="text-center mt-3 mb-4">
                <Button type="submit" className="btn btn-danger">
                  Save new password
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

  if (!loading) {
    return Render;
  } else {
    return (
      <Container className="row p-0 m-0 justify-content-center text-center">
        <Loading>Loading ...</Loading>
      </Container>
    );
  }
}

const MODIFY_PASSWORD_MUTATION = gql`
  mutation modifyPassword(
    $userId: ID!
    $oldPassword: String!
    $newPassword: String!
    $confirmPassword: String!
  ) {
    modifyPassword(
      userId: $userId
      oldPassword: $oldPassword
      newPassword: $newPassword
      confirmPassword: $confirmPassword
    ) {
      id
      username
    }
  }
`;
