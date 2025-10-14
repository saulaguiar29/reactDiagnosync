import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Dashboard, Science, Group, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ role }) {
  const navigate = useNavigate();

  const menuItems = {
    labtech: [
      { text: "Dashboard", icon: <Dashboard />, path: "/labtech" },
      { text: "Upload Docs", icon: <Science />, path: "/labtech" },
    ],
    physician: [{ text: "Review Queue", icon: <Group />, path: "/physician" }],
    patient: [{ text: "My Results", icon: <Dashboard />, path: "/patient" }],
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 220,
        "& .MuiDrawer-paper": {
          width: 220,
          backgroundColor: "#001E3C",
          color: "white",
        },
      }}
    >
      <List>
        <h2 style={{ padding: "16px" }}>Diagnosync</h2>
        {menuItems[role].map((item) => (
          <ListItemButton key={item.text} onClick={() => navigate(item.path)}>
            <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
        <ListItemButton onClick={() => navigate("/")}>
          <ListItemIcon sx={{ color: "white" }}>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
