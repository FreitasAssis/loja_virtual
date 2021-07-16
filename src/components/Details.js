import React from 'react';
import {Link, useLocation} from "react-router-dom"
import {ButtonContainer} from "./Button"
import moment from "moment"
import 'moment/locale/pt-br'
import Swal from 'sweetalert2'

function Details () {
    const items = localStorage.getItem("items") !== null ? JSON.parse(localStorage.getItem("items")) : []
    const product = useLocation().product
    const {id, createdAt, name, price, image, stock} = product
    const date = moment(createdAt).locale('pt-br').format('LL')

    function addToCart(product) {
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

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                    <h1>{name}</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3">
                    <img src={image} className="img-fluid" alt="product" />
                </div>
                <div className="col-10 mx-auto col-md-6 my-3 text-title text-muted">
                    <h4 className="mt-3 mb-2">Estoque: <span className="font-weight-bold">{stock} und</span></h4>
                    <h4 className="mt-3 mb-2 text-danger">Preço: <span className="font-weight-bold">R$ {price}</span></h4>
                    <p className="mt-3 mb-2 lead">Data do anúncio: <span className="font-weight-bold">{date}</span></p>
                    <div>
                        <Link to="/">
                            <ButtonContainer>Voltar</ButtonContainer>
                        </Link>
                        {!items.some(e => e.id === id) ?
                            <Link to="/cart" className="ml-auto">
                                <ButtonContainer onClick={() => {addToCart(product)}}>
                                    <span className="mr-2">    
                                        <i className="fas fa-cart-plus" />
                                    </span>
                                </ButtonContainer>
                            </Link> : 
                            <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Details;