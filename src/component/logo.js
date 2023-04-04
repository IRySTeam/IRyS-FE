import { Box, Typography } from "@mui/material";
import Image from 'next/image'

export default function Logo(props) {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }} 
    >
      <Image src="/irys.png" alt="logo" width={props.width} height={props.height} />
      {props.withText
      &&
        <Typography variant={props.variant} sx={{ color: "black.main" }}>
          IRyS
        </Typography>
      }
    </Box>
  )
}