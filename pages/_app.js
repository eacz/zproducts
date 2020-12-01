//import App from 'next/app';
import firebase, { firebaseContext } from '../firebaseF/index';
import useAuth from '../hooks/useAuth';

const MyApp = props => {
    const user = useAuth();

    const { Component, pageProps } = props;
    return (
        <firebaseContext.Provider value={{ firebase, user }}>
            <Component {...pageProps} />
        </firebaseContext.Provider>
    );
};

export default MyApp;
