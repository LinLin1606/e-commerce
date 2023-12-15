import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useParams } from "react-router-dom";

function Blog(props){
  
    const [data,setData] = useState("");
    
    useEffect(() =>{
        axios.get('http://localhost:8080/laravel8/laravel8/public/api/blog')
        .then(res=>{
          setData(res.data.blog.data)
        })
        .catch(error => console.log(error))
    },[])

  function renderData(){
     if(data.length > 0){
      return data.map((value, key) =>{
        return (
            <div key={key} className="single-blog-post">
                <h3>{value.title}</h3>
                <div className="post-meta">
                  <ul>
                    <li><i className="fa fa-user" />{value.created_at} </li>
                    <li><i className="fa fa-clock-o" />{value.updated_at}</li>
                    {/* <li><i className="fa fa-calendar" />{value.comment}</li> */}
                  </ul>
                  <span>
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-half-o" />
                  </span>
                </div>
                <a href>
                  <img src={"http://localhost:8080/laravel8/laravel8/public/upload/Blog/image/"+ value.image} alt="" />
                </a>
                <p>{value.description}</p>
                <Link className="btn btn-primary" to={"/blog/detail/" + value.id}>Read More</Link>
            </div>
        )
      })
     }
  }
  
    return(
        <div className="col-sm-9">
          <div className="blog-post-area">
            <h2 className="title text-center">Latest From our Blog</h2>

            {renderData()}
   
            <div className="pagination-area">
              <ul className="pagination">
                <li><a href className="active">1</a></li>
                <li><a href>2</a></li>
                <li><a href>3</a></li>
                <li><a href><i className="fa fa-angle-double-right" /></a></li>
              </ul>
            </div>
          </div>
      </div>
    )
}
export default Blog