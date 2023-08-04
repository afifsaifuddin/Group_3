import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Table,
  Tbody,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./cartItem";
import ButtonBayar from "./buttonBayar";

export const Cart = ({ isOpen, onClose, setShow }) => {
  // const { isOpen, onClose, onOpen } = useDisclosure();
  const dispatch = useDispatch();
  const firstField = React.useRef();
  const cart = useSelector((state) => state.produkreducer.cart);
  const totalharga = useSelector((state) => state.produkreducer.totalharga);
  const totalItemsInCart = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const handleClose = () => {
    onClose();
    setShow(false);
  };

  return (
    <Box>
      <Drawer
        size={"md"}
        isOpen={isOpen}
        onClose={handleClose}
        placement="right"
        initialFocusRef={firstField}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottom="3px solid #FC2947">
            Cart {totalItemsInCart}
          </DrawerHeader>
          <DrawerBody>
            <Box>
              <Box>
                <Table variant={""}>
                  <Tbody>
                    {cart.map((item) => (
                      <CartItem key={item.id} produk={item} />
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </Box>
          </DrawerBody>
          <DrawerFooter>
            <Box mx={"auto"}>
              <Text fontWeight={"bold"} fontSize={"xl"} mb={3}>
                Total Harga: Rp. {totalharga}
              </Text>

              <ButtonBayar />
            </Box>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
export default Cart;
