export default function loginValidation(values) {
    const errors = {};

    if (!values.email) {
        errors.email = 'The email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'The email is invalid';
    }

    if (!values.password) {
        errors.password = 'The password is required';
    } else if (values.password.length < 6) {
        errors.password = 'The must have at least 6 characters';
    }

    return errors;
}
