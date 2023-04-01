import { Box, Typography } from "@mui/material";

export default function Logo(props) {
  return (
    <Box sx={{
      width: props.width,
      height: props.height,
      borderRadius: "50%",
      backgroundColor: "white.main",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      display: props.display? props.display : 'flex',
    }} 
    >
      <Typography variant={props.variant} sx={{ color: "black.main" }}>
        IRyS
      </Typography>
    </Box>
  )
}