import { Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function CustomAlert(props) {
  const theme = useTheme();
  return (
    <Alert 
      icon={false} 
      variant='filled'
      severity={props.severity} 
      sx={{ 
        maxWidth:'400px', 
        padding:'0 8px', 
        display: 'flex', 
        alignItems: 'center',
        typography: theme.typography.heading_h6 ,
        zIndex: 2,
        position: 'fixed',
        top: '15%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        [theme.breakpoints.down('tablet')]: {
          width:'calc(100% - 80px)', 
        },
      }}
      onClose={props.onClose} 
    >
      {props.label}
    </Alert>
  )
}