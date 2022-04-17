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
      attibutes : []
    };

    this.addToCart = this.addToCart.bind(this);
  }

  onChangeSizeHandler = (e, attributeType) => {
    e.preventDefault();
    let temp = {...this.state.attributes};
    temp[attributeType] = e.target.value;
    this.setState({size : e.target.value, attibutes : temp})
    console.log(temp);
    console.log(this.state.attibutes);
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

  displaySingleProduct() {
    var data = this.props.data;

    // console.log(data);

    if (data.loading) {
      return <div>Loading products</div>;
    } else {
      var prod = [];

      if (data.product) {
        prod = data.product;

        var imgprod = this.props.data.product.gallery;

        var attrib = this.props.data.product.attributes;

        // var attr = this.props.data.product.attributes.items

        // console.log(attrib[0].id);
        // console.log(prod.inStock);

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
                  {
                    // attrib > 0 &&
                    attrib.map((attribute) => (
                      <div key={prod.id + attribute.id}>
                        <p className="attribute-item">{attribute.id}</p>
                        <span>
                          {attribute.items.map((item) =>
                            item.value[0] === "#" ? (
                              <button
                                key={item.value}
                                onClick={(e) =>this.onChangeSizeHandler(e, item.id)}
                                value={item.displayValue}
                                style={{ backgroundColor: item.value }}
                              ></button>
                            ) : (
                              <button 
                              value={item.value} 
                              key={item.value}
                              onClick={(e) =>this.onChangeSizeHandler(e, item.id)}
                              > {" "}                                
                                {item.value}
                              </button>
                            )
                          )}
                        </span>
                      </div>
                    ))
                  }
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
    // console.log(this.props.data);
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
