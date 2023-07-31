import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiShowAlt, BiSolidHide } from "react-icons/bi";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Signinreducer } from "../redux/reducer/authreducer";
import { Modalforgotpass } from "./forgotpassword";
import { useNavigate } from "react-router-dom";

const loginschema = Yup.object().shape({
  username: Yup.string().required("Username harus diisi"),
  password: Yup.string()
    .required("Password harus diisi")
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6,}$/,
      "Password minimal 6 karakter, 1 symbol, dan 1 huruf kapital"
    ),
});

export default function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { role } = useSelector((state) => state.authreducer.user);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginschema,
    onSubmit: (values) => {
      dispatch(Signinreducer(values, navigate));

      // try {
      //   alert("Login Berhasil");
      //   if (role === "admin") {
      //     navigate("/dashbordadmin");
      //   } else {
      //     navigate("/dashbordkasir");
      //   }
      // } catch (error) {
      //   alert("Login Gagal");
      // }
    },
  });

  return (
    <Box>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="#2D4356"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar bg="#D71313" />
          <Heading color="#D71313">Welcome</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form onSubmit={formik.handleSubmit}>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
                borderRadius={10}
                padding={10}
              >
                <FormControl
                  isInvalid={formik.touched.username && formik.errors.username}
                >
                  <FormLabel
                    htmlFor="username"
                    fontWeight={"bold"}
                  >
                    Username
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <FaUserAlt />
                    </InputLeftElement>
                    <Input
                      name="username"
                      id="username"
                      type="text"
                      placeholder="username"
                      focusBorderColor="#FD8A8A"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                    />
                  </InputGroup>
                  {formik.touched.username && formik.errors.username && (
                    <FormErrorMessage>
                      {formik.errors.username}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  isInvalid={formik.touched.password && formik.errors.password}
                >
                  <FormLabel
                    htmlFor="password"
                    fontWeight={"bold"}
                  >
                    Password
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <RiLockPasswordFill />
                    </InputLeftElement>
                    <Input
                      name="password"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      focusBorderColor="#FD8A8A"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <InputRightElement>
                      <Button
                        variant={"none"}
                        size={"xl"}
                        onClick={handleShowClick}
                      >
                        {showPassword ? <BiSolidHide /> : <BiShowAlt />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {formik.touched.password && formik.errors.password && (
                    <FormErrorMessage>
                      {formik.errors.password}
                    </FormErrorMessage>
                  )}
                  <FormHelperText
                    textAlign="right"
                    fontWeight={"bold"}
                    mt={"15px"}
                  >
                    {/* <Link
                      href={() => {
                        onOpen();
                      }}
                    >
                      forgot password?
                    </Link> */}
                    <Button
                      variant={""}
                      color={"black "}
                      _hover={{ color: "#FD8A8A" }}
                      onClick={() => {
                        onOpen();
                      }}
                    >
                      Forget Password
                    </Button>
                  </FormHelperText>
                </FormControl>
                <Button
                  borderRadius={5}
                  type="submit"
                  variant="solid"
                  bgColor={"#FF7878"}
                  width="full"
                >
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
      <Modalforgotpass
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
    </Box>
  );
}
