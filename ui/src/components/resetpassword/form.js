import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { AuthContext } from '../../context/auth';
import { useForForm } from '../../util/hooks';

export default function Resetpassword(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const { onSubmit, onChange, values } = useForForm(emailUserCallback, {
        email: ''
    });
    const [submitted, setsubmitted] = useState(false);

    const [emailUser, { loading }] = useMutation(EMAIL_USER, {
        update(_, { data: { email: userData }}) {
            context.login(userData, setsubmitted(!submitted));
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function emailUserCallback() {
        emailUser();
    }

    // console.log(values.email);
    // console.log(submitted);
    const Resetpassword = submitted ? (
        <Main>
            <h1>Reset Password</h1>
            <Info>
              If that account is in our system, we emailed you a link to reset
              your password.
            </Info>
            <Signup>
                <a href='/login'>Return to login</a>
            </Signup>
        </Main>
    ) : (
            <Main>
            <Form
                onSubmit={onSubmit}
                noValidate
                className={loading ? 'loading' : ''}
            >
                <h1>Reset Password</h1>
                {/* <label>Email or phone number</label> */}
                <Input
                    name='email'
                    required = "required"
                    type='text'
                    placeholder='email'
                    maxLength='30'
                    value={values.email}
                    onChange={onChange}
                    error={errors.email ? true : false}
                />
                {Object.keys(errors).length > 0 && (<Alert>{errors.email}</Alert>)}
                <Button type='submit' primary>
                    Submit
                </Button>
            </Form>
            <Signup>
                <p>New to Hypertube?</p>
                <a href='/register'>Sign up now.</a>
            </Signup>
        </Main>
    );
    return Resetpassword;
}

const EMAIL_USER = gql`
    mutation emaily($email: String!) {
        emaily(email: $email) {
            id
            email
            username
            createdAt
            token
        }
    }
`;

const Info = styled.p`
    color: #fff;
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
    font-size: 0.9rem;
    color: #e87c03;
    margin: -1.3rem 0 1rem;
`;
