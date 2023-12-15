import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Blog from './Blog/Blog';
import Detail from './Blog/Detail';
import Login from './Member/Index';
import Home from './Member/Home';
import Update from './Member/Update';
import AddProduct from './Member/AddProduct';
import MyProduct from './Member/MyProduct';
import UpdateProduct from './Member/UpdateProduct';
import ProductHome from './Member/ProductHome';
import ProductDetail from './Member/ProductDetail';
import EditCart from './Member/Cart';
import ProductWishList from './Member/ProductWishList';

import {
  bootrapCss, allMinCss,
  animateCss, flaticonCss,
  magnificPopupCss, odometerCss,
  carouselCss, themeDefaultCss,
  niceSelectCss, animatedheadlineCss,
  mainCss, logoImage,
} from '../../components/teamplate';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/blog/list' element={<Blog />} />
          <Route path='/blog/detail/:id' element={<Detail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/account/update' element={<Update />} />
          <Route path='/account/product/add' element={<AddProduct />} />
          <Route path='/account/myproduct' element={<MyProduct />} />
          <Route path='/account/updateproduct/:id' element={<UpdateProduct />} />
          <Route path='/account/producthome' element={<ProductHome />} />
          <Route path='/productdetail/:id' element={<ProductDetail />} />
          <Route path='/cart' element={<EditCart />} />
          <Route path='/account/productwishlist' element={<ProductWishList />} />
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
