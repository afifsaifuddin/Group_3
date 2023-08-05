import { Box, Flex, Select, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CardProduk from "./produkCard.";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, getProduk } from "../redux/reducer/produkreducer";
import { Pagination } from "./pagination";
import Searchbar from "./searchbar";
import ButtonCart from "./buttonCart";

export const Produk = () => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(1);
  const { page } = useSelector((state) => state.produkreducer);
  const produk = useSelector((state) => state.produkreducer.produk);
  const category = useSelector((state) => state.produkreducer.category);

  const handleCategory = (e) => {
    const category = e.target.value;
    dispatch(getProduk({ category }));
  };
  const handleOrderBy = (e) => {
    const order = e.target.value;
    dispatch(getProduk({ order }));
  };
  useEffect(() => {
    dispatch(getProduk({ index }));
    dispatch(getCategory());
  }, [index]);

  console.log(produk);

  return (
    <Flex mt={"5px"} ml={"20px"} justifyContent={"space-between"}>
      <Stack>
        <Flex gap={"5px"} justifyContent={"space-between"} width={"100%"}>
          <Box width={"28vw"}>
            <Searchbar />
          </Box>
          <Select placeholder="Pilih Kategori" width={"20vw"} focusBorderColor="#FC2947" onChange={handleCategory}>
            {category.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
          <Select width={"20vw"} placeholder="Urutkan Berdasarkan" focusBorderColor="#FC2947" onChange={handleOrderBy}>
            {/* <option value={"harga_tertinggi"}>Harga Tertinggi</option>
              <option>Harga Terendah</option> */}
            <option value={"ASC"}>A - Z</option>
            <option value={"DESC"}>Z - A</option>
          </Select>
        </Flex>
        <Flex wrap={"wrap"} gap={"20px"} mt={"20px"}>
          {produk
            .filter((item) => item.isActive)
            .map((item) => (
              <CardProduk key={item.id} produk={item} />
            ))}
        </Flex>
        <Box position={"absolute"} mt={"80vh"} ml={"50vh"}></Box>
        <Pagination page={page} index={index} setIndex={setIndex} />
      </Stack>
      <ButtonCart />
    </Flex>
  );
};
export default Produk;
