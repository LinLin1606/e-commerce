import axios from "axios"
import { useState } from "react"
import { useParams } from "react-router-dom"

function Comment(props) {
  const [value,setValue] = useState("")
  const [error,setError] = useState("")

  function HandleLogin(e){
    setValue(e.target.value)
  }
  function CheckLogin(e){
    e.preventDefault()
    let x = localStorage.getItem("login")
    x = JSON.parse(x)
    let flag = true
    if (value == "") {
      setError("vui lòng nhập bình luận")
      flag = false
    }
    if (!x){
      setError("vui lòng login")
      flag = false
    }
    if(flag) {
      let info = JSON.parse(localStorage.getItem("Auth"))
      let token = JSON.parse(localStorage.getItem("token"))

      let config = { 
        headers: { 
        'Authorization': 'Bearer '+ token,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
        } 
      }
      
      const formData = new FormData();
        formData.append("id_blog",props.idBlog);
        formData.append("id_user",info.id);
        formData.append("name_user",info.name);
        formData.append("id_comment", props.idReply ? props.idReply : 0);
        formData.append("comment",value);
        formData.append("image_user",info.avatar);

        axios.post("http://localhost:8080/laravel8/laravel8/public/api/blog/comment/" + props.idBlog,formData,config)
        .then((res) => {
          console.log(res.data.data)
          props.getCmt(res.data.data)
        })
    }
}
    return(
      <div className="replay-box">
        <div className="row">
          <div className="col-sm-12">
            <h2>Leave a replay</h2>
            <div className="text-area">
              <div className="blank-arrow">
                <p>{error}</p>
                <label>Your Name</label>
              </div>
              <span>*</span>
              <form onSubmit={CheckLogin}>
                <textarea onChange={HandleLogin} name="message" rows={11}>{value}</textarea>
                <button className="btn btn-primary" type="submit">post comment</button>
              </form>
              
            </div>
          </div>
        </div>
      </div>
    )
}
export default Comment