import React, { useContext, useState } from "react";
import {
  Container,
  Button,
  HyperLink,
  Input,
  Alert,
  Hr
} from "./StyledComponentsProfile";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../../context/auth";
import { useForForm } from "../../util/hooks";
import { useTranslation } from "react-i18next";

export default function EditCard(props) {
  const { t } = useTranslation();
  const { prenom, nom, username, email } = props;
  const context = useContext(AuthContext);
  const userId = context.user.id;
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const { onChange, onSubmit, values } = useForForm(editProfileCallback, {
    username: username,
    prenom: prenom,
    nom: nom,
    email: email
  });

  const [editProfile, { loading }] = useMutation(EDIT_PROFILE_MUTATION, {
    update(_, { data: { editProfile: userData } }) {
      setSuccess(!success);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {
      userId: userId,
      username: values.username,
      prenom: values.prenom,
      nom: values.nom,
      email: values.email
    }
  });

  function editProfileCallback() {
    editProfile();
  }

  const Render = success ? (
    <Container className="container-fluid">
      <div className="row mt-5 justify-content-center">
        <div className="col-sm-8 col-xl-4">
          <h2>{t('profile.edit.title')}</h2>
          <Hr />
        </div>
      </div>
      <div className="row mt-4 justify-content-center">
        <div className="col-sm-8 col-xl-4 text-center">
          <h6>{t('profile.edit.msg')}</h6>
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
          <h2>{t('profile.edit.title')}</h2>
          <Hr />
        </div>
      </div>
      <div className="row mt-4 justify-content-center">
        <div className="col-sm-6 col-xl-2">
          <form onSubmit={onSubmit}>
            <label htmlFor="username">{t('username')}</label>
            <Input
              name="username"
              required="required"
              type="text"
              placeholder={t('username')}
              value={values.username}
              error={errors.username ? true : false}
              onChange={onChange}
            />
            {Object.keys(errors).length > 0 && <Alert>{errors.username}</Alert>}
            <label htmlFor="prenom">{t('firstName')}</label>
            <Input
              name="prenom"
              required="required"
              type="text"
              placeholder={t('firstName')}
              value={values.prenom}
              error={errors.prenom ? true : false}
              onChange={onChange}
            />
            <label htmlFor="nom">{t('lastName')}</label>
            <Input
              name="nom"
              required="required"
              type="text"
              placeholder={t('lastName')}
              value={values.nom}
              error={errors.nom ? true : false}
              onChange={onChange}
            />
            {Object.keys(errors).length > 0 && <Alert>{errors.prenom}</Alert>}
            {Object.keys(errors).length > 0 && <Alert>{errors.nom}</Alert>}
            <label htmlFor="email">{t('email')}</label>
            <Input
              name="email"
              required="required"
              type="text"
              placeholder={t('email')}
              value={values.email}
              error={errors.email ? true : false}
              onChange={onChange}
            />
            {Object.keys(errors).length > 0 && <Alert>{errors.email}</Alert>}
            <div className="text-center mt-4">
              <Button type="submit" className="btn btn-danger">
                {t('save')}
              </Button>
            </div>
          </form>
          <div className="text-center mt-4 mb-4">
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
            <h2>{t('profile.edit.title')}</h2>
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

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile(
    $userId: ID!
    $username: String!
    $prenom: String!
    $nom: String!
    $email: String!
  ) {
    editProfile(
      userId: $userId
      username: $username
      prenom: $prenom
      nom: $nom
      email: $email
    ) {
      id
    }
  }
`;
