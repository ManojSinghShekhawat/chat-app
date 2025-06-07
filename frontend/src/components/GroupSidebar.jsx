import { VStack, Box } from "@chakra-ui/react";
import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const GroupSidebar = ({ handleGroupSelect }) => {
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState({});
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}api/v1/groups`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Include cookies for authentication
          }
        );
        const data = await response.json();

        setGroups(data.groups);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);

  return (
    <>
      {isAuthenticated && (
        <VStack
          overflowY="auto"
          h="100%"
          sx={{
            "&::-webkit-scrollbar": {
              width: "0px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "transparent",
            },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {groups?.map((group) => (
            <Box
              key={group._id}
              style={{
                padding: "10px",
                width: "100%",
                cursor: "pointer",
                borderRadius: "1rem",
                borderBottom: "1px solid white",
              }}
              onClick={() => handleGroupSelect(group)}
            >
              <h3>{group.name}</h3>
              <p>Members: {group?.members?.length}</p>
            </Box>
          ))}
        </VStack>
      )}
    </>
  );
};

export default GroupSidebar;
