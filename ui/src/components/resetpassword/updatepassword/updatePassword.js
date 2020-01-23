import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { AuthContext } from '../../../context/auth';
import { useForForm } from '../../../util/hooks';
import PropTypes from "prop-types"

// const SERVER_URI = "localhost:3000"

export default function UpdatePassword(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const { onSubmit, onChange, values } = useForForm(passwordResetCallback, {
        password: '',
        confirmPassword: ''
    });
    const [submitted, setsubmitted] = useState(false);

    const [passwordReset, { loading }] = useMutation(UPDATE_PASSWORD, {
        update(_, { data: { password: userData }}) {
            context.login(userData, setsubmitted(!submitted));
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function passwordResetCallback() {
        passwordReset();
    }

    // console.log(values.email);
    // console.log(submitted);
    const UpdatePassword = submitted ? (
        <Main>
            <h1>Update Profile</h1>
            <Info>
                Your new password has been saved !.
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
                <h1>Update Profile</h1>
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
                    Submit
                </Button>
            </Form>
            <Signup>
                <p>New to Hypertube?</p>
                <a href='/register'>Sign up now.</a>
            </Signup>
        </Main>
    );
    return UpdatePassword;
}

UpdatePassword.propTypes = {
    token: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired
}

const UPDATE_PASSWORD = gql`
  mutation register(
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
        id
        email
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
    font-size: 0.9rem;
    color: #e87c03;
    margin: -1.3rem 0 1rem;
`;
