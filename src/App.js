import React, { Suspense} from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import './default.scss';
import Spinner from './Utilities/Spinner';



const ProductList = React.lazy(() => import("./Components/ProductList/ProductList"));

const Product = React.lazy(() => import("./Components/pages/Product"));

const Cart = React.lazy(() => import("./Components/Cart/Cart"))


class App extends React.Component {
  render(){
  return (
    <div >
      <Navbar />
      <Routes>
        <Route path="/" element = { <Suspense fallback={ < Spinner /> }> <ProductList /> </Suspense> } />
        <Route path="/all" element = { <Suspense fallback={ < Spinner /> }> <ProductList /> </Suspense> } />
        <Route path="/tech" element = { <Suspense fallback={ < Spinner /> }> <ProductList /> </Suspense> } />
        <Route path="/clothes" element = { <Suspense fallback={ < Spinner /> }> <ProductList /> </Suspense> } />
        <Route path="/product/:id" element = { <Suspense fallback={ < Spinner /> }> < Product /> </Suspense> } />  
        <Route path="/cart" element = { <Suspense fallback={ < Spinner /> }> < Cart /> </Suspense> } />  
      </Routes>
    </div>
  )};
}

export default App;
