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
import { useTranslation } from "react-i18next";

export default function ModifyPasswordCard() {
  const { t } = useTranslation();
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
          <h2>{t('profile.mPW.title')}</h2>
          <Hr />
        </div>
      </div>
      <div className="row mt-4 justify-content-center">
        <div className="col-sm-8 col-xl-4 text-center">
          <h6>{t('profile.mPW.msg')}</h6>
        </div>
      </div>
      <div className="text-center mt-4">
        <HyperLink to="/profile">{t('profile.return')}</HyperLink>
      </div>
    </Container>
  ) : (
    <Container className="container-fluid">
      <div className="row mt-5 justify-content-center">
        <div className="col-sm-8 col-xl-4">
          <h2>{t('profile.mPW.title')}</h2>
          <Hr />
        </div>
      </div>
      <div className="row mt-4 justify-content-center">
        <div className="col-sm-6 col-xl-2">
          <form onSubmit={onSubmit}>
            <label for="oldPassword">{t('oldPassword')}</label>
            <Input
              name="oldPassword"
              required="required"
              type="password"
              placeholder={t('oldPassword')}
              value={values.oldPassword}
              error={errors.oldPassword ? true : false}
              onChange={onChange}
            />
            {Object.keys(errors).length > 0 && (
              <Alert>{errors.oldPassword}</Alert>
            )}
            <label for="newPassword">{t('newPassword')}</label>
            <Input
              name="newPassword"
              required="required"
              type="password"
              placeholder={t('newPassword')}
              value={values.newPassword}
              error={errors.newPassword ? true : false}
              onChange={onChange}
            />
            {Object.keys(errors).length > 0 && (
              <Alert>{errors.newPassword}</Alert>
            )}
            <label for="confirmPassword">{t('confirmPassword')}</label>
            <Input
              name="confirmPassword"
              required="required"
              type="password"
              placeholder={t('confirmPassword')}
              value={values.confirmPassword}
              error={errors.confirmPassword ? true : false}
              onChange={onChange}
            />
            {Object.keys(errors).length > 0 && (
              <Alert>{errors.confirmPassword}</Alert>
            )}
            <div className="text-center mt-4">
              <Button type="submit" className="btn btn-danger">
                {t('save')}
              </Button>
            </div>
          </form>
          <div className="text-center mt-4">
            <HyperLink to="/profile">{t('profile.return')}</HyperLink>
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
            <h2>{t('profile.mPW.title')}</h2>
            <Hr />
          </div>
        </div>
        <div className="row mt-4 justify-content-center">
          <div className="col-sm-8 col-xl-4 text-center">
            <h6>{t('loading')}</h6>
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
