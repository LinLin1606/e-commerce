import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Error from "./Formerrors";

function Update(props){
    const [user, setUser] = useState({
        name: "",
        email:"",
        password: "",
        phone:"",
        address:"",
        avatar: "",
    })
    const [getFile, setFile] = useState("")
    const [avatar,setAvatar] = useState("")
    const [errors, setErrors] = useState({})
    useEffect(() => {
        let userData = localStorage.getItem("Auth");
        if (userData) {
            userData = JSON.parse(userData)
            setUser({
                name: userData.name,
                email: userData.email,
                password: userData.password,
                phone: userData.phone,
                address: userData.address,
                avatar: userData.avatar,
            }) 
        }
    },[])

    function handleInput(e){
        const nameInput = e.target.name
        const value = e.target.value
        setUser(state => ({...state, [nameInput] : value}))
    }

    function handleInputFile(e){
        let file = e.target.files
        //gửi qua api
        let reader = new FileReader()
        reader.onload = (e) => {
            setAvatar(e.target.result)
        };
        //xử lí ảnh
        if(file){
            setFile(file)
            reader.readAsDataURL(file[0])
        }
        
    }

    function handleSubmit(e){
        e.preventDefault()
        let errorsSubmit = {}
        let flag = true 
        if (user.name == "" ) {
            errorsSubmit.name = "Vui lòng điền tên"
            flag = false
        }
        if (user.phone == "" ) {
            errorsSubmit.phone = "Vui lòng điền số điện thoại"
            flag = false
        } 
        if (user.address == "" ) {
            errorsSubmit.address = "Vui lòng điền địa chỉ"
            flag = false
        }
        if (getFile != "" ) {
            // kiểm tra size và định dạng hình ảnh
            // console.log(getFile);
            let getSize = getFile[0]['size'];
            let getType = getFile[0]['type'].split('/');
            // hinhanh la file co duoi file thuoc vao nhung cai sau: png, jpg. jpeg, PNG... 
            let arrCheckImg = ['png', 'jpg', 'jpeg', 'PNG','GIF']

            if ( getSize > (1024*1024)) {
                errorsSubmit.file = 'Kích thước size quá lớn'
                flag = false
            }else if(!arrCheckImg.includes(getType[1])) {
                errorsSubmit.file = "Không phải định dạng hình ảnh"
                flag = false
            }

        }
    
        if (!flag) {
            setErrors(errorsSubmit)
        }
        if (flag) { 
            let token = JSON.parse(localStorage.getItem("token"))
            let info = JSON.parse(localStorage.getItem("Auth"))
            let config = { 
                headers: { 
                'Authorization': 'Bearer '+ token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
                } 
            }
            const formData = new FormData();
                formData.append("name",user.name);
                formData.append("email",user.email);
                formData.append("password", user.password ? user.password : "");
                formData.append("phone",user.phone);
                formData.append("address",user.address);
                formData.append("avatar",avatar ? avatar : "" )

                axios.post("http://localhost:8080/laravel8/laravel8/public/api/user/update/" + info.id,formData,config)
                .then((res) => {
                    if(res.data.errors) {
                        setErrors(res.data.errors)
                    }else {
                        alert("Update success")
                       
                        const Auth = JSON.stringify(res.data.Auth)
                        const token = JSON.stringify(res.data.token)
                        
                        localStorage.setItem("Auth", Auth)
                        localStorage.setItem("token", token)
                       
                    }
                })
        }
    }

    return(
        <div className="col-sm-4">
			<div className="signup-form">
				<h2>User Update!</h2>
                    <Error error={errors}/>
					<form action="#" onSubmit={handleSubmit}  enctype="multipart/form-data">
						<input type="text" placeholder="Name" name="name" value={user.name} onChange={handleInput} />
						<input type="email" placeholder="Email Address" name="email" value={user.email} readOnly  />
						<input type="password" placeholder="Password" name="password" value={user.password} onChange={handleInput} />
                        <input type="phone" placeholder="Phone" name="phone" value = {user.phone} onChange={handleInput}  />
                        <input type="address" placeholder="Address" name="address" value={user.address} onChange={handleInput} />
                        <input type="file" onChange={handleInputFile} />
                
						<button type="submit" className="btn btn-default">Update</button>
					</form>
			</div>
		</div>
    )
}
export default Update;