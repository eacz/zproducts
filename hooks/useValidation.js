import React, { useState, useEffect } from 'react';

//this take a initial state, what are the form's fields that we want to validate, validation is the function that have the validation rules for each field, and fn is the function that will be executed if everything is ok

const UseValidation = (initialState, validation, fn) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [submitForm, setSubmitForm] = useState(false);
    useEffect(() => {
        if (submitForm) {
            const isError = Object.keys(errors).length === 0;
            if (isError) {
                fn();
            }
            setSubmitForm(false);
        }
    }, [errors]);

    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const validationErrors = validation(values);
        setErrors(validationErrors);
        setSubmitForm(true);
    };

    const handleBlur = () => {
        const validationErrors = validation(values);
        setErrors(validationErrors);
    }

    return {
        values, //pbject conformed with the value of each field
        errors, //the errors object is made with the idea of store the error message of each field
        handleChange, //the usual handlechange
        handleSubmit, //the usual handle submit
        handleBlur 
    };
};

export default UseValidation;
