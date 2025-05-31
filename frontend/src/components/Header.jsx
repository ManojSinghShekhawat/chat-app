import React from "react";
import { HStack, Text } from "@chakra-ui/react";
import Login from "./Login.jsx";
import { IoMdMenu } from "react-icons/io";
import Sidebar from "./Sidebar";

const Header = () => {
  return (
    <>
      <HStack
        bg={"blue.500"}
        color="white"
        justifyContent={"space-between"}
        h={"4rem"}
        pr={"12rem"}
      >
        <Sidebar />
        <Login />
      </HStack>
    </>
  );
};

export default Header;
