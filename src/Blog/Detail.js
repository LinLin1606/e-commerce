import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Rate from "./Rate";
import Comment from "./Comment";
import ListComment from "./ListComment";

function Detail(props) {
  const [getComment,setComment]=useState("")
  const [idReply,setId] = useState("")
  let params = useParams();
  const [data,setData] = useState("")
  useEffect(() =>{

      axios.get('http://localhost:8080/laravel8/laravel8/public/api/blog/detail/' + params.id)
      .then(res=>{
        setData(res.data.data);
        setComment(res.data.data.comment)
        console.log(res.data.data.comment)

      })
      .catch(error => console.log(error))
  },[])
  function getIdReply(id) {
    setId(id)
  }
//data truyen vao de lay cmt moi tu comment
  function getCmt(data){
    // console.log(data)
    // truyen vao list cmt de render
    setComment(getComment.concat(data))
  }
  
  function renderData() {

    if (Object.keys(data).length > 0) {
          return (
            <div className="single-blog-post">
              <h3>{data.title}</h3>
              <div className="post-meta">
              <ul>
                <li><i className="fa fa-user" /> Mac Doe</li>
                <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
              </ul>
              </div>
              <a href>
                <img src={"http://localhost:8080/laravel8/laravel8/public/upload/Blog/image/" + data.image} alt="" />
              </a>
              <p>{data.description}</p> <br />
              <div className="pager-area">
                <ul className="pager pull-right">
                  <li><a href="#">Pre</a></li>
                  <li><a href="#">Next</a></li>
                </ul>
              </div>
            </div>
          )
     }
  }

    return(
      <div className="col-sm-9">
        <div className="blog-post-area">
          <h2 className="title text-center">Latest From our Blog</h2>
          {renderData()}
         
        </div>{/*/blog-post-area*/}
        
        <Rate idBlog={params.id}/>
      
        <div className="socials-share">
          <a href><img src="images/blog/socials.png" alt="" /></a>
        </div>{/*/socials-share*/}
       
            
        <ListComment getComment = {getComment} getIdReply = {getIdReply}  />
          
        <Comment idBlog={params.id} getCmt = {getCmt}  idReply = {idReply} />
      </div>
    )
}
export default Detail