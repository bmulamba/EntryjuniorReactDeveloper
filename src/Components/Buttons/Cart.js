import React, { Component } from 'react';
import './Cart.scss'

export default class Cart extends Component {

  cartdetails () {
    var products = JSON.parse(localStorage['cardProduct']);
    return (
      products.map(product => {
        return (<div>
          <h1>{product.name}</h1>
          <h2>{product.brand}</h2>
          <h2>{localStorage['currencySymbol']} {product.prices.find(p => p.currency.symbol === localStorage['currencySymbol']).amount * product.quantity}</h2>
        </div>
      )
    })
    )
  }


  render() {
    return <>
    <div className='product-in-cart mini-active'>
      {/* <div className='cart-container'>
        <div className='title'>
            <h1>cart</h1>
        </div>

        <div className="cart-description">        
            <div className='cart-desc-belt'>
                <h1 id='product-name'>appolo</h1>
                <h2 id='product-type'>Running short</h2>
                <h2 id='product-price'>$50</h2>
              <div className="cart-size">
                <span>s</span>
                <span>m</span>
              </div>
            </div>
            <div className="cart-mini-imag">
              <div className="cart-mini-add">
                <span>+</span>
                <h4 className='cart-quantity'>1</h4>
                <span>-</span>
              </div>
              <div className='cart-img'>
                <img src="images/laptop-1.jpg" alt="card-img"/>
              </div>
            </div>
        </div>

        
      </div> */}
      { this.cartdetails() }
    </div>
    </>
  }
}
