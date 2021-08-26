import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import History from "./pages/History";
import ProductDetail from "./pages/ProductDetail";
import MyNavbar from "./components/MyNavbar";

import { connect } from "react-redux";
import { userKeepLogin, checkStorage } from "./redux/actions/user";

class App extends React.Component {
	componentDidMount() {
		const userLocalStorage = localStorage.getItem("userDataEmmerce");

		if (userLocalStorage) {
			// if `userLocalStorage` has something in it
			const userData = JSON.parse(userLocalStorage);
			// JSON.parse adalah method untuk mengubah object yg telah diubah menjadi string dengan JSON.stringify kembali menjadi object

			// panggil fungsi userKeepLogin
			this.props.userKeepLogin(userData);
		} else {
			// kalau `userLocalStorage` belum ada isinya, `type: "USER_LOGIN"` belum ter-trigger yang mengakibatkan belum terubahnya storageIsChecked menjadi true
			this.props.checkStorage();
		}
	}

	render() {
		if (this.props.userGlobal.storageIsChecked) {
			return (
				<BrowserRouter>
					<MyNavbar />

					<Switch>
						{/* sesuatu yg di-import bernama `component` */}
						<Route component={Login} path="/login" />
						<Route component={Register} path="/register" />
						<Route component={Admin} path="/admin" />
						<Route component={Cart} path="/cart" />
						<Route component={History} path="/history" />
						<Route component={ProductDetail} path="/product-detail/:productId" />
						<Route component={Home} path="/" />
					</Switch>
				</BrowserRouter>
			);
		}
		return (
			<div>
				<h4>Loading..</h4>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	// `mapStateToProps` me-return object
	return {
		userGlobal: state.user,
	};
};

const mapDispatchToProps = {
	// udah ga pake handler
	userKeepLogin,
	checkStorage,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
