import React, { useContext, useState } from 'react';
import { Content, HyperLink, Card, Hr, MainForm, SubForm, Input, Alert, Button, Override } from './StyleForProfile';
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../../context/auth";
import { useForForm } from "../../util/hooks";
import { useTranslation } from "react-i18next";
import { FadeLoader } from "react-spinners";

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
        <Content>
            <Card>
                <h3>{t('profile.mPW.title')}</h3>
                <Hr />
                <h6>{t("profile.mPW.msg")}</h6>
                <HyperLink href="/profile">{t("profile.return")}</HyperLink>
            </Card>
        </Content>
    ) : (
        <Content>
            <Card>
                <h3>{t('profile.mPW.title')}</h3>
                <Hr />
                <MainForm onSubmit={onSubmit}>
                    <SubForm>
                        <label htmlFor="oldPassword">{t('oldPassword')}</label>
                        <Input
                            name="oldPassword"
                            required="required"
                            type="password"
                            placeholder={t('oldPassword')}
                            value={values.oldPassword}
                            error={errors.oldPassword ? true : false}
                            onChange={onChange}
                        />
                        {Object.keys(errors).length > 0 && (<Alert>{errors.oldPassword}</Alert>)}
                        <label htmlFor="newPassword">{t('newPassword')}</label>
                        <Input
                            name="newPassword"
                            required="required"
                            type="password"
                            placeholder={t('newPassword')}
                            value={values.newPassword}
                            error={errors.newPassword ? true : false}
                            onChange={onChange}
                        />
                        {Object.keys(errors).length > 0 && (<Alert>{errors.newPassword}</Alert>)}
                        <label htmlFor="confirmPassword">{t('confirmPassword')}</label>
                        <Input
                            name="confirmPassword"
                            required="required"
                            type="password"
                            placeholder={t('confirmPassword')}
                            value={values.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            onChange={onChange}
                        />
                        {Object.keys(errors).length > 0 && ( <Alert>{errors.confirmPassword}</Alert>)}
                        <Button type="submit" className="btn btn-danger">
                            {t('save')}
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
