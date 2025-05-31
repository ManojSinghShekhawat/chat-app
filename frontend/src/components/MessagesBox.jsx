import { Box, Text, VStack } from "@chakra-ui/react";
import React from "react";
import socket from "../util/socket";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const MessagesBox = () => {
  const userId = useSelector((state) => state.user?.user?._id);
  const receiverId = useSelector(
    (state) => state.contact?.selectedContact?.contact._id
  );
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!userId || !receiverId) return;

    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/messages/${receiverId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Include cookies for authentication
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data = await response.json();

        setMessages(data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [userId, receiverId]);

  useEffect(() => {
    if (!userId) return;

    // Join your own room using your user ID
    socket.emit("join", userId);

    // Message handler
    const handleReceiveMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    // Register listener
    socket.on("receiveMessage", handleReceiveMessage);

    // Cleanup on unmount or userId change
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [userId]);

  return (
    <>
      <Box
        position="fixed"
        right="5"
        width="83%"
        mt={1}
        p={4}
        bg="gray.100"
        boxShadow="md"
        height="80vh"
        overflowY="auto"
      >
        <VStack align="stretch" spacing={2}>
          {messages.map((msg, idx) => {
            const isSentByMe = msg.sender === userId;
            return (
              <Box
                key={idx}
                bg={isSentByMe ? "blue.100" : "gray.300"}
                alignSelf={isSentByMe ? "flex-end" : "flex-start"}
                px={3}
                py={2}
                borderRadius="md"
                maxWidth="70%"
              >
                <Text>{msg.content}</Text>
              </Box>
            );
          })}
        </VStack>
      </Box>
    </>
  );
};

export default MessagesBox;
