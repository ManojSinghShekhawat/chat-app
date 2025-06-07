import React from "react";
import { useState, useEffect } from "react";
import { IoMenuOutline } from "react-icons/io5";
import {
  Text,
  Avatar,
  HStack,
  Input,
  InputRightElement,
  InputLeftElement,
  InputGroup,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  VStack,
} from "@chakra-ui/react";
import { IoIosPersonAdd, IoIosSearch } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import GroupSidebar from "./GroupSidebar";
import { setSelectedGroup } from "../components/redux/slices/groupSlice";
import { setSelectedContact } from "./redux/slices/contactSlice";
import ContactAndGroup from "./ContactAndGroup";
import SidebarHeader from "./SidebarHeader";

const MobileSidebar = ({
  handleSearch,
  addContact,
  handleContactSelect,
  handleLogout,
}) => {
  const {
    isOpen: isSidebarOpen,
    onOpen: onSidebarOpen,
    onClose: onSidebarClose,
  } = useDisclosure();
  const {
    isOpen: isContactModalOpen,
    onOpen: onContactModalOpen,
    onClose: onContactModalClose,
  } = useDisclosure();
  const btnRef = React.useRef();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [contact, setContact] = useState({});
  const [contacts, setContacts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch contacts from the server when the component mounts
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/users/contacts`,
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

  const handleGroupSelect = (group) => {
    dispatch(setSelectedContact(null)); // Clear selected contact when a group is selected
    dispatch(setSelectedGroup(group));
  };

  return (
    <>
      <IoMenuOutline ref={btnRef} onClick={onSidebarOpen} size={35} />

      <Drawer
        isOpen={isSidebarOpen}
        placement="left"
        onClose={onSidebarClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent maxW={"15rem"} bg={"blue.300"} color={"black"}>
          {/* <DrawerCloseButton /> */}
          <DrawerHeader>
            <SidebarHeader
              handleSearch={handleSearch}
              addContact={addContact}
            />
          </DrawerHeader>

          <DrawerBody>
            <ContactAndGroup
              contacts={contacts}
              handleContactSelect={handleContactSelect}
              handleLogout={handleLogout}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileSidebar;
