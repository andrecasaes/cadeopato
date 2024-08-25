import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Tabs,
  Tab,
  Fab,
} from "@mui/material";
import {
  ArrowBack
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import DuckModal from "../components/DuckModal";
import HouseModal from "../components/HouseModal";
import UserModal from "../components/UserModal";
import ItemList from "../components/ItemList";

const apiBaseUrl =
  process.env.REACT_APP_API_BASE_URL || "https://localhost:4000";

const fetchDucks = async (setDucks, setFilteredDucks, setLoading) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/ducks`);
    const ducksData = response.data;
    setDucks(ducksData);
    const sortedDucks = ducksData.sort((a, b) => a.id - b.id);
    setFilteredDucks(sortedDucks);
    return sortedDucks; // Return the sorted ducks
  } catch (error) {
    console.error("Error fetching ducks:", error);
    return []; // Return an empty array on error
  } finally {
    setLoading(false);
  }
};

const fetchHouses = async (setHouses, setLoading) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/houses`);
    const housesData = response.data;
    setHouses(housesData);
    return housesData; // Return the houses data
  } catch (error) {
    console.error("Error fetching houses:", error);
    return []; // Return an empty array on error
  } finally {
    setLoading(false);
  }
};

const fetchUsers = async (setUsers, setLoading) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/users`);
    const usersData = response.data;
    setUsers(usersData);
    return usersData; // Return the users data
  } catch (error) {
    console.error("Error fetching users:", error);
    return []; // Return an empty array on error
  } finally {
    setLoading(false);
  }
};

const AdminPanel = () => {
  const [ducks, setDucks] = useState([]);
  const [houses, setHouses] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredDucks, setFilteredDucks] = useState([]);
  const [currentDuck, setCurrentDuck] = useState({
    id: "",
    type: "",
    houseId: "",
    photo: "",
    userId: "",
  });
  const [currentHouse, setCurrentHouse] = useState({
    name: "",
    address: "",
  });
  const [currentUser, setCurrentUser] = useState({
    username: "",
    houseId: "",
    profilePicture: "",
  });
  const [activeTab, setActiveTab] = useState(0);
  const [selectedHouse, setSelectedHouse] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [isDuckEditing, setIsDuckEditing] = useState(false);
  const [isHouseEditing, setIsHouseEditing] = useState(false);
  const [isUserEditing, setIsUserEditing] = useState(false);
  const [showDuckModal, setShowDuckModal] = useState(false);
  const [showHouseModal, setShowHouseModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [duckSubmitting, setDuckSubmitting] = useState(false);
  const [houseSubmitting, setHouseSubmitting] = useState(false);
  const [userSubmitting, setUserSubmitting] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const isAdminAuthenticated = sessionStorage.getItem("isAdminAuthenticated");
    if (!isAdminAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const loadInitialTab = async () => {
      fetchHouses(setHouses, setLoading);
      fetchUsers(setUsers, setLoading);
      const ducksData = await fetchDucks(
        setDucks,
        setFilteredDucks,
        setLoading
      );
      setFilteredItems(ducksData);
    };
    loadInitialTab();
  }, []);

  const handleTabChange = async (event, newValue) => {
    setActiveTab(newValue);
    switch (newValue) {
      case 0:
        const ducksData = await fetchDucks(
          setDucks,
          setFilteredDucks,
          setLoading
        );
        setFilteredItems(ducksData);
        break;
      case 1:
        const usersData = await fetchUsers(setUsers, setLoading);
        setFilteredItems(usersData);
        break;
      case 2:
        const housesData = await fetchHouses(setHouses, setLoading);
        setFilteredItems(housesData);
        break;
      default:
        break;
    }
  };

  const handleDuckInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentDuck({ ...currentDuck, [name]: value });
  };

  const handleHouseInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentHouse({ ...currentHouse, [name]: value });
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const handleUserPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentUser({ ...currentUser, profilePicture: file });
    }
  };

  const handleDuckPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentDuck({ ...currentDuck, photo: file });
    }
  };

  const handleDuckSubmit = async (e) => {
    e.preventDefault();
    setDuckSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("id", currentDuck.id);
      formData.append("type", currentDuck.type);
      formData.append("houseId", currentDuck.houseId);
      formData.append("userId", currentDuck.userId);
      if (currentDuck.photo instanceof File) {
        formData.append("photo", currentDuck.photo);
      }

      if (isDuckEditing) {
        await axios.put(`${apiBaseUrl}/ducks/${currentDuck._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        formData.append("found", false);
        await axios.post(`${apiBaseUrl}/ducks`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      const updatedDucks = await fetchDucks(
        setDucks,
        setFilteredDucks,
        setLoading
      );

      if (activeTab === 0) {
        setFilteredItems(updatedDucks);
      }

      setShowDuckModal(false);
    } catch (error) {
      console.error("Error saving duck:", error);
    } finally {
      setDuckSubmitting(false);
    }
  };

  const handleHouseSubmit = async (e) => {
    e.preventDefault();
    setHouseSubmitting(true);
    try {
      if (isHouseEditing) {
        await axios.put(
          `${apiBaseUrl}/houses/${currentHouse._id}`,
          currentHouse
        );
      } else {
        await axios.post(`${apiBaseUrl}/houses`, currentHouse);
      }
      const updatedHouses = await fetchHouses(setHouses, setLoading);

      if (activeTab === 2) {
        setFilteredItems(updatedHouses);
      }

      setShowHouseModal(false);
    } catch (error) {
      console.error("Error saving house:", error);
    } finally {
      setHouseSubmitting(false);
    }
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setUserSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("username", currentUser.username);
      formData.append("houseId", currentUser.houseId);
      if (currentUser.profilePicture instanceof File) {
        formData.append("profilePicture", currentUser.profilePicture);
      }

      if (isUserEditing) {
        await axios.put(`${apiBaseUrl}/users/${currentUser._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(`${apiBaseUrl}/users`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      const updatedUsers = await fetchUsers(setUsers, setLoading);

      if (activeTab === 1) {
        setFilteredItems(updatedUsers);
      }

      setShowUserModal(false);
    } catch (error) {
      console.error("Error saving user:", error);
    } finally {
      setUserSubmitting(false);
    }
  };

  const handleDuckDelete = async () => {
    try {
      await axios.delete(`${apiBaseUrl}/ducks/${currentDuck._id}`);
      const updatedDucks = await fetchDucks(
        setDucks,
        setFilteredDucks,
        setLoading
      );

      if (activeTab === 0) {
        setFilteredItems(updatedDucks);
      }
      setShowDuckModal(false);
    } catch (error) {
      console.error("Error deleting duck:", error);
    }
  };

  const handleHouseDelete = async () => {
    try {
      await axios.delete(`${apiBaseUrl}/houses/${currentHouse._id}`);
      const updatedHouses = await fetchHouses(setHouses, setLoading);

      if (activeTab === 2) {
        setFilteredItems(updatedHouses);
      }
      setShowHouseModal(false);
    } catch (error) {
      console.error("Error deleting house:", error);
    }
  };

  const handleUserDelete = async () => {
    try {
      await axios.delete(`${apiBaseUrl}/users/${currentUser._id}`);
      const updatedUsers = await fetchUsers(setUsers, setLoading);

      if (activeTab === 1) {
        setFilteredItems(updatedUsers);
      }
      setShowUserModal(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const openDuckEditModal = (duck) => {
    setCurrentDuck({
      _id: duck._id,
      userId: duck.user ? duck.user._id : "",
      houseId: duck.house ? duck.house._id : "",
      id: duck.id,
      type: duck.type,
      photo: duck.photo,
      found: duck.found,
    });
    setIsDuckEditing(true);
    setShowDuckModal(true);
  };

  const handleOpenModal = (type) => {
    if (activeTab === 0) {
      openDuckAddModal();
    } else if (activeTab === 1) {
      openUserAddModal();
    } else {
      openHouseAddModal();
    }
  };

  const openDuckAddModal = () => {
    setCurrentDuck({
      userId: selectedHouse || "",
      houseId: selectedUser || "",
      id: "",
      type: "normal",
      found: false,
    });
    setIsDuckEditing(false);
    setShowDuckModal(true);
  };

  const openHouseEditModal = (house) => {
    setCurrentHouse(house);
    setIsHouseEditing(true);
    setShowHouseModal(true);
  };

  const openHouseAddModal = () => {
    setCurrentHouse({ name: "", address: "" });
    setIsHouseEditing(false);
    setShowHouseModal(true);
  };

  const openUserAddModal = () => {
    setCurrentUser({
      username: "",
      houseId: "",
      profilePicture: "",
    });
    setIsUserEditing(false);
    setShowUserModal(true);
  };

  const openUserEditModal = (user) => {
    setCurrentUser({
      _id: user._id,
      username: user.username,
      houseId: user.house ? user.house._id : "",
      profilePicture: user.profilePicture,
    });
    setIsUserEditing(true);
    setShowUserModal(true);
  };

  const handleUserFilter = (event, newUserId) => {
    setSelectedUser(newUserId);

    if (newUserId) {
      setFilteredDucks(
        ducks
          .filter((duck) => duck.user._id === newUserId)
          .sort((a, b) => a.id - b.id)
      );
    } else {
      setFilteredDucks(ducks.sort((a, b) => a.id - b.id));
    }
  };

  return (
    <>
      <AppBar className="Appbar" position="sticky" color="default">
        <Toolbar>
        <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={() => navigate(-1)}
          >
            <ArrowBack />
          </IconButton>
          <Typography
            component="div"
            sx={{ flexGrow: 1, alignItems: "center", textAlign: "center" }}
          >
            <h2 style={{ margin: 0 }}>Admin</h2>
          </Typography>
        </Toolbar>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="Admin Tabs"
          centered
          indicatorColor="primary"
          sx={{
            "& .MuiTab-root": {
              color: "var(--text-color)", // Text color of the tab
              fontFamily: "var(--font-family)", // Custom font
              "&.Mui-selected": {
                color: "var(--primary-color)", // Color of the selected tab
                fontWeight: "bold", // Bold text for the selected tab
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "var(--primary-color)", // Indicator color
              height: "4px",
            },
          }}
        >
          <Tab label="Patos" />
          <Tab label="Participantes" />
          <Tab label="Casas" />
        </Tabs>
      </AppBar>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleOpenModal}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          backgroundColor: "var(--accent-color)", // Use the accent color for the FAB
          "&:hover": {
            backgroundColor: "var(--primary-color-hover)", // Hover color for the FAB
          },
          color: "white", // Text color inside the FAB
        }}
      >
        <FaPlus />
      </Fab>

      <Container>
        <DuckModal
          open={showDuckModal}
          handleClose={() => setShowDuckModal(false)}
          isEditing={isDuckEditing}
          currentDuck={currentDuck}
          houses={houses}
          users={users}
          handleInputChange={handleDuckInputChange}
          handlePhotoChange={handleDuckPhotoChange}
          handleSubmit={handleDuckSubmit}
          handleDelete={handleDuckDelete}
          submitting={duckSubmitting}
          apiBaseUrl={apiBaseUrl}
        />
        <HouseModal
          open={showHouseModal} // State to control the modal visibility
          handleClose={() => setShowHouseModal(false)} // Function to close the modal
          isEditing={isHouseEditing} // State to track if we are editing or adding
          currentHouse={currentHouse} // State holding the current house data
          handleInputChange={handleHouseInputChange} // Function to handle form input changes
          handleSubmit={handleHouseSubmit} // Function to handle form submission
          handleDelete={handleHouseDelete} // Function to handle house deletion
          submitting={houseSubmitting} // State to track form submission
        />
        <UserModal
          open={showUserModal}
          onClose={() => setShowUserModal(false)}
          isEditing={isUserEditing}
          currentUser={currentUser}
          houses={houses}
          onInputChange={handleUserInputChange}
          handlePhotoChange={handleUserPhotoChange}
          onSubmit={handleUserSubmit}
          onDelete={handleUserDelete}
          submitting={userSubmitting}
          apiBaseUrl={apiBaseUrl}
        />

        <ItemList
          loading={loading}
          items={filteredItems}
          type={activeTab === 0 ? "duck" : activeTab === 1 ? "user" : "house"}
          onEdit={
            activeTab === 0
              ? openDuckEditModal
              : activeTab === 1
              ? openUserEditModal
              : openHouseEditModal
          }
          apiBaseUrl={apiBaseUrl}
        />
      </Container>
    </>
  );
};

export default AdminPanel;
