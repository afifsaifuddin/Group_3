import { Box, Button, Flex, Stack, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import Welcome from "./welcome";
import Produk from "./produk";
import Admin from "./admin";

import { GoHome } from "react-icons/go";
import {
  MdProductionQuantityLimits,
  MdOutlineAdminPanelSettings,
  MdLogout,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/reducer/authreducer";
import History from "./history";
import { ImHistory } from "react-icons/im";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.authreducer.user.role);
  const [activePage, setActivePage] = useState("home");
  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <Welcome />;
      case "produk":
        return <Produk />;
      case "admin":
        return <Admin />;
      case "history":
        return <History />;
      default:
        return null;
    }
  };

  const handleLogout = (e) => {
    dispatch(logoutSuccess());
  };

  return (
    <Flex height={"100vh"} width={"100%"}>
      <VStack p={3} gap={"20px"} bg={"#FC2947"} height={"100vh"} width={"6vw"}>
        <Button
          onClick={() => setActivePage("home")}
          _hover={{ bgColor: "white" }}
          variant={""}
          size={"50px"}
          p={1}
        >
          <Stack>
            <GoHome size={"75px"} />
            <Text mt={-3} fontWeight={"bold"}>
              Home
            </Text>
          </Stack>
        </Button>
        <Button
          onClick={() => setActivePage("produk")}
          _hover={{ bgColor: "white" }}
          variant={""}
          size={"50px"}
          p={1}
        >
          <Stack>
            <MdProductionQuantityLimits size={"75px"} />
            <Text mt={-3} fontWeight={"bold"}>
              Produk
            </Text>
          </Stack>
        </Button>
        <Button
          onClick={() => setActivePage("history")}
          _hover={{ bgColor: "white" }}
          variant={""}
          size={"50px"}
          p={1}
        >
          <Stack>
            <ImHistory size={"75px"} />
            <Text mt={-3} fontWeight={"bold"}>
              History
            </Text>
          </Stack>
        </Button>
        {role === "admin" ? (
          <Button
            onClick={() => setActivePage("admin")}
            _hover={{ bgColor: "white" }}
            variant={""}
            size={"50px"}
            p={1}
          >
            <Stack>
              <MdOutlineAdminPanelSettings size={"75px"} />
              <Text mt={-3} fontWeight={"bold"}>
                Admin
              </Text>
            </Stack>
          </Button>
        ) : null}

        <Button
          onClick={handleLogout}
          _hover={{ bgColor: "white" }}
          variant={""}
          size={"50px"}
          mt={"75vh"}
          position={"absolute"}
          p={1}
        >
          <Stack>
            <MdLogout size={"75px"} />
            <Text mt={-3} fontWeight={"bold"}>
              Logout
            </Text>
          </Stack>
        </Button>
      </VStack>
      <Box bgColor={"gray.200"} width={"95%"}>
        {renderPage()}
      </Box>
    </Flex>
  );
};
export default Sidebar;
