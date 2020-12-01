import React, { useEffect, useContext, useState } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { firebaseContext } from '../../firebaseF';

import Error404 from '../../components/layout/404';
import Layout from '../../components/layout/Layout';
import { Field, InputSubmit } from '../../components/ui/Form';
import Button from '../../components/ui/Button';

const ProductContainer = styled.div`
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`;

const ProductCreator = styled.p`
    padding: 0.5rem 2rem;
    background-color: var(--principal);
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
`;

const Producto = () => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [comment, setComment] = useState({});
    const [queryDB, setQueryDB] = useState(true);

    const router = useRouter();
    const {
        query: { id },
    } = router;

    const { firebase, user } = useContext(firebaseContext);

    useEffect(() => {
        if (id && queryDB) {
            const getProduct = async () => {
                const productQ = await firebase.db
                    .collection('products')
                    .doc(id);
                const product = await productQ.get();
                if (product.exists) {
                    setProduct(product.data());
                    setQueryDB(false);
                } else {
                    setError(true);
                    setQueryDB(false);
                }
            };
            getProduct();
        }
    }, [id, queryDB]);

    if (error)
        return (
            <Layout>
                <Error404 message="Seems like this product doesn't exists :(" />
            </Layout>
        );

    if (Object.keys(product).length === 0) return 'Loading...';

    const {
        comments,
        description,
        enterprise,
        imageUrl,
        name,
        created,
        url,
        votes,
        usersVotes,
        creator,
    } = product;

    //votes
    const handleVote = () => {
        if (!user) {
            return router.push('/');
        }

        const newVotes = votes + 1;

        if (usersVotes.includes(user.uid)) return;

        const newUsersVotes = [...usersVotes, user.uid];

        //update votes on the db
        firebase.db.collection('products').doc(id).update({
            votes: newVotes,
            usersVotes: newUsersVotes,
        });

        //update the state
        setProduct({
            ...product,
            votes: newVotes,
        });
        setQueryDB(true); //query the db again
    };

    //comments
    const commentChange = e => {
        setComment({ ...comment, [e.target.name]: e.target.value });
    };

    const addComment = e => {
        e.preventDefault();
        if (!user) {
            return router.push('/');
        }

        comment.userID = user.uid;
        comment.userName = user.displayName;

        const newComments = [...comments, comment];

        //update bd
        firebase.db
            .collection('products')
            .doc(id)
            .update({ comments: newComments });

        //update state
        setProduct({ ...product, comments: newComments });

        setQueryDB(true); //query the db again
    };

    const isCreator = id => {
        if (creator.id == id) {
            return true;
        }
    };

    //delete product
    const canDelete = () => {
        if (!user) return false;

        if (creator.id === user.uid) {
            return true;
        }
    };

    const deleteProduct = async () => {
        if (!user) return router.push('/login');

        if (creator.id !== user.uid) return router.push('/');
        try {
            await firebase.db.collection('products').doc(id).delete();
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            {error && <Error404 message="The product doesn't exists" />}
            <div className="container">
                <h1
                    css={css`
                        text-align: center;
                        margin-top: 2rem;
                    `}>
                    {name}
                </h1>
                <ProductContainer>
                    <div>
                        <p>Created: {formatDistanceToNow(new Date(created))}</p>
                        <img src={imageUrl} alt="name" />
                        <p>{description}</p>

                        {user && (
                            <>
                                <h2>What do you think about this product?</h2>
                                <form onSubmit={addComment}>
                                    <Field>
                                        <input
                                            type="text"
                                            name="message"
                                            id="message"
                                            placeholder="Share your thoughts"
                                            onChange={commentChange}
                                        />
                                    </Field>
                                    <InputSubmit type="submit" value="Send" />
                                </form>
                            </>
                        )}
                        <h2
                            css={css`
                                margin: 2rem 0;
                            `}>
                            Comments
                        </h2>
                        {comments.length === 0 ? (
                            'There is no comments yet, be the first one!'
                        ) : (
                            <ul>
                                {comments.map((comment, i) => (
                                    <li
                                        key={`${comment.userID}-${i}`}
                                        css={css`
                                            border: 1px solid var(--gray3);
                                            padding: 2rem;
                                        `}>
                                        <p>{comment.message}</p>
                                        <p>
                                            By:
                                            <span
                                                css={css`
                                                    font-weight: bold;
                                                `}>
                                                {' '}
                                                {comment.userName}
                                            </span>
                                        </p>
                                        {isCreator(comment.userID) && (
                                            <ProductCreator>
                                                Creator
                                            </ProductCreator>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <aside
                        css={css`
                            margin-top: 5rem;
                        `}>
                        <Button
                            bgColor="#273ea3"
                            textColor="#ffffff"
                            target="_blank"
                            href={url}>
                            Check the product's website
                        </Button>

                        <p>
                            Created by: {creator.name} from {enterprise}
                        </p>

                        <div
                            css={css`
                                margin-top: 6rem;
                            `}>
                            <p>Votes: {votes}</p>
                            {user && <Button onClick={handleVote}>Vote</Button>}
                        </div>
                    </aside>
                </ProductContainer>
                {canDelete() && (
                    <Button onClick={deleteProduct}>Delete Product</Button>
                )}
            </div>
        </Layout>
    );
};

export default Producto;
