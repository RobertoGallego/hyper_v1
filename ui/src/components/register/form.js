import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { SocialIcon } from 'react-social-icons';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { AuthContext } from '../../context/auth';
import { useForForm } from '../../util/hooks';
import { useTranslation } from "react-i18next";

import ImagePicker from 'react-image-picker'
import profilePic1 from "../../assets/images/profilePic1.png";
import profilePic2 from "../../assets/images/profilePic2.png";
import profilePic3 from "../../assets/images/profilePic3.png";
import profilePic4 from "../../assets/images/profilePic4.png";
import "./index.css";
import iconSocial from '../../assets/images/42-icon.png';



export default function Formin(props) {
    const { t } = useTranslation();
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    
    const { onChange, onSubmit, values, onPick } = useForForm(registerUser, {
        username: '',
        prenom: '',
        nom: '',
        email: '',
        password: '',
        confirmPassword: '',
        image: ''
      });

    const imageList = [profilePic1, profilePic2, profilePic3, profilePic4]

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(
        _,
        {
        data: { register: userData }
        }
    ) {
        context.login(userData);
        props.history.push('/');
    },
    onError(err) {
        setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
    });

    function registerUser() {
        addUser();
    }

    // image: '/static/media/profilePic1.62db51f5.png'

    return (
        <Main>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h2>{t('signUp.title')}</h2>
                {Object.keys(errors).length > 0 && (<AlertD>{errors.image}</AlertD>)}
                <div>
                    <ImagePicker 
                        name='image'
                        required = "required"
                        error={errors.image ? true : false}
                        images={imageList.map((image, i) => ({src: image, value: i}))}
                        // onPick={() => {setonPick(image)}}
                        value={values.image}
                        onPick = {onPick}
                        
                        // onChange={onChange}
                        
                    />
                </div>  
                {Object.keys(errors).length > 0 && (<Alert>{errors.username}</Alert>)}
                {Object.keys(errors).length > 0 && (<AlertA>{errors.email}</AlertA>)}
                <Input
                    name='username'
                    required = "required"
                    type='text'
                    placeholder={t('username')}
                    maxLength='30'
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                />
                {Object.keys(errors).length > 0 && (<AlertB>{errors.email}</AlertB>)}
                <Input
                    name='email'
                    required = "required"
                    type='text'
                    placeholder='Email'
                    maxLength='30'
                    value={values.email}
                    error={errors.email ? true : false}
                    onChange={onChange}
                />
                {Object.keys(errors).length > 0 && (<Alert>{errors.prenom}</Alert>)}
                {Object.keys(errors).length > 0 && (<AlertA>{errors.nom}</AlertA>)}
                <Input
                    name='prenom'
                    required = "required"
                    type='text'
                    placeholder={t('firstName')}
                    maxLength='30'
                    value={values.prenom}
                    error={errors.prenom ? true : false}
                    onChange={onChange}
                />
                {Object.keys(errors).length > 0 && (<AlertB>{errors.nom}</AlertB>)}
                <Input
                    name='nom'
                    required = "required"
                    type='text'
                    placeholder={t('lastName')}
                    maxLength='30'
                    value={values.nom}
                    error={errors.nom ? true : false}
                    onChange={onChange}
                />
                {Object.keys(errors).length > 0 && (<Alert>{errors.password}</Alert>)}
                {Object.keys(errors).length > 0 && (<AlertA>{errors.confirmPassword}</AlertA>)}
                <Input
                    name='password'
                    required = "required"
                    maxLength='30'
                    type='password'
                    placeholder={t('password')}
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                />
                {Object.keys(errors).length > 0 && (<AlertB>{errors.confirmPassword}</AlertB>)}
                <Input
                    name="confirmPassword"
                    required = "required"
                    maxLength='30'
                    type='password'
                    placeholder={t('confirmPassword')}
                    value={values.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    onChange={onChange}
                />
                <Button type='submit' primary>
                    {t('signUp.title')}
                </Button>
                <Social>
                    <div>
                        <SocialIcon fgColor="#fff" network="facebook" url='http://localhost:5000/auth/facebook' style={{ height: 35, width: 35 }}/>
                    </div>
                    <SocialI>
                        <a href="http://localhost:5000/auth/42/callback"><img src={iconSocial} alt='42' /></a>
                    </SocialI>
                    <div>
                        <SocialIcon fgColor="#fff" network="google" url='http://localhost:5000/auth/google' style={{ height: 35, width: 35 }}/>
                    </div>
                </Social>
                <Login>
                    <p>{t('signUp.hypertube')}</p>
                    <a href='/login'>{t('signUp.login')}</a>
                </Login>
            </Form>
        </Main>
    );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $prenom: String!
    $nom: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $image: String!
  ) {
    register(
      registerInput: {
        username: $username
        prenom: $prenom
        nom: $nom
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        image: $image
      }
    ) {
        id
        email
        username
        prenom
        nom
        createdAt
        token
        image
    }
  }
`;

const Main = styled.main`
    box-sizing: border-box;
    margin: 1rem auto;
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
    padding: 3rem 4.5rem;
    border-radius: 3px;
    max-width: 90%;
    flex: 1;
`;

const SocialI = styled.div`
    margin-top: 0.5rem;
`

const Form = styled.form`
    & h2 {
        margin: 0 0 1rem 0;
        color: white;
        display: flex;
        justify-content: center;
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
    margin: 0 1% 1.5rem;
    cursor: default;
    outline: 0;
    width: 48%;
    min-width: 48%;

    ::placeholder {
        text-align: center;
        text-indent: -0.1rem;
    }
    @media (max-width: 768px) {
    flex-direction: row;
    width: 100%;
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
    margin: 1rem 0 1rem;
    cursor: pointer;
    outline: 0;
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

const Login = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    & p {
        margin: 1rem 0;
        color: rgb(112, 112, 112);
    }
    & a {
        margin: 1rem 0rem;
        color: #fff;
        text-decoration: none;
    }
    & a:hover {
        text-decoration: underline;
    }
`;

const Alert = styled.p`
    display: inline-block;
    font-size: 0.8rem;
    color: #e87c03;
    padding-top: 0rem; 
    width: 50%;
    text-align: center;
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const AlertA = styled.p`
    display: inline-block;
    font-size: 0.8rem;
    color: #e87c03;
    padding-top: 0rem; 
    width: 50%;
    text-align: center;
    @media (max-width: 768px) {
        display: none;
    }
`;

const AlertB = styled.p`
    display: none;
    @media (max-width: 768px) {
        display: inline-block;
        font-size: 0.8rem;
        color: #e87c03;
        padding-top: 0rem; 
        width: 100%;
        text-align: center;
    }
`;

const AlertD = styled.p`
/* margin: 0 0 0 -10rem; */
    /* position: ; */
    display: block;
    text-align: center;
    font-size: 0.8rem;
    color: #e87c03;
    margin: 0rem 0rem -0.5rem 0rem;
    padding-top: 0rem; 
    width: 100%;    /* padding: 0.9rem 0; */
    /* text-indent: 1rem; */
    /* display: absolute; */
`;