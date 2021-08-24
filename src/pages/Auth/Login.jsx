import React from "react";
import { Link, Redirect } from "react-router-dom";
import { loginUser } from "../../redux/actions/user";
import { connect } from "react-redux";

class Login extends React.Component {
	state = {
		username: "",
		password: "",
	};

	inputHandler = (event) => {
		const value = event.target.value;
		const name = event.target.name;

		this.setState({ [name]: value });
	};

	render() {
		// fungsi redirect user ke home page setelah selesai login
		if (this.props.userGlobal.id) {
			return <Redirect to="/" />;
		}

		return (
			<div className="container">
				<div className="row">
					<div className="col-12 text-center">
						<h1>Log in now!</h1>
						<p className="lead">
							Log in now and start shopping in the most affordable ecommerce
							platform
						</p>
					</div>
				</div>
				<div className="row mt-5">
					<div className="col-4 offset-4">
						{/*  */}
						{/* alert error message login */}
						{this.props.userGlobal.errMsg ? (
							<div className="alert alert-danger">
								{this.props.userGlobal.errMsg}
							</div>
						) : null}
						{/*  */}
						<div className="card">
							<div className="card-body">
								<h5 className="font-weight-bold mb-3">Log in</h5>
								<input
									name="username"
									placeholder="Username"
									type="text"
									className="form-control my-2"
									onChange={this.inputHandler}
								/>
								<input
									name="password"
									placeholder="Password"
									type="password"
									className="form-control my-2"
									onChange={this.inputHandler}
									// di sini inputHandler tidak mengambil argumen apapun karena argumen akan langsung terekam secara otomatis di form
								/>
								<div className="d-flex flex-row justify-content-between align-items-center">
									<button
										onClick={() => this.props.loginUserHandler(this.state)}
										className="btn btn-primary mt-2">
										Login
									</button>
									<Link
										to="/register"
										className="mt-2"
										style={{ textDecoration: "none" }}>
										or Register
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userGlobal: state.user,
	};
};

const mapDispatchToProps = {
	loginUserHandler: loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
