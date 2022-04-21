import react from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Product from './Components/pages/Product'
import ProductList from './Components/ProductList/ProductList';
import Cart from './Components/Cart/Cart';
import './default.scss';


class App extends react.Component {
  render(){
  return (
    <div >
      <Navbar />

      <Routes>
        <Route path="/" element = { <ProductList /> } />
        <Route path="/all" element = { <ProductList /> } />
        <Route path="/tech" element = { <ProductList /> } />
        <Route path="/clothes" element = { <ProductList /> } />
        <Route path="/product/:id" element = { < Product /> } />  
        <Route path="/cart" element = { < Cart /> } />  
      </Routes>
    </div>
  )};
}

export default App;
