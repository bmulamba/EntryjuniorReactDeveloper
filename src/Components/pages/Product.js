import React, { Component } from "react";
import { graphql } from "react-apollo";
import { singleProduct } from "../../GraphQl/Queries";
import "./Product.scss";

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disableAddToCardBtn: true,
      productSize: "M",
      bgColor: "",
    };

    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(prod) {
    prod["quantity"] = 1;

    if (localStorage["cardProduct"] == null) {
      localStorage["cardProduct"] = JSON.stringify([prod]);
    } else {
      let products = JSON.parse(localStorage["cardProduct"]) || [];
      const index = products.findIndex((obj) => obj.id === prod.id);
      if (index >= 0) {
        products[index].quantity += 1;
        window.location.reload(false);
      } else {
        products.push(prod);
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
    localStorage["productSize"] = this.state.productSize;
  }

  // handleSizeSelect = (size) => {
  //   this.setState({
  //     disableAddToCardBtn: false,
  //     productSize: size,
  //     bgColor: "blue",
  //   });
  // };

  displaySingleProduct() {
    var data = this.props.data;

    if (data.loading) {
      return <div>Loading products</div>;
    } else {
      var prod = [];

      if (data.product) {
        prod = data.product;

        // console.log(prod.description);

        var imgprod = this.props.data.product.gallery;

        return (
          <div className="product-detail-section">
            <div className="product-item">
              <div className="side-item">
                {imgprod.map((item, index) => {
                  return index <= 3 ? (
                    <div key={item} className="prod-sm-image">
                      {" "}
                      <img src={item} alt="" />
                    </div>
                  ) : (
                    <></>
                  );
                })}
              </div>
              <div className="product-image">
                <span>
                  {" "}
                  <img src={prod.gallery[0]} alt="{item.id}" />{" "}
                </span>
              </div>
              <div className="product-text">
                <h1>{prod.name}</h1>
                <h2>{prod.brand}</h2>
                <div className="product-size">
                  <span>size :</span>
                  <ul>
                    <li onClick={() => this.handleSizeSelect("XS")}>Xs</li>
                    <li onClick={() => this.handleSizeSelect("S")}>s</li>
                    <li onClick={() => this.handleSizeSelect("S")}>m</li>
                    <li onClick={() => this.handleSizeSelect("L")}>l</li>
                  </ul>
                </div>
                <div className="product-price">
                  <span>price : </span>
                  <span>
                    {localStorage["currencySymbol"]}{" "}
                    <b>
                      {
                        prod.prices.find(
                          (p) =>
                            p.currency.symbol === localStorage["currencySymbol"]
                        )?.amount
                      }
                    </b>
                  </span>
                </div>
                <div className="product-add-cart">
                  <button
                    className="btn-add-to-cart"
                    onClick={() => this.addToCart(prod)}
                    disabled={this.state.disableAddToCardBtn}
                  >
                    add to cart
                  </button>
                </div>
                <h4 dangerouslySetInnerHTML={{ __html: prod.description }}></h4>
              </div>
            </div>
          </div>
        );
      }
    }
  }

  render() {
    return (
      <>
        <div>{this.displaySingleProduct()}</div>
      </>
    );
  }
}

export default graphql(singleProduct, {
  options: () => {
    return {
      variables: {
        id: localStorage["selectedProductId"],
      },
    };
  },
})(Product);
