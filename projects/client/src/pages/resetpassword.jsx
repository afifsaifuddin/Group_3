import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
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
  const handleShowConfirmpass = () => setShowConfirmPass(!showConfirmPass);
  const resetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password harus diisi")
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6,}$/,
        "Password minimal 6 karakter, 1 symbol, dan 1 huruf kapital"
      ),
    confirmPassword: Yup.string()
      .required("Password harus diisi")
      .oneOf([Yup.ref("password"), null], "Password tidak sama"),
  });
  async function resetpass(values) {
    const url = window.location.href.split("/");
    const token = url.pop();
    try {
      const res = await axios.patch(
        "http://localhost:8000/pos-kasir/reset-password",
        // { password, confirmPassword },
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      document.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  }
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: (values) => {
      resetpass(values);
      navigate("/");
    },
  });
  return (
    <Box>
      <Flex
        flexDirection="row"
        width="100wh"
        height="100vh"
        backgroundColor="gray.400"
        justifyContent="center"
        alignItems="center"
      >
        <Box w={"50%"}>
          <Image src="https://drive.google.com/uc?export=view&id=1ti-pm1H-S9qSEK7ld3gCfMv5y6QuiaNS" />
        </Box>
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Box minW={{ base: "90%", md: "468px" }} shadow={"xl"}>
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
                  <Heading color="#FC2947" pb={5}>
                    Reset Password
                  </Heading>
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
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                >
                  <FormLabel htmlFor="confirmPassword" fontWeight={"bold"}>
                    Confirm Password
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <RiLockPasswordFill />
                    </InputLeftElement>
                    <Input
                      name="confirmPassword"
                      id="confirmPassword"
                      type={showConfirmPass ? "text" : "password"}
                      placeholder="confirmPassword"
                      onChange={formik.handleChange}
                      value={formik.values.confirmPassword}
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
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <FormErrorMessage>
                        {formik.errors.confirmPassword}
                      </FormErrorMessage>
                    )}
                </FormControl>
                <Button
                  borderRadius={5}
                  type="submit"
                  variant="solid"
                  width="full"
                  bgColor={"#FC2947"}
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
