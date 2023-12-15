import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../Context/UserContext"

function ProductWishList(){
    const [data, setData] = useState([])
    const value = useContext(UserContext)
    let newArr = []
    let totalWishList = 0
    useEffect(() => {
        axios.get("http://localhost:8080/laravel8/laravel8/public/api/product/wishlist")
        .then(res => {
            setData(res.data.data)
            console.log(res.data.data)
        })
        .catch(error => console.log(error))
    }, []) 
    function Delete(e){
        let getIdDelete = e.target.id
        let arrWishList = localStorage.getItem('arrWishList')
        arrWishList = JSON.parse(arrWishList)

        let newArrDel = arrWishList.filter((value, index) => {
            return value!= getIdDelete
        })
        //xoa local
        newArrDel = JSON.stringify(newArrDel)
        localStorage.setItem('arrWishList',newArrDel)
        console.log(newArrDel)

        //set Context
        totalWishList = JSON.parse(localStorage.getItem('tongWishList'))
        totalWishList -= 1
        value.getTotalWishList(totalWishList)
    }
    
    function renderData() {
        
        let arrWishList = localStorage.getItem('arrWishList')
        arrWishList = JSON.parse(arrWishList)
        
        data.map((value,index) => {
            if (arrWishList.includes(value.id.toString())) {
            newArr.push(value)
            }
        })
        
        if (newArr.length > 0) {

            console.log(newArr)

            return newArr.map((value,index) => {
                let imageProduct = value.image
                imageProduct = JSON.parse(imageProduct)
                imageProduct = imageProduct[0]
                return(
                    
                    <div className="col-sm-4">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src={"http://localhost:8080/laravel8/laravel8/public/upload/product/" + value.id_user + "/" + imageProduct } alt="" />
                          <h2>{value.price}</h2>
                          <p>Easy Polo Black Edition</p>
                          <a className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"  />Delete</a>
                        </div>
                        <div className="product-overlay">
                          <div className="overlay-content">
                            <h2>{value.price}</h2>
                            <p>Easy Polo Black Edition</p>
                            <a id={value.id} onClick={Delete} className="btn btn-default add-to-cart" ><i className="fa fa-shopping-cart"   />Delete</a>
                          </div>
                        </div>
                      </div>
                      <div className="choose">
                        <ul className="nav nav-pills nav-justified">

                        </ul>
                      </div>
                    </div>
                  </div>
                )
            })
        }
        
    }

    
    
    return(
        <div className="col-sm-9 padding-right">
            <div className="features_items">
            <h2 className="title text-center">Wishlist Items</h2>
            {renderData()}
            </div>
        </div>
    )
}

export default ProductWishList
