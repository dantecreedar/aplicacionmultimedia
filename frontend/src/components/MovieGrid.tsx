import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Container,
  Paper,
  Chip,
  Fade,
} from '@mui/material';
import {
  Search,
  PlayArrow,
  Favorite,
  Share,
  Star,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import VideoDetail from './VideoDetail';

// Importar relatedVideos del VideoDetail
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
  }
];

const MovieGrid: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const navigate = useNavigate();

  const filteredVideos = relatedVideos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleVideoClick = (videoId: string) => {
    const video = relatedVideos.find(v => v.id === videoId);
    if (video) {
      setSelectedVideo(video);
    }
  };

  const handlePlayClick = (e: React.MouseEvent, videoId: string) => {
    e.stopPropagation();
    const video = relatedVideos.find(v => v.id === videoId);
    if (video) {
      setSelectedVideo(video);
    }
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        {/* Barra de búsqueda */}
        <Paper
          sx={{
            p: 2,
            mb: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                </InputAdornment>
              ),
            }}
          />
        </Paper>

        {/* Grid de videos */}
        <Box sx={{ 
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: '12px'
        }}>
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'flex-start',
            alignItems: 'stretch'
          }}>
            {filteredVideos.map((video) => (
              <Card
                key={video.id}
                onClick={() => handleVideoClick(video.id)}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  height: '100%',
                  width: {
                    xs: '100%',
                    sm: 'calc(50% - 8px)',
                    md: 'calc(33.333% - 16px)',
                    lg: 'calc(25% - 24px)',
                    xl: 'calc(20% - 32px)'
                  },
                  minWidth: {
                    xs: '100%',
                    sm: '280px',
                    md: '300px',
                    lg: '280px',
                    xl: '260px'
                  },
                  maxWidth: {
                    xs: '100%',
                    sm: '400px',
                    md: '380px',
                    lg: '360px',
                    xl: '340px'
                  },
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.7)',
                  },
                }}
              >
                <Box sx={{ 
                  position: 'relative', 
                  flexShrink: 0, 
                  width: {
                    xs: '120px',
                    sm: '130px',
                    md: '140px',
                    lg: '130px',
                    xl: '120px'
                  }
                }}>
                  <CardMedia
                    component="img"
                    height="100%"
                    image={video.thumbnail}
                    alt={video.title}
                    sx={{
                      position: 'relative',
                      objectFit: 'cover',
                      height: '100%',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to right, rgba(0,0,0,0) 50%, rgba(0,0,0,0.9) 100%)',
                      },
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 8,
                      right: 8,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      padding: '4px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    <PlayArrow sx={{ color: '#4CAF50' }} />
                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                      {video.duration}
                    </Typography>
                  </Box>
                </Box>
                <CardContent sx={{ 
                  flexGrow: 1, 
                  display: 'flex', 
                  flexDirection: 'column',
                  padding: '12px',
                  background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.95) 100%)',
                  '&:last-child': {
                    paddingBottom: '12px'
                  }
                }}>
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    noWrap 
                    sx={{ 
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                      fontWeight: 'bold',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                      marginBottom: '8px'
                    }}
                  >
                    {video.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
                    <Chip
                      label={video.username}
                      size="small"
                      sx={{ 
                        bgcolor: 'rgba(255, 255, 255, 0.15)',
                        color: 'white',
                        fontWeight: 'bold',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.25)',
                        }
                      }}
                    />
                    <Chip
                      label={video.views}
                      size="small"
                      sx={{ 
                        bgcolor: 'rgba(255, 255, 255, 0.15)',
                        color: 'white',
                        fontWeight: 'bold',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.25)',
                        }
                      }}
                    />
                  </Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.9)', 
                      mb: 1.5, 
                      fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
                      fontWeight: 'medium',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <PlayArrow fontSize="small" /> {video.duration}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.8)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      flexGrow: 1,
                      fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
                      lineHeight: '1.4',
                      fontStyle: 'italic'
                    }}
                  >
                    {video.description}
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    mt: 1.5,
                    pt: 1.5,
                    borderTop: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <IconButton 
                      size="small" 
                      sx={{ 
                        color: 'white',
                        padding: '6px',
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          transform: 'scale(1.1)'
                        }
                      }}
                      onClick={(e) => handlePlayClick(e, video.id)}
                    >
                      <PlayArrow fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      sx={{ 
                        color: 'white',
                        padding: '6px',
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          transform: 'scale(1.1)'
                        }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Aquí puedes agregar la lógica para marcar como favorito
                      }}
                    >
                      <Favorite fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      sx={{ 
                        color: 'white',
                        padding: '6px',
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          transform: 'scale(1.1)'
                        }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Aquí puedes agregar la lógica para compartir
                      }}
                    >
                      <Share fontSize="small" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>

      {/* Video Detail Modal with Fade Transition */}
      <Fade in={!!selectedVideo} timeout={500}>
        <Box sx={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1300,
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          transition: 'all 0.5s ease-in-out',
          opacity: selectedVideo ? 1 : 0,
          transform: selectedVideo ? 'translateY(0)' : 'translateY(20px)',
        }}>
          {selectedVideo && (
            <VideoDetail
              video={selectedVideo}
              onClose={handleCloseVideo}
            />
          )}
        </Box>
      </Fade>
    </Box>
  );
};

export default MovieGrid; 