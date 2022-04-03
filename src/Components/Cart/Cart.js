import React, { Component } from "react";
import "./Cart.scss";

export default class Cart extends Component {
  cartdetails() {
    var products = JSON.parse(localStorage["cardProduct"]);
    // console.log(localStorage["productSize"]);
    return products.map((product) => {
      return (
        <div key={product.id}>
          <div className="cart-description">
            <div className="cart-desc-belt">
              <h2 id="product-name">{product.name}</h2>
              <h2 id="product-type py-5">{product.brand}</h2>
              <h2 id="product-type">
                {localStorage["currencySymbol"]}{" "}
                {product.prices.find(
                  (p) => p.currency.symbol === localStorage["currencySymbol"]
                ).amount}
              </h2>
              <div className="cart-size">
                <span>{localStorage["productSize"]}</span>
              </div>
            </div>
            <div className="cart-mini-imag">
              <div className="cart-mini-add">
                <button onClick={() => this.addToCart(product)}>+</button>
                <h4 className="cart-quantity">{product.quantity}</h4>
                <button onClick={() => this.minusToCart(product)}>-</button>
              </div>
              <div className="cart-img">
                <img src={product.gallery[0]} alt="" />
              </div>
            </div>
          </div>
          <div className="cart-total">
            <h3>Total</h3> {" "}
            <div className="total-side">
              {localStorage["currencySymbol"]}{" "}
              {localStorage["totalCardAmount"]}
            </div>             
          </div>
        </div>
      );
    });
  }

  addToCart = (product) => {
    product["quantity"] = 1;

    if (localStorage["cardProduct"] == null) {
      localStorage["cardProduct"] = JSON.stringify([product]);
    } else {
      let products = JSON.parse(localStorage["cardProduct"]) || [];
      const index = products.findIndex((obj) => obj.id === product.id);
      if (index >= 0) {
        products[index].quantity += 1;
      } else {
        products.push(product);
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

  minusToCart = (product) => {
    product["quantity"] = 1;

    if (localStorage["cardProduct"] == null) {
      localStorage["cardProduct"] = JSON.stringify([product]);
    } else {
      let products = JSON.parse(localStorage["cardProduct"]) || [];
      const index = products.findIndex((obj) => obj.id === product.id);
      if (index >= 0) {
        products[index].quantity -= 1;
      } else {
        products.push(product);
      }
      localStorage["cardProduct"] = JSON.stringify(products);
    }

    let amount = 0;
    JSON.parse(localStorage["cardProduct"]).map((product) => {
      return (amount +=
        product.prices.find(
          (p) => p.currency.symbol === localStorage["currencySymbol"]
        ).amount * product.quantity);
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
    return (
      <>
        <div className="product-in-cart">
          <div className="cart-container">
            <div className="title">
              <h1>cart</h1>
              {this.cartdetails()}
            </div>
          </div>
        </div>
      </>
    );
  }
}
