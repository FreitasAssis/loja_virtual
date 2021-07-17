import React, { Component } from 'react';
import Title from './Title'
import Product from './Product'

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://5d6da1df777f670014036125.mockapi.io/api/v1/product',
            products: [],
        };
    }

    componentDidMount() {
       this.loadProducts()
    }

    loadProducts() {
        fetch(this.state.url).then(response => {
            return response.json();
            }).then(data => {
                this.setState({ products: data });
            }).catch(() => {
                console.log("Falhou");
            })
    }
    render() {
        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <Title name="Nossos" title="produtos" />
                        <div className="row">
                            {this.state.products.map(product => {
                                return <Product key={product.id} product={product} />
                            })}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ProductList;