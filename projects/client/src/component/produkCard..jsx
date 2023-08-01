import { Box, Button, Card, CardBody, CardFooter, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import Cart from "./cart";

export const CardProduk = ({ produk }) => {
  console.log(produk);

  if (!produk) return <></>;
  return (
    <Flex>
      <Box width={"600px"} borderRadius={"8px"}>
        <Card direction={{ base: "column", sm: "row" }}>
          <Image
            loading="lazy"
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src={produk ? "http://localhost:8000/" + produk.productImg.replace(/\\/g, "/") : ""}
            alt={produk.categoryId}
            borderRadius={"8px"}
          />
          <Stack>
            <CardBody>
              <Heading size="md">{produk.name}</Heading>
              <Text py="2">{produk.description}</Text>
              <Text>
                <strong>Harga: Rp.{produk.harga_produk},-</strong>
              </Text>
            </CardBody>
            <CardFooter>
              <Button variant="solid" colorScheme="red">
                Tambahkan ke keranjang
              </Button>
            </CardFooter>
          </Stack>
        </Card>
      </Box>
    </Flex>
  );
};

export default CardProduk;
