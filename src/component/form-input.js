import { FormControl, FormHelperText, OutlinedInput, Typography, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

export default function FormInput(props) {
  const theme = useTheme();
  return (
    <FormControl error={props.error} variant="standard" sx={props.sx}>
      <Typography 
        sx={{ 
          color: "black.main", 
          marginBottom: "16px",
          typography: "form_label",
          [theme.breakpoints.down("tablet")]: {
            typography: "heading_h5",
          }, 
        }}
      >
        {props.label} {props.required ? <span style={{color: theme.palette.error.main}}>*</span> : <></>}
      </Typography>
      {props.isPasswordInput ?
        <OutlinedInput
          id={props.id}
          name={props.name}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
          error={props.error}
          sx={{ marginBottom: "8px", width: "100%"}}
          type={props.showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={props.onClick}
                onMouseDown={props.onMouseDown}
                edge="end"
              >
                {props.showPassword ? <VisibilityOff sx={{color: "black.main"}}/> : <Visibility sx={{color: "black.main"}}/>}
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
          error={props.error}
          sx={{ width: "100%"}}
        />
      }
      <FormHelperText
        sx={{
          typography: theme.typography.form_sublabel,
          margin: 0,
        }}
      >
        {props.error? props.helpertext : props.info? props.info : ''}
      </FormHelperText>
    </FormControl>
  )
}