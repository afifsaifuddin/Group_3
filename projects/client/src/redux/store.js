import { configureStore } from "@reduxjs/toolkit";
import authreducer from "./reducer/authreducer";
import produkreducer from "./reducer/produkreducer";

export const store = configureStore({
  reducer: {
    authreducer: authreducer,
    produkreducer: produkreducer,
  },
});
