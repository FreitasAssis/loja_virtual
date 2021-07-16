import React, { Component } from 'react';

const ProdutoContext = React.createContext()

class ProdutoProvider extends Component {
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
                // console.table(this.state.products)
            }).catch(() => {
            console.log("Falhou");
            })
    }

    handleDetalhe() {
        console.log("pag de detalhe")
    }

    handleCarrinho() {
        console.log("pag de carrinho")
    }

    render() {
        return (
            <ProdutoContext.Provider value={{
                ...this.state,
                handleDetalhe: this.handleDetalhe,
                handleCarrinho: this.handleCarrinho
            }}>
                {this.props.children}
            </ProdutoContext.Provider>
        );
    }
}

const ProdutoConsumer = ProdutoContext.Consumer

export { ProdutoProvider, ProdutoConsumer };