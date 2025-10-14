import { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export default function UploadWidget() {
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    alert(`Pretending to upload ${file?.name || "nothing"}...`);
  };

  return (
    <Box
      sx={{
        p: 3,
        border: "2px dashed #aaa",
        borderRadius: 2,
        textAlign: "center",
        mt: 2,
      }}
    >
      <Typography variant="subtitle1" gutterBottom>
        Upload Medical Documents
      </Typography>
      <input
        type="file"
        id="upload"
        style={{ display: "none" }}
        onChange={handleFile}
      />
      <label htmlFor="upload">
        <Button
          variant="outlined"
          component="span"
          startIcon={<UploadFileIcon />}
        >
          Choose File
        </Button>
      </label>
      {file && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          Selected: {file.name}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleUpload}
      >
        Upload & Analyze
      </Button>
    </Box>
  );
}
