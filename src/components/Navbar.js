import React, { Component } from 'react'
import {Link} from "react-router-dom"
import logo from "../assets/liven.png"
import {ButtonContainer} from "./Button"
import styled from "styled-components"

class Navbar extends Component {
    render() {
        return (
            <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
                <Link to="/" className="d-flex align-items-center">
                    <img src={logo} alt="liven" className="navbar-brand rounded-circle" />
                    <span className="nav-link">Lojinha Liven</span>
                </Link>
                <ul className="nav navbar-nav align-items-center">
                    <li className="nav-item ml-5">
                        <Link to="/" className="nav-link">Produtos</Link>
                    </li>
                    <li className="nav-item ml-5">
                        <Link to="#" className="nav-link">Sobre nós</Link>
                    </li>
                    <li className="nav-item ml-5">
                        <Link to="#" className="nav-link">Fale conosco</Link>
                    </li>
                </ul>
                <Link to="/cart" className="ml-auto">
                    <ButtonContainer>
                        <span className="mr-2">    
                            <i className="fas fa-cart-plus" />
                        </span>
                        Meu carrinho
                    </ButtonContainer>
                </Link>
            </NavWrapper>
        );
    }
}
const NavWrapper = styled.nav`
    background: var(--primaryBlue);
    .nav-link{
        color: var(--mainWhite) !important;
        font-size: 1.3rem;
        text-transform: capitalize;
    }
    img{
        width: 4rem;
        margin-right: 0;
    }
`

export default Navbar;