import React, { useState } from 'react';
import Router from 'next/router';
import { css } from '@emotion/core';
import firebase from '../firebase';

import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, FieldError } from '../components/ui/Form';
import useValidation from '../hooks/useValidation';
import loginValidation from '../validation/loginValidation';

const initialState = {
    email: '',
    password: '',
};

const Login = () => {
    const { values, errors, handleSubmit, handleChange } = useValidation(
        initialState,
        loginValidation,
        login
    );
    const { email, password } = values;

    const [error, setError] = useState(false);

    async function login() {
        try {
            await firebase.login(email, password);
            setError(false)
            Router.push('/')
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    }

    return (
        <Layout>
            <>
                <h1
                    css={css`
                        text-align: center;
                        margin-top: 5rem;
                    `}>
                    Login
                </h1>
                <Form onSubmit={handleSubmit}>
                    <Field>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Your email"
                            value={email}
                            onChange={handleChange}
                        />
                    </Field>
                    {errors.email && <FieldError>{errors.email}</FieldError>}
                    <Field>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={handleChange}
                        />
                    </Field>
                    {errors.password && (
                        <FieldError>{errors.password}</FieldError>
                    )}
                    <InputSubmit type="submit" value="Login" />
                    {error && <FieldError>{error}</FieldError>}
                </Form>
            </>
        </Layout>
    );
};

export default Login;
