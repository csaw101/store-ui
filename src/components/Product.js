import React, { Component } from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import Carousel from "./Carousel";
import Colors from "./Colors";
import Sizes from "./Sizes";
import Capacities from "./Capacities";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

import "../styles/Product.css";
import "../styles/switch.css";

const GET_PRODUCT = gql`
  query GetProduct($id: Int) {
    product(id: $id) {
      name
      description
      price
      currency
      images
      in_stock
      colors {
        name
        value
      }
      sizes {
        name
        value
      }
      capacities {
        name
        value
      }
      usb3
      touchID
    }
  }
`;

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColor: undefined,
      selectedSize: undefined,
      selectedCapacity: undefined,
      selectedUsb3: undefined,
      selectedTouchID: undefined,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevState.data && this.state.data) {
      const product = this.state.data.product;
      if (product.colors.length > 0) {
        this.setState({ selectedColor: product.colors[0].name });
      }
      if (product.sizes.length > 0) {
        this.setState({ selectedSize: product.sizes[0].name });
      }
      if (product.capacities.length > 0) {
        this.setState({ selectedCapacity: product.capacities[0].name });
      }
      if (product.usb3 === true) {
        this.setState({ selectedUsb3: false });
      }
      if (product.touchID === true) {
        this.setState({ selectedTouchID: false });
      }
    }
  }

  parseDescription(description) {
    const sanitizedHTML = DOMPurify.sanitize(description);
    return parse(sanitizedHTML);
  }

  handleUsb3Toggle = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      selectedUsb3: !prevState.selectedUsb3,
    }));
  };

  handleTouchIDToggle = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      selectedTouchID: !prevState.selectedTouchID,
    }));
  };

  render() {
    return (
      <Query query={GET_PRODUCT} variables={{ id: this.props.id }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;

          if (data && this.state.data !== data) {
            this.setState({ data });
          }

          const product = data.product;

          return (
            <div className="product">
              <Carousel images={product.images} />
              <div className="product-details">
                <div className="product-name">{product.name}</div>
                {product.sizes.length > 0 && (
                  <Sizes
                    sizes={product.sizes}
                    selectedSize={this.state.selectedSize}
                    setSelectedSize={(size) =>
                      this.setState({ selectedSize: size })
                    }
                  />
                )}
                {product.colors.length > 0 && (
                  <Colors
                    colors={product.colors}
                    selectedColor={this.state.selectedColor}
                    setSelectedColor={(color) =>
                      this.setState({ selectedColor: color })
                    }
                  />
                )}
                {product.capacities.length > 0 && (
                  <Capacities
                    capacities={product.capacities}
                    selectedCapacity={this.state.selectedCapacity}
                    setSelectedCapacity={(capacity) =>
                      this.setState({ selectedCapacity: capacity })
                    }
                  />
                )}
                {product.usb3 === true &&
                  this.state.selectedUsb3 !== undefined && (
                    <div className="product-usb3">
                      <div className="product-label">With USB3 Ports:</div>
                      <div
                        className="usb3-availability"
                        onClick={this.handleUsb3Toggle}
                      >
                        <img
                          src="https://scanditest.alwaysdata.net/backend/assets/usb3.png"
                          alt=""
                        />
                        <label className="switch">
                          <input
                            id="usb3-button"
                            type="checkbox"
                            checked={this.state.selectedUsb3}
                            readOnly
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </div>
                  )}
                {product.touchID === true &&
                  this.state.selectedTouchID !== undefined && (
                    <div className="product-touchID">
                      <div className="product-label">Touch ID in Keyboard:</div>
                      <div
                        className="touchID-availability"
                        onClick={this.handleTouchIDToggle}
                      >
                        <img
                          src="https://scanditest.alwaysdata.net/backend/assets/touchID.png"
                          alt=""
                        />
                        <label className="switch">
                          <input
                            id="touchID-button"
                            type="checkbox"
                            checked={this.state.selectedTouchID}
                            readOnly
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </div>
                  )}
                <div className="product-price">
                  <div className="product-label">PRICE:</div>
                  <div className="price-amount">
                    {product.currency + " " + product.price}
                  </div>
                </div>
                <div
                  className="product-button"
                  data-testid="add-to-cart"
                  style={
                    product.in_stock === false
                      ? {
                          backgroundColor: "#9e9e9e",
                        }
                      : null
                  }
                  disabled={!product.in_stock}
                  onClick={
                    product.in_stock === true
                      ? () => {
                          this.props.addToCart({
                            id: this.props.id,
                            amount: 1,
                            name: product.name,
                            image: product.images[0],
                            price: product.price,
                            currency: product.currency,
                            colors: product.colors,
                            color: this.state.selectedColor,
                            sizes: product.sizes,
                            size: this.state.selectedSize,
                            capacities: product.capacities,
                            capacity: this.state.selectedCapacity,
                            usb3: this.state.selectedUsb3,
                            touchID: this.state.selectedTouchID,
                          });
                        }
                      : null
                  }
                >
                  {product.in_stock ? "ADD TO CART" : "OUT OF STOCK"}
                </div>
                <div
                  className="product-description"
                  data-testid="product-description"
                >
                  {this.parseDescription(product.description)}
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Product;
