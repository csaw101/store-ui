import React, { Component } from "react";

import Products from "./components/Products";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Product from "./components/Product";
import Categories from "./components/Categories";

import * as Enums from "./Enums";

import "./styles/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryID: Enums.Category.ALL,
      mainView: Enums.View.PRODUCTS,
      productView: undefined,
      cartOverlay: false,
      cartState: [],
    };
  }

  setCategoryID = (categoryID) => {
    this.setState({ categoryID });
  };

  setMainView = (mainView) => {
    this.setState({ mainView });
  };

  setProductView = (productView) => {
    this.setState({ productView });
  };

  setCartOverlay = (cartOverlay) => {
    this.setState({ cartOverlay });
  };

  addToCart = (newProduct) => {
    const { cartState } = this.state;
    for (let i = 0; i < cartState.length; i++) {
      if (
        cartState[i].id === newProduct.id &&
        cartState[i].color === newProduct.color &&
        cartState[i].size === newProduct.size &&
        cartState[i].capacity === newProduct.capacity &&
        cartState[i].usb3 === newProduct.usb3 &&
        cartState[i].touchID === newProduct.touchID
      ) {
        this.incrementCartItemAmount(
          newProduct.id,
          newProduct.color,
          newProduct.size,
          newProduct.capacity,
          newProduct.usb3,
          newProduct.touchID
        );
        return;
      }
    }
    this.setState({ cartState: [...cartState, newProduct] });
  };

  incrementCartItemAmount = (id, color, size, capacity, usb3, touchID) => {
    this.setState((prevState) => ({
      cartState: prevState.cartState.map((cartProduct) =>
        cartProduct.id === id &&
        cartProduct.color === color &&
        cartProduct.size === size &&
        cartProduct.capacity === capacity &&
        cartProduct.usb3 === usb3 &&
        cartProduct.touchID === touchID
          ? { ...cartProduct, amount: cartProduct.amount + 1 }
          : cartProduct
      ),
    }));
  };

  decrementCartItemAmount = (id, color, size, capacity, usb3, touchID) => {
    this.setState((prevState) => ({
      cartState: prevState.cartState.reduce((updatedCart, cartProduct) => {
        if (
          cartProduct.id === id &&
          cartProduct.color === color &&
          cartProduct.size === size &&
          cartProduct.capacity === capacity &&
          cartProduct.usb3 === usb3 &&
          cartProduct.touchID === touchID
        ) {
          if (cartProduct.amount > 1) {
            updatedCart.push({ ...cartProduct, amount: cartProduct.amount - 1 });
          }
        } else {
          updatedCart.push(cartProduct);
        }
        return updatedCart;
      }, []),
    }));
  };

  getSumOfCartProducts = () => {
    return this.state.cartState.reduce((total, product) => (total += product.amount), 0);
  };

  render() {
    const { categoryID, mainView, productView, cartOverlay, cartState } = this.state;
    return (
      <div className="App">
        <Navbar
          cartNumberOfItems={this.getSumOfCartProducts()}
          setCategoryID={this.setCategoryID}
          setMainView={this.setMainView}
          cartOverlay={this.state.cartOverlay}
          setCartOverlay={this.setCartOverlay}
        />
        {mainView === Enums.View.PRODUCTS ? (
          <Products
            addToCart={this.addToCart}
            categoryID={categoryID}
            setMainView={this.setMainView}
            setProductView={this.setProductView}
          />
        ) : (
          <Product id={productView} addToCart={this.addToCart} />
        )}
        <Categories
          className="categories-list categories-mobile"
          setCategoryID={this.setCategoryID}
          setMainView={this.setMainView}
        />
        {cartOverlay ? (
          <div>
            <Cart
              setCartOverlay={this.setCartOverlay}
              cartState={cartState}
              setCartState={(cartState) => this.setState({ cartState })}
              incrementCartItemAmount={this.incrementCartItemAmount}
              decrementCartItemAmount={this.decrementCartItemAmount}
            />
            <div className="cart-overlay"></div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
