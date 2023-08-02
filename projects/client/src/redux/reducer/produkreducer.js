const { createSlice } = require("@reduxjs/toolkit");
const axios = require("axios");

const initialState = {
  produk: [],
  cart: [],
  totalharga: 0,
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
    setCart: (state, action) => {
      console.log(state.cart);
      // state.cart = [...state.cart, action.payload];
      const { id } = action.payload;
      const existingItemIndex = state.cart.findIndex((item) => item.id === id);
      if (existingItemIndex !== -1) {
        // Jika item sudah ada dalam keranjang, tambahkan jumlahnya
        state.cart[existingItemIndex].quantity += 1;
      } else {
        // Jika item belum ada dalam keranjang, tambahkan sebagai produk baru dengan jumlah 1
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      state.totalharga += action.payload.harga_produk;
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
      const res = await axios.get(
        `http://localhost:8000/product/?page=${page}`
      );
      dispatch(setProduk(res.data.result));
      dispatch(setPage(res.data.totalPage));
    } catch (error) {
      console.log(error);
    }
  };

export const { setProduk, setCart, setPage } = produkReducer.actions;

export default produkReducer.reducer;
