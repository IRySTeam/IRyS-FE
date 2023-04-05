import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function LeftContainer() {
  const theme = useTheme();
  return (
    <Box 
      sx={{
        width: "50%",
        minHeight: "100%",
        padding: "40px",
        gap: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundImage: "linear-gradient(90deg, #2064AC 0%, #7EC7EE 100%)",
        [theme.breakpoints.down("small")]: {
          display: "none"
        },
      }} 
    >
      <Typography variant={"motto_heading"} sx={{ color: "white.main", maxWidth: "550px" }}>Intelligent Repository System</Typography>
      <Typography variant={"motto_subheading"} sx={{ color: "white.main",  maxWidth: "400px" }}>Innovative Solutions for Intelligent Document Management</Typography>
    </Box>
  )
}