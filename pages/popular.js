import React from 'react';
import useProducts from '../hooks/useProducts';

import Layout from '../components/layout/Layout';
import ProductDetails from '../components/layout/ProductDetails';

const Popular = () => {
    const order = {
        field: 'votes',
        type: 'desc',
    };
    const { products } = useProducts(order);

    return (
        <div className="">
            <Layout>
                <div className="list-products">
                    <div className="container">
                        <ul className="bg-white">
                            {products.map(product => (
                                <ProductDetails
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default Popular;
