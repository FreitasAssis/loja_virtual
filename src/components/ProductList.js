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
                data.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
                this.setState({ products: data });
            }).catch(() => {
                console.log("Falhou");
            })
    }

    orderList(e) {
        const products = this.state.products
        switch (e) {
            case 1:
                products.sort((a,b) => (parseInt(a.price) > parseInt(b.price)) ? 1 : ((parseInt(b.price) > parseInt(a.price)) ? -1 : 0))
                break;
            case 2:
                products.sort((a,b) => (parseInt(b.price) > parseInt(a.price)) ? 1 : ((parseInt(a.price) > parseInt(b.price)) ? -1 : 0))
                break;
            case 3:
                products.sort((a,b) => (a.createdAt > b.createdAt) ? 1 : ((b.createdAt > a.createdAt) ? -1 : 0))
                break;
            case 4:
                products.sort((a,b) => (b.createdAt > a.createdAt) ? 1 : ((a.createdAt > b.createdAt) ? -1 : 0))
                break;
            default:
                products.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
                break;
        }
        this.setState({ products: products})
    }

    render() {
        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <Title name="Nossos" title="produtos" />
                        <div className="form-group">
                            <label htmlFor="selectOrder">Ordene os itens por:</label>
                            <select className="form-control" id="selectOrder" onChange={e => this.orderList(e.target.selectedIndex)}>
                                <option>Ordem alfabética</option>
                                <option>Preço (menor primeiro)</option>
                                <option>Preço (maior primeiro)</option>
                                <option>Data do anúncio (antigos primeiro)</option>
                                <option>Data do anúncio (recentes primeiro)</option>
                            </select>
                        </div>
                        <div className="row product-list">
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