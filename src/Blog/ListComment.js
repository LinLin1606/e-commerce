function ListComment(props){
	function getId(e) {
		const id = e.target.id
		props.getIdReply(id)
	}
	function renderComment(){
		let data = props.getComment
		if(data.length > 0) {
			return data.map((value,key) => {
				if (value.id_comment == 0) {
					return (
						<>
							<li class="media">
								<a class="pull-left" href="#">
									<img class="media-object" src={"http://localhost:8080/laravel8/laravel8/public/upload/user/avatar/" + value.image_user} alt=""/>
								</a>
								<div class="media-body">
									<ul class="sinlge-post-meta">
										<li><i class="fa fa-user"></i>{value.name_user}</li>
										<li><i class="fa fa-clock-o"></i> 1:33 pm</li>
										<li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
									</ul>
									<p>{value.comment}</p>
									<a id={value.id} onClick={getId} class="btn btn-primary" ><i class="fa fa-reply"></i>Replay</a>
								</div>
							</li>
						{
							 data.map((value1,key1) => {
								if (value1.id_comment == value.id) {
									return (
										<li className="media second-media">
											<a className="pull-left" href="#">
											<img className="media-object" src={"http://localhost:8080/laravel8/laravel8/public/upload/user/avatar/" + value1.image_user} alt="" />
											</a>
											<div className="media-body">
											<ul className="sinlge-post-meta">
												<li><i className="fa fa-user" />Janis Gallagher</li>
												<li><i className="fa fa-clock-o" /> 1:33 pm</li>
												<li><i className="fa fa-calendar" /> DEC 5, 2013</li>
											</ul>
											<p>{value1.comment}</p>
											<a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
											</div>
										</li>
									)
								} 
							})
							
						}
					</>
					
					) 
				}
			})
		}
		
	}
    return(
      <div class="response-area">
		<h2>3 RESPONSES</h2>
		<ul class="media-list">
			{renderComment()}
		</ul>					
	</div>
    )   
}
export default ListComment