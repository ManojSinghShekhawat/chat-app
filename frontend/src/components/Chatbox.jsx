import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import { IoIosSend, IoMdAttach } from "react-icons/io";
import { useEffect, useState, useRef } from "react";
import socket from "../util/socket";
import { useSelector } from "react-redux";
import axios from "axios";

const Chatbox = ({}) => {
  const userId = useSelector((state) => state.user?.user?._id);
  const receiverId = useSelector(
    (state) => state.contact?.selectedContact?.contact._id
  );
  const groupId = useSelector((state) => state.group?.selectedGroup?._id);
  const fileInputRef = useRef(null);
  const [chat, setChat] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  // const handleSendMessage = async () => {
  //   const formData = new FormData();
  //   for (let i = 0; i < selectedFiles.length; i++) {
  //     formData.append("files", selectedFiles[i]);
  //   }

  //   try {
  //     const { data } = await axios.post(
  //       `${import.meta.env.VITE_API_URL}/api/v1/messages/filesupload`,
  //       formData,
  //       {
  //         withCredentials: true,
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     if (chat.trim() !== "") {
  //       const message = {
  //         senderId: userId,
  //         receiverId: receiverId ? receiverId : null,
  //         groupId: groupId ? groupId : null,
  //         content: chat,
  //         files: data.files,
  //         timestamp: new Date().toISOString(),
  //       };
  //       socket.emit("sendMessage", message);

  //       setChat("");
  //       setSelectedFiles([]);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSendMessage = async () => {
    let uploadedFiles = [];

    if (selectedFiles.length > 0) {
      const formData = new FormData();
      selectedFiles.forEach((file) => formData.append("files", file));

      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/v1/messages/filesupload`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        uploadedFiles = data.files || [];
      } catch (error) {
        console.error("File upload failed:", error);
        return;
      }
    }

    if (chat.trim() || uploadedFiles.length > 0) {
      const message = {
        senderId: userId,
        receiverId: receiverId || null,
        groupId: groupId || null,
        content: chat,
        files: uploadedFiles,
        timestamp: new Date().toISOString(),
      };

      socket.emit("sendMessage", message);
      setChat("");
      setSelectedFiles([]);
    }
  };

  const handleFilesSelection = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  return (
    <>
      <Box
        position={"fixed"}
        bottom="0"
        right={"0"}
        w={{ base: "100%", sm: "99%", md: "68%", lg: "79%", xl: "84%" }}
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
            disabled={!receiverId && !groupId}
          />
          <InputRightElement>
            <HStack spacing={2} mr={"2rem"}>
              <input
                type="file"
                accept="image/*,application/pdf"
                multiple // ✅ allow multiple files
                onChange={handleFilesSelection}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
              <IoMdAttach
                size={24}
                color="#4A5568"
                cursor="pointer"
                onClick={() => fileInputRef.current.click()}
              />

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

export default Chatbox;
