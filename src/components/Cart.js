import React, { Component } from 'react';
import Title from './Title'
import styled from "styled-components"
import Swal from 'sweetalert2'
import {ButtonContainer} from "./Button"

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantidades: []
        };
    }
    componentDidMount() {
        this.getQuantidades()
    }
    getQuantidades() {
        const items = localStorage.getItem("items") !== null ? JSON.parse(localStorage.getItem("items")) : []
        let quantidades = []
        items.length ? items.forEach(() => { quantidades.push(1) }) : console.log("")
        this.setState({quantidades: quantidades})
    }
    setQuantidades(e, i) {
        if (e === '0') {
            this.delItem(i)
        } else {
            let quantidades = this.state.quantidades
            quantidades[i] = e
            this.setState({quantidades: quantidades})
        }
    }
    delItem(i) {
        Swal.fire({
            title: 'Ops...',
            text: 'Deseja excluir o item do carrinho?',
            icon: 'error',
            showDenyButton: true,
            confirmButtonText: 'Sim, excluir!',
            denyButtonText: 'Não, foi engano!',
        }).then((result) => {
            if (result.isConfirmed) {
                const items = JSON.parse(localStorage.getItem("items"))
                items.splice(i, 1)
                localStorage.setItem("items", JSON.stringify(items))
                this.forceUpdate()
            } else if (result.isDenied) {
              Swal.fire('Ok, vamos mantê-lo por aqui!', '', 'success')
            }
          })
    }
    render() {
        const items = localStorage.getItem("items") !== null ? JSON.parse(localStorage.getItem("items")) : []
        let total = 0
        return (
            <div className="cart p-5">
                <Title name="Meu" title="carrinho" />
                <div className="row">
                    <div className={items.length ? "col-12 col-md-8 p-0" : "col-12"}>
                        {items.length ?
                            items.map(item => {
                                const {id, name, price, image} = item
                                const index = items.indexOf(item)
                                return (
                                    <ProdutoWrapper key={id} className="my-3">
                                        <div className="card">
                                            <div className="col-3 p-3 d-flex justify-content-center">
                                                <img src={image} className="img-fluid h-100 rounded" alt="product" />
                                            </div>
                                            <div className="col p-0 p-sm-3 card-description d-flex justify-content-between">
                                                <h5 className="mb-0 title">
                                                    <span>Produto: {name}</span>
                                                    <span data-testid={'delete-' + items.indexOf(item)} className="btn-del rounded-circle" onClick={() => this.delItem(index)}>
                                                        <i className="fas fa-trash-alt" />
                                                    </span>
                                                </h5>
                                                <h5 className="mb-0">Preço: <span className="font-italic">R$ {price * this.state.quantidades[index]}</span></h5>
                                                <h5 className="mb-0">Quantidade: <input type="number" min="0" value={this.state.quantidades[index]} onChange={event => {this.setQuantidades(event.target.value, index)}}></input></h5>
                                            </div>
                                        </div>
                                    </ProdutoWrapper>
                                )
                            }) :
                            <h1 className="text-center mt-5">Carrinho vazio!</h1>
                        }
                    </div>
                    {items.length ?
                        <div className="col">
                            <h5 className="text-center">Resumo da compra:</h5>
                            <div className="d-flex flex-column m-0 mt-4 m-md-5">
                                {items.map(item => {
                                    const index = items.indexOf(item)
                                    total += (this.state.quantidades[index] * item.price)
                                    return (
                                        <p key={item.id}>{item.name} - {this.state.quantidades[index]} und = R$ {this.state.quantidades[index] * item.price}</p>
                                    )
                                })}
                                <h5 className="my-3">Total = R$ {total}</h5>
                                <ButtonContainer>
                                    <span className="mr-2">    
                                        <i className="fas fa-credit-card" />
                                    </span>
                                    Comprar
                                </ButtonContainer>
                            </div>
                        </div> :
                        <></>
                    }
                </div>
            </div>
        );
    }
}

const ProdutoWrapper = styled.div`
    .card {
        border-color: transparent;
        transition: all 1s linear;
        flex-direction: row;
        height: 10rem
    }
    .card-description {
        flex-direction: column;
        background: transparent;
        border-top: transparent;
        transition: all 1s linear;
    }
    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .btn-del {
        width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 0.05rem solid red;
        color: red;
        cursor: pointer;
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
export default Cart;