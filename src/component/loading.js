import { Box, CircularProgress} from "@mui/material";

export default function Loading() {
  return (
    <Box 
    sx={{
        backgroundColor: "backdrop.main",
        position: "fixed",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
      }}>
      <CircularProgress
        size={60}
        thickness={4}
      />
    </Box>
  )
}