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

class App extends React.Component {
	render() {
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
					<Route component={ProductDetail} path="/product-detail" />
					<Route component={Home} path="/" />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
