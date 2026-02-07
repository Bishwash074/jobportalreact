import { createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../api";

const STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error"
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    data: JSON.parse(localStorage.getItem("user")) || [], //useSelector to get data from store
    loading: STATUS.IDLE,
    token: null,
    error: null
  },
  reducers: {
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload
    },
    // use dispatch
    setData(state, action) {
      state.data = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.isAuthenticated = true;
    },
    setloading(state, action) {
      state.loading = action.payload
    },
    setError(state, action) {
      state.error = action.payload
    },
    setToken(state, action) {
      state.token = action.payload
    },

    logoutUser(state) {
      state.isAuthenticated = false;
      state.data = []
      state.token = "",
        localStorage.removeItem("token")
    }

  }


})


export const { setAuthenticated, setData, setloading, setError, setToken, logoutUser } = authSlice.actions



export default authSlice.reducer


export function registerUser(userData) {
  return async function registerThunk(dispatch) {
    dispatch(setloading(STATUS.LOADING))

    if (!userData.email || !userData.password || !userData.name) {
      dispatch(setError("ALl field are required"))
      dispatch(setloading(STATUS.ERROR))
      alert("ALl filed are required")
      return

    }
    try {
      const response = await apiClient.post("/user/register", userData)
      if (response.status === 201) {
        dispatch(setData(response.data))
        alert("sucess")
      } else {
        dispatch(setError("Register failed"))
        dispatch(setloading(STATUS.ERROR))
      }
    } catch (erorr) {
      dispatch(setError(erorr.response?.data?.message || "Something went wrong"));
      dispatch(setloading(STATUS.ERROR));
    }
  }


}


// login user thuk
export function loginUser(userData) {
  //console.log(userData)
  return async function loginUserThunk(dispatch) {
    dispatch(setloading(STATUS.LOADING))
    //console.log("hello")

    if (!userData.email || !userData.password) {
      dispatch(setError("Email and Password are required"));
      dispatch(setloading(STATUS.ERROR))
      alert("All field are required")
      return
    }
    try {
      const response = await apiClient.post("/user/login", userData)
      //console.log("hello", response)
      if (response.status === 201) {

        console.log("Login response:", response);
        const token = response.data.data; 
        const user = response.data.user;

        dispatch(setToken(token));
        dispatch(setData(user));
        dispatch(setAuthenticated(true));

        // Save token in localStorage
        localStorage.setItem("token", token);

        setTimeout(() => {
          alert("Login successful!");
        }, 0);

      } else {
        alert("Login failed!Please check your credentials.")
        dispatch(setError("Login failed"))
        dispatch(setloading(STATUS.ERROR))
      }
    } catch (error) {
      dispatch(setError(error.response?.data?.message || "Something went wrong"));
      dispatch(setloading(STATUS.ERROR));
    }
  }
}