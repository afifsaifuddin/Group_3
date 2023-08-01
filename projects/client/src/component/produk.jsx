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
import Cart from "./cart";

export const Produk = () => {
  return (
    <Box>
      <Flex wrap={"wrap"}>
        <Box w={"75%"}>
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            w={"50%"}
            // maxW={{ base: "100%", sm: "200px" }}
            m={1}
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src="https://static.insales-cdn.com/files/1/3843/18509571/original/IMG-20210618-WA0040.jpg"
              alt="Caffe Latte"
            />
            <Stack>
              <CardBody>
                <Heading size="md">Telkomsel 14 Gb</Heading>
                <Text py="2">pembagian kuota, 10 gb siang dan 4 gb malam</Text>
              </CardBody>
              <CardFooter>
                <Button variant="solid" colorScheme="blue">
                  Tambahkan ke keranjang
                </Button>
              </CardFooter>
            </Stack>
          </Card>
        </Box>
        <Box bgColor={"red"} height={"100vh"} w={"25%"}>
          <Cart />
        </Box>
      </Flex>
    </Box>
  );
};
export default Produk;
