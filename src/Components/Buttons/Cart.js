import React, { Component } from 'react';
import './Cart.scss'

export default class Cart extends Component {
  render() {
    return <>
    <div className='product-in-cart mini-active'>
      <div className='cart-container'>
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

        
      </div>
    </div>
    </>
  }
}
