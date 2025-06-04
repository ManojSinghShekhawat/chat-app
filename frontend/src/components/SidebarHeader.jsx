import React from "react";
import {
  VStack,
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
} from "@chakra-ui/react";
import { IoIosPersonAdd, IoIosSearch, IoIosLogOut } from "react-icons/io";
import { useState } from "react";

const SidebarHeader = ({ handleSearch, addContact }) => {
  const {
    isOpen: isContactModalOpen,
    onOpen: onContactModalOpen,
    onClose: onContactModalClose,
  } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [contact, setContact] = useState({});
  return (
    <HStack>
      <InputGroup>
        <InputLeftElement>
          <Box cursor="pointer" onClick={onContactModalOpen}>
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
        isOpen={isContactModalOpen}
        onClose={onContactModalClose}
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
                addContact(contact);
                onContactModalClose();
              }}
            >
              Save
            </Button>
            <Button onClick={onContactModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </HStack>
  );
};

export default SidebarHeader;
