import {
  Box,
  Button,
  Modal,
  ModalHeader,
  ModalContent,
  useDisclosure,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Input,
  InputGroup,
  InputRightElement,
  ModalFooter,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { getCashiers, registerCashier } from "../redux/reducer/authreducer";
import { useFormik } from "formik";
import { BiShowAlt, BiSolidHide } from "react-icons/bi";

const AdminCashierRegister = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const handleShowPass = () => setShowPassword(!showPassword);
  const handleShowConfirmpass = () => setShowConfirmPass(!showConfirmPass);

  const handleClick = () => {
    onOpen();
  };

  const regisCashierScheme = Yup.object().shape({
    username: Yup.string().required("Username harus diisi"),
    email: Yup.string()
      .required("Email harus diisi")
      .email("Email harus valid"),
    password: Yup.string()
      .required("Password harus diisi")
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6,}$/,
        "Password minimal 6 karakter, 1 simbol, dan 1 huruf kapital"
      ),
    confirmpassword: Yup.string()
      .required("Konfirmasi Password harus diisi")
      .oneOf([Yup.ref("password"), null], "Password tidak sama"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: regisCashierScheme,
    onSubmit: async (values) => {
      try {
        await dispatch(registerCashier(values));
        await dispatch(getCashiers());
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Box>
      <Button colorScheme="red" onClick={handleClick}>
        Add Cashier
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent pb="20px">
          <ModalHeader>Register Cashier</ModalHeader>
          <form onSubmit={formik.handleSubmit}>
            <ModalCloseButton />
            <ModalBody>
              <Table>
                <Thead>
                  <Tr>
                    <Th width="30%">Field</Th>
                    <Th width="70%">Input</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Username</Td>
                    <Td>
                      <Input
                        id="username"
                        {...formik.getFieldProps("username")}
                      />
                      {formik.touched.username && formik.errors.username && (
                        <div style={{ color: "red" }}>
                          {formik.errors.username}
                        </div>
                      )}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Email</Td>
                    <Td>
                      <Input id="email" {...formik.getFieldProps("email")} />
                      {formik.touched.email && formik.errors.email && (
                        <div style={{ color: "red" }}>
                          {formik.errors.email}
                        </div>
                      )}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Password</Td>
                    <Td>
                      <InputGroup>
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          {...formik.getFieldProps("password")}
                        />
                        <InputRightElement>
                          <Button
                            variant="none"
                            size="xl"
                            onClick={handleShowPass}
                          >
                            {showPassword ? <BiSolidHide /> : <BiShowAlt />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      {formik.touched.password && formik.errors.password && (
                        <div style={{ color: "red" }}>
                          {formik.errors.password}
                        </div>
                      )}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Confirm Password</Td>
                    <Td>
                      <InputGroup>
                        <Input
                          id="confirmpassword"
                          type={showConfirmPass ? "text" : "password"}
                          {...formik.getFieldProps("confirmpassword")}
                        />
                        <InputRightElement>
                          <Button
                            variant="none"
                            size="xl"
                            onClick={handleShowConfirmpass}
                          >
                            {showConfirmPass ? <BiSolidHide /> : <BiShowAlt />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      {formik.touched.confirmpassword &&
                        formik.errors.confirmpassword && (
                          <div style={{ color: "red" }}>
                            {formik.errors.confirmpassword}
                          </div>
                        )}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" type="submit">
                Register
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminCashierRegister;
