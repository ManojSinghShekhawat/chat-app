import React from "react";

import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { setSelectedContact } from "./redux/slices/contactSlice";

import { logout } from "./redux/slices/userSlice";

import { useBreakpointValue } from "@chakra-ui/react";
import MobileSidebar from "./MobileSidebar";
import LaptopSidebar from "./LaptopSidebar";
import { setSelectedGroup } from "./redux/slices/groupSlice";

const Sidebar = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const dispatch = useDispatch();

  const handleContactSelect = (contact) => {
    dispatch(setSelectedGroup(null)); // Clear selected group when a contact is selected
    dispatch(setSelectedContact(contact));
  };

  const addContact = async (data) => {
    const newContact = await axios.post(
      `${import.meta.env.VITE_API_URL}/users/addContact`,
      data,
      {
        withCredentials: true,
      }
    );
    // Function to handle adding a contact
    console.log("Add contact clicked");
  };

  const handleSearch = (e) => {
    // Function to handle search input
    const searchTerm = e.target.value;
    console.log("Search term:", searchTerm);
    // Implement search logic here
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/v1/users/logout`, {
        withCredentials: true,
      });

      dispatch(setSelectedContact(null));
      dispatch(logout());
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      {isMobile ? (
        <MobileSidebar
          addContact={addContact}
          handleContactSelect={handleContactSelect}
          handleSearch={handleSearch}
          handleLogout={handleLogout}
        />
      ) : (
        <LaptopSidebar
          addContact={addContact}
          handleContactSelect={handleContactSelect}
          handleSearch={handleSearch}
          handleLogout={handleLogout}
        />
      )}
    </>
  );
};

export default Sidebar;
