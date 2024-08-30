import React, { Component } from "react";
import "../styles/Capacities.css";

class Capacities extends Component {
  render() {
    return (
      <div className="product-sizes" data-testid="product-attribute-capacity">
        <div className="product-label">CAPACITY:</div>
        <div className="size-list">
          {this.props.capacities.map((capacity) => (
            <div
              onClick={() => this.props.setSelectedCapacity(capacity.name)}
              className={
                capacity.name === this.props.selectedCapacity
                  ? "size-box size-selected"
                  : "size-box"
              }
              data-testid={"product-attribute-capacity-" + capacity.name}
              key={capacity.name}
            >
              {capacity.value}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Capacities;
