import React from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import GroupSidebar from "./GroupSidebar";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedGroup } from "../components/redux/slices/groupSlice";
import { setSelectedContact } from "./redux/slices/contactSlice";
import { IoIosPersonAdd, IoIosSearch, IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { MdGroupAdd } from "react-icons/md";
import NewGroup from "./NewGroup";
import { useEffect, useState } from "react";
import axios from "axios";
import Profile from "./Profile";

const ContactAndGroup = ({ handleContactSelect, handleLogout }) => {
  const [contacts, setContacts] = useState([]);
  const dispatch = useDispatch();
  const handleGroupSelect = (group) => {
    dispatch(setSelectedContact(null)); // Clear selected contact when a group is selected
    dispatch(setSelectedGroup(group));
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenProfile,
    onOpen: onOpenProfile,
    onClose: onCloseProfile,
  } = useDisclosure();

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    // Fetch contacts from the server when the component mounts
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/contacts`,
          {
            withCredentials: true,
          }
        );

        setContacts(response.data.contacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, []);

  return (
    <>
      <VStack w={"100%"} alignItems={"left"} spacing={2} mt={4} h={"80vh"}>
        <Box
          h="50%"
          w="100%"
          overflowY="auto"
          sx={{
            "&::-webkit-scrollbar": {
              width: "0px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "transparent",
            },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <HStack
                key={contact._id}
                cursor={"pointer"}
                borderBottom={"1px solid white"}
                p={2}
                borderRadius={"md"}
                onClick={() => handleContactSelect(contact)}
              >
                <Avatar
                  size={"sm"}
                  name={contact.name}
                  src={contact.contact?.avatar}
                />{" "}
                <Text fontSize={".8rem"}>{contact.name}</Text>
              </HStack>
            ))
          ) : (
            <Text>No contacts found</Text>
          )}
        </Box>
        <Box h="50%" w="100%">
          <Text fontSize={20} textAlign={"center"}>
            Groups
          </Text>
          <GroupSidebar handleGroupSelect={handleGroupSelect} />
        </Box>
      </VStack>
      <Menu placement="top-start">
        <MenuButton
          borderRadius="full"
          position="absolute"
          bottom={4}
          left={4}
          cursor="pointer"
        >
          <Avatar size={"md"} name={user?.username} src={user?.avatar} />
        </MenuButton>
        <MenuList bg="blue.300" color="black" border="none">
          <MenuItem
            onClick={onOpenProfile}
            border={"1px solid blue.500"}
            borderRadius={"md"}
            mb={2}
            bg={"blue.400"}
          >
            <CgProfile />
            <Text ml={3}> Profile</Text>
          </MenuItem>

          <MenuItem
            onClick={onOpen}
            border={"1px solid blue.500"}
            borderRadius={"md"}
            bg={"blue.400"}
            mb={2}
          >
            <MdGroupAdd /> <Text ml={3}> New Group</Text>
          </MenuItem>
          <MenuItem
            onClick={handleLogout}
            border={"1px solid blue.500"}
            borderRadius={"md"}
            bg={"blue.400"}
            mb={2}
          >
            <IoIosLogOut />
            <Text ml={3}> Logout</Text>
          </MenuItem>
        </MenuList>
      </Menu>
      <NewGroup
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        contacts={contacts}
      />
      <Profile
        onOpenProfile={onOpenProfile}
        isOpenProfile={isOpenProfile}
        onCloseProfile={onCloseProfile}
      />
    </>
  );
};

export default ContactAndGroup;
