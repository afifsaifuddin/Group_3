import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { getProduk, setCart } from "../redux/reducer/produkreducer";

export const CardProduk = ({ produk }) => {
  const dispatch = useDispatch();
  const handleAddToCart = async () => {
    await dispatch(setCart(produk));
    await dispatch(getProduk({}));
  };

  if (!produk) return <></>;
  return (
    <Flex>
      <Box width={"500px"} borderRadius={"8px"}>
        <Card
          direction={{ base: "column", sm: "row" }}
          border={"2px solid #FC2947"}
          shadow={"xl"}
        >
          <Image
            loading="lazy"
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src={"http://localhost:8000/" + produk.productImg}
            alt={produk.categoryId}
            borderRadius={"8px"}
          />
          <Stack>
            <CardBody>
              <Heading size="md">{produk.name}</Heading>
              <Text py="2">{produk.description}</Text>
              <Flex justifyContent={"space-between"}>
                <Text>
                  <strong>Harga: Rp.{produk.harga_produk},-</strong>
                </Text>
                <Text fontSize={"sm"}>stock: {produk.quantity}</Text>
              </Flex>
            </CardBody>
            <CardFooter>
              <Button
                variant="solid"
                bgColor={"#FC2947"}
                onClick={handleAddToCart}
              >
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
