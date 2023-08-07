const { createSlice } = require("@reduxjs/toolkit");
const axios = require("axios");

const initialState = {
  produk: [],
  cart: [],
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

    setCart: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItemIndex = state.cart.findIndex((item) => item.id === id);
      if (existingItemIndex !== -1) {
        if (state.cart[existingItemIndex].quantity >= quantity) {
          return;
        }
        state.cart[existingItemIndex].quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      state.totalharga += action.payload.harga_produk;
    },
    deleteItem: (state, action) => {
      const productId = action.payload;
      const existingItemIndex = state.cart.findIndex((item) => item.id === productId);
      if (existingItemIndex !== -1) {
        const deletedItem = state.cart[existingItemIndex];
        state.totalharga -= deletedItem.harga_produk * deletedItem.quantity;
        state.cart.splice(existingItemIndex, 1);
      }
    },
    incrementQuantity: (state, action) => {
      const productId = action.payload;
      const existingItem = state.cart.find((item) => item.id === productId);
      const stockItem = state.produk.find((item) => item.id === productId);
      if (stockItem.quantity <= existingItem.quantity) return;

      if (existingItem) {
        existingItem.quantity += 1;
        state.totalharga += existingItem.harga_produk;
      }
    },
    decrementQuantity: (state, action) => {
      const productId = action.payload;
      const existingItem = state.cart.find((item) => item.id === productId);

      if (existingItem && existingItem.quantity === 1) {
        const existingItemIndex = state.cart.findIndex((item) => item.id === productId);
        if (existingItemIndex !== -1) {
          state.cart.splice(existingItemIndex, 1);
        }
      } else if (existingItem && existingItem.quantity > 1) {
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
    deleteCart: (state, action) => {
      state.cart.splice(0, state.cart.length);
    },
  },
});

export const getProduk =
  ({ index = 1, name = "", category = "", order = "ASC", limit = 9, orderBy = "createdAt" }) =>
  async (dispatch) => {
    try {
      console.log(category, order, orderBy);
      const res = await axios.get(
        `http://localhost:8000/product/?page=${index}&name=${name}&categoryId=${category}&order=${order}&limit=${limit}&orderBy=${orderBy}`
      );
      dispatch(setProduk(res.data.result));
      dispatch(setPage(res.data.totalPage));
    } catch (error) {
      console.log(error);
    }
  };

export const getActiveProduk =
  ({ index = 1, name = "", category = "", order = "ASC", limit = 9, orderBy = "createdAt" }) =>
  async (dispatch) => {
    try {
      console.log(category, order, orderBy);
      const res = await axios.get(
        `http://localhost:8000/product/active?page=${index}&name=${name}&categoryId=${category}&order=${order}&limit=${limit}&orderBy=${orderBy}`
      );
      console.log(res.data.totalPage);
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
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    const transactionId = res.data.result.id;
    itemCarts.forEach(async (item) => {
      try {
        const res = await axios.post(
          "http://localhost:8000/transaction/item",
          { item, transactionId },
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
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

export const getTransaction =
  ({ index = 1, order = "ASC" }) =>
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

export const getTransactionAdmin =
  ({ startDateParam, endDateParam }) =>
  async (dispatch) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/transaction/date/?dateBefore=${startDateParam}&dateAfter=${endDateParam}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      console.log(res.data.result);
      dispatch(setTransaction(res.data.result));
    } catch (err) {
      console.log(err);
    }
  };

export const {
  setProduk,
  deleteItem,
  setCart,
  deleteCart,
  setPage,
  setTransaction,
  incrementQuantity,
  decrementQuantity,
} = produkReducer.actions;

export default produkReducer.reducer;
