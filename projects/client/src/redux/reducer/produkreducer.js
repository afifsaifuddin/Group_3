const { createSlice } = require("@reduxjs/toolkit");
const axios = require("axios");

const initialState = {
  produk: [],
};

const produkReducer = createSlice({
  name: "produkReducer",
  initialState,
  reducers: {
    setProduk: (state, action) => {
      state.produk = [...action.payload];
    },
  },
});

export const getProduk = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:8000/product/");
    dispatch(setProduk(res.data.result));
  } catch (error) {
    console.log(error);
  }
};

export const { setProduk } = produkReducer.actions;
export default produkReducer.reducer;
