import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';
import Image from 'next/image'

export default function Logo(props) {
  const router = useRouter();

  const handleClickLogo = () => {
    router.push({ pathname: '/', query: { search : '', type: '', sort:'', page: 1} })
  }

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: props.withText ? 'default' : 'pointer',
        ...props.sx,
      }}
      onClick={() => props.withText ? {} : handleClickLogo()}
    >
      <Image src={props.withText? '/irys.png' : '/irys_white.png'} alt='logo' width={props.width} height={props.height} />
      {props.withText
      &&
        <Typography variant={props.variant} sx={{ color: 'black.main' }}>
          IRyS
        </Typography>
      }
    </Box>
  )
}