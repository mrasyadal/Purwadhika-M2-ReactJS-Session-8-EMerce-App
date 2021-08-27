import Axios from "axios";
import { API_URL } from "../../constants/API";

export const getCartData = (userId) => {
	// fungsi yang ngambil data dari database JSON dan menyimpan data tersebut di global state
	return (dispatch) => {
		Axios.get(`${API_URL}/carts`, {
			params: {
				userId, // `userId` di sisi kanan adalah argumen, userId di kiri adalah nama properties dari `carts`
			},
		})
			.then((result) => {
				// dispatch ke cart reducer dengan payload berisi result.data
				dispatch({
					type: "FILL_CART",
					payload: result.data,
				});
			})
			.catch((err) => {
				alert(`Terjadi kesalahan di getCartData`);
			});
	};
};
