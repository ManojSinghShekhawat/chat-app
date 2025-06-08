import { Box, Text, VStack, Tooltip, Link, HStack } from "@chakra-ui/react";
import React, { use } from "react";
import socket from "../util/socket";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IoMdAttach } from "react-icons/io";

const MessagesBox = () => {
  const userId = useSelector((state) => state.user?.user?._id);
  const groupId = useSelector((state) => state.group?.selectedGroup?._id);

  const receiverId = useSelector(
    (state) => state.contact?.selectedContact?.contact._id
  );
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!userId || !receiverId) return;

    const fetchMessages = async () => {
      setMessages([]); // Clear previous messages
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/messages/${receiverId}`,
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
    if (!groupId) return;
    const fetchGroupMessages = async () => {
      setMessages([]);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}api/v1//messages/group/${groupId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch group messages");
        }
        const data = await response.json();

        setMessages(data.messages);
      } catch (error) {
        console.error("Error fetching group messages:", error);
      }
    };
    fetchGroupMessages();
  }, [groupId, userId, receiverId]);

  useEffect(() => {
    if (!userId) return;

    // Join your own room using your user ID
    socket.emit("join", userId);
    socket.emit("joinGroup", groupId);

    // Message handler
    const handleReceiveMessage = (message) => {
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    // Register listener
    socket.on("receiveMessage", handleReceiveMessage);

    // Cleanup on unmount or userId change
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [userId, groupId]);

  return (
    <>
      <Box
        position="fixed"
        right="5"
        w={{ base: "100%", sm: "97%", md: "66%", lg: "77%", xl: "83%" }}
        // width="83%"
        mt={1}
        p={4}
        bg="gray.100"
        boxShadow="md"
        height="80vh"
        overflowY="auto"
        sx={{
          // Hide scrollbar for WebKit-based browsers (e.g., Chrome, Safari)
          "&::-webkit-scrollbar": {
            display: ["none", "initial"], // Hide on mobile, show on larger screens
          },
          // Optional: Hide scrollbar for Firefox
          scrollbarWidth: ["none", "auto"], // 'none' hides it, 'auto' shows it
          msOverflowStyle: ["none", "auto"], // IE and Edge
        }}
      >
        <VStack align="stretch" spacing={2}>
          {messages.map((msg, idx) => {
            const isSentByMe = msg.sender === userId;
            const time = new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <Tooltip label={time} placement="top" hasArrow key={idx}>
                <Box
                  bg={isSentByMe ? "blue.100" : "gray.300"}
                  alignSelf={isSentByMe ? "flex-end" : "flex-start"}
                  px={3}
                  py={2}
                  borderRadius="md"
                  maxWidth="70%"
                >
                  <Text>{msg.content}</Text>
                  {msg?.files.map((file, idx) => (
                    <VStack
                      justifyContent={"center"}
                      alignItems={"flex-start"}
                      key={idx}
                    >
                      <Link href={file.url}>
                        <HStack>
                          <IoMdAttach size={15} color="#4A5568" />{" "}
                          <Text>{file.name}</Text>
                        </HStack>
                      </Link>
                    </VStack>
                  ))}
                </Box>
              </Tooltip>
            );
          })}
        </VStack>
      </Box>
    </>
  );
};

export default MessagesBox;
