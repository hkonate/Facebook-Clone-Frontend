import axios from "axios";

export const loginCall = async ({ email, password }, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(
      "https://facebook-clone-backend-production.up.railway.app/login",
      {
        email,
        password,
      }
    );
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
