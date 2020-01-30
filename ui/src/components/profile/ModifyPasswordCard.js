import React, { useContext, useState } from "react";
import {
  Container,
  Input,
  Alert,
  Button,
  HyperLink,
  Hr
} from "./StyledComponentsProfile";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../../context/auth";
import { useForForm } from "../../util/hooks";

export default function ModifyPasswordCard() {
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
    update(_, { data: { modifyPassword: userData } }) {
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
    <Container className="container-fluid">
      <div className="row mt-5 justify-content-center">
        <div className="col-sm-8 col-xl-4">
          <h2>Modify password</h2>
          <Hr />
        </div>
      </div>
      <div className="row mt-4 justify-content-center">
        <div className="col-sm-8 col-xl-4 text-center">
          <h6>Your password has been successfully modified!</h6>
        </div>
      </div>
      <div className="text-center mt-4">
        <HyperLink href="/profile">Return to profile</HyperLink>
      </div>
    </Container>
  ) : (
    <Container className="container-fluid">
      <div className="row mt-5 justify-content-center">
        <div className="col-sm-8 col-xl-4">
          <h2>Modify password</h2>
          <Hr />
        </div>
      </div>
      <div className="row mt-4 justify-content-center">
        <div className="col-sm-6 col-xl-2">
          <form onSubmit={onSubmit}>
            <label for="oldPassword">Old password</label>
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
            <label for="newPassword">New password</label>
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
            <label for="confirmPassword">Confirm new password</label>
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
            <div className="text-center mt-4">
              <Button type="submit" className="btn btn-danger">
                Save new password
              </Button>
            </div>
          </form>
          <div className="text-center mt-4">
            <HyperLink href="/profile">Return to profile</HyperLink>
          </div>
        </div>
      </div>
    </Container>
  );

  if (!loading) {
    return Render;
  } else {
    return (
      <Container className="container-fluid">
        <div className="row mt-5 justify-content-center">
          <div className="col-sm-8 col-xl-4">
            <h2>Modify password</h2>
            <Hr />
          </div>
        </div>
        <div className="row mt-4 justify-content-center">
          <div className="col-sm-8 col-xl-4 text-center">
            <h6>Loading ...</h6>
          </div>
        </div>
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
