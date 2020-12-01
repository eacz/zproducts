import React, {useContext} from 'react';
import Link from 'next/link'
import styled from '@emotion/styled'

import { firebaseContext } from '../../firebaseF';

const NavT = styled.nav`
    padding-left:2rem;
    grid-column:1/5;
    grid-row:2/3;
    a {
        font-size: 1.8rem;
        margin-left: 2rem;
        color: var(--gray2);
        font-family: 'PT Sans', sans-serif;

        &::last-of-type{
            margin-right: 0;
        }
    }
    @media (min-width: 900px){
        grid-column:3/4;
        grid-row:1/2;
    }
`

const Nav = () => {
    const {user} = useContext(firebaseContext)

    return (
        <NavT>
            <Link href="/"><a>Home</a></Link>
            <Link href="/popular"><a>Popular</a></Link>
            {user && <Link href="/new-product"><a>New product</a></Link>}
            
        </NavT>
    );
};

export default Nav;
