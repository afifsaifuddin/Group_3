import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
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
import { getCashiers, udpateStatusCashier } from "../redux/reducer/authreducer";
import AdminCashierRegister from "./adminCashierRegister";

const AdminCashier = () => {
  const dispatch = useDispatch();
  const [modalCashier, setModalCashier] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalData, setModalData] = useState(<AdminCashierRegister onClose={onClose} onOpen={onOpen} />);

  useEffect(() => {
    dispatch(getCashiers());
  }, []);

  const { cashiers } = useSelector((state) => state.authreducer);

  const switchChange = (e) => {
    setModalCashier({ ...modalCashier, isActive: e });
  };

  const handleSubmit = async () => {
    await dispatch(udpateStatusCashier(modalCashier.isActive, modalCashier.id));
    onClose();
    dispatch(getCashiers());
  };

  const handleRegisterButton = () => {
    setModalData(<AdminCashierRegister onClose={onClose} onOpen={onOpen} />);
    onOpen();
  };

  return (
    <Box>
      <Flex justifyContent={"end"} mr={"100px"}>
        <AdminCashierRegister />
      </Flex>
      <Table>
        <Thead>
          <Tr>
            <Th>Nama</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Masih Aktif?</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {cashiers.map((item) => (
            <Tr key={item.id}>
              <Td>{item.username}</Td>
              <Td>{item.email}</Td>
              <Td>{item.role}</Td>
              <Td>{item.isActive ? "Ya" : "Tidak"}</Td>
              <Td>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    setModalCashier(item);
                    onOpen();
                  }}>
                  EDIT
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
        <ModalOverlay />
        <ModalContent pb={"20px"}>
          <ModalHeader>Edit Cashier</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table>
              <Thead>
                <Tr>
                  <Th>Nama</Th>
                  <Th>Email</Th>
                  <Th width={"200px"}>Role</Th>
                  <Th>Masih Aktif?</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    <Input value={modalCashier.username} />
                  </Td>
                  <Td>
                    <Input value={modalCashier.email} />
                  </Td>
                  <Td>
                    <Input value={modalCashier.role} />
                  </Td>
                  <Td>
                    <Switch isChecked={modalCashier.isActive} onChange={() => switchChange(!modalCashier.isActive)} />
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={"red"} onClick={() => handleSubmit()}>
              SAVE
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminCashier;
