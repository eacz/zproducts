import styled from '@emotion/styled';

const Button = styled.a`
    font-weight: 700;
    text-transform: uppercase;
    display: block;
    border: 1px solid #d1d1d1;
    padding: 0.6rem 1.2rem;
    margin: 2rem .8rem;
    text-align: center;
    background-color: ${props => (props.bgColor ? props.bgColor : 'white')};
    color: ${props => (props.textColor ? props.textColor : 'black')};

    &:last-of-type {
        margin-right: 0;
    }

    :hover {
        cursor: pointer;
    }
`;

export default Button;
