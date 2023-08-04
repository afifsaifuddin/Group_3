import { Box, Button, Collapse, Flex, Table, Tbody, Td, Text, Th, Tr, useDisclosure } from "@chakra-ui/react";
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
      <Tr>
        <Button variant={"link"} onClick={handleOpen}>
          <Td w={"20vw"}>{item.User.username}</Td>
          <Td w={"20vw"}>Rp.{item.totalPrice},-</Td>
          <Td w={"20vw"}>{item.createdAt.replace("T", " / ").slice(0, -5)}</Td>
        </Button>
        <Collapse in={isOpen} animateOpacity>
          <Box p="20px" mt="4" border="1px" rounded="md" shadow="md">
            <Box>
              {dataTransaction.map((produk) => (
                <Historyprodukitem key={produk.id} produk={produk} />
              ))}
            </Box>
          </Box>
        </Collapse>
      </Tr>
    </Box>
  );
};

export default Historyproduk;
