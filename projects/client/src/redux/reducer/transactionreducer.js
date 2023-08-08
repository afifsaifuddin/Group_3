const { createSlice } = require("@reduxjs/toolkit");
const axios = require("axios");

const initialState = {
  transaction: [],
  transactionGraph: [],
  transactionItem: [],
};

const transactionreducer = createSlice({
  name: "transactionreducer",
  initialState,
  reducers: {
    setTransaction: (state, action) => {
      state.transaction = [...action.payload];
    },
    setTransactionItem: (state, action) => {
      state.transactionItem = [...action.payload];
    },
    setTransactionGraph: (state, action) => {
      state.transactionGraph = [...action.payload];
    },
  },
});

export const getTransactionItem =
  ({ formattedStartDate, formattedEndDate }) =>
  async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/dateItem?startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(setTransactionItem(res.data.result));
      console.log(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };
export const { setTransaction, setTransactionItem, setTransactionGraph } =
  transactionreducer.actions;
export default transactionreducer.reducer;
