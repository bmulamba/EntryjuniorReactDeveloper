import React, { Component } from "react";
import "./Modal.scss"

export default class Modal extends Component {
  render() {
    console.log(this.props);
    return(
      <div >
        {this.props.handleVisibilty ? (
          <div className="modalBg" >
            <button className="btn-cls" onClick={this.props.handleClose}>&times;</button>
            <div className="modal-body">        
              <form>
                <h1>
                  lorem le grand de text pour le developeur
                </h1>
                <div className="btn-modal">
                  <button 
                    className="btn-add-to-cart"
                        // onClick={() => this.addToCart(prod)}
                        // disabled={!prod.inStock}
                      >
                        {/* {this.props.prodItem.inStock ? "add to cart" : "out of stock"} */}
                    bdbdbd
                  </button>
                  <button className="close-btn" onClick={this.props.handleClose}>
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>) : <></>}
      </div>
    )
  }
}
