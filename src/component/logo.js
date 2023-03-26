import { Box, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';

export default function Logo() {
  return (
    <Box sx={{
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      backgroundColor: "white.main",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }} 
    >
      <Typography variant={"heading_h2"} sx={{ color: "black.main" }}>
        IRyS
      </Typography>
    </Box>
  )
}