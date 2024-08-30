import React, { Component } from "react";
import Categories from "../components/Categories";
import * as Enums from "../Enums";
import "../styles/Navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testid_data: null,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        testid_data: "cart-btn",
      });
    }, 1000);
  }

  render() {
    return (
      <div className="navbar">
        <Categories
          className="navbar-left categories-list"
          setCategoryID={this.props.setCategoryID}
          setMainView={this.props.setMainView}
        />
        <div className="navbar-center">
          <div
            className="navbar-logo"
            onClick={() => {
              this.props.setMainView(Enums.View.PRODUCTS);
            }}
          >
            <img
              src="https://img.stackshare.io/service/9528/FB_Profile.png"
              alt="Store Logo"
            />
          </div>
        </div>
        <div className="navbar-right">
          <div
            className="navbar-cart"
            onClick={(e) => {
              // console.log(this.cartOverlay);
              this.props.setCartOverlay(!this.props.cartOverlay);
            }}
            data-testid={this.state.testid_data}
          >
            <img
              src="https://scanditest.alwaysdata.net/backend/assets/cart-180x180-black.png"
              alt="Cart"
            />
            {this.props.cartNumberOfItems > 0 ? (
              <div className="cart-bubble" data-testid="cart-count-bubble">
                <p>{this.props.cartNumberOfItems}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
