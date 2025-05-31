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
  const [isLogin, setIsLogin] = React.useState(false);
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const selectedContact = useSelector((state) => state.contact.selectedContact);

  const baseUrl = "http://localhost:3000/api/v1"; // Adjust this to your backend URL

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // setSignupData((prev) => ({
    //   ...prev,
    //   [name]: value,
    // }));
  };

  const handleLogin = async () => {
    const res = await axios.post(`${baseUrl}/users/login`, loginData, {
      withCredentials: true,
    });

    if (res.data.success) {
      console.log(res.data.user);
      dispatch(loginSuccess(res.data.user)); // Dispatch the loginSuccess action with user data
      setIsLogin(true);
      onClose();
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
          ) : (
            ""
          )}
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
              <ModalHeader>Create your account</ModalHeader>
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
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleLogin}>
                  Login
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export default Login;
