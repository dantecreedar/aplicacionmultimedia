import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  Paper,
  InputAdornment,
  IconButton,
  Avatar,
  Button,
} from "@mui/material";
import { Search, KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import VideoPlayer from "./VideoPlayer";
import UserProfile from "./UserProfile";
import VideoDetail from "./VideoDetail";
import Login from "./Login";

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
  // Todos los Hooks deben estar al inicio del componente
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>("");
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolling, setIsScrolling] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleLogin = (username: string) => {
    setIsAuthenticated(true);
    setCurrentUser(username);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredVideos = videos.filter(
    (video) =>
      video.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleNavigateUp = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(prev => prev - 1);
    }
  };

  const handleNavigateDown = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(prev => prev + 1);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrolling) return;
      
      isScrolling = true;
      
      if (e.deltaY > 0) {
        // Scroll hacia abajo
        if (currentVideoIndex < videos.length - 1) {
          setCurrentVideoIndex(prev => prev + 1);
        }
      } else {
        // Scroll hacia arriba
        if (currentVideoIndex > 0) {
          setCurrentVideoIndex(prev => prev - 1);
        }
      }

      // Resetear el estado de scroll después de la transición
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 300); // Mismo tiempo que la transición CSS
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(scrollTimeout);
    };
  }, [currentVideoIndex, videos.length]);

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Box
      ref={containerRef}
      sx={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "black",
        zIndex: 1,
      }}
    >
      {/* Botones de navegación */}
      <Box
        sx={{
          position: "fixed",
          right: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          zIndex: 1000,
        }}
      >
        <IconButton
          onClick={handleNavigateUp}
          disabled={currentVideoIndex === 0}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
            "&.Mui-disabled": {
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              color: "rgba(255, 255, 255, 0.3)",
            },
            width: "50px",
            height: "50px",
          }}
        >
          <KeyboardArrowUp sx={{ fontSize: 30 }} />
        </IconButton>
        <IconButton
          onClick={handleNavigateDown}
          disabled={currentVideoIndex === videos.length - 1}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
            "&.Mui-disabled": {
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              color: "rgba(255, 255, 255, 0.3)",
            },
            width: "50px",
            height: "50px",
          }}
        >
          <KeyboardArrowDown sx={{ fontSize: 30 }} />
        </IconButton>
      </Box>

      {/* Buscador flotante con icono de usuario */}
      <Paper
        elevation={3}
        sx={{
          position: "fixed",
          top: 16,
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          maxWidth: 500,
          zIndex: 1000,
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          backdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          gap: 1,
          p: 1.5,
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            boxShadow: "0 6px 25px rgba(0, 0, 0, 0.4)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          },
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
                <Search sx={{ 
                  color: "rgba(255, 255, 255, 0.7)",
                  transition: "color 0.3s ease",
                  "&:hover": {
                    color: "white",
                  }
                }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiInputBase-input": {
              color: "white",
              fontSize: "1rem",
              padding: "12px 8px",
              "&::placeholder": {
                color: "rgba(255, 255, 255, 0.5)",
                opacity: 1,
              },
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              transition: "all 0.3s ease",
              "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.1)",
                transition: "border-color 0.3s ease",
              },
              "&:hover fieldset": {
                borderColor: "rgba(255, 255, 255, 0.3)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgba(255, 255, 255, 0.5)",
                borderWidth: "1px",
              },
            },
          }}
        />
        <IconButton
          onClick={() => setIsProfileOpen(true)}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "8px",
            padding: "8px",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              transform: "scale(1.05)",
            },
          }}
        >
          <Avatar
            src="/path-to-user-avatar.jpg"
            alt={currentUser}
            sx={{
              width: 32,
              height: 32,
              border: "2px solid rgba(255, 255, 255, 0.2)",
              transition: "all 0.3s ease",
              "&:hover": {
                border: "2px solid rgba(255, 255, 255, 0.4)",
              },
              bgcolor: "rgba(255, 255, 255, 0.1)",
              "& .MuiAvatar-img": {
                objectFit: "cover",
              },
            }}
          >
            {currentUser?.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      </Paper>

      {filteredVideos.map((video, index) => (
        <Box
          key={video.id}
          sx={{
            height: "100vh",
            width: "100vw",
            position: "absolute",
            top: 0,
            left: 0,
            transform: `translateY(${(index - currentVideoIndex) * 100}vh)`,
            transition: "transform 0.3s ease-out",
            willChange: "transform",
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
