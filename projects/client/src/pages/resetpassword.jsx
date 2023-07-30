import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { BiShowAlt, BiSolidHide } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
export const Resetpassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const handleShowPass = () => setShowPassword(!showConfirmPass);
  const handleShowConfirmpass = () => setShowConfirmPass(!showPassword);
  const resetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password harus diisi")
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6,}$/,
        "Password minimal 6 karakter, 1 symbol, dan 1 huruf kapital"
      ),
    confirmpassword: Yup.string()
      .required("Password harus diisi")
      .oneOf([Yup.ref("password"), null], "Password tidak sama"),
  });
  async function resetpass(values) {
    const url = window.location.href.split("/");
    const token = url.pop();
    try {
      const res = await axios.post(
        "http://localhost:8000/pos-kasir/reset-password",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      document.location.href = "/login";
    } catch (error) {
      console.log(error);
    }
  }
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmpassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: (values) => {
      resetpass(values);
      navigate("/login");
    },
  });
  return (
    <Box>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="gray.200"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Heading color="teal.400">Reset Password</Heading>
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
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <InputRightElement>
                      <Button
                        variant={"none"}
                        size={"xl"}
                        onClick={handleShowPass}
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
                </FormControl>
                <FormControl
                  isInvalid={
                    formik.touched.confirmpassword &&
                    formik.errors.confirmpassword
                  }
                >
                  <FormLabel htmlFor="confirmpassword" fontWeight={"bold"}>
                    Confirm Password
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <RiLockPasswordFill />
                    </InputLeftElement>
                    <Input
                      name="confirmpassword"
                      id="confirmpassword"
                      type={showConfirmPass ? "text" : "password"}
                      placeholder="confirmpassword"
                      onChange={formik.handleChange}
                      value={formik.values.confirmpassword}
                    />
                    <InputRightElement>
                      <Button
                        variant={"none"}
                        size={"xl"}
                        onClick={handleShowConfirmpass}
                      >
                        {showConfirmPass ? <BiSolidHide /> : <BiShowAlt />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {formik.touched.password && formik.errors.password && (
                    <FormErrorMessage>
                      {formik.errors.password}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <Button
                  borderRadius={5}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                >
                  Reset
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
};
