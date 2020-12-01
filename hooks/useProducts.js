import { useEffect, useState, useContext } from 'react';
import { firebaseContext } from '../firebaseF';

//query and return the products on the db, just need an object with the field and the order type for order

const useProducts = order => {
    const [products, setProducts] = useState([]);
    const { firebase } = useContext(firebaseContext);

    useEffect(() => {
        const getProducts = () => {
            firebase.db
                .collection('products')
                .orderBy(order.field, order.type)
                .onSnapshot(handleSnapshot);
        };
        getProducts();
    }, []);

    function handleSnapshot(snapshot) {
        const products = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        });

        setProducts(products);
    }
    return { products };
};

export default useProducts;
