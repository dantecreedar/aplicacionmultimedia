import React, { useState } from "react";
import {
  Box,
  Modal,
  IconButton,
  Avatar,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Paper,
} from "@mui/material";
import {
  Person,
  Favorite,
  People,
  Settings,
  Close,
  Star,
} from "@mui/icons-material";

interface UserProfileProps {
  onClose: () => void;
  open: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ onClose, open }) => {
  const [activeTab, setActiveTab] = useState("profile");

  const userData = {
    name: "Usuario Ejemplo",
    username: "@usuario123",
    followers: 1500,
    following: 500,
    favorites: 25,
  };

  return (
    <>
      {/* Modal del perfil */}
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="user-profile-modal"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            width: "90%",
            maxWidth: 400,
            maxHeight: "90vh",
            overflow: "auto",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            color: "white",
            p: 3,
            position: "relative",
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "white",
            }}
          >
            <Close />
          </IconButton>

          {/* Información del usuario */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Avatar
              src="/path-to-user-avatar.jpg"
              sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}
            />
            <Typography variant="h6">{userData.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {userData.username}
            </Typography>
          </Box>

          {/* Estadísticas */}
          <Box sx={{ display: "flex", justifyContent: "space-around", mb: 3 }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6">{userData.followers}</Typography>
              <Typography variant="body2">Seguidores</Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6">{userData.following}</Typography>
              <Typography variant="body2">Siguiendo</Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6">{userData.favorites}</Typography>
              <Typography variant="body2">Favoritos</Typography>
            </Box>
          </Box>

          <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.1)", mb: 2 }} />

          {/* Navegación */}
          <List>
            <ListItemButton
              onClick={() => setActiveTab("profile")}
              selected={activeTab === "profile"}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
                "&.Mui-selected": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              <ListItemIcon>
                <Person sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Mi Perfil" />
            </ListItemButton>
            <ListItemButton
              onClick={() => setActiveTab("favorites")}
              selected={activeTab === "favorites"}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
                "&.Mui-selected": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              <ListItemIcon>
                <Favorite sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Favoritos" />
            </ListItemButton>
            <ListItemButton
              onClick={() => setActiveTab("following")}
              selected={activeTab === "following"}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
                "&.Mui-selected": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              <ListItemIcon>
                <People sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Siguiendo" />
            </ListItemButton>
            <ListItemButton
              onClick={() => setActiveTab("settings")}
              selected={activeTab === "settings"}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
                "&.Mui-selected": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              <ListItemIcon>
                <Settings sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Configuración" />
            </ListItemButton>
          </List>

          {/* Botón de ver completo */}
          <Button
            variant="contained"
            fullWidth
            startIcon={<Star />}
            sx={{
              mt: 2,
              backgroundColor: "#e50914",
              "&:hover": {
                backgroundColor: "#f40612",
              },
            }}
          >
            Ver Completo
          </Button>
        </Paper>
      </Modal>
    </>
  );
};

export default UserProfile;
