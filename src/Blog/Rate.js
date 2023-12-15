import StarRatings from 'react-star-ratings';
import { useEffect, useState } from "react"; 
import axios from "axios"

function Rate(props){
    const [rating, setRating] = useState(0)
    const [error, setError] = useState('')
    let total = 0
    let tbc = 0
    // su dung api get de tinh trung binh cong
    useEffect(() => {
        axios.get("http://localhost:8080/laravel8/laravel8/public/api/blog/rate/" + props.idBlog)
        .then(res=> {
            let sum = 0
            if (res.data.data.length > 0) {
                sum = res.data.data.reduce((total, value) => {
                    return total + value.rate
                }, 0)
            }
            tbc = sum/res.data.data.length
            changeRating(tbc)
        })
        .catch(error=> console.log(error))
    },[])
    
    function changeRating( newRating, name ) {
        setRating(newRating)
        let x = localStorage.getItem("login")
        x = JSON.parse(x)
        if (!x){
            setError("vui lòng login")
        }else {
            //co token
            let info = JSON.parse(localStorage.getItem("Auth"))
            let token = JSON.parse(localStorage.getItem("token"))

            let config ={ 
                headers: { 
                'Authorization': 'Bearer '+ token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
                } 
              }
            const formDataRating = new FormData();
            formDataRating.append("user_id",info.id);
            formDataRating.append("blog_id",props.idBlog);
            formDataRating.append("rate",rating);

            axios.post("http://localhost:8080/laravel8/laravel8/public/api/blog/rate/" + props.idBlog,formDataRating,config)
            .then((res)=>{
            console.log(res.data)
            })
        }

    }
    
    return (
        <>
        {error}
        <StarRatings
        rating={rating}
        starRatedColor="blue"
        changeRating={changeRating}
        numberOfStars={6}
        name='rating'
        />
        </>
    );
    
}		
export default Rate;
					