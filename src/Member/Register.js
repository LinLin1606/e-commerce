import { useState } from "react"
import Error from "../../../du-an/src/Member/Formerrors"
import axios from "axios"

function RegisterBlog() {
    
    const [input,setInput] = useState({
        name: "",
        email:"",
        password: "",
        phone:"",
        address:"",
        avatar: "",
        level: 0
    })
    const [errors, setErrors] = useState({})
    const [getFile, setFile] = useState("")
    const [avatar,setAvatar] = useState("")

    function handleInput(e){
        const nameInput = e.target.name
        const value = e.target.value
        setInput(state => ({...state, [nameInput] : value}))
    }
    function handleInputFile(e){
        let file = e.target.files
        
        let reader = new FileReader()
        reader.onload = (e) => {
            setAvatar(e.target.result)
        };
        if(file){
            setFile(file)
            reader.readAsDataURL(file[0])
        }
    }
    
    function hanldeSubmit(e){
        e.preventDefault()
        let errorsSubmit = {}
        let flag = true 
        if (input.name == "" ) {
            errorsSubmit.name = "Vui lòng điền tên"
            flag = false
        }
        if (input.email == "" ) {
            errorsSubmit.email = "Vui lòng điền email"
            flag = false
        }else{
            // kiểm tra định dạng email
            let emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if(!emailRegex.test(input.email)){
                errorsSubmit.email = 'Vui lòng nhập đúng định dạng email'
                flag = false
            }
        }
        if (input.password == "" ) {
            errorsSubmit.password = "Vui lòng điền password"
            flag = false
        } 
        if (input.phone == "" ) {
            errorsSubmit.phone = "Vui lòng điền số điện thoại"
            flag = false
        } 
        if (input.address == "" ) {
            errorsSubmit.address = "Vui lòng điền địa chỉ"
            flag = false
        }
        if (getFile == "" ) {
            errorsSubmit.files = "Vui lòng tải ảnh lên"
            flag = false
        } else {
            // kiểm tra size và định dạng hình ảnh
            // console.log(getFile);
            let getSize = getFile[0]['size'];
            let getType = getFile[0]['type'].split('/');
            
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
            const data = {
                name: input.name,
                email: input.email,
                password: input.password,
                phone:input.phone,
                address:input.address,
                avatar: avatar,
                level: 0,

            }
            axios.post("http://localhost:8080/laravel8/laravel8/public/api/register", data)
            .then((res) => {
                if(res.data.errors){
                    setErrors(res.data.errors)
                }else{
                    alert("Registered")
                }
            })
        }
    }

    return(
        <div className="col-sm-4">
			<div className="signup-form">
				<h2>New User Signup!</h2>
                    <Error error={errors}/>
					<form action="#" onSubmit = {hanldeSubmit} enctype="multipart/form-data">
						<input type="text" placeholder="Name" name="name" onChange={handleInput}/>
						<input type="email" placeholder="Email Address" name="email" onChange={handleInput} />
						<input type="password" placeholder="Password" name="password" onChange={handleInput}/>
                        <input type="phone" placeholder="Phone" name="phone" onChange={handleInput}/>
                        <input type="address" placeholder="Address" name="address" onChange={handleInput}/>
                        <input type="file" onChange={handleInputFile} />
                
						<button type="submit" className="btn btn-default">Signup</button>
					</form>
			</div>
		</div>
    )
}
export default RegisterBlog