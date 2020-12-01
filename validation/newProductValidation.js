export default function (values) {
    const errors = {};

    if (!values.name) {
        errors.name = 'The name is required';
    }
    if (!values.enterprise) {
        errors.enterprise = 'The enterprise name is required';
    }
    /*if (!values.image) {
        errors.image = 'An image is required';
    }*/
    if (!values.url) {
        errors.url = 'The URL of the product is required';
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
        errors.url = 'Invalid URL';
    }
    if (!values.description) {
        errors.description = 'Add a description to your product';
    }

    return errors;
}
