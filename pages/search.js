import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useProducts from '../hooks/useProducts';

import Layout from '../components/layout/Layout';
import ProductDetails from '../components/layout/ProductDetails';

const Search = () => {
    const router = useRouter();
    const {
        query: { q },
    } = router;

    const order = {
        field: 'votes',
        type: 'desc',
    };
    const { products } = useProducts(order);

    const [productsFiltered, setProductsFiltered] = useState([]);

    useEffect(() => {
        if (!q) return;
        const search = q.toLowerCase();
        const productsFilter = products.filter(product => {
            return (
                product.name.toLowerCase().includes(search) ||
                product.description.toLowerCase().includes(search)
            );
        });
        setProductsFiltered(productsFilter);
    }, [q, products]);

    return (
        <Layout>
            <div className="list-products">
                <div className="container">
                    <ul className="bg-white">
                        {productsFiltered.map(product => (
                            <ProductDetails
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    );
};

export default Search;
