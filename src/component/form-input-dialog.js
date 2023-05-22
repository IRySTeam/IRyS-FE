import { FormControl, FormHelperText, OutlinedInput, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function FormInputDialog(props) {
  const theme = useTheme();
  return (
    <FormControl error={props.error} variant='standard' sx={props.sx}>
      <Typography 
        sx={{ 
          color: 'black.main', 
          marginBottom: '8px',
          typography: theme.typography.form_sublabel_small,
          [theme.breakpoints.down('tablet')]: {
            typography: 'heading_h5',
          },
          '& .bold': {
            typography: theme.typography.form_sublabel_small_bold
          },
          maxWidth: '100%',
          wordWrap: 'break-word'
        }}
      >
        {props.label} 
        {props.required ? <span style={{color: theme.palette.error.main}}>*</span> : <></>}
      </Typography>
      <OutlinedInput
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        onKeyUp={props.onKeyUp}
        error={props.error}
        sx={{ 
          width: '100%',
          height: '32px',
          maxHeight: '32px', 
          minHeight: '32px',
          typography: theme.typography.form_sublabel_small,
        }}
      />
      <FormHelperText
        sx={{
          typography: theme.typography.form_sublabel_small,
          margin: 0,
        }}
      >
        {props.error? props.helpertext : ''}
      </FormHelperText>
    </FormControl>
  )
}