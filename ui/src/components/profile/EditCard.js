import React, { useContext, useState } from "react";
import { Content, Card, Hr, HyperLink, MainForm, Alert, SubForm, Input, Button, Override } from "./StyleForProfile";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../../context/auth";
import { useForForm } from "../../util/hooks";
import { useTranslation } from "react-i18next";
import ImagePicker from 'react-image-picker';
import profilePic1 from "../../assets/images/profilePic1.png";
import profilePic2 from "../../assets/images/profilePic2.png";
import profilePic3 from "../../assets/images/profilePic3.png";
import profilePic4 from "../../assets/images/profilePic4.png";
import { FadeLoader } from "react-spinners";

export default function EditCard(props) {
    const { t } = useTranslation();

    const { prenom, nom, username, email } = props;
    const imageList = [profilePic1, profilePic2, profilePic3, profilePic4];
    const context = useContext(AuthContext);
    const userId = context.user.id;
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const { onChange, onSubmit, values, onPick } = useForForm(editProfileCallback, {
        username: username,
        prenom: prenom,
        nom: nom,
        email: email,
        image: ''
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
          email: values.email,
          image: values.image
        }
    });
    function editProfileCallback() {
        editProfile();
    }

    const Render = success ? (
        <Content>
            <Card>
                <h3>{t('profile.edit.title')}</h3>
                <Hr />
                <h6>{t("profile.edit.msg")}</h6>
                <HyperLink href="/profile">{t("profile.return")}</HyperLink>
            </Card>
        </Content>
    ) : (
        <Content>
            <Card>
                <h3>{t("profile.edit.title")}</h3>
                <Hr />
                <MainForm onSubmit={onSubmit}>
                    <ImagePicker
                        name="image"
                        required="required"
                        error={errors.image ? true : false}
                        images={imageList.map((image, i) => ({ src: image, value: i }))}
                        value={values.image}
                        onPick={onPick}
                    />
                    {Object.keys(errors).length > 0 && (<Alert>{errors.image}</Alert>)}
                    <SubForm>
                        <label htmlFor="username">{t("username")}</label>
                        <Input
                            name="username"
                            required="required"
                            type="text"
                            placeholder={t("username")}
                            value={values.username}
                            error={errors.username ? true : false}
                            onChange={onChange}
                        />
                        {Object.keys(errors).length > 0 && <Alert>{errors.username}</Alert>}
                        <label htmlFor="prenom">{t("firstName")}</label>
                        <Input
                            name="prenom"
                            required="required"
                            type="text"
                            placeholder={t("firstName")}
                            value={values.prenom}
                            error={errors.prenom ? true : false}
                            onChange={onChange}
                        />
                        <label htmlFor="nom">{t("lastName")}</label>
                        <Input
                            name="nom"
                            required="required"
                            type="text"
                            placeholder={t("lastName")}
                            value={values.nom}
                            error={errors.nom ? true : false}
                            onChange={onChange}
                        />
                        {Object.keys(errors).length > 0 && <Alert>{errors.prenom}</Alert>}
                        {Object.keys(errors).length > 0 && <Alert>{errors.nom}</Alert>}
                        <label htmlFor="email">{t("email")}</label>
                        <Input
                            name="email"
                            required="required"
                            type="text"
                            placeholder={t("email")}
                            value={values.email}
                            error={errors.email ? true : false}
                            onChange={onChange}
                        />
                        {Object.keys(errors).length > 0 && <Alert>{errors.email}</Alert>}
                        <Button type="submit" className="btn btn-danger">
                            {t("save")}
                        </Button>
                    </SubForm>
                    <HyperLink href="/profile">{t("profile.return")}</HyperLink>
                </MainForm>
            </Card>
        </Content>
    )

    if (loading) {
        return (
            <Override className="sweet-loading">
                <FadeLoader size={20} color={"#db202c"} loading={loading} />
            </Override>
        )
    } else {
        return Render;
    }
}

const EDIT_PROFILE_MUTATION = gql`
    mutation editProfile(
        $userId: ID!
        $username: String!
        $prenom: String!
        $nom: String!
        $email: String!
        $image: String!
    ) {
        editProfile(
            userId: $userId
            username: $username
            prenom: $prenom
            nom: $nom
            email: $email
            image: $image
        ) {
            id
        }
    }
`;
