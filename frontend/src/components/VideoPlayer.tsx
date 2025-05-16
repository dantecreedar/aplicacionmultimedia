import React, { useState, useRef, useEffect } from "react";
import { Box, IconButton, Typography, Button } from "@mui/material";
import {
  PlayArrow,
  VolumeUp,
  VolumeOff,
  Bookmark,
  BookmarkBorder,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

interface VideoPlayerProps {
  videoUrl: string;
  username: string;
  description: string;
  onViewFull: () => void;
  fullScreen?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  username,
  description,
  onViewFull,
  fullScreen = false,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      video.muted = false;
      video.volume = 1;
      video.play().catch((error) => {
        console.log("Error al reproducir automáticamente:", error);
      });
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.currentTime > 180) {
        video.currentTime = 0;
      }
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("timeupdate", handleTimeUpdate);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.log("Error al reproducir automáticamente:", error);
        video.muted = true;
        video.play().catch((error) => {
          console.log("Error al reproducir con sonido silenciado:", error);
        });
      });
    }

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [videoUrl]);

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ width: "100%", height: "100%" }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#000",
        }}
      >
        <motion.video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          loop
          muted={false}
          playsInline
          initial={{ scale: 1 }}
          animate={{ scale: fullScreen ? 1.1 : 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            backgroundColor: "#000",
          }}
        />

        <AnimatePresence>
          {!fullScreen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: 2,
                  background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                  zIndex: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<PlayArrow />}
                  onClick={onViewFull}
                  sx={{
                    mb: 2,
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.9)",
                    },
                  }}
                >
                  Ver Completo
                </Button>

                <Typography variant="h6" color="white" sx={{ mb: 1 }}>
                  @{username}
                </Typography>
                <Typography variant="body2" color="white" sx={{ mb: 2 }}>
                  {description}
                </Typography>
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  right: 16,
                  bottom: 100,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  zIndex: 1,
                }}
              >
                <IconButton
                  onClick={handleSave}
                  sx={{
                    color: "white",
                    padding: "8px",
                  }}
                >
                  {isSaved ? <Bookmark color="primary" /> : <BookmarkBorder />}
                </IconButton>

                <IconButton
                  onClick={toggleMute}
                  sx={{
                    color: "white",
                    padding: "8px",
                  }}
                >
                  {isMuted ? <VolumeOff /> : <VolumeUp />}
                </IconButton>
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  zIndex: 1,
                }}
              >
                <Box
                  sx={{
                    width: `${(currentTime / 180) * 100}%`,
                    height: "100%",
                    backgroundColor: "primary",
                  }}
                />
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </motion.div>
  );
};

export default VideoPlayer;
