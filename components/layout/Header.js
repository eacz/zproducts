import React, { useContext } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { firebaseContext } from '../../firebaseF';
//components
import Searcher from '../ui/Searcher';
import Nav from './Nav';
import Button from '../ui/Button';

//styled components
const ContainerHeader = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width: 768px) {
        display: flex;
        justify-content: space-between;
    }
`;

const Logo = styled.p`
    color: var(--principal);
    font-size: 4rem;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    line-height: 0;
`;

const ContainerNSL = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: repeat(4,1fr);
    align-items:center;
    justify-content:center;
    @media (min-width: 900px){
        grid-template-columns: 1fr 2fr 2fr;
        grid-template-rows: 1fr;
    }
`;

const Header = () => {
    const { user, firebase } = useContext(firebaseContext);
    return (
        <header
            css={css`
                border-bottom: 2px solid var(--gray3);
                padding: 1rem 0;
            `}>
            <ContainerHeader>
                <div>
                    <ContainerNSL>
                        <Link href="/">
                            <a>
                                <Logo>ZP</Logo>
                            </a>
                        </Link>

                        <Searcher />

                        <Nav />
                    </ContainerNSL>
                </div>

                <div
                    css={css`
                        display: flex;
                        align-items: center;
                    `}>
                    {user ? (
                        <>
                            <p
                                css={css`
                                    margin-right: 2rem;
                                `}>
                                Welcome: {user.displayName}
                            </p>
                            <Button
                                bgColor="#273ea3"
                                textColor="#fff"
                                onClick={() => firebase.logout()}>
                                Log out
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button bgColor="#273ea3" textColor="#fff">
                                    Login
                                </Button>
                            </Link>
                            <Link href="/create-account">
                                <Button>Create an account</Button>
                            </Link>
                        </>
                    )}
                </div>
            </ContainerHeader>
        </header>
    );
};

export default Header;
