import { Box, CircularProgress} from "@mui/material";

export default function Loading(props) {
  return (
    <Box 
    sx={{
        backgroundColor: props.transparent? "transparent": "backdrop.main",
        position: "fixed",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: props.centered? "center" : "flex-start",
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