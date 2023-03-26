import { useState } from "react";
import { Container, Box, Typography, Button, OutlinedInput, Link, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useFormik } from 'formik';
import Logo from "@/component/logo";
import { loginValidation } from "@/schema/loginValidation";

export default function Login() {
  const theme = useTheme();
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidation,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container 
      maxWidth="large" 
      sx={{
        padding: "0", 
        height:"100vh",
        display: 'flex',
        flexDirection: 'row'
      }} 
    >
      <Box sx={{
        width: "50%",
        height: "100%",
        padding: "40px",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundImage: "linear-gradient(90deg, #2064AC 0%, #7EC7EE 100%)",
        [theme.breakpoints.down('laptop')]: {
          display: "none"
        },
      }} 
      >
        <Logo/>
        <Typography variant={"paragraph_h4"} sx={{ color: "light_gray.light" }}>© Intelligent Repository System</Typography>
      </Box>
      <Box 
        sx={{
        width: "100%",
        height: "100%",
        padding: "40px",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        [theme.breakpoints.up('laptop')]: {
          width: "50%",
          padding: "0 120px"
        },
        [theme.breakpoints.only('laptop')]: {
          width: "50%",
          padding: "0 80px"
        },
      }} 
      >
        <Typography variant={"heading_h1"} sx={{ color: "black.main" }} mb={"16px"}>Login</Typography>
        <Typography variant={"paragraph_h4"} sx={{ color: "black.main" }}>Kindly provide your registered email and password to access your account.</Typography>
        <form 
          onSubmit={formik.handleSubmit} 
          style={{
            marginTop: "40px",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "16px"
          }}
        >
          <Typography variant={"form_label"} sx={{ color: "black.main" }}>Email <span style={{color: theme.palette.error.main}}>*</span></Typography>
          <OutlinedInput
            fullWidth
            id="email"
            name="email"
            placeholder="example@email.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <Typography variant={"form_label"} sx={{ color: "black.main" }}>Password <span style={{color: theme.palette.error.main}}>*</span></Typography>
          <OutlinedInput
            fullWidth
            id="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ marginBottom: "8px",}}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff sx={{color: "black.main"}}/> : <Visibility sx={{color: "black.main"}}/>}
                </IconButton>
              </InputAdornment>
              }
          />
          <Link
            variant="heading_h5"
            underline="none"
            alignSelf={"flex-end"}
            href={"/forgot-password"}
            color={"secondary.main"}
          >
            Forgot Password
          </Link>
          <Button 
            color="primary" 
            variant="contained" 
            sx={{ 
              height: "56px", 
              marginTop: "8px",
              '&.Mui-disabled': {
                backgroundColor: theme.palette.dark_gray.light,
                color: theme.palette.light_gray.light,
              },}}
            fullWidth 
            type="submit"
            disabled={formik.values.email === '' || formik.values.password === ''}

          >
            Login
          </Button> 
          <Typography variant={"paragpraph_h5"} sx={{ color: "black.main", alignSelf: "center" }}>Don&apos;t have an account yet?&nbsp;
            <Link
              variant="heading_h5"
              underline="none"
              alignSelf={"flex-end"}
              href={"/register"}
              color={"secondary.main"}
            >
              Register
            </Link>
          </Typography>
        </form>
      </Box>
    </Container>
  )
}