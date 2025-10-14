import { Box, Typography, Card, CardContent } from "@mui/material";
import Sidebar from "../components/Sidebar";

const mockResults = [
  {
    id: "P-2024-003",
    type: "MRI",
    summary: "AI detected possible soft tissue anomaly. Follow-up recommended.",
    recommendation: "Schedule additional MRI in 2 weeks.",
  },
  {
    id: "P-2024-004",
    type: "Biopsy",
    summary: "No abnormal cells detected. Routine checkup advised.",
    recommendation: "Follow-up in 6 months.",
  },
];

export default function PatientPortal() {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar role="patient" />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          My AI Analysis Results
        </Typography>

        {mockResults.map((r) => (
          <Card key={r.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{r.type}</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {r.summary}
              </Typography>
              <Typography variant="subtitle2" color="primary" sx={{ mt: 1 }}>
                Recommendation: {r.recommendation}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
