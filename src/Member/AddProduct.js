import axios from "axios";
import { useEffect, useState } from "react";
import Error from "./Formerrors";

function AddProduct() {
    const [getCategory, setCategory] = useState([])
    const [getBrand, setBrand] = useState([])
    const [getFile, setFile] = useState([])
    const [errors, setErrors] = useState({})
    const [getInput, setInput] = useState({
        name: "",
        price: "",
        category: "",
        brand: "",
        companyprofile: "",
        detail: "",
        status: "",
        sale: ""
    })
    useEffect(() => {

        axios.get('http://localhost:8080/laravel8/laravel8/public/api/category-brand')
            .then(res => {
                setCategory(res.data.category)
                setBrand(res.data.brand)
                // console.log(res.data.category)
            })
            .catch(error => console.log(error))
    }, [])
    // Trả về categories từ api
    function renderCategory() {
        if (getCategory.length > 0) {
            return getCategory.map((value, key) => {
                return (
                    <option key={key} value={value.id}>{value.category}</option>
                )
            })
        }
    }
    // Trả về brand từ api
    function renderBrand() {
        if (getBrand.length > 0) {
            return getBrand.map((value, key) => {
                return (
                    <option key={key} value={value.id}>{value.brand}</option>
                )
            })
        }
    }
    //  Lấy image
    function handleInputFile(e) {
        setFile(e.target.files)
    }
    // Lấy data
    function handleInput(e) {
        const nameInput = e.target.name
        const value = e.target.value
        setInput(state => ({ ...state, [nameInput]: value }))
    }
    // Lấy status
    function renderSale() {
        if (getInput.status === "0") {
            return (
                <input type="text" placeholder="%" name="sale" onChange={handleInput} />
            )
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        let errorsSubmit = {}
        let flag = true
        if (getInput.name == "") {
            errorsSubmit.name = "Vui lòng điền tên sản phẩm"
            flag = false
        }
        if (getInput.price == "") {
            errorsSubmit.price = "Vui lòng điền giá"
            flag = false
        }
        if (getInput.companyprofile == "") {
            errorsSubmit.companyprofile = "Vui lòng điền company profile"
            flag = false
        }
        if (getInput.detail == "") {
            errorsSubmit.detail = "Vui lòng nhập detail"
            flag = false
        }
        if (getInput.category == "") {
            errorsSubmit.category = "Vui lòng chọn category"
            flag = false
        }
        if (getInput.brand == "") {
            errorsSubmit.brand = "Vui lòng chọn brand"
            flag = false
        }
        if (getInput.status == "0") {
            if (getInput.sale == "") {
                errorsSubmit.sale = "Vui lòng nhập giá sale"
                flag = false
            }
            flag = true
        }
        if (getFile == "") {
            errorsSubmit.files = "Vui lòng tải ảnh lên"
            flag = false
        } else {
            let arrCheckImg = ['png', 'jpg', 'jpeg', 'PNG', 'GIF']
            if (getFile.length <= 3) {
                Object.keys(getFile).map((value, key) => {
                    let getSize = getFile[value]['size'];
                    // console.log(getSize)
                    let getType = getFile[value]['type'].split('/');
                    // console.log(getType)
                    if (getSize > (1024 * 1024)) {
                        errorsSubmit.files = 'Kích thước size quá lớn'
                        flag = false

                    } else if (!arrCheckImg.includes(getType[1])) {
                        errorsSubmit.files = "Không phải định dạng hình ảnh"
                        flag = false
                    }
                })
            } else {
                errorsSubmit.files = "Không được quá tối đa 3 ảnh"
            }

        }
        if (!flag) {
            setErrors(errorsSubmit)
        }
        if (flag) {
            // console.log(getInput)

            let token = JSON.parse(localStorage.getItem("token"))
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }
            const formDataProduct = new FormData();
            formDataProduct.append("name", getInput.name);
            formDataProduct.append("price", getInput.price);
            formDataProduct.append("category", getInput.category);
            formDataProduct.append("brand", getInput.brand);
            formDataProduct.append("company", getInput.companyprofile);
            formDataProduct.append("detail", getInput.detail)
            formDataProduct.append("status", getInput.status)
            formDataProduct.append("sale", getInput.sale)

            Object.keys(getFile).map((value, key) => {
                formDataProduct.append("file[]", getFile[value])
            })
            axios.post("http://localhost:8080/laravel8/laravel8/public/api/user/product/add", formDataProduct, config)
                .then((res) => {
                    if (res.data.errors) {
                        setErrors(res.data.errors)
                    } else {
                        alert("Success!")

                    }
                })
        }
    }
    return (
        <div className="col-sm-4">
            <div className="signup-form">
                <h2>Create Product!</h2>
                <Error error={errors} />
                <form onSubmit={handleSubmit} enctype="multipart/form-data">
                    <input type="text" placeholder="Name" name="name" onChange={handleInput} />
                    <input type="price" placeholder="Price" name="price" onChange={handleInput} />
                    <select value={getInput.category} name="category" onChange={handleInput}>
                        <option value=''>Please choose category</option>
                        {renderCategory()}
                    </select>
                    <select value={getInput.brand} name="brand" onChange={handleInput}>
                        <option value=''>Please choose brand</option>
                        {renderBrand()}
                    </select>
                    <select value={getInput.status} name="status" onChange={handleInput}>
                        <option value="">Status</option>
                        <option value="0">Sale</option>
                        <option value="1">New</option>
                    </select>
                    {renderSale()}
                    <input type="company profile" placeholder="Company profile" name="companyprofile" onChange={handleInput} />
                    <textarea type="detail" placeholder="Detail" name="detail" onChange={handleInput} />
                    <label for="files">Select files:</label>
                    <input type="file" name="files" onChange={handleInputFile} multiple />
                    <button type="submit" className="btn btn-default">Add</button>
                </form>
            </div>
        </div>
    )
}
export default AddProduct;
