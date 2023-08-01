import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

export const CartItem = ({ produk }) => {
  return (
    <Box>
      <Flex gap={1}>
        <Box>
          <Image
            loading="lazy"
            objectFit="cover"
            maxW={{ base: "100%", sm: "80px" }}
            src={
              produk
                ? "http://localhost:8000/" +
                  produk.productImg.replace(/\\/g, "/")
                : ""
            }
          />
        </Box>
        <Box>
          <Text>{produk.name}</Text>
          <Text>
            <strong>Harga: Rp.{produk.harga_produk},-</strong>
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default CartItem;
