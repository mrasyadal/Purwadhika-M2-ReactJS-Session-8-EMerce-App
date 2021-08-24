import React from "react";
import "../assets/styles/product_card.css";

class ProductCard extends React.Component {
	render() {
		return (
			<div className="card product-card">
				<img
					src={
						"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.mWJoHtNu7NA7NVco9wf4owHaHa%26pid%3DApi&f=1"
					}
					alt=""
				/>
				<div className="mt-2">
					<div>
						<h6>Product Name Here</h6>
						<span className="text-muted">Rp. 25.000</span>
					</div>
					<div className="d-flex flex-row justify-content-end">
						<button className="btn btn-primary mt-2">Add to cart</button>
					</div>
				</div>
			</div>
		);
	}
}

export default ProductCard;
