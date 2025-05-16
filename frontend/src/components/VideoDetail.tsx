import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Paper,
  Grid,
  Avatar,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Modal,
  Fade,
} from "@mui/material";
import {
  PlayArrow,
  Add,
  ThumbUp,
  Share,
  Close,
  Favorite,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import VideoPlayer from "./VideoPlayer";
import { useNavigate } from "react-router-dom";

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

// Datos de ejemplo para los videos relacionados
const relatedVideos = [
  {
    id: "1",
    title: "Big Buck Bunny",
    thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=60",
    duration: "3:45",
    views: "1.2M",
    username: "usuario1",
    url: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    description: "Big Buck Bunny cuenta la historia de un gigante conejo que se enfrenta a tres matones: un zorro, un mapache y un pájaro.",
    likes: 1200,
    comments: 45
  },
  {
    id: "2",
    title: "Elephants Dream",
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&auto=format&fit=crop&q=60",
    duration: "4:20",
    views: "856K",
    username: "usuario2",
    url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    description: "Elephants Dream es el primer cortometraje de código abierto, creado por el Proyecto Orange.",
    likes: 856,
    comments: 32
  },
  {
    id: "3",
    title: "For Bigger Blazes",
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&auto=format&fit=crop&q=60",
    duration: "5:15",
    views: "2.1M",
    username: "usuario3",
    url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    description: "Un video de demostración de alta calidad para probar la reproducción de video.",
    likes: 2100,
    comments: 78
  },
  {
    id: "4",
    title: "For Bigger Escapes",
    thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&auto=format&fit=crop&q=60",
    duration: "2:50",
    views: "450K",
    username: "usuario4",
    url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    description: "Otro video de demostración para probar la reproducción de video en diferentes dispositivos.",
    likes: 450,
    comments: 23
  },
];

const VideoDetail: React.FC<VideoDetailProps> = ({ video, onClose }) => {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isCinemaMode, setIsCinemaMode] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [showSynopsis, setShowSynopsis] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsCinemaMode(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handlePlayCinemaMode = () => {
    if (videoContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoContainerRef.current.requestFullscreen().catch((err) => {
          console.error(`Error al intentar modo cine: ${err.message}`);
        });
      }
    }
  };

  const handleVideoClick = (videoId: string) => {
    const video = relatedVideos.find(v => v.id === videoId);
    if (video) {
      setSelectedVideo(video);
      setShowSynopsis(true);
    }
  };

  const handlePlayVideo = () => {
    if (selectedVideo) {
      // Actualizar el video actual con los datos del video seleccionado
      Object.assign(video, {
        id: selectedVideo.id,
        url: selectedVideo.url,
        username: selectedVideo.username,
        title: selectedVideo.title,
        views: parseInt(selectedVideo.views.replace(/[^0-9]/g, '')),
        duration: selectedVideo.duration,
        description: selectedVideo.description,
        likes: selectedVideo.likes,
        comments: selectedVideo.comments
      });
      
      // Cerrar el modal
      setShowSynopsis(false);
      
      // Forzar la actualización del componente
      setIsCinemaMode(false);
      
      // Pequeño delay para asegurar que el video se actualice antes de entrar en modo cine
      setTimeout(() => {
        if (videoContainerRef.current) {
          videoContainerRef.current.requestFullscreen().catch((err) => {
            console.error(`Error al intentar modo cine: ${err.message}`);
          });
        }
      }, 100);
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 300; // Ajusta este valor según necesites
      const newScrollLeft = carouselRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      handleScroll(); // Verificar estado inicial
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: isCinemaMode ? "black" : "rgba(0, 0, 0, 0.9)",
        zIndex: 2000,
        overflowY: "auto",
        transition: "background-color 0.3s ease-in-out",
      }}
    >
      {/* Modal de Sinopsis */}
      <Modal
        open={showSynopsis}
        onClose={() => setShowSynopsis(false)}
        closeAfterTransition
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 3000,
        }}
      >
        <Fade in={showSynopsis}>
          <Paper
            sx={{
              p: 4,
              maxWidth: 600,
              width: "90%",
              bgcolor: "rgba(0, 0, 0, 0.95)",
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: 2,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
              position: "relative",
              zIndex: 3001,
            }}
          >
            {selectedVideo && (
              <>
                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 200, height: 120, borderRadius: 1 }}
                    image={selectedVideo.thumbnail}
                    alt={selectedVideo.title}
                  />
                  <Box>
                    <Typography variant="h5" gutterBottom>
                      {selectedVideo.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", mb: 1 }}>
                      {selectedVideo.username} • {selectedVideo.views} vistas • {selectedVideo.duration}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1" paragraph>
                  {selectedVideo.description}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
                  <Button
                    variant="outlined"
                    onClick={() => setShowSynopsis(false)}
                    sx={{ color: "white", borderColor: "white" }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handlePlayVideo}
                    startIcon={<PlayArrow />}
                    sx={{
                      bgcolor: "#4CAF50",
                      "&:hover": { bgcolor: "#2E7D32" },
                    }}
                  >
                    Reproducir
                  </Button>
                </Box>
              </>
            )}
          </Paper>
        </Fade>
      </Modal>

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
        ref={videoContainerRef}
        sx={{
          position: "relative",
          height: isCinemaMode ? "100vh" : "70vh",
          width: "100%",
          overflow: "hidden",
          transition: "height 0.3s ease-in-out",
        }}
      >
        <VideoPlayer
          videoUrl={video.url}
          username={video.username}
          description={video.description}
          likes={video.likes}
          comments={video.comments}
          fullScreen={isCinemaMode}
        />
      </Box>

      {/* Información del video */}
      <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "white",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography variant="h4" gutterBottom>
                {video.title || "Título del Video"}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2, justifyContent: "center" }}>
                <Typography variant="body1" sx={{ mr: 2 }}>
                  {video.views || "1.2M"} vistas
                </Typography>
                <Typography variant="body1" sx={{ mr: 2 }}>
                  {video.duration || "5:30"} min
                </Typography>
                <Typography variant="body1">{video.likes} likes</Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 2, mb: 4, justifyContent: "center" }}>
                <Button
                  variant="contained"
                  startIcon={<PlayArrow />}
                  onClick={handlePlayCinemaMode}
                  sx={{
                    backgroundColor: "#4CAF50",
                    "&:hover": { backgroundColor: "#2E7D32" },
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
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "white",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Información del Creador
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2, justifyContent: "center" }}>
                <Avatar
                  src="/path-to-creator-avatar.jpg"
                  sx={{ width: 40, height: 40, mr: 2 }}
                />
                <Box>
                  <Typography variant="subtitle1">{video.username}</Typography>
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
        <Box sx={{ p: 4, maxWidth: 1200, mx: "auto", position: "relative" }}>
          <Typography variant="h5" gutterBottom sx={{ color: "white", mb: 3 }}>
            Videos Relacionados
          </Typography>
          <Box sx={{ position: "relative" }}>
            {showLeftArrow && (
              <IconButton
                onClick={() => scrollCarousel('left')}
                sx={{
                  position: "absolute",
                  left: -20,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  "&:hover": {
                    bgcolor: "rgba(0, 0, 0, 0.7)",
                  },
                  zIndex: 1,
                }}
              >
                <ChevronLeft />
              </IconButton>
            )}
            <Box
              ref={carouselRef}
              sx={{
                display: "flex",
                gap: 2,
                overflowX: "hidden",
                pb: 2,
                scrollBehavior: "smooth",
              }}
            >
              {relatedVideos.map((relatedVideo) => (
                <Card
                  key={relatedVideo.id}
                  sx={{
                    minWidth: 280,
                    maxWidth: 280,
                    flexShrink: 0,
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    color: "white",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <CardActionArea onClick={() => handleVideoClick(relatedVideo.id)}>
                    <CardMedia
                      component="img"
                      height="160"
                      image={relatedVideo.thumbnail}
                      alt={relatedVideo.title}
                      sx={{
                        position: "relative",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)",
                        },
                      }}
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom noWrap>
                        {relatedVideo.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ color: "rgba(255,255,255,0.7)" }}>
                        {relatedVideo.username}
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ color: "rgba(255,255,255,0.7)" }}>
                          {relatedVideo.views} vistas
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ color: "rgba(255,255,255,0.7)" }}>
                          {relatedVideo.duration}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Box>
            {showRightArrow && (
              <IconButton
                onClick={() => scrollCarousel('right')}
                sx={{
                  position: "absolute",
                  right: -20,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  "&:hover": {
                    bgcolor: "rgba(0, 0, 0, 0.7)",
                  },
                  zIndex: 1,
                }}
              >
                <ChevronRight />
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoDetail;
