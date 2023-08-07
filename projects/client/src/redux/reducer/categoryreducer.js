const { createSlice } = require("@reduxjs/toolkit");
const axios = require("axios");

const initialState = {
  produk: [],
  cart: [],
  category: [],
  page: 0,
  transaction: [],
};

const categoryreducer = createSlice({
  name: "categoryreducer",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = [...action.payload];
    },

    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const getCategoryAll = () => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8000/category/`);
    const res2 = await axios.get(`http://localhost:8000/category/?limit=${res.data.totalCategory}`);
    dispatch(setCategory(res2.data.result));
  } catch (error) {
    console.log(error);
  }
};

export const getCategory =
  ({ index }) =>
  async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:8000/category/?page=${index}`);
      dispatch(setCategory(res.data.result));
      dispatch(setPage(res.data.totalPage));
    } catch (error) {
      console.log(error);
    }
  };

export const updateCategory = (id, name) => {
  console.log(id, name);
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.patch(
        `http://localhost:8000/category/${id}`,
        { name },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Update Category Success");
    } catch (error) {
      alert("Update Category Failed");
    }
  };
};

export const createCategory = (name) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    console.log(name);
    try {
      const res = await axios.post(
        "http://localhost:8000/category/",
        { name },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Create Category Success");
    } catch (error) {
      alert("Create Category Failed");
    }
  };
};

export const { setPage, setCategory, setTotalCategory } = categoryreducer.actions;
export default categoryreducer.reducer;
