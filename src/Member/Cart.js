import axios from "axios";
import { useEffect, useState } from "react";

function EditCart(){
    const [getData,setData] = useState([])
   
    let xx = localStorage.getItem("xx")
    let total = 0
    let totalEnd = 0
    if (xx) {
        xx = JSON.parse(xx)
        // console.log(xx)
    }
    useEffect(()=>{
        axios.post("http://localhost:8080/laravel8/laravel8/public/api/product/cart",xx)
        .then((res)=>{
            console.log(res.data.data)
            setData(res.data.data)
        })
        .catch((err)=>console.log(err))
    },[])
    function handleUp(e){
        let getIdProduct = e.target.id
        const newArrUp = getData.map((value,index)=>{
            // console.log(value,index)
            if (getIdProduct == value.id) {
                value.qty +=1
                xx[value.id] = value.qty
            }
            return value
        })
        //set vào Local
        localStorage.setItem("xx",JSON.stringify(xx))
        //set vào html
        setData(newArrUp)
    }

    function handleDown(e){
        let getIdProduct = e.target.id
        const newArrDown = getData.map((value,index) => {
            if (value.id == getIdProduct){
                value.qty -=1
                xx[value.id] = value.qty
            }
            // xoa trong local
            if (value.qty < 1) {
                delete xx[value.id]
                // getData.splice(index,1)
            }
            return value
        })
        //xoa trong html
        let newArr = newArrDown.filter((value,key) => {
            return value.qty > 0
        })
        //set vào Local
        localStorage.setItem("xx",JSON.stringify(xx))
        //set vào html
        setData(newArr)
    }
    function removeData(e){
        let getIdProduct = parseInt(e.target.id) 
        // xoá html
        let newArr = getData.filter((value,index) => {
            return value.id != getIdProduct 
        })
        //xoa local
        delete xx[getIdProduct]
        localStorage.setItem("xx",JSON.stringify(xx))
        setData(newArr)
    }
    function renderData(){    
        if (getData.length > 0) {
            return (getData.map((value,index)=>{
                let getImage = value.image
                getImage = JSON.parse(getImage)[0]
                total = value.price * value.qty
                totalEnd = totalEnd + total
                return(
                    <>
                    <tr>  
                        <td class="cart_product">
                            <a ><img width="50px"  src={"http://localhost:8080/laravel8/laravel8/public/upload/product/" + value.id_user + "/" + getImage}  alt=""/></a>
                        </td>
                        <td class="cart_description">
                            <h4><a></a></h4>
                            <p class="id">ID : {value.id} </p> 
                        </td>
                        <td class="cart_price"> 
                            <p class="cart_price">{value.price}</p>
                        </td>
                        <td class="cart_quantity">
                            <div class="cart_quantity_button">
                                <a class="cart_quantity_up" id={value.id} onClick={handleUp}> + </a> 
                                
                                <input class="cart_quantity_input" type="text" name="quantity" value={value.qty} autocomplete="off" size="2"/>
                                <a class="cart_quantity_down" id={value.id} onClick={handleDown} > - </a> 
                            </div>
                        </td>
                        <td class="cart_total"> 
                            <p class="cart_total_price">{total} $</p>
                        </td>
                        <td class="cart_delete">
                            <a class="cart_quantity_delete" id= {value.id} onClick={removeData} ><i class="fa fa-times"></i> remove</a>
                        </td>
                    </tr>
                    </>
                )
            }
            ))  
        }
    }
    function renderTotal(){
        return (
            <li className="total_end">Total <span>{totalEnd} $</span></li>
        )
    }
    return (
        <>
        <section id="cart_items">
            <div className="container">
                <div className="breadcrumbs">
                    <ol className="breadcrumb">
                        <li><a href="#">Home</a></li>
                        <li className="active">Shopping Cart</li>
                    </ol>
                </div>          
                <div className="table-responsive cart_info">
                    <table className="table table-condensed">
                        <thead>
                            <tr className="cart_menu">
                            <td className="image">Item</td>
                            <td className="description" />
                            <td className="price">Price</td>
                            <td className="quantity">Quantity</td>
                            <td className="total">Total</td>
                            <td />
                            </tr>
                        </thead>
                        <tbody>
                            {renderData()}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="col-sm-6">
        <div className="total_area">
          <ul>
            <li>Cart Sub Total <span>$59</span></li>
            <li>Eco Tax <span>$2</span></li>
            <li>Shipping Cost <span>Free</span></li>
            {renderTotal()}
          </ul>
          <a className="btn btn-default update" href>Update</a>
          <a className="btn btn-default check_out" href>Check Out</a>
        </div>
      </div>
        </section>
        </>
    )
}
export default EditCart;