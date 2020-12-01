import React, {useState} from 'react';
import Router from 'next/router'
import { css } from '@emotion/core';
import firebase from '../firebase';

import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, FieldError } from '../components/ui/Form';
import useValidation from '../hooks/useValidation';
import validateCreateAccount from '../validation/createAccountValidation';

const initialState = {
    name: '',
    email: '',
    password: '',
};

const CreateAccount = () => {
    const { values, errors, handleChange, handleSubmit } = useValidation(
        initialState,
        validateCreateAccount,
        createAccount
    );
    const [error, setError] = useState(false)
    const { name, email, password } = values;

    async function createAccount() {
        try {
            await firebase.register(name, email, password);
            setError(false);
            Router.push('/')
        } catch (error) {
            //console.error('error creating the user ',error.message);
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
                    Create Account
                </h1>

                <Form onSubmit={handleSubmit}>
                    <Field>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Your name"
                            value={name}
                            onChange={handleChange}
                        />
                    </Field>

                    {errors.name && <FieldError>{errors.name}</FieldError>}

                    <Field>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
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

                    <InputSubmit type="submit" value="Create account" />

                    {error && <FieldError>{error}</FieldError>}
                </Form>
            </>
        </Layout>
    );
};

export default CreateAccount;
