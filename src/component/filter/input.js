import { Box, Typography, OutlinedInput } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function FilterInput(props) {
  const theme = useTheme();
  return (
    <Box 
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant='heading_h5' color='black.main'>{props.label}</Typography>
      <OutlinedInput
        id='filterInput'
        name='filterInput'
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        sx={{
          width: {mobile: 'calc(100% - 133px)', mobile_l: 'calc(100% - 199px)', tablet: 'calc(100% - 248px)'},
          '& .MuiInputBase-input': {
            height: '30px',
            maxHeight: '30px',
            padding: '0 16px',
            display: 'flex',
            justifyContent: 'center',
            typography: theme.typography.paragraph_h6,
            color: props.value === '' ? 'dark_gray.main' : 'black.main',
            backgroundColor: theme.palette.white.main,
            border: '1px solid',
            borderColor: theme.palette.light_gray.main,
            borderRadius: '5px',
          },
          '&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            border: '0 !important',
          },
          '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: '0 !important',
          },
          '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            border: '0 !important',
          },
        }}
      />
    </Box>
  )
}