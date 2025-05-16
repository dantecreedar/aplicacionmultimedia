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
  TextField,
  InputAdornment,
  Slide,
  Menu,
  MenuItem,
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
  Search,
  KeyboardArrowUp,
  Facebook,
  Twitter,
  WhatsApp,
  Link,
  Info,
  Home,
} from "@mui/icons-material";
import VideoPlayer from "./VideoPlayer";
import { useNavigate, useLocation } from "react-router-dom";

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
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [shareAnchorEl, setShareAnchorEl] = useState<null | HTMLElement>(null);

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

  const handleShareClick = (event: React.MouseEvent<HTMLElement>) => {
    setShareAnchorEl(event.currentTarget);
  };

  const handleShareClose = () => {
    setShareAnchorEl(null);
  };

  const handleShare = (platform: string) => {
    const shareUrl = window.location.href;
    const shareText = `${video.title || 'Video'} - ${video.username}`;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl).then(() => {
          // Aquí podrías mostrar una notificación de éxito
          console.log('URL copiada al portapapeles');
        });
        break;
    }
    
    handleShareClose();
  };

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
      {/* Botón de búsqueda flotante */}
      <IconButton
        onClick={() => setShowSearch(!showSearch)}
        sx={{
          position: "fixed",
          right: 20,
          top: 80,
          bgcolor: "rgba(0, 0, 0, 0.7)",
          color: "white",
          zIndex: 2002,
          transition: "transform 0.3s ease",
          "&:hover": {
            bgcolor: "rgba(0, 0, 0, 0.8)",
            transform: "scale(1.1)",
          },
        }}
      >
        {showSearch ? <KeyboardArrowUp /> : <Search />}
      </IconButton>

      {/* Panel de búsqueda */}
      {showSearch && (
        <Slide direction="down" in={showSearch} mountOnEnter unmountOnExit>
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bgcolor: "rgba(0, 0, 0, 0.95)",
              p: 2,
              zIndex: 2001,
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Buscar videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Slide>
      )}

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
          onViewFull={() => {}}
        />
      </Box>

      {/* Información del video */}
      <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center" }}>
          <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(50% - 16px)" } }}>
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
                <IconButton 
                  onClick={handleShareClick}
                  sx={{ 
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  <Share />
                </IconButton>
              </Box>

              <Menu
                anchorEl={shareAnchorEl}
                open={Boolean(shareAnchorEl)}
                onClose={handleShareClose}
                PaperProps={{
                  sx: {
                    backgroundColor: "rgba(0, 0, 0, 0.9)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    zIndex: 3000,
                  },
                }}
                sx={{
                  zIndex: 3000,
                }}
              >
                <MenuItem onClick={() => handleShare('facebook')} sx={{ color: "white" }}>
                  <Facebook sx={{ mr: 1 }} /> Facebook
                </MenuItem>
                <MenuItem onClick={() => handleShare('twitter')} sx={{ color: "white" }}>
                  <Twitter sx={{ mr: 1 }} /> Twitter
                </MenuItem>
                <MenuItem onClick={() => handleShare('whatsapp')} sx={{ color: "white" }}>
                  <WhatsApp sx={{ mr: 1 }} /> WhatsApp
                </MenuItem>
                <MenuItem onClick={() => handleShare('copy')} sx={{ color: "white" }}>
                  <Link sx={{ mr: 1 }} /> Copiar enlace
                </MenuItem>
              </Menu>

              <Typography variant="body1" paragraph>
                {video.description}
              </Typography>
            </Paper>
          </Box>

          <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(50% - 16px)" } }}>
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
              <Box sx={{ mt: 2, p: 2, bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 1 }}>
                <Typography variant="h6" color="white" gutterBottom>
                  Acerca de {video.username}
                </Typography>
                <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" paragraph>
                  Productora líder en contenido multimedia de alta calidad. Especializada en la creación de videos 4K y HD con narrativas impactantes y efectos visuales innovadores.
                </Typography>
                <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                  • Contenido premium en 4K y HD
                </Typography>
                <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                  • Producciones originales
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Box>

        {/* Videos relacionados */}
        <Box sx={{ p: 4, maxWidth: 1200, mx: "auto", position: "relative" }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ color: "white" }}>
              Videos Relacionados
            </Typography>
            <Button
              variant="contained"
              onClick={() => location.pathname === '/movies' ? navigate('/') : navigate('/movies')}
              startIcon={location.pathname === '/movies' ? <Home /> : <Info />}
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                },
                transition: 'all 0.3s ease',
                px: 3,
                py: 1,
              }}
            >
              {location.pathname === '/movies' ? 'Regresar al Inicio' : 'Ver Lista de Películas'}
            </Button>
          </Box>
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
                  zIndex: 2,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
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
                position: "relative",
                zIndex: 1,
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
                  zIndex: 2,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
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
