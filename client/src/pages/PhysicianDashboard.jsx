import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import Sidebar from "../components/Sidebar";

const mockQueue = [
  { id: "P-2024-002", type: "CT Scan", confidence: "88%", status: "In Review" },
  {
    id: "P-2024-006",
    type: "Lab Results",
    confidence: "85%",
    status: "Awaiting Review",
  },
];

export default function PhysicianDashboard() {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar role="physician" />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Physician Review Queue
        </Typography>

        {mockQueue.map((item) => (
          <Card key={item.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">
                {item.id} — {item.type}
              </Typography>
              <Typography color="text.secondary">
                Confidence: {item.confidence} | Status: {item.status}
              </Typography>
              <Button variant="contained" sx={{ mt: 1 }}>
                Review
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
