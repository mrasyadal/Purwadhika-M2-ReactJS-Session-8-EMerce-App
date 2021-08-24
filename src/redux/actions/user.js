import Axios from "axios";
import { API_URL } from "../../constants/API";

export const registerUser = ({ fullName, username, email, password }) => {
	// parameter yang masuk ke registerUser (berupa object) akan langsung di-destructure apabila parameternya dibuat dengan syntax di atas
	// parameter (object) yang masuk harus memiliki 4 field di atas
	return (dispatch) => {
		Axios.post(`${API_URL}/users`, {
			fullName,
			username,
			email,
			password,
			role: "user",
		})
			.then((postData) => {
				// `postData` adalah data yg berhasil dimasukkan ke json-server. Data ini tidak sama dengan data yg dikirim oleh Axios (ada tambahan key/field `id`)
				// dalam App ini, data di `postData` adalah: fullName, username, email, password, role, id
				delete postData.data.password;
				// delete password sebelum data input di-dispatch

				dispatch({
					type: "USER_LOGIN",
					payload: postData.data,
				});
				alert(`Berhasil mendaftarkan user`);
			})
			.catch(() => {
				alert(`Gagal mendaftarkan user`);
			});
	};
};

export const loginUser = ({ username, password }) => {
	return (dispatch) => {
		Axios.get(`${API_URL}/users`, {
			params: {
				username,
				// variasi terbaru hanya membutuhkan username saja. Pengecekan password dilakukan setelahnya

				// username,
				// password,
				// bentuk lain:
				// username: username,
				// password: password,
			},
			// `params` adalah object yang berfungsi untuk menyeleksi data yang diambil oleh Axios dari db.json. Jadi, tidak semua data diambil sebagaimana contoh `Axios.get` di TodoListApp
			// contoh di atas berarti "tolong ambilkan data user yang memiliki nama username `username` (username kedua adalah input dari fungsi loginUser) dan memiliki password `password` (password kedua adalah input dari fungsi loginUser)"
		})
			.then((result) => {
				// result berupa array dengan 1 data berupa sebuah object (berisi data user dari db.json) di index ke-0
				// console.log(result.data);
				if (result.data.length) {
					if (password === result.data[0].password) {
						// ngebuat data login tersimpan di localStorage apabila password benar
						delete result.data[0].password;
						// prettier-ignore
						localStorage.setItem("userDataEmmerce", JSON.stringify(result.data[0]))

						dispatch({
							type: "USER_LOGIN",
							payload: result.data[0],
						});
					} else {
						// apabila password salah
						dispatch({
							type: "USER_ERROR",
							payload: "Wrong password",
						});
					}
				} else {
					dispatch({
						type: "USER_ERROR",
						payload: "User not found",
					});
				}
			})
			.catch((err) => {
				alert(`Terjadi kesalahan di server`);
			});
	};
};

export const logoutUser = () => {
	localStorage.removeItem("userDataEmmerce");
	return {
		type: "USER_LOGOUT",
	};
};

export const userKeepLogin = (userData) => {
	// `userData` adalah data user berupa object yang disimpan di localStorage
	return (dispatch) => {
		Axios.get(`${API_URL}/users`, {
			params: {
				// mencari data yang memiliki id sama dengan userData.id
				id: userData.id,
			},
		})
			.then((result) => {
				// perbarui data di local storage setiap kali ada login (termasuk ke dalam userKeepLogin)
				// agar data yang tersimpan di localStorage adalah data yang terbaru
				localStorage.setItem("userDataEmmerce", JSON.stringify(result.data[0]));
				// panggil fungsi redux login
				dispatch({
					type: "USER_LOGIN",
					payload: result.data[0],
				});
			})
			.catch(() => {
				alert(`Terjadi kesalahan di server`);
			});
	};
};

export const checkStorage = () => {
	return {
		type: "CHECK_STORAGE",
	};
};
