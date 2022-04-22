import React, { Component } from "react";
import "./Cart.scss";

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      productQuantity: 0,
    };
  }

  cartdetails = () => {
    var products = JSON.parse(localStorage["cardProduct"]);
    return products.map((product) => {
      return (
        <div>
          <div key={product.id}>
            <div className="cart-description">
              <div className="cart-desc-belt">
                <h3 id="product-name">{product.name}</h3>
                <h3 id="product-type py-5">{product.brand}</h3>
                <h3 id="product-type">
                  {localStorage["currencySymbol"]}{" "}
                  {
                    product.prices.find(
                      (p) =>
                        p.currency.symbol === localStorage["currencySymbol"]
                    ).amount
                  }
                </h3>
                <div className="cart-size">
                  {product.attributes.map((v, i) =>
                    v.key === "Color" ? (
                      <button
                        className="btn-value"
                        key={v.key + i}
                        style={{ backgroundColor: v.value }}
                      ></button>
                    ) : (
                      <button className="btn-value" key={v.key + i}>
                        {v.value}
                      </button>
                    )
                  )}
                </div>
              </div>
              <div className="cart-mini-imag">
                <div className="cart-mini-add">
                  <button
                    onClick={() => {
                      this.setState({ productQuantity: 0 });
                      this.addToCart(product);
                    }}
                  >
                    +
                  </button>
                  <h4 className="cart-quantity">{product.quantity}</h4>
                  <button
                    onClick={() => {
                      this.setState({ productQuantity: 0 });
                      this.minusToCart(product);
                    }}
                    disabled={product.quantity === 1}
                  >
                    -
                  </button>
                </div>
                <div className="cart-img">
                  <div className="cart-mini-img">
                    <img src={product.gallery[0]} alt={product.name} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

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
    for (var i = 1; i < products.length; i++) {
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
              <div className="cart-total">
                <h3>Total</h3>{" "}
                <div className="total-side">
                  {localStorage["currencySymbol"]}{" "}
                  {localStorage["totalCardAmount"]}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
