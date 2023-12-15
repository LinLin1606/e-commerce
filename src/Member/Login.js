import { useState } from "react";
import Error from "../../../du-an/src/Member/Formerrors"
import { useNavigate } from "react-router-dom";
import axios from "axios";


function LoginBlog() {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        email: "",
        password: "",
        level: 0
    })
    const [errors, setErrors] = useState({})
    function handleInput(e) {
        const nameInput = e.target.name
        const value = e.target.value
        setInput(state => ({ ...state, [nameInput]: value }))
    }
    function handleSubmit(e) {
        e.preventDefault();
        let errorsSubmit = {}
        let flag = true
        if (input.email == "") {
            errorsSubmit.email = ("Vui lòng điền email")
            flag = false
        }
        if (input.password == "") {
            errorsSubmit.password = ("Vui lòng điền password")
            flag = false
        }
        if (!flag) {
            setErrors(errorsSubmit)
        }
        if (flag) {
            const data = {
                email: input.email,
                password: input.password,
                level: 0
            }
            axios.post("http://localhost:8080/laravel8/laravel8/public/api/login", data)
                .then((res) => {
                    if (res.data.errors) {
                        setErrors(res.data.errors)
                    } else {
                        alert("Login success")
                        // console.log(res)
                        navigate("/")
                        const Auth = JSON.stringify(res.data.Auth)
                        const token = JSON.stringify(res.data.token)

                        localStorage.setItem("Auth", Auth)
                        localStorage.setItem("token", token)


                        const x = true
                        const xx = JSON.stringify(x)
                        localStorage.setItem("login", xx)
                    }
                })
        }
    }
    return (
        <div className="col-sm-4 col-sm-offset-1">
            <div className="login-form">
                <Error error={errors} />
                <h2>Login to your account</h2>
                <form action="#" onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email Address" name="email" onChange={handleInput} />
                    <input type="password" placeholder="Password" name="password" onChange={handleInput} />
                    {/* <span>
                        <input type="checkbox" class="checkbox" onChange={handleInput}/> 
                        Keep me signed in
                    </span> */}
                    <button type="submit" className="btn btn-default">Login</button>
                </form>
            </div>
        </div>
    )
}
export default LoginBlog;