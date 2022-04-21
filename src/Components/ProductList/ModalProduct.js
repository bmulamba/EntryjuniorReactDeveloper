import React, { Component } from "react";
import "./Modal.scss";

export default class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attributes: [],
    };
  }

  onChangeSizeHandler = (e, attributeType) => {
    e.preventDefault();
    let temp = { ...this.state.attributes };
    this.setState({ size: e.target.value, attributes: temp });
    temp[attributeType] = e.target.value;
   

    // console.log(e.target.value);
  };

  selectedAttributes = [];
  componentDidUpdate() {
    this.selectedAttributes = this.state.attributes;
  }

  addProductToCart = (e) => {
    e.preventDefault();
    var attributesArray = Object.values(this.selectedAttributes)
    let attributesLength = this.props.selectedSingleProduct[0].attributes.length
    if (attributesLength === 0) {
      this.props.addToCart(this.props.selectedSingleProduct[0]);
    } else if (attributesLength > 0) {
      console.log(attributesArray);
      attributesArray.length === attributesLength
        ? this.props.addToCart(
          this.props.selectedSingleProduct[0], this.selectedAttributes
          )
        : alert(`Please Provide the attributes`);
    }
  };

  render() {
    // console.log(this.props.selectedProductId);
    // console.log(this.props.selectedSingleProduct[0].attributes.length);

    // console.log(this.props.selectedSingleProduct.brand);

    var attrib = this.props.selectedSingleProduct;

    // console.log(this.props.selectedSingleProduct);

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
                                  this.onChangeSizeHandler(
                                    e,
                                    attribute.id
                                  )
                                }
                              ></button>
                            ) : (
                              <button
                                value={item.value}
                                className="btn-modalProduct"
                                key={item.value}
                                onClick={(e) =>
                                  this.onChangeSizeHandler(
                                    e,
                                    attribute.id
                                  )
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
                      onClick={this.addProductToCart}
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
