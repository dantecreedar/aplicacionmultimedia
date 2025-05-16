import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  Paper,
  InputAdornment,
  IconButton,
  Avatar,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import VideoPlayer from "./VideoPlayer";
import UserProfile from "./UserProfile";
import VideoDetail from "./VideoDetail";

interface Video {
  id: string;
  url: string;
  username: string;
  description: string;
  likes: number;
  comments: number;
  title?: string;
  views?: number;
  duration?: string;
}

const VideoList: React.FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolling, setIsScrolling] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Lista de videos de prueba
  const videos: Video[] = [
    {
      id: "1",
      url: "/videos/4612176-uhd_4096_2160_25fps.mp4",
      username: "Warner Bros",
      description: "Video en calidad 4K",
      likes: 1234,
      comments: 56,
      title: "Video 4K Impresionante",
      views: 1200000,
      duration: "5:30",
    },
    {
      id: "2",
      url: "/videos/4434159-hd_1080_1920_30fps.mp4",
      username: "Disney",
      description: "Video en calidad HD",
      likes: 2345,
      comments: 78,
      title: "Video HD de Alta Calidad",
      views: 850000,
      duration: "3:45",
    },
    {
      id: "3",
      url: "/videos/4434150-hd_1080_1920_30fps.mp4",
      username: "Marvel",
      description: "Video en calidad HD",
      likes: 3456,
      comments: 90,
      title: "Video HD Especial",
      views: 950000,
      duration: "4:20",
    },
  ];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredVideos = videos.filter(
    (video) =>
      video.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastY = 0;
    let isDragging = false;
    let lastIndex = currentVideoIndex;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      lastY = e.clientY;
      lastIndex = currentVideoIndex;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaY = e.clientY - lastY;
      const videoHeight = window.innerHeight;
      const newIndex = Math.round(deltaY / videoHeight);

      if (newIndex !== 0) {
        const targetIndex = lastIndex - newIndex;
        if (targetIndex >= 0 && targetIndex < videos.length) {
          setCurrentVideoIndex(targetIndex);
        }
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
      setIsScrolling(false);
    };

    container.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [currentVideoIndex, videos.length]);

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        cursor: isScrolling ? "grabbing" : "grab",
        userSelect: "none",
      }}
    >
      {/* Buscador flotante con icono de usuario */}
      <Paper
        sx={{
          position: "fixed",
          top: 16,
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          maxWidth: 500,
          zIndex: 1000,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(10px)",
          display: "flex",
          alignItems: "center",
          gap: 1,
          p: 1,
        }}
      >
        <TextField
          fullWidth
          placeholder="Buscar videos..."
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "white" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255, 255, 255, 0.3)",
            },
          }}
        />
        <IconButton
          onClick={() => setIsProfileOpen(true)}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
          }}
        >
          <Avatar
            src="/path-to-user-avatar.jpg"
            sx={{
              width: 32,
              height: 32,
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          />
        </IconButton>
      </Paper>

      {filteredVideos.map((video, index) => (
        <Box
          key={video.id}
          sx={{
            height: "100vh",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            transform: `translateY(${(index - currentVideoIndex) * 100}vh)`,
            transition: isScrolling ? "none" : "transform 0.3s ease-out",
          }}
        >
          <VideoPlayer
            videoUrl={video.url}
            username={video.username}
            description={video.description}
            likes={video.likes}
            comments={video.comments}
            onViewFull={() => handleVideoSelect(video)}
          />
        </Box>
      ))}

      {/* Perfil de usuario */}
      <UserProfile
        open={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* Vista detallada del video */}
      {selectedVideo && (
        <VideoDetail
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </Box>
  );
};

export default VideoList;
