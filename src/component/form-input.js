import { FormControl, FormHelperText, OutlinedInput, Typography, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

export default function FormInput(props) {
  const theme = useTheme();
  return (
    <FormControl error={props.error} variant="standard">
      <Typography variant={"form_label"} sx={{ color: "black.main", marginBottom: "16px" }}>{props.label} {props.required ? <span style={{color: theme.palette.error.main}}>*</span> : <></>}</Typography>
      {props.isPasswordInput ?
        <OutlinedInput
          fullWidth
          id="password"
          name="password"
          placeholder="Password"
          value={props.value}
          onChange={props.onChange}
          error={props.error}
          sx={{ marginBottom: "8px",}}
          type={props.showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={props.handleClickShowPassword}
                onMouseDown={props.handleMouseDownPassword}
                edge="end"
              >
                {props.showPassword ? <VisibilityOff sx={{color: "black.main"}}/> : <Visibility sx={{color: "black.main"}}/>}
              </IconButton>
            </InputAdornment>
            }
        /> :
        <OutlinedInput
          fullWidth
          id={props.id}
          name={props.email}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          error={props.error}
          helpertext={props.helpertext}
          sx={props.sx? props.sx : null}
        />
      }
      <FormHelperText 
        sx={{
          typography: theme.typography.paragraph_h6,
          margin: 0,
        }}
      >
        {props.helpertext}
      </FormHelperText>
    </FormControl>
  )
}