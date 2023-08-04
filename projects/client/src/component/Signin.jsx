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
  Image,
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
import { useDispatch } from "react-redux";
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
    },
  });

  return (
    <Flex
      flexDirection="row"
      width="100wh"
      height="100vh"
      backgroundColor="white"
      justifyContent="center"
      alignItems="center"
    >
      <Box w={"50%"}>
        <Image src="https://drive.google.com/uc?export=view&id=1P5t80_nNZZ5NEmfXmWnFu8ZyrY784yFf"></Image>
      </Box>
      <Box>
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar bg="black" />
          <Heading color="black">Welcome</Heading>
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
                  <FormLabel htmlFor="username" fontWeight={"bold"}>
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
                      focusBorderColor="#FC2947"
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
                  <FormLabel htmlFor="password" fontWeight={"bold"}>
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
                      focusBorderColor="#FC2947"
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
                    <Button
                      variant={""}
                      color={"black "}
                      _hover={{ color: "#FC2947" }}
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
                  bgColor={"#FC2947"}
                  width="full"
                >
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Box>
      <Modalforgotpass isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </Flex>
  );
}
