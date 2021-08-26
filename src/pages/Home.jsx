import React from "react";
import ProductCard from "../components/ProductCard";
import Axios from "axios";
import { API_URL } from "../constants/API";

class Home extends React.Component {
	state = {
		productList: [],
		filteredProductList: [],
		page: 1,
		itemPerPage: 6,
		maxPage: 0,
		searchProductName: "",
		searchCategory: "",
		sortBy: "",
	};

	fetchProducts = () => {
		Axios.get(`${API_URL}/products`)
			.then((result) => {
				this.setState({
					productList: result.data,
					maxPage: Math.ceil(result.data.length / this.state.itemPerPage),
					filteredProductList: result.data,
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
			// setelah di-`setState`, page akan otomatis memanggil render()
		}
	};

	inputHandler = (event) => {
		const name = event.target.name;
		const value = event.target.value;

		this.setState({ [name]: value });
	};

	searchButtonHandler = () => {
		// `filteredProductList` digunakan untuk menyimpan hasil filter
		const filteredProductList = this.state.productList.filter((val) => {
			return (
				val.productName.toLowerCase().includes(this.state.searchProductName.toLowerCase()) &&
				val.category.toLowerCase().includes(this.state.searchCategory.toLocaleLowerCase())
			);
		});

		let searchPage = 0;
		if (filteredProductList.length) {
			searchPage = 1;
		}

		this.setState({
			page: searchPage, // balik ke page 1, atau page 0 kalau hasil search kosong
			filteredProductList,
			maxPage: Math.ceil(filteredProductList.length / this.state.itemPerPage),
		});
	};

	renderProducts = () => {
		const beginningIndex = (this.state.page - 1) * this.state.itemPerPage;
		let rawData = [...this.state.filteredProductList];

		const compareString = (a, b) => {
			if (a.productName > b.productName) {
				return 1;
			} else if (a.productName < b.productName) {
				return -1;
			} else return 0;
		};

		switch (this.state.sortBy) {
			case "lowPrice":
				rawData.sort((a, b) => a.price - b.price);
				// ketika hasil operasi di atas negatif, urutan tidak berubah
				break;
			case "highPrice":
				rawData.sort((a, b) => b.price - a.price);
				break;
			case "az":
				rawData.sort((a, b) => compareString(a, b));
				break;
			case "za":
				rawData.sort((a, b) => compareString(b, a));
				break;
			default:
				rawData = [...this.state.filteredProductList];
				break;
		}

		const currentData = rawData.slice(beginningIndex, beginningIndex + this.state.itemPerPage);
		// `rawData` adalah list barang yang sudah di-filter (bisa saja diberlakukan filter kosong sehingga tidak ada perubahan)
		// `filteredProductList` bisa digunakan di sini walaupun user tidak memfilter hasil -> obsolete sejak M2S8C9: Sorting Products
		// karena isi awal filteredProductList diset di Axios.get dengan nilai productList itu sendiri sbg default value

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
									onChange={this.inputHandler}
								/>
								<label htmlFor="searchCategory" className="mb-2">
									Product Category
								</label>
								<select onChange={this.inputHandler} name="searchCategory" className="form-select">
									<option value="">All items</option>
									<option value="Kaos">Kaos</option>
									<option value="Celana">Celana</option>
									<option value="Hewan">Hewan</option>
								</select>
								<button className="btn btn-primary mt-3" onClick={this.searchButtonHandler}>
									Search
								</button>
							</div>
						</div>
						{/* card 2 */}
						<div className="card mt-4">
							<div className="card-header">
								<strong>Sort Products</strong>
							</div>
							<div className="card-body">
								<label htmlFor="sortBy" className="mb-2">
									Sort by
								</label>
								<select onChange={this.inputHandler} name="sortBy" className="form-select">
									<option value="">Default</option>
									<option value="lowPrice">Lowest Price</option>
									<option value="highPrice">Highest Price</option>
									<option value="az">A-Z</option>
									<option value="za">Z-A</option>
								</select>
							</div>
						</div>
						<div className="mt-3">
							<div className="d-flex flex-row justify-content-between align-items-center">
								<button className="btn btn-dark" onClick={this.prevPageHandler} disabled={this.state.page <= 1}>
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
