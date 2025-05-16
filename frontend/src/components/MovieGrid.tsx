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
} from '@mui/material';
import {
  Search,
  PlayArrow,
  Favorite,
  Share,
  Star,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Datos de ejemplo para las películas
const movies = [
  {
    id: "1",
    title: "Avengers: Endgame",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=60",
    year: "2019",
    rating: 4.8,
    genre: "Acción",
    duration: "3h 1min",
    description: "Los Vengadores se reúnen una vez más para revertir las acciones de Thanos y restaurar el equilibrio del universo.",
    videoUrl: "/videos/avengers-endgame.mp4",
    trailerUrl: "/videos/avengers-endgame-trailer.mp4"
  },
  {
    id: "2",
    title: "Inception",
    poster: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&auto=format&fit=crop&q=60",
    year: "2010",
    rating: 4.7,
    genre: "Ciencia Ficción",
    duration: "2h 28min",
    description: "Un ladrón que roba información de los sueños de las personas recibe la tarea de implantar una idea en la mente de un CEO.",
    videoUrl: "/videos/inception.mp4",
    trailerUrl: "/videos/inception-trailer.mp4"
  },
  {
    id: "3",
    title: "The Dark Knight",
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&auto=format&fit=crop&q=60",
    year: "2008",
    rating: 4.9,
    genre: "Acción",
    duration: "2h 32min",
    description: "Batman se enfrenta a su mayor desafío psicológico y físico cuando el misterioso Joker desata el caos en Gotham.",
    videoUrl: "/videos/dark-knight.mp4",
    trailerUrl: "/videos/dark-knight-trailer.mp4"
  },
  {
    id: "4",
    title: "Interstellar",
    poster: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&auto=format&fit=crop&q=60",
    year: "2014",
    rating: 4.6,
    genre: "Ciencia Ficción",
    duration: "2h 49min",
    description: "Un equipo de exploradores viaja a través de un agujero de gusano en el espacio en un intento de asegurar la supervivencia de la humanidad.",
    videoUrl: "/videos/interstellar.mp4",
    trailerUrl: "/videos/interstellar-trailer.mp4"
  },
];

const MovieGrid: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMovieClick = (movieId: string) => {
    navigate(`/movie/${movieId}`);
  };

  const handlePlayClick = (e: React.MouseEvent, movieId: string) => {
    e.stopPropagation();
    navigate(`/movie/${movieId}`);
  };

  const handleTrailerClick = (e: React.MouseEvent, movieId: string) => {
    e.stopPropagation();
    navigate(`/movie/${movieId}?view=trailer`);
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
            placeholder="Buscar películas..."
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

        {/* Grid de películas */}
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
            {filteredMovies.map((movie) => (
              <Card
                key={movie.id}
                onClick={() => handleMovieClick(movie.id)}
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
                    image={movie.poster}
                    alt={movie.title}
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
                    <Star sx={{ color: '#FFD700' }} />
                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                      {movie.rating}
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
                    {movie.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
                    <Chip
                      label={movie.year}
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
                      label={movie.genre}
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
                    <PlayArrow fontSize="small" /> {movie.duration}
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
                    {movie.description}
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
                      onClick={(e) => handlePlayClick(e, movie.id)}
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
                      onClick={(e) => handleTrailerClick(e, movie.id)}
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
    </Box>
  );
};

export default MovieGrid; 