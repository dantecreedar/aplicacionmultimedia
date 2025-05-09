import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Paper,
  Grid,
  Avatar,
} from "@mui/material";
import {
  PlayArrow,
  Add,
  ThumbUp,
  Share,
  Close,
  Favorite,
} from "@mui/icons-material";
import VideoPlayer from "./VideoPlayer";

interface VideoDetailProps {
  video: {
    id: string;
    url: string;
    username: string;
    description: string;
    likes: number;
    comments: number;
    title?: string;
    views?: number;
    duration?: string;
  };
  onClose: () => void;
}

const VideoDetail: React.FC<VideoDetailProps> = ({ video, onClose }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        zIndex: 2000,
        overflowY: "auto",
      }}
    >
      {/* Botón de cerrar */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "fixed",
          right: 20,
          top: 20,
          color: "white",
          zIndex: 2001,
        }}
      >
        <Close />
      </IconButton>

      {/* Video principal */}
      <Box
        sx={{
          position: "relative",
          height: "70vh",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <VideoPlayer
          videoUrl={video.url}
          username={video.username}
          description={video.description}
          likes={video.likes}
          comments={video.comments}
          fullScreen
        />
      </Box>

      {/* Información del video */}
      <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {video.title || "Título del Video"}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography variant="body1" sx={{ mr: 2 }}>
                {video.views || "1.2M"} vistas
              </Typography>
              <Typography variant="body1" sx={{ mr: 2 }}>
                {video.duration || "5:30"} min
              </Typography>
              <Typography variant="body1">{video.likes} likes</Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
              <Button
                variant="contained"
                startIcon={<PlayArrow />}
                sx={{
                  backgroundColor: "#e50914",
                  "&:hover": { backgroundColor: "#f40612" },
                }}
              >
                Reproducir
              </Button>
              <IconButton sx={{ color: "white" }}>
                <Add />
              </IconButton>
              <IconButton sx={{ color: "white" }}>
                <ThumbUp />
              </IconButton>
              <IconButton sx={{ color: "white" }}>
                <Share />
              </IconButton>
            </Box>

            <Typography variant="body1" paragraph>
              {video.description}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 2,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "white",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Información del Creador
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar
                  src="/path-to-creator-avatar.jpg"
                  sx={{ width: 40, height: 40, mr: 2 }}
                />
                <Box>
                  <Typography variant="subtitle1">{video.username}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {video.followers || "1.5K"} seguidores
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Favorite />}
                sx={{ color: "white", borderColor: "white" }}
              >
                Seguir
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* Videos relacionados */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Videos Relacionados
          </Typography>
          <Grid container spacing={2}>
            {/* Aquí irían los videos relacionados */}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoDetail;
