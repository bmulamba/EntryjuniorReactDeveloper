import React, { Component } from "react";
import { graphql } from "react-apollo";
import parse from "html-react-parser";
import { singleProduct } from "../../GraphQl/Queries";
import "./Product.scss";

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgIndex: 0,
      attributes: [],
    };
  }

  onChangeSizeHandler = (e, attributeType) => {
    e.preventDefault();
    let temp = { ...this.state.attributes };
    this.setState({ size: e.target.value, attributes: temp });
    temp[attributeType] = e.target.value;
  };

  selectedAttributes = [];
  componentDidUpdate() {
    this.selectedAttributes = this.state.attributes;
  }

  addProductToCart = (e) => {
    e.preventDefault();
    var attributesArray = Object.values(this.selectedAttributes);
    let attributesLength = this.props.data.product.attributes.length;
    if (attributesLength === 0) {
      this.addToCart(this.props.data.product);
    } else if (attributesLength > 0) {
      attributesArray.length === attributesLength
        ? this.addToCart(this.props.data.product, this.selectedAttributes)
        : alert(`Please select all attributes`);
    }
  };

  addToCart(item, attributes = null) {
    let attributesArray = [];
    if (attributes != null) {
      let keys = Object.keys(attributes);
      let values = Object.values(attributes);
      for (let i = 0; i < keys.length; i++) {
        attributesArray.push({ key: keys[i], value: values[i] });
      }
    }

    item["quantity"] = 1;

    item["attributes"] = attributesArray;

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

  displaySingleProduct() {
    var data = this.props.data;

    if (data.loading) {
      return <div>Loading products</div>;
    } else {
      var prod = [];

      if (data.product) {
        prod = data.product;

        var imgprod = this.props.data.product.gallery;

        var attrib = this.props.data.product.attributes;

        return (
          <div className="product-detail-section">
            <div className="product-item">
              <div className="side-item">
                {imgprod.map((item, index) => {
                  return index <= 3 ? (
                    <div key={item} className="prod-sm-image">
                      {" "}
                      <img
                        src={item}
                        onClick={() => this.setState({ imgIndex: index })}
                        alt=""
                      />
                    </div>
                  ) : (
                    <div key={item}></div>
                  );
                })}
              </div>
              <div className="product-image">
                <span>
                  {" "}
                  <img
                    src={prod.gallery[this.state.imgIndex]}
                    alt="{item.id}"
                  />{" "}
                </span>
              </div>

              <div className="product-text">
                <h1>{prod.name}</h1>
                <h2>{prod.brand}</h2>
                <div className="product-size">
                  <form onSubmit={this.onSubmitHandler}>
                    {this.props.data.product.attributes.length > 0 &&
                      attrib.map((attribute) => (
                        <div key={prod.id + attribute.id}>
                          <p className="attribute-item">{attribute.id}</p>
                          <span>
                            {attribute.items.map((item) =>
                              item.value[0] === "#" ? (
                                <button
                                  key={item.value}
                                  onClick={(e) =>
                                    this.onChangeSizeHandler(e, attribute.id)
                                  }
                                  value={item.displayValue}
                                  style={{ backgroundColor: item.value }}
                                ></button>
                              ) : (
                                <button
                                  value={item.value}
                                  key={item.value}
                                  onClick={(e) =>
                                    this.onChangeSizeHandler(e, attribute.id)
                                  }
                                >
                                  {" "}
                                  {item.value}
                                </button>
                              )
                            )}
                          </span>
                        </div>
                      ))}
                  </form>
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
                    onClick={this.addProductToCart}
                    disabled={!prod.inStock}
                  >
                    {prod.inStock ? "add to cart" : "out of stock"}
                  </button>
                </div>
                <div>{parse(prod.description)}</div>
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
