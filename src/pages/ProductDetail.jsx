import React from "react";
import Axios from "axios";
import { API_URL } from "../constants/API";

class ProductDetail extends React.Component {
	fetchProductData = () => {
		Axios.get(`${API_URL}/products`, {
			params: {
				id: this.props.match.params.productId,
				// mencari id product yg sesuai dengan `match.params`
				// `match.params` didapatkan menggunakan `BrowserRouter` di react-router-dom
				// `match.params` memiliki 1 property yang dapat digunakan sbg url dinamis, yaitu properti di page App.jsx di
				// <Route component={ProductDetail} path="/product-detail/:<PROPERTY PARAMS>" />
				// contoh: Route component={ProductDetail} path="/product-detail/:productId" />
			},
		});
	};

	render() {
		return (
			<div className="container">
				<div className="row mt-3">
					<div className="col-6">
						<img style={{ width: "100%" }} src="" alt="" />
					</div>
					<div className="d-flex flex-column justify-content-center col-6">
						<h4>Product Name Here</h4>
						<h5>Rp 16 000</h5>
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias veritatis asperiores culpa commodi,
							consequuntur assumenda et adipisci, dolor magnam officia aperiam! Doloribus, aspernatur aut. Veniam
							voluptatum placeat dolorem voluptatibus odit, ullam facilis unde magnam impedit.
						</p>
						<div className="d-flex flex-row align-items-center">
							<button className="btn btn-primary mr-4">-</button>2<button className="btn btn-primary mx-4">+</button>
						</div>
						<button className="btn btn-success mt-3">Add to Cart</button>
					</div>
				</div>
			</div>
		);
	}
}

export default ProductDetail;
