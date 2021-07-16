import React, { Component } from 'react';
import Title from './Title'
import Product from './Product'
import { ProdutoConsumer } from '../context'

class ProductList extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <Title name="Nossos" title="produtos" />
                        <div className="row">
                            <ProdutoConsumer>
                                {value => {
                                    return value.products.map(product => {
                                        return <Product key={product.id} product={product} />
                                    })
                                }}
                            </ProdutoConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ProductList;