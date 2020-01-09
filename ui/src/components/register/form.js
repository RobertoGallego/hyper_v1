import React, { useRef } from 'react';
import styled from 'styled-components';
import { SocialIcon } from 'react-social-icons';
import { useForm } from 'react-hook-form';

export default function Formin() {
    const { handleSubmit, register, errors, watch } = useForm();
    const password = useRef({});
    password.current = watch('password', '');
    const onSubmit = values => {
        console.log(values);
    };

    // const onSubmit = async data => {
    // alert(JSON.stringify(data));
    // };

    return (
        <Main>
            <Form onSubmit={e => e.preventDefault()}>
                <h1>Sign Up</h1>
                {/* <label>Email or phone number</label> */}
                <Input
                    name='username'
                    type='text'
                    placeholder='Username'
                    maxLength='25'
                    ref={register({
                        required: '* Required',
                        pattern: {
                            value: /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){2,15}[a-zA-Z0-9]/,
                            message: 'Please enter a valid username.',
                            required: true
                        }
                    })}
                />
                {errors.username && <Alert>{errors.username.message}</Alert>}
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
                            required: true,
                            maxLength: 25
                        }
                    })}
                />
                {errors.password && <Alert>{errors.password.message}</Alert>}
                <Input
                    name='repassword'
                    type='password'
                    placeholder='Repeat Password'
                    ref={register({
                        validate: value =>
                            value === password.current ||
                            'The passwords do not match'
                    })}
                />
                {errors.repassword && (
                    <Alert>{errors.repassword.message}</Alert>
                )}
                <Button type='submit' onClick={handleSubmit(onSubmit)}>
                    Sign Up
                </Button>
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
