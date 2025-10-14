import { useState, useContext } from "react";
import { Box, Button, TextField, Typography, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("labtech");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    login({ username, role });
    navigate(`/${role}`);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" sx={{ mb: 3 }}>
        Diagnosync Login
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ mb: 2, width: "300px" }}
      />
      <TextField
        select
        label="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        sx={{ mb: 3, width: "300px" }}
      >
        <MenuItem value="labtech">Lab Tech</MenuItem>
        <MenuItem value="physician">Physician</MenuItem>
        <MenuItem value="patient">Patient</MenuItem>
      </TextField>
      <Button variant="contained" onClick={handleLogin}>
        Log In
      </Button>
    </Box>
  );
}
