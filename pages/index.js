import React from 'react';
import useProducts from '../hooks/useProducts';

import Layout from '../components/layout/Layout';
import ProductDetails from '../components/layout/ProductDetails';

export default function Home() {
    const order = {
        field: 'created',
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
}
