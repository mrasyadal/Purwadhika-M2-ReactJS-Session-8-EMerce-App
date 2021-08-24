const init_state = {
	username: "",
	fullName: "",
	role: "",
	id: 0,
	errrMsg: "",
	storageIsChecked: false,
	// `storageIsChecked` diperlukan untuk fungsi lanjutan yang memerlukan data user untuk memanggil komponen lain sebelum user login
};

// parameter `state` dan `action` akan membaca data yang diproses oleh fungsi `dispatch` di Axios di /actions/user.js (file user.js yg sedang kita baca ada di /reducers/user.js)
const reducer = (state = init_state, action) => {
	switch (action.type) {
		case "USER_LOGIN":
			return { ...state, ...action.payload, storageIsChecked: true };
		case "USER_ERROR":
			return { ...state, errMsg: action.payload };
		// ketika user error, errMsg akan diberikan string berupa `action.payload` yang dikirim oleh `dispatch` di action creator di /actions/user.js
		case "USER_LOGOUT":
			return { ...init_state, storageIsChecked: true };
		case "CHECK_STORAGE":
			return { ...state, storageIsChecked: true };
		default:
			return state;
	}
};

export default reducer;
