import React, { Component } from "react";
import "../styles/Sizes.css";

class Sizes extends Component {
  render() {
    return (
      <div className="product-sizes">
        <div className="product-label">SIZE:</div>
        <div className="size-list">
          {this.props.sizes.map((size) => (
            <div
              onClick={() => this.props.setSelectedSize(size.name)}
              className={
                size.name === this.props.selectedSize
                  ? "size-box size-selected"
                  : "size-box"
              }
              key={size.name}
            >
              {size.value}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Sizes;
