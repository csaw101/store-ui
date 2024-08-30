import React, { Component } from "react";
import { gql } from "@apollo/client";
import { Mutation } from "@apollo/client/react/components";
import CartProduct from "./CartProduct";
import "../styles/Cart.css";

const ORDERS_MUTATION = gql`
  mutation CreateOrder($order: [OrderedProduct]!) {
    createOrder(order: $order) {
      id
    }
  }
`;

function sumTotal(products) {
  return products.reduce(
    (total, product) => (total += product.amount * product.price),
    0,
  );
}

function getAmount(products) {
  return products.reduce((total, product) => (total += product.amount), 0);
}

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testid_data: null,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        testid_data: "cart-overlay",
      });
    }, 5000);
  }

  render() {
    return (
      <div className="cart-modal" data-testid={this.state.testid_data}>
        <div className="modal-content">
          <div className="cart-header">
            <div>
              <span className="bold">My Bag: </span>
              {/* <span>{getAmount(this.props.cartState)} items</span> */}
              <span>
                {getAmount(this.props.cartState) === 1
                  ? getAmount(this.props.cartState) + " item"
                  : getAmount(this.props.cartState) + " items"}
              </span>
            </div>
            <div className="cart-close">
              <img
                onClick={() => this.props.setCartOverlay(false)}
                src="https://scanditest.alwaysdata.net/backend/assets/cart-close.png"
                alt=""
              />
            </div>
          </div>
          {this.props.cartState.map((cartProduct) => (
            <CartProduct
              cartProduct={cartProduct}
              incrementCartItemAmount={this.props.incrementCartItemAmount}
              decrementCartItemAmount={this.props.decrementCartItemAmount}
              key={
                cartProduct.id.toString() +
                cartProduct.color +
                cartProduct.size +
                cartProduct.capacity +
                cartProduct.usb3 +
                cartProduct.touchID
              }
            />
          ))}
          <div className="cart-total">
            <span>Total</span>
            <span data-testid="cart-total">
              ${sumTotal(this.props.cartState).toFixed(2)}
            </span>
          </div>
          <Mutation mutation={ORDERS_MUTATION}>
            {(createOrder) => (
              <div
                className="cart-order-btn"
                data-testid="place-order-btn"
                style={
                  this.props.cartState.length === 0
                    ? { backgroundColor: "#9e9e9e" }
                    : null
                }
                onClick={
                  this.props.cartState.length > 0
                    ? () => {
                        const orderedProducts = this.props.cartState.map(
                          ({
                            name,
                            image,
                            currency,
                            price,
                            colors,
                            sizes,
                            capacities,
                            ...keepAttrs
                          }) => keepAttrs,
                        );
                        createOrder({
                          variables: {
                            order: orderedProducts,
                          },
                        });
                        this.props.setCartState([]);
                      }
                    : null
                }
              >
                PLACE ORDER
              </div>
            )}
          </Mutation>
        </div>
      </div>
    );
  }
}

export default Cart;
