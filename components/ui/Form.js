import styled from '@emotion/styled';

export const Form = styled.form`
    max-width: 600px;
    width: 95%;
    margin: 5rem auto 0 auto;

    fieldset {
        padding: 2rem;
        margin:2rem 0;
        font-size:2rem;
        border:1px solid var(--principal);
        legend {
            font-weight: 700;
        }
    }
`;

export const Field = styled.div`
    margin-bottom: 2rem;
    display: flex;
    align-items: center;

    label {
        flex: 0 0 150px;
        font-size: 1.8rem;
    }

    input,
    textarea {
        flex: 1;
        padding: 1rem;
    }
    textarea {
        height: 30rem;
    }
`;

export const InputSubmit = styled.input`
    background-color: var(--principal);
    width: 100%;
    padding: 1.5rem;
    text-align: center;
    color: #fff;
    font-size: 1.8rem;
    text-transform: uppercase;
    border: none;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;

    &:hover {
        cursor: pointer;
    }
`;

export const FieldError = styled.p`
    background-color: var(--gray3);
    padding: 1rem;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;
    font-size: 1.4rem;
    color: #e00000;
    text-align: center;
    text-transform: uppercase;
    margin: 2rem 0;
`;
