import { useState, useEffect } from 'react';
import { formatBytes } from '@/utils/bytes';
import { Box, Typography, IconButton } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';

export default function FileCard(props) {
  const [progress, setProgress] = useState(0)
  const theme = useTheme();
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(props.progress);
    }, 500);
    return () => clearTimeout(timer);
  }, [props.progress]);

  return (
    <Box
      sx={{
        maxWidth: 'large',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        border: '1px solid',
        borderRadius: '10px',
        borderColor: theme.palette.light_gray.main,
        padding: '24px 16px',
      }}
    >
      <Box
        sx={{
          width: 'calc(100% - 48px)',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <Image 
          src={'/pdf-icon.svg'} 
          alt='file-icon' 
          width={54} 
          height={54}
        />
        <Box
          sx={{
            width: 'calc(100% - 62px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: '24px',
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: {mobile: 'column', tablet: 'row'},
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '8px',
            }}
          >
            <Typography variant='heading_h6' color='black.main' sx={{maxWidth: {mobile: '100%', tablet: 'calc(100% - 200px)'},}}>{props.name}</Typography>
            <Typography variant='paragprah_h6' color='black.main'>{formatBytes(props.loaded)} of {formatBytes(props.total)}</Typography>
          </Box>
          <Box sx={{ width: '100%',}}>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              color="success" 
              sx={{
                height: '10px',
                borderRadius: '2px',
                '&.MuiLinearProgress-root':{
                  backgroundColor: theme.palette.light_gray.main
                }
              }} 
              />
          </Box>        
        </Box>
      </Box>
        <IconButton
          sx={{ padding: 0, }}
          onClick={props.onDelete}
        >
          <CloseIcon
            sx={{
              width: {mobile: '16px', tablet: '32px'},
              height: {mobile: '16px', tablet: '32px'},
              color: theme.palette.dark_gray.main,
            }}
          />
        </IconButton>
    </Box>
  )
}