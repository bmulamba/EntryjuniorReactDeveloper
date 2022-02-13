import React from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import { getCategories } from "../../GraphQl/Queries";
import './../Navbar.js';
import './ProductList.scss'

class ProductList extends React.Component {

    constructor(props){
        super(props);
        this.addToCart = this.addToCart.bind(this)
    }

    addToCart(item){
        item['quantity'] = 1;

        if(localStorage['cardProduct'] == null){
            localStorage['cardProduct'] = JSON.stringify([item]);
        } else{
            let products = JSON.parse(localStorage['cardProduct']) || []
            const index = products.findIndex((obj => obj.id === item.id));
            if(index >= 0){
                products[index].quantity += 1
            }
            else{
                products.push(item)
            }               
            localStorage['cardProduct'] = JSON.stringify(products);
        } 
        
        let amount = 0;
        JSON.parse(localStorage['cardProduct']).map((val)=>{
            return (
                amount += (val.prices.find(p => p.currency.symbol === localStorage['currencySymbol']).amount * val.quantity)
            )
         })
        localStorage['totalCardAmount'] = amount.toFixed(2);
    }


    displayProducts() {
        var data = this.props.data;
        const selectedCategory = localStorage['category'];
        var products = [];
        if (data.categories !== undefined && data.categories.length > 0) {
            if (selectedCategory === 'Tech') {
                products = data.categories.filter(d => d.name === 'tech')
            } else if (selectedCategory === 'Clothes') {
                products = data.categories.filter(d => d.name === 'clothes')
            }  else {
                products = data.categories.filter(d => d.name === 'all')
            } 
        }
        
        if (data.loading) {
            return (<div>Loading products</div>)
        } else {
        var prod = [];          
        if(products.length > 0){
            prod = products[0].products;
            return prod.map(item => {
                    return(
                        <div key={item.id}>
                            <Link className="pro-card" to={`/product/${item.id}`} onClick={() => { localStorage['selectedProductId'] = item.id }}>
                                <div className='card'>
                                    <div className="card-image">
                                        <img className="img-card" src={item.gallery[0]} alt='{item.id}'/>
                                    </div>
                                    <div className="card-info">
                                        <h3 className='cart-name'>{item.name}</h3>
                                        <h3 className='cart-price'> { localStorage['currencySymbol'] } <b>{ item.prices.find(p => p.currency.symbol === localStorage['currencySymbol']).amount }</b></h3>
                                    </div>
                                    <Link to="#" className='product-cart' onClick={()=> this.addToCart(item)}>
                                        <i className="fa fa-shopping-cart" ></i>
                                    </Link>
                                </div>
                            </Link>
                        </div>                        
                    )
                })
            }
        }
    }

    render() { 
        return (
            <div>
                <div className="product-section">
                    {this.displayProducts()} 
                </div>
            </div>
        );
    }
}
 
export default graphql(getCategories)(ProductList);
