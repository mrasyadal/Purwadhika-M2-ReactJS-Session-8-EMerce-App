import React from "react";
import {
	Navbar,
	Nav,
	NavItem,
	UncontrolledDropdown,
	DropdownToggle,
	NavbarBrand,
	NavbarText,
	DropdownMenu,
	DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/user";

class MyNavbar extends React.Component {
	render() {
		return (
			<div>
				<Navbar color="light" light>
					{/* `color` dan `light` adalah props */}
					<NavbarBrand className="mx-3">Emmerce</NavbarBrand>
					<Nav>
						{/* conditional untuk nentuin udah login atau belum */}
						{/* kalau sudah: full menu unlocked */}
						{/* kalau belum: hanya muncul menu login dan register */}
						{this.props.userGlobal.username ? (
							<>
								<NavItem style={{ marginTop: "8px" }}>
									{/* kalau mau ngatur margin, atur di NavItem sebagai parentnya */}
									<NavbarText>
										Hello, {this.props.userGlobal.username}!
									</NavbarText>
								</NavItem>
								<UncontrolledDropdown nav>
									{/* `nav` dan `inNavbar` adalah props. `inNavbar` menandakan tag ini ada di dalam nav */}
									<DropdownToggle nav caret className="mx-3">
										{/* `caret` memberikan panah kecil ke bawah di samping tulisan `Pages` */}
										Pages
									</DropdownToggle>
									<DropdownMenu right>
										<DropdownItem>
											<Link to="/cart">Cart</Link>
										</DropdownItem>
										<DropdownItem>
											<Link to="/history">History</Link>
										</DropdownItem>
										{
											// ngecek apakah user seorang admin atau bukan. kalau iya, muncul dropdownmenu tambahan admin
											this.props.userGlobal.role === "admin" ? (
												<DropdownItem>
													<Link to="/admin">Admin</Link>
												</DropdownItem>
											) : null
										}
										<DropdownItem divider />
										<DropdownItem onClick={this.props.logoutUserHandler}>
											<Link>Log out</Link>
										</DropdownItem>
									</DropdownMenu>
								</UncontrolledDropdown>
								{/* Kalau mau me-return suatu html tag, ga bisa ngereturn lebih dr 1 `body`.
								Apabila yg mau direturn lebih dr 1 body, gunakan `react fragment`: <></> untuk ngebungkus semuanya
								dan tambahkan () di luar react fragment */}
							</>
						) : (
							// ini adalah bagian else dari if ternary, ketika user belum login
							<NavItem className="mx-3 ">
								<NavbarText>
									<Link to="/login">Login</Link> |{" "}
									<Link to="/register">Register</Link>
								</NavbarText>
							</NavItem>
						)}
					</Nav>
				</Navbar>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userGlobal: state.user,
		// ga pakai `this.state` karena `state` tidak berasal dari page ini
		// pakai `.user` di `state.user` karena yang diexport dari /reducers/index.js adalah `combineReducers` dengan field/property/key bernama `user`
	};
};

const mapDispatchToProps = {
	logoutUserHandler: logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar);
