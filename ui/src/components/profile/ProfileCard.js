import React from 'react';
import { Content, Card, Hr, Infos, Img, Edit, Button, HyperLink, Preferences, Select } from './StyleForProfile';
import { useTranslation } from "react-i18next";
import Moment from 'react-moment';
import { Link } from "react-router-dom";

export default function ProfileCard(props) {
    const { username, prenom, nom, email, createdAt, image, facebookId, googleId, fortytwoId } = props;
    const { t, i18n } = useTranslation();
    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
    };
    let language = i18n.language;

    function onChange(e) {
        changeLanguage(e.target.value);
        localStorage.setItem("language", e.target.value);
    }

    return (
        <Content>
            <Card>
                <h3>{t("profile.title")}</h3>
                <Hr />
                <Infos>
                    <div>
                        <Img src={image} alt="Profile pic" />
                    </div>
                    <div>
                        <h6>{t("username")}: {username}</h6>
                        <h6>{t("firstName")}: {prenom}</h6>
                        <h6>{t("lastName")}: {nom}</h6>
                        <h6>{t("email")}: {email}</h6>
                        <h6>{t("joinedIn")}: <Moment format="MMM YYYY">{createdAt}</Moment></h6>
                    </div>
                </Infos>
                <Edit>
                    <Button type="button" className="btn btn-danger" as={Link} to={"/edit"}>
                        {t("profile.btn")}
                    </Button>
                    {facebookId !== "" || googleId !== "" || fortytwoId !== "" ? 
                        "" :
                        <HyperLink href="/modifypassword">{t("profile.link")}</HyperLink>
                    }
                </Edit>
                <h3>{t("preferences")}</h3>
                <Hr />
                <Preferences>
                    <h6>{t("changeLanguage")}</h6>
                    <Select defaultValue={language} onChange={onChange}>
                        <option value="en">{t("english")}</option>
                        <option value="fr">{t("french")}</option>
                        <option value="es">{t("spanish")}</option>
                    </Select>
                </Preferences>
            </Card>
        </Content>
    );
}