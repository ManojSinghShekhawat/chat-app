import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
  useDisclosure,
  Button,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Text,
  Avatar,
  AvatarBadge,
  Tooltip,
} from "@chakra-ui/react";
import axios from "axios";
const show = false; // Change this to toggle password visibility
import { loginSuccess } from "./redux/slices/userSlice"; // Adjust the import path as necessary
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch to dispatch actions

const Login = () => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isSignupModalOpen,
    onOpen: onSignupModalOpen,
    onClose: onSingupMoalClose,
  } = useDisclosure();
  const {
    isOpen: isGroupDetailsOpen,
    onOpen: onGroupDetailsOpen,
    onClose: onGroupDetailsClose,
  } = useDisclosure();

  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = React.useState({
    email: "",
    password: "",
    username: "",
    mobile: "",
  });
  const handleSignup = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/users/register`,
      signupData,
      {
        withCredentials: true,
      }
    );
    if (res.data.success) {
      dispatch(loginSuccess(res.data.user)); // Dispatch the loginSuccess action with user data

      onSingupMoalClose();
    }
  };

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const selectedContact = useSelector((state) => state.contact.selectedContact);
  const selectedGroup = useSelector((state) => state.group.selectedGroup);
  const [groupDetails, setGroupDetails] = React.useState(null);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/users/login`,
      loginData,
      {
        withCredentials: true,
      }
    );

    if (res.data.success) {
      dispatch(loginSuccess(res.data.user));

      onClose();
    }
  };

  const handleShowGroupDetails = async (groupId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/groups/${groupId}`,
        {
          withCredentials: true,
        }
      );
      const groupDetails = response.data;

      setGroupDetails(groupDetails);
    } catch (error) {
      console.error("Error showing group details:", error);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <HStack position={"fixed"} right={"0"} top={"0"} p={4} spacing={4}>
          {selectedContact ? (
            <Avatar
              name={selectedContact.name}
              src={selectedContact.avatar}
              size="md"
            >
              <AvatarBadge boxSize=".9em" bg="green.500" />
            </Avatar>
          ) : selectedGroup ? (
            <Tooltip label="Details">
              <Avatar
                name={selectedGroup.name}
                src={selectedGroup.avatar}
                size="md"
                cursor={"pointer"}
                onClick={() => {
                  handleShowGroupDetails(selectedGroup._id),
                    onGroupDetailsOpen();
                }}
              >
                <AvatarBadge boxSize=".9em" bg="green.500" />
              </Avatar>
              <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isGroupDetailsOpen}
                onClose={onGroupDetailsClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>{groupDetails?.group?.name}</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl>
                      <FormLabel>Members</FormLabel>
                      {groupDetails?.members?.map((member) => (
                        <Text
                          key={member._id}
                          border={"1px solid black"}
                          p={2}
                          mb={2}
                          borderRadius={"md"}
                        >
                          {member.username}
                        </Text>
                      ))}
                    </FormControl>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </Tooltip>
          ) : null}
        </HStack>
      ) : (
        <>
          <Text
            onClick={onOpen}
            cursor={"pointer"}
            position={"fixed"}
            right={"0"}
            top={"0"}
            p={4}
          >
            Get Started
          </Text>
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Welcome </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    ref={initialRef}
                    placeholder="abc@mail.com"
                    name="email"
                    value={loginData.email}
                    onChange={changeHandler}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    placeholder="******"
                    name="password"
                    value={loginData.password}
                    onChange={changeHandler}
                  />
                </FormControl>
                <Text mt={4} fontSize="sm" color="gray.500">
                  Don't have an account?{" "}
                </Text>
                <Text
                  as="span"
                  color="blue.500"
                  cursor="pointer"
                  onClick={() => {
                    onClose();
                    onSignupModalOpen();
                  }}
                >
                  Sign Up
                </Text>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleLogin}>
                  Login
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isSignupModalOpen}
            onClose={onSingupMoalClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Welcome, Create an Account </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>User Name</FormLabel>
                  <Input
                    ref={initialRef}
                    placeholder="jhondoe"
                    name="username"
                    value={signupData.username}
                    onChange={changeHandler}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>E-mail</FormLabel>
                  <Input
                    ref={initialRef}
                    placeholder="abc@mail.com"
                    name="email"
                    value={signupData.email}
                    onChange={changeHandler}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Mobile</FormLabel>
                  <Input
                    ref={initialRef}
                    placeholder="9999999999"
                    name="mobile"
                    value={signupData.mobile}
                    onChange={changeHandler}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    placeholder="******"
                    name="password"
                    value={signupData.password}
                    onChange={changeHandler}
                  />
                </FormControl>
                <Text mt={4} fontSize="sm" color="gray.500">
                  Already have an account?{" "}
                </Text>
                <Text
                  as="span"
                  color="blue.500"
                  cursor="pointer"
                  onClick={() => {
                    onSingupMoalClose();
                    onOpen();
                  }}
                >
                  Sign In
                </Text>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSignup}>
                  Signup Up
                </Button>
                <Button onClick={onSingupMoalClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export default Login;
