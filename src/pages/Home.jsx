import React from "react";
import ProductCard from "../components/ProductCard";

class Home extends React.Component {
	render() {
		return (
			<div className="container mt-5">
				<div className="row">
					{/* col-3 untuk Filter Products fieldset */}
					<div className="col-3">
						{/* card 1 */}
						<div className="card">
							<div className="card-header">
								<strong>Filter Products</strong>
							</div>
							<div className="card-body">
								<label htmlFor="searchProductName" className="mb-2">
									Product Name
								</label>
								<input
									type="text"
									name="searchProductName"
									className="form-control mb-3"
								/>
								<label htmlFor="searchCategory" className="mb-2">
									Product Category
								</label>
								<select name="searchCategory" className="form-select" caret>
									<option value="">All items</option>
									<option value="">Kaos</option>
									<option value="">Celana</option>
									<option value="">Hewan</option>
								</select>
							</div>
						</div>
						{/* card 2 */}
						<div className="card mt-4">
							<div className="card-header">
								<strong>Sort Products</strong>
							</div>
							<div className="card-body">
								<label htmlFor="searchCategory" className="mb-2">
									Sort by
								</label>
								<select name="searchCategory" className="form-select">
									<option value="">Default</option>
									<option value="">Lowest Price</option>
									<option value="">Highest Price</option>
									<option value="">A-Z</option>
									<option value="">Z-A</option>
								</select>
							</div>
						</div>
						<div className="mt-3">
							<div className="d-flex flex-row justify-content-between align-items-center">
								<button className="btn btn-dark">{"<"}</button>
								<div className="text-center">Page 1 of 8</div>
								<button className="btn btn-dark">{">"}</button>
							</div>
						</div>
					</div>
					{/* col-9 untuk Product Card fieldset */}
					<div className="col-9">
						<div className="d-flex flex-row flex-wrap">
							{/* flex-wrap untuk nampilin card yang dibatasi oleh besar page/windows user */}
							<ProductCard />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
