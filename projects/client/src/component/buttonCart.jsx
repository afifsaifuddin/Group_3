import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cart from "./cart";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

export const ButtonCart = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [show, setShow] = useState(false);
  const cart = useSelector((state) => state.produkreducer.cart);
  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <Box hidden={show}>
      <Link
        onClick={() => {
          onOpen();
          setShow(true);
        }}>
        <Flex
          position={"fixed"}
          zIndex={60000}
          _hover={{ cursor: "pointer", bgColor: "gray.400" }}
          bottom={10}
          right={10}
          p={6}
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={"full"}
          bgColor={"#FC2947"}>
          <FaShoppingCart size={"25px"} />
          <Text
            position={"absolute"}
            color={"red"}
            bottom={10}
            left={10}
            bg={"black"}
            borderRadius={"full"}
            p={2}
            fontWeight={"bold"}>
            {totalItemsInCart}
          </Text>
        </Flex>
        <Cart isOpen={isOpen} onClose={onClose} onOpen={onOpen} setShow={setShow} />
      </Link>
    </Box>
  );
};
export default ButtonCart;
