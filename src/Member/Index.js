import LoginBlog from "./Login";
import RegisterBlog from "./Register";

function Index(){
    return(
        <section id="form">
		<div className="container">
			<div className="row">
				<RegisterBlog />
				<div className="col-sm-1">
					<h2 className="or">OR</h2>
				</div>
				<LoginBlog />
			</div>
		</div>
	    </section>
    )
}
export default Index