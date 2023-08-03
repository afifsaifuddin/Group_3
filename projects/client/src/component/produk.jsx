import {
  Box,
  Flex,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CardProduk from "./produkCard.";
import { useDispatch, useSelector } from "react-redux";
import { getProduk } from "../redux/reducer/produkreducer";
import Cart from "./cart";
import { Pagination } from "./pagination";
import Searchbar from "./searchbar";

export const Produk = () => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(1);
  useEffect(() => {
    dispatch(getProduk(index));
  }, [index]);

  const { page } = useSelector((state) => state.produkreducer);
  const produk = useSelector((state) => state.produkreducer.produk);
  const category = useSelector((state) => state.produkreducer.category);
  return (
    <Flex mt={"5px"} ml={"20px"} justifyContent={"space-between"}>
      <Box>
        <Stack>
          <Flex>
            <Searchbar />
            <Tabs variant="soft-rounded" colorScheme="red">
              <TabList>
                <Tab>Tab 1</Tab>
                <Tab>Tab 2</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <p>one!</p>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
          <Flex wrap={"wrap"} gap={"20px"}>
            {produk &&
              produk.map((item) => <CardProduk key={item.id} produk={item} />)}
          </Flex>
          <Box position={"absolute"} mt={"75vh"} ml={"50vh"}>
            <Pagination page={page} index={index} setIndex={setIndex} />
          </Box>
        </Stack>
      </Box>
      <Box>
        <Cart />
      </Box>
    </Flex>
  );
};
export default Produk;
