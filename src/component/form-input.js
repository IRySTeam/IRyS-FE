import { FormControl, FormHelperText, OutlinedInput, Typography, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

export default function FormInput(props) {
  const theme = useTheme();
  return (
    <FormControl error={props.error} variant='standard' sx={props.sx}>
      <Typography 
        sx={{ 
          color: 'black.main', 
          marginBottom: '16px',
          typography: props.small? 'form_label_small' : 'form_label',
          [theme.breakpoints.down('tablet')]: {
            typography: 'heading_h5',
          }, 
        }}
      >
        {props.label} 
        {props.required ? <span style={{color: theme.palette.error.main}}>*</span> : <></>}
        {props.small && props.optional ? <span style={{color: theme.palette.light_gray.main}}>`(Optional)`</span> : <></>}
      </Typography>
      {props.isPasswordInput ?
        <OutlinedInput
          id={props.id}
          name={props.name}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
          onKeyUp={props.onKeyUp}
          error={props.error}
          sx={{ marginBottom: '8px', width: '100%'}}
          type={props.showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={props.onClick}
                onMouseDown={props.onMouseDown}
                edge='end'
              >
                {props.showPassword ? <VisibilityOff sx={{color: 'black.main'}}/> : <Visibility sx={{color: 'black.main'}}/>}
              </IconButton>
            </InputAdornment>
            }
        /> :
        <OutlinedInput
          id={props.id}
          name={props.name}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
          onKeyUp={props.onKeyUp}
          error={props.error}
          sx={{ width: '100%'}}
          size={props.small? 'small' : 'medium'}
          multiline={props.multiline? props.multiline : false}
          minRows={props.multiline? 4 : 1}
        />
      }
      <FormHelperText
        sx={{
          typography: props.small? theme.typography.form_sublabel_small : theme.typography.form_sublabel,
          margin: 0,
        }}
      >
        {props.error? props.helpertext : props.info? props.info : ''}
      </FormHelperText>
    </FormControl>
  )
}