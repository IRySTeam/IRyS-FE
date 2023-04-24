import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';

export default function FilterCard(props) {
  const theme = useTheme();
  return (
    <Box 
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: '16px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography 
          sx={{ 
            color: 'black.main', 
            typography: 'heading_h4',
            [theme.breakpoints.down('tablet')]: {
              typography: 'heading_h5',
            }, 
          }}
        >
          {`Filter ${props.order + 1}`}
        </Typography>
        <IconButton
          sx={{ 
            padding: '4px',
            backgroundColor: theme.palette.error.main,
            borderRadius: '5px',
          }}
        >
          <CloseIcon
            sx={{
              width: '16px',
              height: '16px',
              color: theme.palette.white.main,
            }}
          />
        </IconButton>
      </Box>
      
    </Box>
  )
}