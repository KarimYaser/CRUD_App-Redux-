import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const postsSlice = createSlice({
  name: "Posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.items.push(action.payload);
      // console.log(action.payload);
      //   console.log(state.items.length);
    },
    deletePost: (state, action) => {
      state.items = state.items.filter((item) => item.id != action.payload.id);
      //or
      //   state.items.shift((item) => item.id);
    },
    updatePost: (state, action) => {
      state.items.map((item) => {
        if (item.id == action.payload.id) {
          item.title = action.payload.title;
          item.desc = action.payload.desc;
        }
      });
    },
  },
});

export const { addPost, deletePost, updatePost } = postsSlice.actions;
export default postsSlice.reducer;
