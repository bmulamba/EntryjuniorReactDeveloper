import React from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import { getCategories } from "../../GraphQl/Queries";
import "../Navbar/Navbar.js";
import Modal from "./ModalProduct";
import "./ProductList.scss";

class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryName: "All",
      modalVisibility: false,
      productId: "",
    };

    this.addToCart = this.addToCart.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  // handleVisibilty(id){
  //   this.setState({modalVisibility : true, productId : id})
  // }

  hideModal() {
    this.setState({ modalVisibility: false });
  }

  onChangeSizeHandler = () => {};

  addToCart(item) {
    item["quantity"] = 1;

    if (localStorage["cardProduct"] == null) {
      localStorage["cardProduct"] = JSON.stringify([item]);
    } else {
      let products = JSON.parse(localStorage["cardProduct"]) || [];
      const index = products.findIndex((obj) => obj.id === item.id);
      if (index >= 0) {
        products[index].quantity += 1;
      } else {
        products.push(item);
      }
      localStorage["cardProduct"] = JSON.stringify(products);
    }

    let amount = 0;
    JSON.parse(localStorage["cardProduct"]).map((val) => {
      return (amount +=
        val.prices.find(
          (p) => p.currency.symbol === localStorage["currencySymbol"]
        ).amount * val.quantity);
    });
    localStorage["totalCardAmount"] = amount.toFixed(2);
  }

  displayProducts = () => {
    var data = this.props.data;
    const selectedCategory = localStorage["category"];
    var products = [];
    if (data.categories !== undefined && data.categories.length > 0) {
      if (selectedCategory === "Tech") {
        products = data.categories.filter((d) => d.name === "tech");
      } else if (selectedCategory === "Clothes") {
        products = data.categories.filter((d) => d.name === "clothes");
      } else {
        products = data.categories.filter((d) => d.name === "all");
      }
    }

    if (data.loading) {
      return <div>Loading products</div>;
    } else {
      var prod = [];
      if (products.length > 0) {
        prod = products[0].products;

        return (
          <div>
            <div className="cartegory-list">
              <div className="categorName">{selectedCategory}</div>
            </div>
            <div className="product-section">
              {prod.map((item) => {
                return (
                  <div key={item.id}>
                    <div className="card">
                      <Link
                        className="pro-card"
                        to={`/product/${item.id}`}
                        onClick={() => {
                          localStorage["selectedProductId"] = item.id;
                        }}
                      >
                        {!item.inStock && (
                          <div className="outOfStockBadge">
                            <h2>OUT OF STOCK</h2>
                          </div>
                        )}
                        <div className="card-image">
                          <img
                            className="img-card"
                            src={item.gallery[0]}
                            alt="{item.id}"
                          />
                        </div>
                        <div className="card-info">
                          <h4 className="cart-name">{item.name}</h4>
                          <h4 className="cart-price">
                            {" "}
                            {localStorage["currencySymbol"]}{" "}
                            <b>
                              {
                                item.prices.find(
                                  (p) =>
                                    p.currency.symbol ===
                                    localStorage["currencySymbol"]
                                ).amount
                              }
                            </b>
                          </h4>
                        </div>
                      </Link>

                      {item.inStock ? (
                        <button
                          type="button"
                          to="#"
                          className="product-cart"
                          onClick={() => {
                            this.setState({
                              modalVisibility: true,
                              productId: item.id,
                            });
                          }}
                        >
                          <i className="fa fa-shopping-cart"></i>
                        </button>
                      ) : (
                        <button
                          type="button"
                          to="#"
                          className="product-cart-out0fStock"
                          disabled
                        >
                          <i className="fa fa-shopping-cart"></i>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>{" "}
          </div>
        );
      }
    }
  };

  render() {
    let products = [];
    // let selectedSingleProduct = []

    if (typeof this.props.data.categories !== "undefined") {
      products = this.props.data.categories[0].products;
    }
    let selectedProduct = products.filter((p) => p.id == this.state.productId);

    // console.log(products[selectedProduct]);

    return (
      <div>
        {this.displayProducts()}
        <Modal
          handleVisibilty={this.state.modalVisibility}
          handleClose={this.hideModal}
          selectedProductId={this.state.productId}
          selectedSingleProduct={selectedProduct}
          addToCart={this.addToCart}
          
        />
      </div>
    );
  }
}

export default graphql(getCategories)(ProductList);
