import { Box, Flex, Select, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CardProduk from "./produkCard.";
import { useDispatch, useSelector } from "react-redux";
import { getActiveProduk, getProduk } from "../redux/reducer/produkreducer";
import { getActiveCategoryAll, getCategoryAll } from "../redux/reducer/categoryreducer";
import { Pagination } from "./pagination";
import Searchbar from "./searchbar";
import ButtonCart from "./buttonCart";

export const Produk = () => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(1);
  const { page, produk } = useSelector((state) => state.produkreducer);
  const category = useSelector((state) => state.categoryreducer.category);
  const [query, setQuery] = useState({});
  const handleCategory = (e) => {
    const category = e.target.value;
    setQuery({ ...query, category });
  };

  const handleOrderBy = (e) => {
    const selectedValue = e.target.value;
    const [order, orderBy] = selectedValue.split("|");
    setQuery({ ...query, order, orderBy });
  };

  useEffect(() => {
    const { category, order, orderBy } = query;
    dispatch(getActiveProduk({ index, category, order, orderBy }));
    dispatch(getActiveCategoryAll({}));
  }, [index, query]);

  return (
    <Flex mt={"5px"} ml={"20px"} justifyContent={"space-between"}>
      <Stack>
        <Flex gap={"5px"}>
          <Box width={"28vw"}>
            <Searchbar />
          </Box>
          <Select
            placeholder="Pilih Kategori"
            width={"20vw"}
            focusBorderColor="#FC2947"
            name="category"
            onChange={handleCategory}>
            {category.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
          <Select
            width={"20vw"}
            placeholder="Urutkan Berdasarkan"
            focusBorderColor="#FC2947"
            name="orderBy"
            onChange={handleOrderBy}>
            <option value="DESC|harga_produk">Harga Tertinggi</option>
            <option value="ASC|harga_produk">Harga Terendah</option>
            <option value="DESC">A - Z</option>
            <option value="ASC">Z - A</option>
          </Select>
        </Flex>
        <Box h={"80vh"} w={"90vw"}>
          <Flex wrap={"wrap"} gap={"20px"} mt={"20px"}>
            {produk.map((item) => (
              <CardProduk key={item.id} produk={item} />
            ))}
          </Flex>
        </Box>
        <Pagination page={page} index={index} setIndex={setIndex} />
      </Stack>
      <ButtonCart />
    </Flex>
  );
};
export default Produk;
