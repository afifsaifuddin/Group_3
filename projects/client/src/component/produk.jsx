import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import CardProduk from "./produkCard.";
import { useDispatch, useSelector } from "react-redux";
import { getProduk } from "../redux/reducer/produkreducer";
import Cart from "./cart";

export const Produk = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduk());
  }, []);

  const produk = useSelector((state) => state.produkreducer.produk);
  return (
    <Flex mt={"20px"} ml={"20px"}>
      <Flex wrap={"wrap"} gap={"30px"}>
        {produk && produk.map((item) => <CardProduk key={item.id} produk={item} />)}
      </Flex>
      <Cart />
    </Flex>
  );
};
export default Produk;
