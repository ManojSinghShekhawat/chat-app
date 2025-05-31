import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import { IoIosSend, IoMdAttach } from "react-icons/io";
import { useEffect, useState } from "react";
import socket from "../util/socket";
import { useSelector } from "react-redux";

const ChatBox = ({}) => {
  const userId = useSelector((state) => state.user?.user?._id);
  const receiverId = useSelector(
    (state) => state.contact?.selectedContact?.contact._id
  );

  const [chat, setChat] = useState("");

  const handleSendMessage = () => {
    if (chat.trim() !== "") {
      const message = {
        senderId: userId,
        receiverId,
        content: chat,
        timestamp: new Date().toISOString(),
      };
      socket.emit("sendMessage", message);
      console.log("sent a message:", message);
      setChat(""); // Clear the input after sending
    }
  };

  return (
    <>
      <Box
        position={"fixed"}
        bottom="0"
        right={"0"}
        width="84%"
        p={4}
        bg="gray.100"
        boxShadow="md"
      >
        <InputGroup>
          <Input
            placeholder="Type your message here..."
            variant="filled"
            bg="white"
            borderRadius="md"
            onChange={(e) => setChat(e.target.value)}
            value={chat}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            disabled={!receiverId}
          />
          <InputRightElement>
            <HStack spacing={2} mr={"2rem"}>
              <IoMdAttach size={24} color="#4A5568" cursor="pointer" />
              <IoIosSend
                size={24}
                color="#4A5568"
                cursor="pointer"
                onClick={handleSendMessage}
              />
            </HStack>
          </InputRightElement>
        </InputGroup>
      </Box>
    </>
  );
};

export default ChatBox;
