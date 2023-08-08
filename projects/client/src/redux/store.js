import { configureStore } from "@reduxjs/toolkit";
import authreducer from "./reducer/authreducer";
import produkreducer from "./reducer/produkreducer";
import categoryreducer from "./reducer/categoryreducer";
import transactionreducer from "./reducer/transactionreducer";

export const store = configureStore({
  reducer: {
    authreducer: authreducer,
    produkreducer: produkreducer,
    categoryreducer: categoryreducer,
    transactionreducer: transactionreducer,
  },
});
