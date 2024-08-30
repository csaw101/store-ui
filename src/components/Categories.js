import React, { Component } from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";

import * as Enums from "../Enums";

import "../styles/Categories.css";

const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
    }
  }
`;

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active_category: "all",
    };
  }
  componentDidMount() {
    // console.log("hi");
    // this.setState({
    // });
    // var all = document.getElementsByClassName("category-all");
    // function doSomething() {
    //   all = document.getElementsByClassName("category-all");
    //   // console.log(all.length);
    //   if (all.length === 0) setTimeout(doSomething, 100);
    // }
    // setTimeout(doSomething, 100);
    // all = document.getElementsByClassName("category-all");
    // for (const element of all) {
    //   // console.log(element);
    //   element.setAttribute("data-testid", "active-category-link");
    // }
  }

  handleCategorySelection = (
    categoryID,
    setCategoryID,
    setMainView,
    categoryName,
  ) => {
    setCategoryID(categoryID);
    setMainView(Enums.View.PRODUCTS);

    var old_selection;
    do {
      old_selection = document.getElementsByClassName("selected-category");
      // console.log(old_selection);
      old_selection[0].classList.remove("selected-category");
      // old_selection[0].setAttribute("data-testid", "category-link");
    } while (old_selection[0]);

    var new_selection = document.getElementsByClassName(
      "category-" + categoryName,
    );
    this.setState({
      active_category: categoryName,
    });
    for (const element of new_selection) {
      element.classList.add("selected-category");
      element.setAttribute("data-testid", "active-category-link");
    }
  };

  getClasses = (categoryName) => {
    if (categoryName === "all") {
      return "category-" + categoryName + " selected-category";
    }
    return "category-" + categoryName;
  };

  render() {
    return (
      <Query query={GET_CATEGORIES}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return (
            <div className={this.props.className}>
              <ul>
                {data.categories.map((category) => (
                  <a
                    href={"/".concat(category.name)}
                    key={category.name}
                    className={this.getClasses(category.name)}
                    data-testid={
                      this.state.active_category === category.name
                        ? "active-category-link"
                        : "category-link"
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      this.handleCategorySelection(
                        category.id,
                        this.props.setCategoryID,
                        this.props.setMainView,
                        category.name,
                      );
                    }}
                  >
                    {category.name.toUpperCase()}
                  </a>
                ))}
              </ul>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Categories;
