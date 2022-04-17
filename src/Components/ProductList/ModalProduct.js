import React, { Component } from "react";
import "./Modal.scss";

export default class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attributes: [],
      // productAttributes : []
    };
  }

  
  onChangeSizeHandler = (e, attributeType) => {
    e.preventDefault();
    
    // let temp = [...this.state.attributes];
    // attributeType = e.target.value;
    this.setState({ size: e.target.value, attributes: [...this.state.attributes, attributeType(e.target.value)] });
    
    
    // console.log(e.target.value);
    
  };

  selectedAttributes = []
  componentDidUpdate(){
    this.selectedAttributes = this.state.attributes
  }


  addToCart(item) {
    item["quantity"] = 1;
    // let productAttributes = []
    item["attributes"] = this.selectedAttributes

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

  render() {
    // console.log(this.props.selectedProductId);
    // console.log(this.props.selectedSingleProduct);

    // console.log(this.props.selectedSingleProduct.brand);

    var attrib = this.props.selectedSingleProduct;

    // console.log(attrib);

    return (
      <div>
        {this.props.handleVisibilty ? (
          <div className="modalBg">
            <button className="btn-cls" onClick={this.props.handleClose}>
              &times;
            </button>
            <div className="modal-body">
              {attrib.map((item) => (
                <div key={item.id}>
                  <img
                    className="modalProductImg"
                    src={item.gallery[0]}
                    alt=""
                  ></img>
                  <form onSubmit={this.onSubmitHandler}>
                  {item.attributes.map((attribute) => (
                    <div key={attribute.id}>
                      <p>{attribute.id}</p>
                      <span>
                        {attribute.items.map((item) =>
                          item.value[0] === "#" ? (
                            <button
                              className="btn-modalProduct"
                              key={item.value}
                              value={item.displayValue}
                              style={{ backgroundColor: item.value }}
                              onClick={(e) =>
                                this.onChangeSizeHandler(e, attribute.id)
                              }
                            ></button>
                          ) : (
                            <button
                              value={item.value}
                              className="btn-modalProduct"
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
                  <div className="btn-add-cancel">
                    <button
                      className="btn-add-to-cart-modal"
                      onClick={() => this.addToCart(item)}
                    >
                      add to cart
                    </button>
                    <button
                      className="btn-cancel"
                      onClick={this.props.handleClose}
                    >
                      cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}
