import React, { Component } from "react";
import "./Modal.scss"

export default class Modal extends Component {
  render() {
    const showHideModal  = this.props.openModal ? "modal display-block" : "modal display-none";
    console.log(this.props.size);
    return(
      <div className={showHideModal}>
        <section className="modal-main">
          
            <h1> this.props.size.map</h1>
            
          
        </section>
        <button type="button" onClick={this.props.handleClose}>Close</button>
      </div>
    )
  }
}
