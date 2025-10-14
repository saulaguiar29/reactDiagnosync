import { Box, Grid, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import UploadWidget from "../components/UploadWidget";

export default function LabTechDashboard() {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar role="labtech" />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Lab Tech Dashboard
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Total Analyses" value="2,847" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Physician Review Queue" value="7" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="AI Confidence Avg" value="89.2%" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Patients Notified" value="12" />
          </Grid>
        </Grid>

        <UploadWidget />
      </Box>
    </Box>
  );
}
