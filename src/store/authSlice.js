import { createSlice } from "@reduxjs/toolkit";
import { data } from "react-router-dom";



const authSlice=createSlice({
  name:"auth",
  initialState:{
    isAuthenticated:false,
    data:[],
    loading:"idle",
  },
  reducers:{
    setAuthenticated(state,action){
      state.isAuthenticated=action.payload
    },
    // use dispatch
    setData(state,action){
      state.data=action.payload
    },
    setloading(state,action){
      state.loading=action.payload
    }
  }


})

export  const {setAuthenticated,setData}=authSlice.actions



export default authSlice.reducer
