import React from "react";
import Axios from "axios";
import { API_URL } from "../constants/API";
import { connect } from "react-redux";
import { getCartData } from "../redux/actions/cart";

class ProductDetail extends React.Component {
	state = {
		productData: {},
		productNotFound: false,
		quantity: 1,
	};

	fetchProductData = () => {
		// alert(this.props.match.params.productId);
		// `this.props.match.params.productId`udah bener
		Axios.get(`${API_URL}/products`, {
			params: {
				id: this.props.match.params.productId,
				// mencari id product yg sesuai dengan `match.params`
				// `match.params` didapatkan menggunakan `BrowserRouter` di react-router-dom
				// `match.params` memiliki 1 root yang dapat digunakan sbg url dinamis, yaitu properti di page App.jsx di line berikut:
				// <Route component={ProductDetail} path="/product-detail/:<ROOT PARAMS>" />
				// contoh: Route component={ProductDetail} path="/product-detail/:productId" /> berarti `:<ROOT PARAMS>` = `:productId`
			},
		})
			.then((result) => {
				if (result.data.length) {
					// kalau datanya ketemu, baru lakukan `.setState`
					this.setState({ productData: result.data[0] });
				} else {
					this.setState({ productNotFound: true });
				}
			})
			.catch((err) => {
				alert(`Terjadi kesalahan di fetchProductData`);
			});
	};

	qtyBtnHandler = (action) => {
		// `action` bergantung pada button mana yg dipanggil
		if (action === "increment") {
			this.setState({ quantity: this.state.quantity + 1 });
		} else if (action === "decrement" && this.state.quantity > 1) {
			this.setState({ quantity: this.state.quantity - 1 });
		}
	};

	addToCartHandler = () => {
		Axios.get(`${API_URL}/carts`, {
			params: {
				// cek dulu: apakah user yang sedang login sekarang memiliki barang ini di cart dia?
				userId: this.props.userGlobal.id, // id user didapat dari Global State dari halaman Login dengan metode redux dgn connect, mapState dst
				productId: this.state.productData.id, // `productData.id` didapat dari method Axios.get di function `fetchProductData`
			},
		}).then((result) => {
			if (result.data.length) {
				// Apabila ada data a.k.a. ada barang tersebut untuk user ini, update quantity barang di /carts/<ID BARANG DI "CARTS">
				Axios.patch(`${API_URL}/carts/${result.data[0].id}`, {
					quantity: result.data[0].quantity + this.state.quantity,
				})
					.then((result) => {
						alert(`Berhasil menambahkan jumlah barang`);
						this.props.getCartData(this.props.userGlobal.id); // mengupdate jumlah tampilan cart (<item>> di MyNavbar
					})
					.catch((err) => {
						alert(`Terjadi kesalahan di penambahan barang`);
					});
			} else {
				// Apabila user ini belum memiliki barang tersebut di cartnya, buat daftar barang baru
				Axios.post(`${API_URL}/carts`, {
					// `quantity` diperoleh dari page ini sendiri karena user akan menentukan berapa jumlah yang akan dimasukkan ke cart
					// sisanya diperoleh dari `state.productData` yang sudah diimpor dengan Axios.get di metode `fetchProductData`
					userId: this.props.userGlobal.id,
					// apakah penulisan property `id` di `this.props.userGlobal.id` benar? cek di const `init_state` di redux/reducers/users.js => benar
					productId: this.state.productData.id,
					productName: this.state.productData.productName,
					price: this.state.productData.price,
					productImage: this.state.productData.productImage,
					quantity: this.state.quantity,
				})
					.then((result) => {
						alert("Berhasil menambahkan barang baru");
						this.props.getCartData(this.props.userGlobal.id);
					})
					.catch((err) => {
						alert(`Terjadi kesalahan di penambahan barang`);
					});
			}
		});
	};

	componentDidMount() {
		this.fetchProductData();
	}

	render() {
		return (
			<div className="container">
				{/* isi render() bergantung kepada kondisi state.productNotFound */}
				{this.state.productNotFound ? (
					<div className="alert alert-warning mt-4">
						Product with ID {this.props.match.params.productId} is not found
					</div>
				) : (
					<div className="row mt-3">
						<div className="col-6">
							<img style={{ width: "100%" }} src={this.state.productData.productImage} alt="" />
						</div>
						<div className="d-flex flex-column justify-content-center col-6">
							<h4>{this.state.productData.productName}</h4>
							<h5>Rp {this.state.productData.price}</h5>
							<p>{this.state.productData.description}</p>
							<div className="d-flex flex-row align-items-center">
								<button
									onClick={() => this.qtyBtnHandler("decrement")}
									className="btn btn-primary me-4"
									disabled={this.state.quantity === 1}>
									-
								</button>
								{this.state.quantity}
								<button onClick={() => this.qtyBtnHandler("increment")} className="btn btn-primary mx-4">
									+
								</button>
							</div>
							<button onClick={this.addToCartHandler} className="btn btn-success mt-3">
								Add to Cart
							</button>
						</div>
					</div>
				)}
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
	getCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
