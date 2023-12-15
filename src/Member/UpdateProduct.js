import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Error from "./Formerrors"

function UpdateProduct(){
    let info = JSON.parse(localStorage.getItem("Auth"))
    const [avatarCheckBox,setAvatarCheckBox] = useState([])  // ảnh cần xoá
    const [getCategory, setCategory] = useState([])
	const [getBrand, setBrand] = useState([])
    const [getFile,setFile] = useState([]) //ảnh để render từ api
    const [getUpload,setUpload] = useState([]) //ảnh upload
    const [errors,setErrors] = useState({})
    const [getData,setData] = useState({
        name:"",
        price: "",
        category: "",
        brand:"",
        companyprofile : "",
		detail: "",
		status: "",
        sale: ""
    })
    const params = useParams()
    let token = JSON.parse(localStorage.getItem("token"))
    let config = { 
        headers: { 
        'Authorization': 'Bearer '+ token,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
        } 
    }
    
    // Lấy data trả về form
    useEffect(() =>{
		axios.get("http://localhost:8080/laravel8/laravel8/public/api/user/product/" + params.id,config)
		.then(res=>{
			setData({
                name: res.data.data.name,
                price: res.data.data.price,
                category: res.data.data.id_category,
                brand: res.data.data.id_brand,
                companyprofile :res.data.data.company_profile,
                detail: res.data.data.detail,
                status: res.data.data.status,
                sale: res.data.data.sale
            })
            setFile(res.data.data.image)
            console.log(res.data.data);
		})
		.catch(error => console.log(error))
	},[])
    //Lấy category và brand
    useEffect(() =>{

		axios.get('http://localhost:8080/laravel8/laravel8/public/api/category-brand')
		.then(res=>{
			setCategory(res.data.category)
			setBrand(res.data.brand)
		})
		.catch(error => console.log(error))
	},[])
    //Trả về category từ api
    function renderCategory(){
		if (getCategory.length > 0 ) {
			return getCategory.map((value,index) => {
                return (
                    <option key={index} value = {value.id}>{value.category}</option>
                )
            })
		}
	}
    // Trả về brand từ api
	function renderBrand(){
		if (getBrand.length > 0 ) {
            return getBrand.map((value,key) => {
                return (
                    <option key={key} value = {value.id}>{value.brand}</option>
                )
            })
		}
	}
    // Lấy value files upload
    function handleInputFile(e){
		setUpload(e.target.files)
	}
    // Lấy value input
    function handleInputChange(e){
        const name = e.target.name
        const value = e.target.value
        setData(state => ({...state, [name] : value}))
    }
    // ImageCheckbox
    function getImageChecked(e){
        const valueImageChecked = e.target.value
        const checkedImage = e.target.checked
        if (checkedImage){
            setAvatarCheckBox(state => ([...state, valueImageChecked]))
        }else{
            if(avatarCheckBox.includes(valueImageChecked)){
                let result = avatarCheckBox.filter(function(element){
                    return element != valueImageChecked
                })
                setAvatarCheckBox(result)
            }
        }
    }
    // Lấy status
    function renderSale(){
        if (getData.status === "0" ) {
            return(
                <input type="text" placeholder="%" name="sale" value={getData.sale} onChange={handleInputChange}/>
            )
        }
	}

    function handleSubmit(e){
		e.preventDefault()
		let errorsSubmit = {}
        let flag = true 
        if (getData.name == "" ) {
            errorsSubmit.name = "Vui lòng điền tên sản phẩm"
            flag = false
        }
        if (getData.price == "" ) {
            errorsSubmit.price = "Vui lòng điền giá"
            flag = false
        }
        if (getData.companyprofile == "" ) {
            errorsSubmit.companyprofile = "Vui lòng điền company profile"
            flag = false
        } 
        if (getData.detail == "" ) {
            errorsSubmit.detail = "Vui lòng nhập detail"
            flag = false
        } 
		if (getData.category == "" ) {
            errorsSubmit.category = "Vui lòng chọn category"
            flag = false
        }
        if (getData.brand == "" ) {
            errorsSubmit.brand = "Vui lòng chọn brand"
            flag = false
        }
        if(getData.status == "0") {
            if (getData.sale == "" ) {
                errorsSubmit.sale = "Vui lòng nhập giá sale"
                flag = false
            }
            flag = true
        }
        if (getUpload !== "" ) { 
            let arrCheckImg = ['png', 'jpg', 'jpeg', 'PNG','GIF']
            if (getUpload.length <=3 ) {
                Object.keys(getUpload).map((value,key) => {
                    let getSize = getUpload[value]['size'];
                    // console.log(getSize)
                    let getType = getUpload[value]['type'].split('/');
                    // console.log(getType)
                    if ( getSize > (1024*1024)) {
                            errorsSubmit.files = 'Kích thước size quá lớn'
                            flag = false
                            
                    }else if(!arrCheckImg.includes(getType[1])) {
                            errorsSubmit.files = "Không phải định dạng hình ảnh"
                            flag = false
                    }
                })
            } else {
                errorsSubmit.files = "Không được quá tối đa 3 ảnh"
            }

            // if (avatarCheckBox.length>0) {
            //     let existImage = 3 - avatarCheckBox.length
            //     if ((getUpload.length + existImage) >3 ) {
            //         errorsSubmit.files = "Không được quá tối đa 3 ảnh"
            //         flag = false
            //     }
            // }else{
            //     if ((getUpload.length + getFile.length) >3 ) {
            //         errorsSubmit.files = "Không được quá tối đa 3 ảnh"
            //         flag = false
            //     }
            // }
            let existImage = getFile.length
            if (avatarCheckBox.length>0) {
                existImage = getFile.length - avatarCheckBox.length
            }
// let existImage = getFile.length - avatarCheckBox.length
            if ((getUpload.length + existImage) >3 ) {
                errorsSubmit.files = "Không được quá tối đa 3 ảnh"
                flag = false
            }
            // - kiem tra upload k?
            //     - kiem tra co check k?
            //     - k check
            
        }
        
        if (!flag) {
            setErrors(errorsSubmit)
        }
        if (flag) {
          
            let token = JSON.parse(localStorage.getItem("token"))
            let config = { 
                headers: { 
                'Authorization': 'Bearer '+ token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
                } 
            }
            const formDataProduct = new FormData();
                formDataProduct.append("name",getData.name);
                formDataProduct.append("price",getData.price);
                formDataProduct.append("category", getData.category);
                formDataProduct.append("brand",getData.brand);
                formDataProduct.append("company",getData.companyprofile);
                formDataProduct.append("detail",getData.detail )
                formDataProduct.append("status",getData.status )
                formDataProduct.append("sale",getData.sale )

                Object.keys(getUpload).map((value,key) => {
                    formDataProduct.append("file[]", getUpload[value])
                })
                
                avatarCheckBox.map((value,key) => {
                    formDataProduct.append("avatarCheckBox[]", value)
                })
                 axios.post("http://localhost:8080/laravel8/laravel8/public/api/user/product/update/" +params.id , formDataProduct,config)
                         .then((res) => {
                        if(res.data.errors){
                            setErrors(res.data.errors)
                        }else{
                           alert("Success!")
                            
                        }
                    })
        }
    }
    function renderData(){
        if (Object.keys(getData).length > 0) {
                return(
                    <>
                        <div className="signup-form">
                        <h1>abc</h1>
                        <input value={getData.name} type="text" placeholder="Name" name="name" onChange={handleInputChange}    />
                        <input value={getData.price} type="price" placeholder="Price" name="price" onChange={handleInputChange} />
                        <select value={getData.category} name="category" onChange={handleInputChange}  >
							<option value=''>Please choose category</option>
                            {renderCategory()}
						</select>
                        <select value={getData.brand} name="brand" onChange={handleInputChange} >
							<option value=''>Please choose brand</option> 
                            {renderBrand()}
						</select>
                        <select value={getData.status} name="status" onChange={handleInputChange}>
                            <option value="">Status</option>
							<option value="0">Sale</option>
							<option value="1">New</option>
						</select>
                        {renderSale()}
                        <input value={getData.companyprofile} type="company profile" placeholder="Company profile" name="companyprofile" onChange={handleInputChange}   />
                        <textarea value={getData.detail} type="detail" placeholder="Detail" name="detail" onChange={handleInputChange} />
                        <label for="files">Select files:</label>
  							<input type="file" name="files" multiple onChange={handleInputFile}/>
                            { 
                             getFile.map((value,key)=>{
                                return(
                                    <>
                                    <img class="media-object" src={"http://localhost:8080/laravel8/laravel8/public/upload/product/" + info.id + "/" + value } />
                                    <input type="checkbox" value={value} onClick={getImageChecked} />
                                    </>
                                )
                             })
                            }
                            
						<button type="submit" className="btn btn-default">Add</button>
                        </div>
                    
                    </>
                )
        }
    }
   
    return(
        <div className="col-sm-4">
				<h2>Update Product</h2>
                <div className="col-sm-4">
					<Error error={errors}/>
					<form   enctype="multipart/form-data" onSubmit={handleSubmit}>
                    {renderData()}
					</form>
                </div>
		</div>
    )
}
export default UpdateProduct