import React from "react";
import { VStack } from "@chakra-ui/react";

import { useState } from "react";
import { useSelector } from "react-redux";

import ContactAndGroup from "./ContactAndGroup";
import SidebarHeader from "./SidebarHeader";

const LaptopSidebar = ({
  handleSearch,
  addContact,
  handleContactSelect,
  handleLogout,
}) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <>
      {isAuthenticated && (
        <VStack
          bg={"red.500"}
          p={4}
          color="white"
          justifyContent={"flex-start"}
          alignItems={"left"}
          h={"100vh"}
          w={"15rem"}
          position={"fixed"}
          top={"0"}
        >
          <>
            <SidebarHeader
              handleSearch={handleSearch}
              addContact={addContact}
            />

            <ContactAndGroup
              handleContactSelect={handleContactSelect}
              handleLogout={handleLogout}
            />
          </>
        </VStack>
      )}
    </>
  );
};

export default LaptopSidebar;
