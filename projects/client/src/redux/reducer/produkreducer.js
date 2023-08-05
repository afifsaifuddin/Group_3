const { createSlice } = require("@reduxjs/toolkit");
const axios = require("axios");

const initialState = {
  produk: [],
  cart: [],
  category: [],
  totalharga: 0,
  page: 0,
  transaction: [],
};

const produkReducer = createSlice({
  name: "produkReducer",
  initialState,
  reducers: {
    setProduk: (state, action) => {
      state.produk = [...action.payload];
    },
    setCategory: (state, action) => {
      state.category = [...action.payload];
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
    deleteItem: (state, action) => {
      const productId = action.payload;
      const existingItemIndex = state.cart.findIndex((item) => item.id === productId);
      if (existingItemIndex !== -1) {
        // Jika item ditemukan dalam keranjang, hapus item tersebut
        const deletedItem = state.cart[existingItemIndex];
        state.totalharga -= deletedItem.harga_produk * deletedItem.quantity;
        state.cart.splice(existingItemIndex, 1);
      }
    },
    incrementQuantity: (state, action) => {
      const productId = action.payload;
      const existingItem = state.cart.find((item) => item.id === productId);
      if (existingItem) {
        existingItem.quantity += 1;
        state.totalharga += existingItem.harga_produk;
      }
    },
    decrementQuantity: (state, action) => {
      const productId = action.payload;
      const existingItem = state.cart.find((item) => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        state.totalharga -= existingItem.harga_produk;
      }
    },

    setPage: (state, action) => {
      state.page = action.payload;
    },
    setTransaction: (state, action) => {
      state.transaction = [...action.payload];
    },
  },
});

export const getProduk =
  ({ index = 1, name = "", category = "", order = "ASC", limit = 9, orderBy = "createdAt" }) =>
  async (dispatch) => {
    console.log(name);
    try {
      const res = await axios.get(
        `http://localhost:8000/product/?page=${index}&name=${name}&categoryId=${category}&order=${order}&limit=${limit}&orderBy=${orderBy}`
      );
      dispatch(setProduk(res.data.result));
      dispatch(setPage(res.data.totalPage));
    } catch (error) {
      console.log(error);
    }
  };

export const updateProduk = (data, id, file) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("productImg", file);
    for (const key in data) {
      formData.append(key, data[key]);
    }
    try {
      const res = await axios.patch(`http://localhost:8000/product/updateProduk/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Update Product Success");
    } catch (error) {
      alert("Update Product Failed");
    }
  };
};

export const createProduct = (data, file) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    formData.append("productImg", file);
    try {
      const res = await axios.post(`http://localhost:8000/product/upload`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Create Product Success");
    } catch (error) {
      alert("Create Product Failed");
    }
  };
};

export const createTransaction = (totalharga, itemCarts) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:8000/transaction/",
      { totalharga },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    const transactionId = res.data.result.id;
    itemCarts.forEach(async (item) => {
      try {
        console.log(item.id, item.quantity, item.harga_produk);
        const res = await axios.post(
          "http://localhost:8000/transaction/item",
          { item, transactionId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
    });
    alert("transaction berhasil");
  } catch (error) {
    console.log(error);
  }
};

export const getCategory = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:8000/category/");
    dispatch(setCategory(res.data.result));
  } catch (error) {
    console.log(error);
  }
};

export const getTransaction =
  ({ index = 1 }) =>
  async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:8000/transaction/?page=${index}`);
      dispatch(setTransaction(res.data.result));
      dispatch(setPage(res.data.totalPage));
    } catch (err) {
      console.log(err);
    }
  };

export const getTransactionId = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8000/transaction/${id}`);
    return res.data.result;
  } catch (err) {
    console.log(err);
  }
};

export const {
  setProduk,
  deleteItem,
  setCart,
  setPage,
  setTransaction,
  setCategory,
  incrementQuantity,
  decrementQuantity,
} = produkReducer.actions;

export default produkReducer.reducer;
