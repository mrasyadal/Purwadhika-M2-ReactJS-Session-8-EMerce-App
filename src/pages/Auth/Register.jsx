import React from "react";
import { Link } from "react-router-dom";
//import Axios from "axios";
//import { API_URL } from "../../constants/API";
// API_URL adalah http://localhost:2000
import { registerUser } from "../../redux/actions/user";
import { connect } from "react-redux";

class Register extends React.Component {
	state = {
		fullName: "",
		username: "",
		email: "",
		password: "",
	};

	inputHandler = (event) => {
		const value = event.target.value;
		const name = event.target.name;
		// const `name` adalah variable yg menyimpan attributes berupa string dari `name` input yang mentrigger `onChange`
		// event.target akan mengambil element HTML yg mentrigger perubahan
		this.setState({ [name]: value });
		// [name] adalah cara mengakses key dari key-value pairs pada suatu object/dictionary
		// isi `name` dari [name] bergantung kepada nama dari attributes `name` yang mentrigger `onChange` e.g. fullName, email, dst.
	};

	// method validasi inputHandler -> dipindahkan ke /redux/actions/user.js di M2S8C4
	// registerHandler = () => {
	// 	// alert(
	// 	// 	`fullname: ${this.state.fullName}\nusername: ${this.state.username}\nemail: ${this.state.email}\npassword: ${this.state.password}`
	// 	// );

	// 	// bisa pakai destructure dgn
	// 	const { fullName, username, email, password } = this.state;
	// 	Axios.post(`${API_URL}/users`, {
	// 		fullName,
	// 		username,
	// 		email,
	// 		password,
	// 		role: "user",
	// 		// versi ga pake destructure:
	// 		// fullName: this.state.fullName,
	// 		// username: this.state.username,
	// 		// email: this.state.email,
	// 		// password: this.state.password,
	// 		// role: "user",
	// 	})
	// 		.then(() => {
	// 			alert(`Berhasil mendaftarkan user`);
	// 		})
	// 		.catch(() => {
	// 			alert(`Gagal mendaftarkan user`);
	// 		});
	// };

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-12 text-center">
						<h1>Register now!</h1>
						<p className="lead">
							Register now and start shopping in the most affordable ecommerce
							platform
						</p>
					</div>
				</div>
				<div className="row mt-5">
					<div className="col-4 offset-4">
						<div className="card">
							<div className="card-body">
								<h5 className="font-weight-bold mb-3">Register</h5>
								<input
									onChange={this.inputHandler}
									type="text"
									name="fullName"
									placeholder="Full Name"
									className="form-control my-2"
								/>
								<input
									onChange={this.inputHandler}
									type="text"
									name="username"
									placeholder="Username"
									className="form-control my-2"
								/>
								<input
									onChange={this.inputHandler}
									type="text"
									name="email"
									placeholder="Email"
									className="form-control my-2"
								/>
								<input
									onChange={this.inputHandler}
									type="password"
									name="password"
									placeholder="Password"
									className="form-control my-2"
								/>
								<div className="d-flex flex-row justify-content-between align-items-center">
									<button
										onClick={() => this.props.registerUser(this.state)}
										// registerUser adalah action creator, filenya disimpan di folder /redux/actions dgn nama user.js
										className="btn btn-primary mt-2">
										Register
									</button>
									<Link
										to="/login"
										className="mt-2"
										style={{ textDecoration: "none" }}>
										or Log in
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

const mapStateToProps = () => {
	return {};
};

const mapDispatchToProps = {
	registerUser,
	// registerUserHandler: registerUser,
	// kalau mau pake function `registerUser` hasil import, harus pakai `registerUserHandler` sbg props-nya
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
