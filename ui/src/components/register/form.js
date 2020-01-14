import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { SocialIcon } from 'react-social-icons';
// import { useForm } from 'react-hook-form';

import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { AuthContext } from '../../context/auth';
import { useForForm } from '../../util/hooks';

export default function Formin(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    
    const { onChange, onSubmit, values } = useForForm(registerUser, {
        username: '',
        prenom: '',
        nom: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

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
    // const onSubmit = async data => {
    // alert(JSON.stringify(data));
    // };
    console.log(values.username);
    console.log(values.prenom);
    console.log(values.nom);
    return (
        <Main>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Sign Up</h1>
                {/* <label>Email or phone number</label> */}
                <Input
                    name='username'
                    required = "required"
                    type='text'
                    placeholder='Username'
                    maxLength='30'
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                />
                {Object.keys(errors).length > 0 && (<Alert>{errors.username}</Alert>)}
                <Input
                    name='prenom'
                    required = "required"
                    type='text'
                    placeholder='Given name'
                    maxLength='30'
                    value={values.prenom}
                    error={errors.prenom ? true : false}
                    onChange={onChange}
                />
                {Object.keys(errors).length > 0 && (<Alert>{errors.prenom}</Alert>)}
                <Input
                    name='nom'
                    required = "required"
                    type='text'
                    placeholder='Family name'
                    maxLength='30'
                    value={values.nom}
                    error={errors.nom ? true : false}
                    onChange={onChange}
                />
                {Object.keys(errors).length > 0 && (<Alert>{errors.nom}</Alert>)}
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
                {Object.keys(errors).length > 0 && (<Alert>{errors.email}</Alert>)}
                <Input
                    name='password'
                    required = "required"
                    maxLength='30'
                    type='password'
                    placeholder='Password'
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                />
                {Object.keys(errors).length > 0 && (<Alert>{errors.password}</Alert>)}
                <Input
                    name="confirmPassword"
                    required = "required"
                    maxLength='30'
                    type='password'
                    placeholder="Confirm Password"
                    value={values.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    onChange={onChange}
                />
                {Object.keys(errors).length > 0 && (<Alert>{errors.password}</Alert>)}
                <Button type='submit' primary>
                    Sign Up
                </Button>
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
                        <SocialIcon url='http://facebook.com/rvgallego' />
                    </div>
                    <p>Login with Facebook</p>
                </Social>
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
  ) {
    register(
      registerInput: {
        username: $username
        prenom: $prenom
        nom: $nom
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
        id
        email
        username
        prenom
        nom
        createdAt
        token
    }
  }
`;

const Main = styled.main`
    box-sizing: border-box;
    width: 28rem;
    margin: 2rem auto 10rem;
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
    padding: 3rem 4.5rem 2rem;
    border-radius: 3px;

    flex: 1;
`;

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
    margin: 1rem 0 5rem;
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

const Alert = styled.p`
    font-size: 0.8rem;
    color: #e87c03;
    margin: -1.3rem 0 1rem;
`;
