import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { SocialIcon } from 'react-social-icons';
import { useTranslation } from 'react-i18next';

import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { AuthContext } from '../../context/auth';
import { useForForm } from '../../util/hooks';
import iconSocial from '../../assets/images/42-icon.png';

export default function Formin(props) {
    const { t } = useTranslation();
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onSubmit, onChange, values } = useForForm(loginUserCallback, {
        username: '',
        password: ''
    });
    const [rememberMe, setrememberMe] = useState(false);

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData } }) {
            context.login(userData);
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function loginUserCallback() {
        loginUser();
    }

    // console.log (loginUser.username);

    return (
        <Main>
            <Form
                onSubmit={onSubmit}
                noValidate
                className={loading ? 'loading' : ''}
            >
                <h1>{t('login.title')}</h1>
                {/* <label>Email or phone number</label> */}
                <Input
                    name='username'
                    required = "required"
                    type='text'
                    placeholder={t('username')}
                    maxLength = "30"
                    value={values.username}
                    onChange={onChange}
                    error={errors.username ? true : false}
                />
                {Object.keys(errors).length > 0 && (<Alert>{errors.username}</Alert>)}
                <Input
                    name='password'
                    required = "required"
                    type='password'
                    placeholder={t('password')}
                    maxLength = "30"
                    value={values.password}
                    onChange={onChange}
                    error={errors.password ? true : false}
                />
                {Object.keys(errors).length > 0 && (<Alert>{errors.password}</Alert>)}
                <Info>
                    <Label>
                        <Check
                            type='checkbox'
                            name='remember me'
                            onChange={() => setrememberMe(!rememberMe)}
                        />
                        <Title>{t('login.rememberMe')}</Title>
                    </Label>
                    <Link href='/resetpassword'>{t('login.forgotPassword')}</Link>
                </Info>
                <Button type='submit' primary>
                    {t('login.title')}
                </Button>
            </Form>
            {/* {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                <ul className="list">
                    {Object.values(errors).map((value) => (
                    <li key={value}>{value}</li>
                    ))}
                </ul>
                </div>)} */}
            <Social>
                <div>
                    <SocialIcon fgColor="#fff" network="facebook" url='http://localhost:5000/auth/facebook' style={{ height: 35, width: 35 }}/>
                </div>
                <SocialI>
                    <a href="/login"><img src={iconSocial} alt='42' /></a>
                </SocialI>
                <p>{t('login.facebook')}</p>
            </Social>
            <Signup>
                <p>{t('login.hypertube')}</p>
                <a href='/register'>{t('login.signUp')}</a>
            </Signup>
        </Main>
    );
}

const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
            email
            username
            createdAt
            token
        }
    }
`;

const Main = styled.main`
    box-sizing: border-box;
    width: 28rem;
    margin: 2rem auto 5rem;
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
    padding: 3rem 4.5rem 2rem;
    border-radius: 3px;

    flex: 1;
`;

const Label = styled.label`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const SocialI = styled.div`
    margin-right: 3rem;
`

const Form = styled.form`
    & h1 {
        margin: 0 0 2rem 0;
        color: white;
    }
`;

const Input = styled.input`
    background-color: #454545;
    border: 0;
    border-radius: 5px;
    color: #fff;
    padding: 0.9rem 0;
    text-indent: 1rem;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 0 0 1.5rem;
    cursor: default;
    outline: 0;
    width: 100%;
    ::placeholder {
        text-align: center;
        text-indent: -0.1rem;
    }
    & p {
        color: #fff;
    }
`;

const Button = styled.button`
    background-color: #e50914;
    border: 0;
    border-radius: 5px;
    color: #fff;
    padding: 0.9rem;
    width: 100%;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 1rem 0 7rem;
    cursor: pointer;
    outline: 0;
`;

const Info = styled.div`
    display: flex;
    align-content: center;
    justify-content: space-between;
    font-size: 14px;
    margin: 1rem 0 0;
`;

const Check = styled.input`
    position: absolute;
    margin: 0.2rem 0;
    border: 0;
    height: 20px;
    width: 20px;
    background-color: #eee;
`;

const Title = styled.p`
    margin: 0 0 0 1.5rem;
    color: rgb(112, 112, 112);
`;

const Link = styled.a`
    color: rgb(112, 112, 112);
    text-decoration: none;
    &:hover {
        text-decoration: underline;
        color: #fff;
    }
`;

const Social = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    & p {
        margin: 0.5rem 0;
        color: rgb(112, 112, 112);
    }
`;

const Signup = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    & p {
        margin: 1rem 0;
        color: rgb(112, 112, 112);
    }
    & a {
        margin: 1rem 0;
        color: #fff;
        text-decoration: none;
    }
    & a:hover {
        text-decoration: underline;
    }
`;

const Alert = styled.p`
    font-size: 0.9rem;
    color: #e87c03;
    margin: -1.3rem 0 1rem;
`;
