import { useLocation } from "react-router-dom";
import Foot from "./Layout/Foot";
import Head from "./Layout/Header";
import Menuleft from "./Layout/Menuleft";
import MenuAcc from "./Member/MenuAcc";
import { UserContext } from "./Context/UserContext";
import { useState } from "react";
import { Provider } from "react-redux";
import store from "./Store";


function App(props) {
  let params1 = useLocation()
  const [getCart,setCart] = useState(0)
  const [getWishList,setWishList] = useState(0)
  function renderMenuLeft(){
    let menu = <Menuleft />;

    if(params1['pathname'].includes('account')){
      menu = <MenuAcc/>;
    }else if(params1['pathname'].includes('cart')){
      menu = "";
    }
    return menu;
    
  }
  function getCartQuantity(totalQty){
    setCart(totalQty)
    localStorage.setItem('tongQty', totalQty)
  }
  function getTotalWishList(totalWishList){
    setWishList(totalWishList)
    localStorage.setItem('tongWishList', totalWishList)
  }
  return (
   <>
   <Provider store={store}>
    <UserContext.Provider value = {{
    getCartQuantity: getCartQuantity,
    getTotalWishList: getTotalWishList,
    getCart: getCart,
    getWishList: getWishList
   }}>
    <Head/>
    <section>
      <div className="container">
        <div className="row">
          {
          // params1['pathname'].includes('account') ? <MenuAcc/> : params1['pathname'].includes('cart') ? <></> : <Menuleft/> 
            renderMenuLeft()
          }
          {props.children}
        </div>
      </div>
    </section>
    <Foot/>
    </UserContext.Provider>
   </Provider>
    
   </>

  );
}

export default App;
