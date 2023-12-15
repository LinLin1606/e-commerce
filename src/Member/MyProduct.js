import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
//Update Product + Delete product
function MyProduct(){
    const [getData,setData] = useState("")
    let token = JSON.parse(localStorage.getItem("token"))
    let info = JSON.parse(localStorage.getItem("Auth"))
    let config = { 
        headers: { 
        'Authorization': 'Bearer '+ token,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
        } 
    }
    useEffect(()=>{

        axios.get("http://localhost:8080/laravel8/laravel8/public/api/user/my-product",config)
        .then(res => {
            setData(res.data.data)
            console.log(res.data.data)
        })
        .catch(error => console.log(error))
	},[])
    function deleteProduct (e){
        const getId = e.target.id //id sarn pham
        axios.get("http://localhost:8080/laravel8/laravel8/public/api/user/product/delete/" + getId,config)
        .then(res => {
            setData(res.data.data)
        })
        .catch(error => console.log(error))
    }
    //function renderData(){
    //     if (Object.length(getData) > 0){
    //         let imageProduct =  JSON.parse(getData.image)[0]
    //         return (
    //             <tr>
    //                 <td>{getData.id}</td>
    //                 <td>{getData.name}</td>
    //                 <td><img class="media-object" src={"http://localhost:8080/laravel8/laravel8/public/upload/product/" + info.id + "/" + imageProduct } /></td>
    //                 <td>{getData.price}</td>
    //                 <td><a id={getData.id} onClick={deleteProduct}>delete</a></td>
    //                 <td><Link to={'/account/updateproduct/' + getData.id}>Edit</Link></td>
    //             </tr>
    //         )
    //     }
    // }
    function renderData(){
        if (Object.keys(getData).length > 0) {
            return Object.keys(getData).map((key,index) => {
                let imageProduct = getData[key].image
                imageProduct = JSON.parse(imageProduct)[0]
                console.log(imageProduct)
                return (
                    <tr>
                        <td>{getData[key].id}</td>
                        <td>{getData[key].name}</td>
                        <td><img class="media-object" src={"http://localhost:8080/laravel8/laravel8/public/upload/product/" + info.id + "/" + imageProduct } /></td>
                        <td>{getData[key].price}</td>
                        <td><a id={getData[key].id} onClick={deleteProduct}>delete</a></td>
                        <td><Link to={'/account/updateproduct/' + getData[key].id}>Edit</Link></td>
                    </tr>
                )
            })
        }
     }
    return(

        <table>
            <tr>
                <td>id</td>
                <td>name</td>
                <td>image</td>
                <td>price</td>
                <td colSpan={2}>action</td>
            </tr>
            
            {renderData()}
        </table>
        
    )
}
export default MyProduct