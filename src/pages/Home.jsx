import React from "react";
import ProductCard from "../components/ProductCard";
import Axios from "axios";
import { API_URL } from "../constants/API";

class Home extends React.Component {
	state = {
		productList: [],
		page: 1,
		itemPerPage: 9,
		maxPage: 0,
	};

	fetchProducts = () => {
		Axios.get(`${API_URL}/products`)
			.then((result) => {
				this.setState({
					productList: result.data,
					maxPage: Math.ceil(result.data.length / this.state.itemPerPage),
				});
			})
			.catch((err) => {
				alert(`Terjadi kesalahan di server`);
			});
	};

	componentDidMount() {
		this.fetchProducts();
	}

	nextPageHandler = () => {
		if (this.state.page < this.state.maxPage) {
			this.setState({ page: this.state.page + 1 });
		}
	};

	prevPageHandler = () => {
		if (this.state.page > 1) {
			this.setState({ page: this.state.page - 1 });
		}
	};

	renderProducts = () => {
		const beginningIndex = (this.state.page - 1) * this.state.itemPerPage;
		const currentData = this.state.productList.slice(
			beginningIndex,
			beginningIndex + this.state.itemPerPage
		);

		return currentData.map((val) => {
			return <ProductCard productData={val} />;
		});

		// Code di bawah berlaku sebelum M2S8C6: Pagination
		// return this.state.productList.map((val) => {
		// 	// `val` berupa object dta suatu product
		// 	return <ProductCard productData={val} />;
		// 	// passing data ke product card bukan dengan parameter karena berbeda file, namun dengan props karena `ProductCard` adalah child dari `Home.jsx`
		// });
	};

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
								<button
									className="btn btn-dark"
									onClick={this.prevPageHandler}
									disabled={this.state.page === 1}>
									{"<"}
								</button>
								<div className="text-center">
									Page {this.state.page} of {this.state.maxPage}
								</div>
								<button
									className="btn btn-dark"
									onClick={this.nextPageHandler}
									disabled={this.state.page === this.state.maxPage}>
									{">"}
								</button>
							</div>
						</div>
					</div>
					{/* col-9 untuk Product Card fieldset */}
					<div className="col-9">
						<div className="d-flex flex-row flex-wrap">
							{/* flex-wrap untuk nampilin card yang dibatasi oleh besar page/windows user */}
							{/* render product here: me-render product dari `state.productList` */}
							{this.renderProducts()}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
