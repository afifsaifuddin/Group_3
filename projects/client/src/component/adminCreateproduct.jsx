import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { createProduct } from "../redux/reducer/produkreducer";
import { useDispatch } from "react-redux";

export const AdminCreateproduct = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [urlImage, setUrlImage] = useState("");
  const handleImage = (e) => {
    const [file] = document.getElementById("image").files;
    const avaURL = URL.createObjectURL(file);
    setUrlImage(avaURL);
  };
  const handleCreate = () => {
    const data = {
      name: document.getElementById("namaProduk").value,
      description: document.getElementById("deskripsi").value,
      categoryId: document.getElementById("kategori").value,
      modal_produk: document.getElementById("hargaBeli").value,
      harga_produk: document.getElementById("hargaJual").value,
      quantity: document.getElementById("quantity").value,
    };
    const file = document.getElementById("image").files[0];
    dispatch(createProduct(data, file));
  };
  return (
    <Box>
      <Button colorScheme={"red"} mb={"20px"} onClick={onOpen}>
        Add New Product
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
        <ModalOverlay />
        <ModalCloseButton />
        <ModalContent>
          <ModalHeader>Add New Product</ModalHeader>
          <ModalBody>
            <Flex gap={"20px"}>
              <Box>
                <Image width={"20vw"} height={"40vh"} src={urlImage} mb={"10px"} />
                <Input type="file" id="image" variant={""} onChange={handleImage} alt="Product Image" />
              </Box>
              <Box>
                <Text fontWeight={"bold"} mb={"10px"}>
                  Nama Produk :{" "}
                </Text>
                <Input id="namaProduk" mb={"10px"} placeholder="nama produk" />
                <Text fontWeight={"bold"} mb={"10px"}>
                  Deskripsi :{" "}
                </Text>
                <Input id="deskripsi" mb={"10px"} placeholder="deskripsi" />
                <Text fontWeight={"bold"} mb={"10px"}>
                  Kategory :{" "}
                </Text>
                <Input id="kategori" mb={"10px"} placeholder="deskripsi" />
                <Text fontWeight={"bold"} mb={"10px"}>
                  Harga Beli :{" "}
                </Text>
                <Input id="hargaBeli" mb={"10px"} placeholder="harga beli" />
                <Text fontWeight={"bold"} mb={"10px"}>
                  Harga Jual :{" "}
                </Text>
                <Input id="hargaJual" mb={"10px"} placeholder="harga jual" />
                <Text fontWeight={"bold"} mb={"10px"}>
                  Quantity :{" "}
                </Text>
                <Input id="quantity" mb={"10px"} placeholder="quantity" />
              </Box>
            </Flex>
            <ModalFooter>
              <Button onClick={handleCreate}>Save</Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default AdminCreateproduct;
