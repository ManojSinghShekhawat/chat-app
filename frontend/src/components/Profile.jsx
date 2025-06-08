import React, { useState, useEffect, useRef } from "react";
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
  Avatar,
  Flex,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";

const Profile = ({ onOpenProfile, isOpenProfile, onCloseProfile }) => {
  const user = useSelector((state) => state.user.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ProfileData, setProfileData] = useState(user);
  const [selectedFile, setSelectedFile] = useState(null);

  const userId = useSelector((state) => state.user.user._id);
  const fileInputRef = useRef(null);

  const formData = new FormData();

  formData.append("username", ProfileData?.username);
  formData.append("email", ProfileData?.email);
  formData.append("mobile", ProfileData?.mobile);
  if (selectedFile) {
    formData.append("avatar", selectedFile);
  }

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarSelection = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setSelectedFile(file);
      const previewURL = URL.createObjectURL(file);
      setProfileData((prev) => ({
        ...prev,
        avatar: previewURL,
      }));
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/users/${userId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    onClose();
  };

  useEffect(() => {
    if (isOpen && user) {
      setProfileData({
        username: user.username || "",
        email: user.email || "",
        mobile: user.mobile || "",
        avatar: user.avatar || "",
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
          <Flex justify={"center"}>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarSelection}
              ref={(input) => (fileInputRef.current = input)}
              style={{ display: "none" }}
            />
            <Avatar
              name={ProfileData?.username}
              src={ProfileData?.avatar}
              size="lg"
              onClick={() => fileInputRef.current.click()}
              cursor="pointer"
              border={".6px solid black"}
            />
          </Flex>
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
