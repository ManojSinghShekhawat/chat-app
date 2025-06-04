import React from "react";
import Select from "react-select";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

const NewGroup = ({ contacts, onOpen, isOpen, onClose }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState("");
  // const userId = useSelector((state) => state.user.user._id);

  const options = contacts.map((contact) => ({
    value: contact._id, // Assuming contact has an _id field
    label: contact.name,
  }));

  const handleGroupCreation = async (selectedUsers) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/groups/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: groupName, // You can replace this with a dynamic name input
          members: selectedUsers.map((user) => user.value),
        }),
        credentials: "include", // Include cookies for authentication
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Group</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Group Name</FormLabel>
            <Input
              placeholder="Group Name"
              value={groupName}
              name="groupName"
              onChange={(e) => setGroupName(e.target.value)}
            />
          </FormControl>

          <Select
            isMulti
            options={options}
            onChange={(selectedOptions) => setSelectedUsers(selectedOptions)}
            placeholder="Select users to add to group"
          />
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              handleGroupCreation(selectedUsers);
              onClose();
            }}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewGroup;
