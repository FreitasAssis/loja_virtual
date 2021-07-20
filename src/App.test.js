import React from 'react';
import ReactDom from 'react-dom';
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

it('renderizar App', () => {
  const div = document.createElement('div');

  ReactDom.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>, 
  div);

  ReactDom.unmountComponentAtNode(div);
});

it("Renderizar a list de produtos", () => {
  const { container } = render(<ProductList />)
  const list = container.querySelector('.product-list')
  expect(list).toBeInTheDocument();
});

it("Renderizar o carrinho", () => {
  const { container } = render(<Cart />)
  const cart = container.querySelector('.cart')
  expect(cart).toBeInTheDocument();
});

it("Remover item do carrinho", () => {
  const items = localStorage.getItem("items") !== null ? JSON.parse(localStorage.getItem("items")) : []
  if (items.length) {
    const { getByTestId } = render(<Cart />)
    const btnDel = getByTestId("delete-0");
    fireEvent.click(btnDel);
    /* eslint-disable */
    expect(items).toEqual(items.splice(0, 1))
  }
});