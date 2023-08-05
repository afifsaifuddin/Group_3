import {
  Box,
  Button,
  Collapse,
  Divider,
  Flex,
  Heading,
  List,
  ListItem,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTransactionId } from "../redux/reducer/produkreducer";
import Historyprodukitem from "./historyprodukitem";

const Historyproduk = ({ item }) => {
  const { isOpen, onToggle } = useDisclosure();
  const [dataTransaction, setDataTransaction] = React.useState([]);
  const dispatch = useDispatch();

  const handleOpen = async () => {
    onToggle();
    const res = await dispatch(getTransactionId(item.id));
    setDataTransaction(res);
  };
  console.log(dataTransaction);

  return (
    <Box>
      <Button variant={"link"} onClick={handleOpen}>
        <Td w={"20vw"}>{item.User.username}</Td>
        <Td w={"20vw"}>Rp.{item.totalPrice},-</Td>
        <Td w={"20vw"}>{item.createdAt.replace("T", " / ").slice(0, -5)}</Td>
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Box p="20px" mt="4" border="1px" rounded="md" shadow="md">
          <Box>
            <Heading size={"md"} mb={"10px"}>
              Daftar Barang
            </Heading>
            <Flex ml={"18px"} mb={"10px"}>
              <Text w={"10vw"}>Nama</Text>
              <Text w={"10vw"}>Quantity</Text>
              <Text w={"10vw"}>Harga</Text>
              <Text w={"10vw"}>Total Harga</Text>
            </Flex>
            <Divider mb={"15px"} />
            {dataTransaction &&
              dataTransaction.map((produk) => (
                <UnorderedList>
                  <ListItem>
                    <Historyprodukitem key={produk.id} produk={produk} />
                  </ListItem>
                </UnorderedList>
              ))}
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

export default Historyproduk;
