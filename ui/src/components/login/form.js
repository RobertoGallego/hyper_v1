import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { SocialIcon } from 'react-social-icons';
import { useForm } from 'react-hook-form';

import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { AuthContext } from '../../context/auth';

export default function Formin(props) {
    const context = useContext(AuthContext);
    const { handleSubmit, register, errors } = useForm(loginUserCallback, {
        username: '',
        password: ''
    });
    const [rememberMe, setrememberMe] = useState(false);

    const onSubmit = values => {
        // values.preventDefault();
        // console.log(values.email);
        console.log(values.email);
        console.log(values.password);
    };
    // console.log(rememberMe);

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData } }) {
            context.login(userData);
            props.history.push('/');
        },
        variables: register
    });

    function loginUserCallback() {
        loginUser();
        // console.log(loginUser);
        // console.log(loginUserCallback);
    }

    return (
        <Main>
            <Form
                onSubmit={e => e.preventDefault()}
                noValidate
                className={loading ? 'loading' : ''}
            >
                <h1>Sign In</h1>
                {/* <label>Email or phone number</label> */}
                <Input
                    name='email'
                    type='text'
                    placeholder='Email'
                    ref={register({
                        required: '* Required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: 'Please enter a valid email.',
                            required: true,
                            maxLength: 50
                        }
                    })}
                />
                {errors.email && <Alert>{errors.email.message}</Alert>}
                <Input
                    name='password'
                    type='password'
                    placeholder='Password'
                    ref={register({
                        required: 'You must specify a password',
                        minLength: {
                            value: 6,
                            message: 'Password must have at least 6 characters',
                            required: true
                        }
                    })}
                />
                {errors.password && <Alert>{errors.password.message}</Alert>}
                <Info>
                    <label>
                        <Check
                            type='checkbox'
                            name='remember me'
                            // isChecked={rememberMe}
                            onChange={() => setrememberMe(!rememberMe)}
                        />
                        <Title>Remember me</Title>
                    </label>
                    <Link href='/#'>Need help?</Link>
                </Info>
                <Button type='submit' onClick={handleSubmit(onSubmit)}>
                    Sign In
                </Button>
            </Form>
            <Social>
                <div>
                    <SocialIcon url='http://facebook.com/rvgallego' />
                </div>
                <p>Login with Facebook</p>
            </Social>
            <Signup>
                <p>New to Hypertube?</p>
                <a href='/#'>Sign up now.</a>
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
    margin: 1rem 0 8rem;
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
    }
`;

const Social = styled.div`
    display: flex;
    align-content: center;
    justify-content: space-between;
    & p {
        margin: 0.5rem 0;
        color: rgb(112, 112, 112);
    }
`;

const Signup = styled.div`
    display: flex;
    align-content: center;
    justify-content: flex-start;
    & p {
        margin: 1rem 0;
        color: rgb(112, 112, 112);
    }
    & a {
        margin: 1rem 1.5rem;
        color: #fff;
        text-decoration: none;
    }
    & a:hover {
        text-decoration: underline;
    }
`;

const Alert = styled.p`
    font-size: 0.8rem;
    color: #e87c03;
    margin: -1.3rem 0 1rem;
`;
