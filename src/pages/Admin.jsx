import React from "react";
import Axios from "axios";
import { API_URL } from "../constants/API";
import "../assets/styles/admin.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Admin extends React.Component {
	state = {
		productList: [],
		addProductName: "",
		addPrice: 0,
		addProductImage: "",
		addDescription: "",
		addCategory: "",

		editID: 0,

		editProductName: "",
		editPrice: 0,
		editProductImage: "",
		editDescription: "",
		editCategory: "",
	};

	fetchProducts = () => {
		Axios.get(`${API_URL}/products`)
			.then((result) => {
				this.setState({ productList: result.data });
			})
			.catch((err) => {
				alert(`Terjadi kesalahan di fetch product`);
			});
	};

	componentDidMount() {
		this.fetchProducts();
	}

	addNewProduct = () => {
		Axios.post(`${API_URL}/products`, {
			productName: this.state.addProductName,
			price: parseInt(this.state.addPrice),
			productImage: this.state.addProductImage,
			description: this.state.addDescription,
			category: this.state.addCategory,
		})
			.then(() => {
				this.fetchProducts();
				// setelah selesai nge-post data, set state menjadi kosong agar 1) form input kembali kosong, 2) property di state siap digunakan dalam keadaan bersih
				this.setState({
					addProductName: "",
					addPrice: 0,
					addProductImage: "",
					addDescription: "",
					addCategory: "",
				});
			})
			.catch((err) => {
				alert(`Terjadi kesalahan di penambahan product`);
			});
	};

	editToggle = (editData) => {
		this.setState({
			editId: editData.id,
			editProductName: editData.productName,
			editPrice: editData.price,
			editProductImage: editData.productImage,
			editDescription: editData.description,
			editCategory: editData.category,
		});
	};

	saveEdit = () => {
		Axios.patch(`${API_URL}/products/${this.state.editId}`, {
			productName: this.state.editProductName,
			price: parseInt(this.state.editPrice),
			productImage: this.state.editProductImage,
			description: this.state.editDescription,
			category: this.state.editCategory,
		})
			.then((result) => {
				this.fetchProducts();
				this.cancelEdit();
			})
			.catch((err) => {
				alert(`Terjadi kesalahan di saveEdit`);
			});
	};

	cancelEdit = () => {
		this.setState({ editId: 0 });
	};

	deleteButtonHandler = (deletedId) => {
		const confirmDelete = window.confirm(`Do you want to delete this item?`);
		if (confirmDelete) {
			Axios.delete(`${API_URL}/products/${deletedId}`)
				.then((result) => {
					this.fetchProducts();
				})
				.catch((err) => {
					alert(`Terjadi kesalahan di deleteButtonHandler`);
				});
		}
	};

	inputHandler = (event) => {
		const { name, value } = event.target;
		// const name = event.target.name;
		// const value = event.target.value;

		this.setState({ [name]: value });
	};

	renderProducts = () => {
		return this.state.productList.map((val) => {
			// cek apakah sekarang lagi mode edit dengan mengecek nilai `state.editId`
			if (this.state.editId === val.id) {
				return (
					<tr>
						<td>{val.id}</td>
						<td>
							{/* value default di form input adalah value property pada saat ini, jadi apabila user tidak ingin mengganti, nilai tidak kosong */}
							<input
								onChange={this.inputHandler}
								type="text"
								className="form-control"
								name="editProductName"
								value={this.state.editProductName}
							/>
						</td>
						{/* name di form input dipakai agar function `inputHandler` mendapatkan `event.target.name` */}
						<td>
							<input
								onChange={this.inputHandler}
								type="number"
								className="form-control"
								name="editPrice"
								value={this.state.editPrice}
							/>
						</td>
						<td>
							<input
								onChange={this.inputHandler}
								type="text"
								className="form-control"
								name="editProductImage"
								value={this.state.editProductImage}
							/>
						</td>
						<td>
							<input
								onChange={this.inputHandler}
								type="text"
								className="form-control"
								name="editDescription"
								value={this.state.editDescription}
							/>
						</td>
						<td>
							<select onChange={this.inputHandler} name="editCategory" className="form-select">
								<option value="">All Items</option>
								<option value="Kaos">Kaos</option>
								<option value="Celana">Celana</option>
								<option value="Hewan">Hewan</option>
							</select>
						</td>
						<td>
							<button className="btn btn-success" onClick={this.saveEdit}>
								Save
							</button>
						</td>
						<td>
							<button className="btn btn-danger" onClick={this.cancelEdit}>
								Cancel
							</button>
						</td>
					</tr>
				);
			} else {
				return (
					<tr>
						<td>{val.id}</td>
						<td>{val.productName}</td>
						<td>{val.price}</td>
						<td>
							<img src={val.productImage} alt="" className="admin-product-image" />
						</td>
						<td>{val.description}</td>
						<td>{val.category}</td>
						<td>
							<button className="btn btn-secondary" onClick={() => this.editToggle(val)}>
								Edit
							</button>
						</td>
						<td>
							<button className="btn btn-danger" onClick={() => this.deleteButtonHandler(val.id)}>
								Delete
							</button>
						</td>
					</tr>
				);
			}
		});
	};

	render() {
		if (this.props.userGlobal.role !== "admin") {
			return <Redirect to="/" />;
		} else {
			return (
				<div className="p-5">
					<div className="row">
						<div className="col-12 text-center">
							<h1>Manage Products</h1>
							<table className="table mt-4">
								<thead className="thead-light">
									<tr>
										<th>ID</th>
										<th>Name</th>
										<th>Price</th>
										<th>Image</th>
										<th>Description</th>
										<th>Category</th>
										<th colspan="2">Action</th>
									</tr>
								</thead>
								<tbody>
									{/* <tr>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td>
											<button className="btn btn-secondary">Edit</button>
										</td>
										<td>
											<button className="btn btn-danger">Delete</button>
										</td>
									</tr>
								
								Kode di atas diganti dengan:*/}
									{this.renderProducts()}
								</tbody>
								<tfoot className="bg-light">
									<tr>
										<td></td>
										<td>
											<input
												value={this.addProductName}
												onChange={this.inputHandler}
												type="text"
												className="form-control"
												name="addProductName"
											/>
										</td>
										<td>
											<input
												value={this.addPrice}
												onChange={this.inputHandler}
												type="number"
												className="form-control"
												name="addPrice"
											/>
										</td>
										<td>
											<input
												value={this.addProductImage}
												onChange={this.inputHandler}
												type="text"
												className="form-control"
												name="addProductImage"
											/>
										</td>
										<td className="col-4">
											<input
												value={this.addDescription}
												onChange={this.inputHandler}
												type="text"
												className="form-control"
												name="addDescription"
											/>
										</td>
										<td>
											<select onChange={this.inputHandler} name="addCategory" className="form-select">
												<option value="">All Items</option>
												<option value="Kaos">Kaos</option>
												<option value="Celana">Celana</option>
												<option value="Hewan">Hewan</option>
											</select>
										</td>
										<td colspan="2">
											<button className="btn btn-info text-white" onClick={this.addNewProduct}>
												Add Product
											</button>
										</td>
									</tr>
								</tfoot>
							</table>
						</div>
					</div>
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		userGlobal: state.user,
		//
	};
};

export default connect(mapStateToProps)(Admin);
