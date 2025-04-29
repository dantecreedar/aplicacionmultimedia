import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Person,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
} from "@mui/icons-material";
import { motion } from "framer-motion";

interface RegisterFormProps {
  onRegister: (username: string, email: string, password: string) => void;
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onRegister,
  onSwitchToLogin,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(username, email, password);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 400,
          mx: "auto",
          mt: 4,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#e50914",
            mb: 3,
          }}
        >
          Crear Cuenta
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ color: "#e50914" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "rgba(0, 0, 0, 0.2)",
                },
                "&:hover fieldset": {
                  borderColor: "#e50914",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#e50914",
                },
              },
            }}
          />

          <TextField
            fullWidth
            label="Correo electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: "#e50914" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "rgba(0, 0, 0, 0.2)",
                },
                "&:hover fieldset": {
                  borderColor: "#e50914",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#e50914",
                },
              },
            }}
          />

          <TextField
            fullWidth
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "#e50914" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "rgba(0, 0, 0, 0.2)",
                },
                "&:hover fieldset": {
                  borderColor: "#e50914",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#e50914",
                },
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              backgroundColor: "#e50914",
              "&:hover": {
                backgroundColor: "#f40612",
              },
            }}
          >
            Registrarse
          </Button>

          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              o continuar con
            </Typography>
          </Divider>

          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Google />}
              sx={{
                borderColor: "rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  borderColor: "#e50914",
                  backgroundColor: "rgba(229, 9, 20, 0.04)",
                },
              }}
            >
              Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Facebook />}
              sx={{
                borderColor: "rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  borderColor: "#e50914",
                  backgroundColor: "rgba(229, 9, 20, 0.04)",
                },
              }}
            >
              Facebook
            </Button>
          </Box>

          <Typography
            variant="body2"
            align="center"
            sx={{ color: "text.secondary" }}
          >
            ¿Ya tienes una cuenta?{" "}
            <Button
              onClick={onSwitchToLogin}
              sx={{
                color: "#e50914",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "underline",
                },
              }}
            >
              Inicia Sesión
            </Button>
          </Typography>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default RegisterForm;
