import react from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Product from './Components/pages/Product'
import ProductList from './Components/Buttons/ProductList';
import Cart from './Components/Buttons/Cart';
import './default.scss';
// import Cart from ''


class App extends react.Component {
  render(){
  return (
    <div >
      <Navbar />
      {/* <ProductList /> */}
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
