import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./MiniCard.scss";

export default class MiniCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productQuantity: 0,
    };
  }

  displayCard = () => {
    const addedProducts = JSON.parse(localStorage["cardProduct"]);
    // console.log(addedProducts);
    return addedProducts.map((val) => {
      // console.log(val);
      return (
        <>
          <div className="car-item" key={val.id}>
            <div className="cart-prod-items-show">
              <div className="item-prod-belt-left">
                <h6 className="item-prod-name">{val.name}</h6>
                <h6 className="item-prod-names">{val.brand}</h6>
                <p className="car-price">
                  {localStorage["currencySymbol"]}{" "}
                  {
                    val.prices.find(
                      (p) =>
                        p.currency.symbol === localStorage["currencySymbol"]
                    ).amount
                  }
                </p>
                <span
                  className="car-delete-btn"
                  onClick={() => this.removeItemFromCart(val.id)}
                >
                  <i className="fa fa-trash fa-lg"></i>
                </span>
                <div className="button-prod-cart">
                  {/* <button className="button-attribute">S</button> */}

                  {/* {val.attributes.map((attItem) => (
                    <div>{attItem.size}</div>
                  ))} */}
                  
                </div>
              </div>
              <div className="item-prod-belt-right">
                <div className="button-prod-quantity">
                  <button
                    className="button-quantity"
                    onClick={() => {
                      this.setState({ productQuantity: 0 });
                      this.addToCart(val);
                    }}
                  >
                    +
                  </button>
                  <p className="cart-qty">
                    {val.quantity + this.state.productQuantity}
                  </p>
                  <button
                    className="button-quantity"
                    onClick={() => {
                      this.setState({ productQuantity: 0 });
                      this.minusToCart(val);
                    }}
                    disabled={val.quantity == 1}
                  >
                    -
                  </button>
                </div>
                <img className="car-img" src={val.gallery[0]} alt="" />
              </div>
            </div>
          </div>
        </>
      );
    });
  };

  addToCart = (val) => {
    val["quantity"] = 1;

    if (localStorage["cardProduct"] == null) {
      localStorage["cardProduct"] = JSON.stringify([val]);
    } else {
      let products = JSON.parse(localStorage["cardProduct"]) || [];
      const index = products.findIndex((obj) => obj.id === val.id);
      if (index >= 0) {
        products[index].quantity += 1;
        this.setState({ productQuantity: 1 });
        this.props.handleClose();
      } else {
        products.push(val);
        this.props.handleClose();
      }
      localStorage["cardProduct"] = JSON.stringify(products);
      this.props.handleClose();
    }

    let amount = 0;
    JSON.parse(localStorage["cardProduct"]).map((val) => {
      return (amount +=
        val.prices.find(
          (p) => p.currency.symbol === localStorage["currencySymbol"]
        ).amount * val.quantity);
    });
    localStorage["totalCardAmount"] = amount.toFixed(2);
    this.props.handleClose();
  };

  minusToCart = (val) => {
    val["quantity"] = 1;

    if (localStorage["cardProduct"] == null) {
      localStorage["cardProduct"] = JSON.stringify([val]);
    } else {
      let products = JSON.parse(localStorage["cardProduct"]) || [];
      const index = products.findIndex((obj) => obj.id === val.id);
      if (index >= 0) {
        products[index].quantity -= 1;
        this.setState({ productQuantity: 1 });
      } else {
        products.push(val);
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
  };

  removeItemFromCart(id) {
    var products = JSON.parse(localStorage["cardProduct"]);
    let amount = localStorage["totalCardAmount"];
    for (var i = 0; i < products.length; i++) {
      if (id === products[i].id) {
        amount -=
          products[i].prices.find(
            (p) => p.currency.symbol === localStorage["currencySymbol"]
          ).amount * products[i].quantity;
        products[i].quantity -= 1;
        products.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("cardProduct", JSON.stringify(products));
    localStorage["totalCardAmount"] = amount.toFixed(2);
  }

  render() {
    // console.log(this.props.);
    return (
      <div>
        {this.props.handleVisibilty ? (
          <div className="modalBgr">
            <button className="btn-cls" onClick={this.props.handleClose}>
              &times;
            </button>
            {JSON.parse(localStorage["cardProduct"]).length > 0 ? (
              <div className="card-container">
                (
                <div className="card-content-container-full">
                  <h5 className="cart-qty-heard">
                    <b> My Bag,</b>{" "}
                    {typeof localStorage["cardProduct"] === "undefined" ||
                      JSON.parse(localStorage["cardProduct"]).length}{" "}
                    items
                  </h5>{" "}
                  <hr />
                  <div className="cart-content-container">
                    <div className="card-content">{this.displayCard()}</div>
                    <h4 className="car-total">
                      Total amount:{" "}
                      <span>
                        {localStorage["currencySymbol"]}{" "}
                        {localStorage["totalCardAmount"]}
                      </span>
                    </h4>
                    <div className="item-prod-button">
                      <Link
                        className="car-btn"
                        to="/cart"
                        onClick={this.props.handleClose}
                      >
                        {" "}
                        Checkout{" "}
                      </Link>
                      <Link
                        className="car-btn-cart"
                        to="/cart"
                        onClick={this.props.handleClose}
                      >
                        {" "}
                        Cart{" "}
                      </Link>
                    </div>
                  </div>
                </div>
                )
              </div>
            ) : (
              <div className="empty-card">
                <p>Your CART is empty</p>
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}
