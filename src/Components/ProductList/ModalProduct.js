import React, { Component } from "react";
import "./Modal.scss"

export default class Modal extends Component {
  constructor(props){
    super(props);

    this.state = {
      attibutes : {}
    }
  }

  onChangeSizeHandler = (e, attributeType) => {
    e.preventDefault();
    let temp = {...this.state.attributes};
    temp[attributeType] = e.target.value;
    this.setState({size : e.target.value, attibutes : temp})
    console.log(temp);
    console.log(this.state.attibutes);
  }

  addToCart = (event) => {
		event.preventDefault();
		if (this.props.product.attributes.length === 0) {
			this.props.addToCart({
				id: this.props.product.id,
				attributes: [],
				size: "item",
			});
			this.props.closeModal();
		} else if (this.props.product.attributes.length > 0) {
			if (
				Object.entries(this.props.product.attributes).length ===
				Object.entries(this.state.attributes).length
			) {
				this.props.addToCart({
					id: this.props.product.id,
					selectedAttributes: this.state.attributes,
					attributes: this.props.product.attributes,
					category: this.props.category,
				});
				this.props.closeModal();
			} else {
				alert(`Select the attributes of the product`);
			}
		}
	};

  
  render() {
    // console.log(this.props.selectedProductId);
    // console.log(this.props.selectedSingleProduct);

    // console.log(this.props.selectedSingleProduct.brand);

    var attrib = this.props.selectedSingleProduct;

  
    return(
      <div >
        {this.props.handleVisibilty ? (
          <div className="modalBg" >
            <button className="btn-cls" onClick={this.props.handleClose}>&times;</button>
            <div className="modal-body">  
              {attrib.map(item => (
                <div key={item.id} >
                  <img className="modalProductImg" src={item.gallery[0]} alt=""></img>
                  {
                    item.attributes.map(attribute => (
                      <div key={attribute.id}>
                        <p >
                          {attribute.id}
                        </p>
                        <span>
                          {
                            attribute.items.map((item) =>
                              item.value[0] === "#" ? (
                                <button
                                className="btn-modalProduct"
                                   key={item.value}
                                  value={item.displayValue}
                                  style={{ backgroundColor: item.value }}
                                  onClick={(e) =>this.onChangeSizeHandler(e, item.id)}
                                ></button>
                              ) : (
                                <button 
                                value={item.value}
                                className="btn-modalProduct" 
                                key={item.value}
                                onClick={(e) =>this.onChangeSizeHandler(e, item.id)}
                                >
                                  {" "}
                                  {item.value}
                                </button>
                              )
                            )
                          }
                        </span>
                      </div>
                    ))
                  }
                  <div className="btn-add-cancel">
                  <button
                    className="btn-add-to-cart-modal"
                    onClick={() => this.addToCart(item)}
                  >
                    add to cart
                  </button>
                  <button className="btn-cancel" onClick={this.props.handleClose}>
                    cancel
                  </button>
                  </div>
                </div>
              ))}
            </div>
          </div>) : <></>}
      </div>
    )
  }
}
