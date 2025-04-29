import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import VideoList from "./components/VideoList";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF0050",
    },
    secondary: {
      main: "#00F2EA",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/feed" element={<VideoList />} />
          <Route path="/" element={<Navigate to="/feed" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
