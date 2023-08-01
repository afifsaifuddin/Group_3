const { createSlice } = require("@reduxjs/toolkit");
const axios = require("axios");

const initialState = {
  produk: [],
  page: 0,
};

const produkReducer = createSlice({
  name: "produkReducer",
  initialState,
  reducers: {
    setProduk: (state, action) => {
      console.log(action.payload);
      console.log(...action.payload);
      state.produk = [...action.payload];
    },
    setPage: (state, action) => {
      state.page = action.payload;
      console.log(state.page);
    },
  },
});

export const getProduk =
  (page = 1) =>
  async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:8000/product/?page=${page}`);
      dispatch(setProduk(res.data.result));
      dispatch(setPage(res.data.totalPage));
    } catch (error) {
      console.log(error);
    }
  };

export const { setProduk, setPage } = produkReducer.actions;
export default produkReducer.reducer;
