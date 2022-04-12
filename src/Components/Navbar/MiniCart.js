import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './MiniCard.scss'

export default class MiniCart extends Component {


  render() {

    // console.log(this.props);
    return (
        <div>
            
        {this.props.handleVisibilty ? (
            <div className="modalBgr" >
                <button className="btn-cls" onClick={this.props.handleClose}>&times;</button>
                <div className="modal-boody">
                

                    <h1>
                        hehehalsaskaksadjjadjadddadadadad
                    </h1>


                {/* {this.state.showCart ? (
                <div className="card-main-container"  >
                  <div className="card-container" >
                    {typeof localStorage["cardProduct"] === "undefined" ||
                    JSON.parse(localStorage["cardProduct"]).length === 0 ? (
                      <div className="emptyCard">
                        <h4>Your cart is empty.</h4>
                        <button className="btn-close-cart" onClick={() => this.setState({ showCart: false })}>CLOSE</button>
                      </div>
                    ) : (
                      <div className="card-content-container-full">
                        <h5 className="cart-qty-heard">
                          My Bag,{" "}
                          {typeof localStorage["cardProduct"] === "undefined" ||
                            JSON.parse(localStorage["cardProduct"]).length}{" "}
                          items
                        </h5>
                        <div className="cart-content-container">
                          <div className="card-content">
                            {this.displayCard()}
                          </div>
                          <h4 className="car-total">
                            Total amount:{" "}
                            <span >
                              {localStorage["currencySymbol"]}{" "}
                              {localStorage["totalCardAmount"]}
                            </span>
                          </h4>
                          <div className="item-prod-button">
                            <Link className="car-btn" to="/cart">
                              {" "}
                              Checkout{" "}
                            </Link>
                            <Link className="car-btn-cart" to="/cart">
                              {" "}
                              Cart{" "}
                            </Link>
                          </div>
                        </div>
                      </div>
                    )} */}
                  {/* </div>
                </div>
              ) : (
                <></> */}
              {/* ) */}
              {/* } */}
                </div>
            </div>) : <></>}
        </div>
    )
  }
}
