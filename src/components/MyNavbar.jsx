import React from "react";
import {
	Navbar,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	NavbarBrand,
	NavbarText,
	DropdownMenu,
	DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";

class MyNavbar extends React.Component {
	render() {
		return (
			<div>
				<Navbar color="light" light>
					{/* `color` dan `light` adalah props */}
					<NavbarBrand>Emmerce</NavbarBrand>
					<Nav>
						<NavItem>
							<NavbarText>Hello, username!</NavbarText>
						</NavItem>
						<UncontrolledDropdown nav inNavbar>
							{/* `nav` dan `inNavbar` adalah props. `inNavbar` menandakan tag ini ada di dalam nav */}
							<DropdownToggle nav caret>
								{/* `caret` memberikan panah kecil ke bawah di samping tulisan `Pages` */}
								Pages
							</DropdownToggle>
							<DropdownMenu right>
								<DropdownItem>
									<Link to="/cart">Cart</Link>
								</DropdownItem>
								<DropdownItem>
									<Link to="/admin">Admin</Link>
								</DropdownItem>
								<DropdownItem>
									<Link to="/history">History</Link>
								</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					</Nav>
				</Navbar>
			</div>
		);
	}
}

export default MyNavbar;
