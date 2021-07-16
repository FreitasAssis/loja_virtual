import React, { Component } from 'react'
import {Link} from "react-router-dom"
import styled from "styled-components"
import PropTypes from 'prop-types'
import Swal from 'sweetalert2'

class Product extends Component {
    addToCart(product) {
        const items = localStorage.getItem("items") !== null ? JSON.parse(localStorage.getItem("items")) : []
        if (items.some(e => e.id === product.id)) {
            Swal.fire({
                title: 'Ops...',
                text: 'Você já adicionou o produto ao carrinho!',
                icon: 'info'
            })
        } else {
            items.push(product)
            localStorage.setItem("items", JSON.stringify(items))
            Swal.fire({
                title: '<strong>Parabéns!</strong>',
                icon: 'success',
                html:
                  `Você adicionou <b>${product.name}</b> com sucesso ao carrinho!`,
                showCloseButton: true,
                showCancelButton: false,
                focusConfirm: true,
                confirmButtonText:
                  '<i class="fas fa-cart-plus"></i> <a href="/cart" class="text-white">Ver carrinho</a>'
            })
        }
    }
    render() {
        const {id, name, price, image} = this.props.product
        const items = localStorage.getItem("items") !== null ? JSON.parse(localStorage.getItem("items")) : []
        return (
            <ProdutoWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
                <div className="card">
                    <div className="img-container p-5">
                        <Link to={{pathname: "/details", product: this.props.product}}>
                            <img src={image} alt="produto" className="card-img-top" />
                        </Link>
                        <button className="cart-btn" onClick={() => {this.addToCart(this.props.product)}}>
                            {items.some(e => e.id === id) ? <p className="text-capitalize mb-8" disabled>No carrinho</p> : <i className="fas fa-cart-plus" />}
                        </button>
                    </div>
                    <div className="card-footer d-flex justify-content-between">
                        <p className="align-self-center mb-0">{name.length <= 20 ? name : name.substr(0, 19) + "..."}</p>
                        <h5 className="text-blue font-italic mb-0">
                            <span className="mr-1">R$ {price}</span>
                        </h5>
                    </div>
                </div>
            </ProdutoWrapper>
        );
    }
}

Product.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string,
        createdAt: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.string,
        image: PropTypes.string,
        stock: PropTypes.number,
    }).isRequired
}

const ProdutoWrapper = styled.div`
    .card {
        border-color: transparent;
        transition: all 1s linear;
    }
    .card-footer {
        background: transparent;
        border-top: transparent;
        transition: all 1s linear;
    }
    &:hover {
        .card {
            border: 0.04rem solid rgba(0, 0, 0, 0.02);
            box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.02);
        }
        .card-footer {
            background: rgba(247, 247, 247);
        }
    }
    .img-container {
        position: relative;
        overflow: hidden;
    }
    .card-img-top {
        transition: all 0.5s linear
    }
    .img-container:hover .card-img-top {
        transform: scale(1.2)
    }
    .cart-btn {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 0.2rem 0.4rem;
        background: var(--primaryBlue);
        color: var(--mainWhite);
        font-size: 1.4rem;
        border-radius: 0.5rem 0 0 0;
        transform: translate(100%, 100%);
        transition: all 0.5s linear;
    }
    .img-container:hover .cart-btn {
        transform: translate(0, 0);
    }
    .cart-btn:hover {
        background: var(--tertiaryBlue);
        cursor: pointer;
    }
`

export default Product;