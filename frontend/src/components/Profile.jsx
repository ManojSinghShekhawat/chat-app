import React, { useState, useEffect } from "react";
import {
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
  Input,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";

const Profile = ({ onOpenProfile, isOpenProfile, onCloseProfile }) => {
  const user = useSelector((state) => state.user.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ProfileData, setProfileData] = useState(null);

  const userId = useSelector((state) => state.user.user._id);

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileUpdate = async () => {
    const res = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/v1/users/${userId}`,
      ProfileData,
      {
        withCredentials: true,
      }
    );
    onClose();
  };

  useEffect(() => {
    if (isOpen && user) {
      setProfileData({
        username: user.username || "",
        email: user.email || "",
        mobile: user.mobile || "",
      });
    }
  }, [isOpen, user]);

  return (
    <>
      <Modal isOpen={isOpenProfile} onClose={onCloseProfile}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Account Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>User Name</FormLabel>
              <Text>{user.username}</Text>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>E-Mail</FormLabel>
              <Text>{user.email}</Text>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Mobile</FormLabel>
              <Text>{user.mobile}</Text>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onOpen();
                onCloseProfile();
              }}
            >
              Edit
            </Button>
            <Button onClick={onCloseProfile}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Account Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>User Name</FormLabel>
              <Input
                value={ProfileData?.username}
                name="username"
                onChange={handleProfileInputChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>E-Mail</FormLabel>
              <Input
                value={ProfileData?.email}
                name="email"
                onChange={handleProfileInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Mobile</FormLabel>
              <Input
                value={ProfileData?.mobile}
                name="mobile"
                onChange={handleProfileInputChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleProfileUpdate}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Profile;
