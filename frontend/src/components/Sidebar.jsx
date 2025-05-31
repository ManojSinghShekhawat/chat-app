import {
  VStack,
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
  AvatarBadge,
} from "@chakra-ui/react";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { IoIosPersonAdd, IoIosSearch } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedContact } from "./redux/slices/contactSlice"; // Adjust the import path as necessary

const Sidebar = () => {
  const [contact, setContact] = useState({});
  const [contacts, setContacts] = useState([]);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const handleContactSelect = (contact) => {
    dispatch(setSelectedContact(contact));
  };

  useEffect(() => {
    // Fetch contacts from the server when the component mounts
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/users/contacts",
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

  const addContact = async () => {
    const newContact = await axios.post(
      "http://localhost:3000/api/v1/users/addContact",
      contact,
      {
        withCredentials: true,
      }
    );
    // Function to handle adding a contact
    console.log("Add contact clicked");
  };

  const handleSearch = (e) => {
    // Function to handle search input
    const searchTerm = e.target.value;
    console.log("Search term:", searchTerm);
    // Implement search logic here
  };

  return (
    <>
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
        <HStack>
          <InputGroup>
            <InputLeftElement>
              <Box cursor="pointer" onClick={onOpen}>
                <IoIosPersonAdd size="1.7rem" />
              </Box>
            </InputLeftElement>
            <Input
              type="text"
              border={"none"}
              borderBottom={"1px solid white"}
              pl="2.5rem"
              borderRadius={"md"}
            />
            <InputRightElement>
              <Box cursor="pointer" onClick={handleSearch}>
                <IoIosSearch size="1.7rem" />
              </Box>
            </InputRightElement>
          </InputGroup>
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add contact</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    ref={initialRef}
                    placeholder="Jhone Doe"
                    name="name"
                    value={contact.name || ""}
                    onChange={(e) =>
                      setContact({ ...contact, name: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Mobile Number</FormLabel>
                  <Input
                    placeholder="1234567890"
                    name="mobile"
                    value={contact.mobile || ""}
                    onChange={(e) =>
                      setContact({ ...contact, mobile: e.target.value })
                    }
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                    addContact();
                    onClose();
                  }}
                >
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </HStack>
        <>
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
        </>
        <Avatar
          size={"md"}
          name={user?.username}
          src={user?.avatar}
          position={"absolute"}
          bottom={4}
          left={4}
        />
      </VStack>
    </>
  );
};

export default Sidebar;
