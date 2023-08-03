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
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduk, updateProduk } from "../redux/reducer/produkreducer";
import AdminCreateproduct from "./adminCreateproduct";

export const AdminProduk = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalProduk, setModalProduk] = useState({});
  const { produk } = useSelector((state) => state.produkreducer);
  const [urlImage, setUrlImage] = useState("");
  const dispatch = useDispatch();

  const handleImage = (e) => {
    const [file] = document.getElementById("image").files;
    const avaURL = URL.createObjectURL(file);
    setUrlImage(avaURL);
  };
  const handleUpdate = async () => {
    const data = {
      name: document.getElementById("namaProduk").value,
      description: document.getElementById("deskripsi").value,
      modal_produk: document.getElementById("hargaBeli").value,
      harga_produk: document.getElementById("hargaJual").value,
      quantity: document.getElementById("quantity").value,
    };
    const file = document.getElementById("image").files[0];
    dispatch(updateProduk(data, modalProduk.id, file));
  };

  useEffect(() => {
    dispatch(getProduk());
  }, []);

  return (
    <Box>
      <Flex justifyContent={"end"} mr={"100px"}>
        <AdminCreateproduct />
      </Flex>
      <Table>
        <Thead>
          <Tr>
            <Th>Nama</Th>
            <Th>Kategori</Th>
            <Th>Deskripsi</Th>
            <Th>Harga Beli</Th>
            <Th>Harga Jual</Th>
            <Th>Quantity</Th>
            <Th>Tampilkan?</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {produk.map((item) => (
            <Tr key={item.id}>
              <Td>{item.name}</Td>
              <Td>{item.Category.name}</Td>
              <Td>{item.description}</Td>
              <Td>{item.modal_produk}</Td>
              <Td>{item.harga_produk}</Td>
              <Td>{item.quantity}</Td>
              <Td>{item.isActive ? "Ya" : "Tidak "}</Td>
              <Td>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    setModalProduk(item);
                    setUrlImage(`http://localhost:8000/` + item.productImg.replace(/\\/g, "/"));
                    onOpen();
                  }}>
                  EDIT
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal isOpen={isOpen} onClose={onClose} onOpen={onOpen} size={"2xl"}>
        <ModalOverlay />
        <ModalCloseButton />
        <ModalContent>
          <ModalHeader>Edit Produk</ModalHeader>
          <ModalBody>
            <Flex gap={"20px"}>
              <Box>
                <Image width={"20vw"} height={"40vh"} src={urlImage} mb={"10px"} />
                <Input type="file" id="image" variant={""} onChange={handleImage} />
              </Box>
              <Box>
                <Text fontWeight={"bold"} mb={"10px"}>
                  Nama Produk :{" "}
                </Text>
                <Input id="namaProduk" mb={"10px"} placeholder={modalProduk.name} />
                <Text fontWeight={"bold"} mb={"10px"}>
                  Deskripsi :{" "}
                </Text>
                <Input id="deskripsi" mb={"10px"} placeholder={modalProduk.description} />
                <Text fontWeight={"bold"} mb={"10px"}>
                  Harga Beli :{" "}
                </Text>
                <Input id="hargaBeli" mb={"10px"} placeholder={modalProduk.modal_produk} />
                <Text fontWeight={"bold"} mb={"10px"}>
                  Harga Jual :{" "}
                </Text>
                <Input id="hargaJual" mb={"10px"} placeholder={modalProduk.harga_produk} />
                <Text fontWeight={"bold"} mb={"10px"}>
                  Quantity :{" "}
                </Text>
                <Input id="quantity" mb={"10px"} placeholder={modalProduk.quantity} />
              </Box>
            </Flex>
            <ModalFooter>
              <Button onClick={handleUpdate}>Save</Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminProduk;
