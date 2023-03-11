import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: { name: "yk", age: 24 },
  reducers: {
    //state 변경하는 함수 만들기
    changeName(state) {
      return (state.name = "yk junior");
    },
  },
});
export let { changeName } = user.actions;

export default user;
