import React, { Component } from "react";
import "../styles/Colors.css";

class Colors extends Component {
  render() {
    return (
      <div className="product-colors" data-testid="product-attribute-color">
        <div className="product-label">COLOR:</div>
        <div className="color-list">
          {this.props.colors.map((color) => (
            //this is an extra div made to pass one test case other than that it's useless
            <div data-testid={"product-attribute-color-#" + color.value}>
              <div
                onClick={() => this.props.setSelectedColor(color.name)}
                className={
                  color.name === this.props.selectedColor
                    ? "color-box color-selected"
                    : "color-box"
                }
                data-testid={"product-attribute-color-" + color.name}
                style={{
                  backgroundColor: "#" + color.value,
                  border: color.value === "FFFFFF" ? "solid 1px #28231D" : null,
                }}
                key={color.name}
              ></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Colors;
