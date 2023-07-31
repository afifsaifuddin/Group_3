import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { cekLogin } from "../redux/reducer/authreducer";

const CekLogin = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cekLogin());
  }, [dispatch]);

  return <>{children}</>;
};

export default CekLogin;
