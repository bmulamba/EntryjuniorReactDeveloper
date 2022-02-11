import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { singleProduct } from '../../GraphQl/Queries';
import './Product.scss'



class Product extends Component {

  displaySingleProduct(){
    var data = this.props.data;
    if (data.loading) {
      return (<div>Loading products</div>)
    } else {
      var prod = [];
      
      if(data.product){
        prod = data.product;
          return(
            <div className='product-section'>
              <div className='product-item'>
                <div className='side-item'>
                  <span> <img src={prod.gallery[0]} alt='{item.id}'/> </span>
                  <span> <img src={prod.gallery[1]} alt='{item.id}'/> </span>
                  <span> <img src={prod.gallery[2]} alt='{item.id}'/> </span>
                </div>
                <div className='product-image'>
                  <span> <img src={prod.gallery[0]} alt='{item.id}'/> </span>
                </div>
                <div className='product-text'>
                  <h1>{prod.name}</h1>
                  <h2>{prod.brand}</h2>
                <div className='product-size'>
                  <span>size :</span>
                  <ul>
                    <li>xs</li>
                    <li>s</li>
                    <li>m</li>
                    <li>l</li>
                  </ul>
                </div>
                <div className='product-price'>
                  <span>price : </span>
                  <span>{ localStorage['currencySymbol'] } <b>{ prod.prices.find(p => p.currency.symbol === localStorage['currencySymbol'])?.amount }</b></span>
                </div>
                <div className='product-add-cart'>
                  <button className='btn-add-to-cart'>add to cart</button>
                </div>
                  {prod.description}
                </div>
              </div>
            </div>
        )
      }
    }
  }

  render() {
    return <>
    <div className='product-section'>
      {this.displaySingleProduct()}
    </div>
    </>;
  }
}

export default graphql(singleProduct, {
  options: () => {
    return {
      
      variables: {
        id: localStorage['selectedProductId']
      }
    }
  }
})(Product)
