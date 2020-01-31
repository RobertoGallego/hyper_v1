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
import { useTranslation } from 'react-i18next';

export default function ProfileCard(props) {
  const { t, i18n } = useTranslation();
  const { username, prenom, nom, email, createdAt } = props;
  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };
  let language = i18n.language;

  function onChange(e) {
    changeLanguage(e.target.value);
    localStorage.setItem('language', e.target.value);
  };

  return (
    <Container className="container-fluid">
      <div className="row mt-5 justify-content-center">
        <div className="col-11 col-xl-4">
          <h2>{t('profile.title')}</h2>
          <Hr />
        </div>
      </div>
      <div className="row mt-4 justify-content-center">
        <div className="col-11 col-md-4 col-xl-2 text-center">
          <Img
            src={profilePic}
            className="card-img-top mb-4"
            alt="Profile pic"
          />
        </div>
        <div className="col-11 col-md-4 col-xl-2">
          <h6>{t('username')}: {username}</h6>
          <h6 className="mt-4">{t('firstName')}: {prenom}</h6>
          <h6 className="mt-4">{t('lastName')}: {nom}</h6>
          <h6 className="mt-4">{t('email')}: {email}</h6>
          <h6 className="mt-4">
            {t('joinedIn')} <Moment format="MMM YYYY">{createdAt}</Moment>
          </h6>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        <div className="col-11 col-xl-4 text-center">
          <Button
            type="button"
            className="btn btn-danger"
            as={Link}
            to={"/edit"}
          >
            {t('profile.btn')}
          </Button>
        </div>
      </div>
      <div className="row mt-4 justify-content-center">
        <div className="col-11 col-xl-4 text-center">
          <HyperLink to="/modifypassword">{t('profile.link')}</HyperLink>
        </div>
      </div>
      <div className="row mt-4 justify-content-center">
        <div className="col-11 col-xl-4">
          <h2>{t('preferences')}</h2>
          <Hr />
        </div>
      </div>
      <div className="row mt-4 mb-4 justify-content-center">
        <div className="col-11 col-xl-2 text-center">
          <h6>{t('changeLanguage')}</h6>
        </div>
        <div className="col-11 col-xl-2 text-center">
          <Select defaultValue={language} onChange={onChange}>
            <option value="en">
              {t('english')}
            </option>
            <option value="fr">
              {t('french')}
            </option>
          </Select>
        </div>
      </div>
    </Container>
  );
}
