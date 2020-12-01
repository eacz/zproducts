import React, { useState, useContext } from 'react';
import Router, { useRouter } from 'next/router';
import { css } from '@emotion/core';
import firebase, { firebaseContext } from '../firebaseF';

import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, FieldError } from '../components/ui/Form';
import Error404 from '../components/layout/404';

import FileUploader from 'react-firebase-file-uploader';
import useValidation from '../hooks/useValidation';
import newProductValidation from '../validation/newProductValidation';

const initialState = {
    name: '',
    enterprise: '',
    //image: '',
    url: '',
    description: '',
};

const NewProduct = () => {
    //image state
    const [imageName, setImageName] = useState('');
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    //

    //image upload functions
    const handleProgress = progress => setProgress({ progress });

    const handleUploadStart = () => {
        setProgress(0);
        setUploading(true);
    };
    const handleUploadError = error => {
        setUploading(error);
        console.error(error);
    };

    const handleUploadSuccess = name => {
        setProgress(100);
        setUploading(false);
        setImageName(name);
        firebase.storage
            .ref('products')
            .child(name)
            .getDownloadURL()
            .then(url => {
                //console.log(url);
                setImageUrl(url);
            });
    };
    //

    const { values, errors, handleChange, handleSubmit } = useValidation(
        initialState,
        newProductValidation,
        createNewProduct
    );
    const { name, enterprise, image, url, description } = values;

    const { user, firebase } = useContext(firebaseContext);
    //console.log(user)
    const router = useRouter();

    async function createNewProduct() {
        if (!user) {
            router.push('/login');
        }

        const product = {
            name,
            enterprise,
            url,
            imageUrl,
            description,
            votes: 0,
            comments: [],
            created: Date.now(),
            creator: {
                id: user.uid,
                name: user.displayName,
            },
            usersVotes: [],
        };

        //insert on the db with firebase
        firebase.db.collection('products').add(product);

        return router.push('/');
    }

    if (!user)
        return (
            <Layout>
                <Error404 message="You have to be logged to create a product" />
            </Layout>
        );

    return (
        <Layout>
            <>
                <h1
                    css={css`
                        text-align: center;
                        margin-top: 5rem;
                    `}>
                    New product
                </h1>
                <Form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>General information</legend>

                        <Field>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Product's name"
                                value={name}
                                onChange={handleChange}
                            />
                        </Field>
                        {errors.name && <FieldError>{errors.name}</FieldError>}

                        <Field>
                            <label htmlFor="enterprise">Enterprise</label>
                            <input
                                type="text"
                                name="enterprise"
                                id="enterprise"
                                placeholder="Product's enterprise"
                                value={enterprise}
                                onChange={handleChange}
                            />
                        </Field>
                        {errors.enterprise && (
                            <FieldError>{errors.enterprise}</FieldError>
                        )}

                        <Field>
                            <label htmlFor="image">Image</label>
                            <FileUploader
                                accept="image/*"
                                name="image"
                                id="image"
                                randomizeFilename
                                storageRef={firebase.storage.ref('products')}
                                onUploadStart={handleUploadStart}
                                onUploadError={handleUploadError}
                                onUploadSuccess={handleUploadSuccess}
                                onProgress={handleProgress}
                            />
                        </Field>
                            
                        <Field>
                            <label htmlFor="url">URL</label>
                            <input
                                type="url"
                                name="url"
                                id="url"
                                placeholder="URL"
                                value={url}
                                onChange={handleChange}
                            />
                        </Field>
                        {errors.url && <FieldError>{errors.url}</FieldError>}
                    </fieldset>
                    <fieldset>
                        <legend>About your product</legend>

                        <Field>
                            <label htmlFor="description">Description</label>
                            <textarea
                                name="description"
                                id="description"
                                placeholder="Describe your product"
                                value={description}
                                onChange={handleChange}
                            />
                        </Field>
                        {errors.description && (
                            <FieldError>{errors.description}</FieldError>
                        )}
                    </fieldset>

                    <InputSubmit type="submit" value="Add product" />
                </Form>
            </>
        </Layout>
    );
};

export default NewProduct;
