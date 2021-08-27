import React from "react";
import "../assets/styles/product_card.css";
import { API_URL } from "../constants/API";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCartData } from "../redux/actions/cart";
import Axios from "axios";

class ProductCard extends React.Component {
	// `addToCartFromHome` dikopi dari /src/pages/ProductDetail.jsx
	addToCartFromHome = (productData) => {
		Axios.get(`${API_URL}/carts`, {
			params: {
				userId: this.props.userGlobal.id,
				productId: productData.id, // `productData` didapatkan sebagai props dari Home.jsx
			},
		}).then((result) => {
			if (result.data.length) {
				// Apabila ada data a.k.a. ada barang tersebut untuk user ini, update quantity barang di /carts/<ID BARANG DI "CARTS">
				Axios.patch(`${API_URL}/carts/${result.data[0].id}`, {
					quantity: result.data[0].quantity + 1,
				})
					.then((result) => {
						alert(`Berhasil menambahkan jumlah barang`);
						this.props.getCartData(this.props.userGlobal.id); // mengupdate jumlah tampilan cart (<# of items>) di MyNavbar
					})
					.catch((err) => {
						alert(`Terjadi kesalahan di penambahan barang`);
					});
			} else {
				// Apabila user ini belum memiliki barang tersebut di cartnya, buat daftar barang baru
				Axios.post(`${API_URL}/carts`, {
					// `userId` diambil dari global state sehingga perlu pakai `this.props.userGlobal.id`
					// `quantity` bernilai 1 karena barang ini adalah barang pertama di cart
					// sisanya diperoleh dari `productData` sebagai props dari Home.jsx
					userId: this.props.userGlobal.id,
					productId: productData.id,
					productName: productData.productName,
					price: productData.price,
					productImage: productData.productImage,
					quantity: 1,
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

	render() {
		return (
			<div className="card product-card">
				{/* `productData` adalah props dari Home.jsx */}
				<img src={this.props.productData.productImage} alt="" />
				<div className="mt-2">
					<div>
						<Link
							to={`/product-detail/${this.props.productData.id}`}
							style={{ textDecoration: "none", color: "inherit" }}
							className="font-weight-bold">
							<h6>{this.props.productData.productName}</h6>
						</Link>
						<span className="text-muted">Rp {this.props.productData.price.toLocaleString("id")}</span>
					</div>
					<div className="d-flex flex-row justify-content-end">
						<button onClick={() => this.addToCartFromHome(this.props.productData)} className="btn btn-primary mt-2">
							Add to cart
						</button>
						{/* `this.props.productData` dapat digunakan untuk method `addToCartFromHome` */}
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
	getCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
