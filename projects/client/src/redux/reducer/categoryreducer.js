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
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/category/`);
    const res2 = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/category/?limit=${res.data.totalCategory}`);
    dispatch(setCategory(res2.data.result));
  } catch (error) {
    console.log(error);
  }
};

export const getCategory =
  ({ index }) =>
  async (dispatch) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/category/?page=${index}`);
      dispatch(setCategory(res.data.result));
      dispatch(setPage(res.data.totalPage));
    } catch (error) {
      console.log(error);
    }
  };

export const getActiveCategoryAll = () => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/category/active`);
    const res2 = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/category/active?limit=${res.data.totalCategory}`
    );

    dispatch(setCategory(res2.data.result));
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = (id, name, isActive) => {
  console.log(id, name, isActive);
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/category/${id}`,
        { name, isActive },
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
        `${process.env.REACT_APP_API_BASE_URL}/category/`,
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
