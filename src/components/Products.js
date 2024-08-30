import React, { Component } from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import { ApolloConsumer } from "@apollo/client";
import * as Enums from "../Enums";

import "../styles/Products.css";

const GET_PRODUCTS = gql`
  query GetProducts($id: Int, $page: Int, $products_per_page: Int) {
    products(id: $id, page: $page, products_per_page: $products_per_page) {
      id
      name
      image
      in_stock
      price
      currency
    }
  }
`;

const GET_ATTRIBUTES = gql`
  query GetAttributes($id: Int) {
    attributes(id: $id) {
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

class Products extends Component {
  handleQuery = async (client, product) => {
    const { data } = await client.query({
      query: GET_ATTRIBUTES,
      variables: { id: product.id },
    });
    const colors = data.attributes.colors;
    const sizes = data.attributes.sizes;
    const capacities = data.attributes.capacities;
    const usb3 = data.attributes.usb3;
    const touchID = data.attributes.touchID;

    this.props.addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      currency: product.currency,
      amount: 1,
      colors: colors.length > 0 ? colors : [],
      color: colors.length > 0 ? colors[0].name : undefined,
      sizes: sizes.length > 0 ? sizes : [],
      size: sizes.length > 0 ? sizes[0].name : undefined,
      capacities: capacities.length > 0 ? capacities : [],
      capacity: capacities.length > 0 ? capacities[0].name : undefined,
      usb3: usb3 === true ? false : undefined,
      touchID: touchID === true ? false : undefined,
    });
  };

  render() {
    return (
      <Query
        query={GET_PRODUCTS}
        variables={{ id: this.props.categoryID, page: 1, products_per_page: 8 }}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;

          return (
            <ApolloConsumer>
              {(client) => (
                <div className="grid">
                  {data.products.map((product) => (
                    <div
                      key={product.id}
                      className="product-card"
                      data-testid={
                        "product-" +
                        product.name.toLowerCase().replace(/ /g, "-")
                      }
                      onClick={() => {
                        this.props.setProductView(product.id);
                        this.props.setMainView(Enums.View.PRODUCT);
                      }}
                    >
                      <div className="product-img">
                        <img src={product.image} alt="" />
                        {product.in_stock === true ? null : (
                          <div className="overlay">OUT OF STOCK</div>
                        )}
                      </div>
                      {product.in_stock === true ? (
                        <div
                          className="product-cart"
                          onClick={(e) => {
                            e.stopPropagation();
                            this.handleQuery(client, product);
                          }}
                        >
                          <img
                            src="https://scanditest.alwaysdata.net/backend/assets/cart-180x180-green.png"
                            alt="Cart"
                          />
                        </div>
                      ) : null}
                      <div className="product-text">
                        <h2 className="products-name">{product.name}</h2>
                        <p className="products-price">
                          {product.currency + " " + product.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ApolloConsumer>
          );
        }}
      </Query>
    );
  }
}

export default Products;
