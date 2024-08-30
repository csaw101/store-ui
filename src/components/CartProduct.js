import React, { Component } from "react";
import "../styles/CartProduct.css";

class CartProduct extends Component {
  render() {
    return (
      <div className="cart-product">
        <div className="cart-product-details">
          <div className="cart-product-label">
            {this.props.cartProduct.name}
          </div>
          <div className="cart-product-price bold">
            {this.props.cartProduct.currency}
            {this.props.cartProduct.price}
          </div>
          {this.props.cartProduct.sizes.length > 0 ? (
            <div className="cart-product-sizes">
              <div className="cart-product-label">SIZE:</div>
              <div className="cart-size-list">
                {this.props.cartProduct.sizes.map((size) => (
                  <div
                    className={
                      size.name === this.props.cartProduct.size
                        ? "cart-size-box cart-size-selected"
                        : "cart-size-box"
                    }
                    data-testid={
                      size.name === this.props.cartProduct.color
                        ? "cart-item-attribute-size-" + size.name + "-selected"
                        : null
                    }
                    key={size.name}
                  >
                    {size.value}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {this.props.cartProduct.colors.length > 0 ? (
            <div
              className="cart-product-colors"
              data-testid="cart-item-attribute-color"
            >
              <div className="cart-product-label">COLOR:</div>
              <div className="cart-color-list">
                {this.props.cartProduct.colors.map((color) => (
                  <div
                    className={
                      color.name === this.props.cartProduct.color
                        ? "cart-color-box cart-color-selected"
                        : "cart-color-box"
                    }
                    data-testid={
                      color.name === this.props.cartProduct.color
                        ? "cart-item-attribute-color-" +
                          color.name +
                          "-selected"
                        : null
                    }
                    style={{
                      backgroundColor: "#" + color.value,
                      border:
                        color.value === "FFFFFF" ? "solid 1px #28231D" : null,
                    }}
                    key={color.name}
                  ></div>
                ))}
              </div>
            </div>
          ) : null}
          {this.props.cartProduct.capacities.length > 0 ? (
            <div
              className="cart-product-sizes"
              data-testid="cart-item-attribute-capacity"
            >
              <div className="cart-product-label">CAPACITY:</div>
              <div className="cart-size-list">
                {this.props.cartProduct.capacities.map((capacity) => (
                  <div
                    className={
                      capacity.name === this.props.cartProduct.capacity
                        ? "cart-size-box cart-size-selected"
                        : "cart-size-box"
                    }
                    data-testid={
                      capacity.name === this.props.cartProduct.capacity
                        ? "cart-item-attribute-capacity-" +
                          capacity.name +
                          "-selected"
                        : null
                    }
                    key={capacity.name}
                  >
                    {capacity.value}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          <div className="cart-product-usb3-touchID">
            {this.props.cartProduct.usb3 !== undefined ? (
              <div
                className="cart-product-usb3"
                data-testid={"cart-item-attribute-usb3-selected"}
              >
                {this.props.cartProduct.usb3 === true ? (
                  <img
                    src="https://scanditest.alwaysdata.net/backend/assets/usb3.png"
                    alt=""
                  />
                ) : null}
              </div>
            ) : null}
            {this.props.cartProduct.touchID !== undefined ? (
              <div
                className="cart-product-touchID"
                data-testid={"cart-item-attribute-touchID-selected"}
              >
                {this.props.cartProduct.touchID === true ? (
                  <img
                    src="https://scanditest.alwaysdata.net/backend/assets/touchID.png"
                    alt=""
                  />
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
        <div className="cart-product-quantity">
          <div
            className="cart-product-increment"
            data-testid="cart-item-amount-increase"
            onClick={() => {
              this.props.incrementCartItemAmount(
                this.props.cartProduct.id,
                this.props.cartProduct.color,
                this.props.cartProduct.size,
                this.props.cartProduct.capacity,
                this.props.cartProduct.usb3,
                this.props.cartProduct.touchID,
              );
            }}
          >
            +
          </div>
          <div className="cart-product-amount" data-testid="cart-item-amount">
            {this.props.cartProduct.amount}
          </div>
          <div
            className="cart-product-decrement"
            data-testid="cart-item-amount-decrease"
            onClick={() => {
              this.props.decrementCartItemAmount(
                this.props.cartProduct.id,
                this.props.cartProduct.color,
                this.props.cartProduct.size,
                this.props.cartProduct.capacity,
                this.props.cartProduct.usb3,
                this.props.cartProduct.touchID,
              );
            }}
          >
            -
          </div>
        </div>
        <div className="cart-product-img">
          <img src={this.props.cartProduct.image} alt="" />
        </div>
      </div>
    );
  }
}

export default CartProduct;
