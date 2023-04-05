import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Container, Box, Typography, Button, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useFormik } from "formik";
import Logo from "@/component/logo";
import CustomAlert from "@/component/custom-alert";
import { loginValidation } from "@/schema/login-validation";
import Cookies from 'js-cookie'
import { NEXT_PUBLIC_API_URL } from "@/constants/api";
import Loading from "@/component/loading";
import FormInput from "@/component/form-input";
import LeftContainer from "@/component/left-container";

export default function Login() {
  const router = useRouter();
  const { isSuccessRegistration, isSuccessForgotPassword, isAccountVerified } = router.query;

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('tablet'));
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: async (values,) => {
      setIsLoading(true);
      try {
        const result = await axios.post(`${NEXT_PUBLIC_API_URL}/users/login`, values);
        Cookies.set('access_token', result.data.token, { expires: 1 });
        Cookies.set('refresh_token', result.data.refresh_token, { expires: 1 });
        router.push({ pathname: "/" })
        setIsLoading(false);
      } catch (error) {
        setAlertSeverity("error")
        if(error.response){
          switch (error.response.data.error_code){
            case "USER__PASSWORD_DOES_NOT_MATCH":
              setAlertLabel("The password you entered is incorrect. Please try again");
              setShowAlert(true);
              break;
            case "USER__EMAIL_NOT_VERIFIED":
              const emailData = {
                email : values.email
              }
              try {
                const result = await axios.post(`${NEXT_PUBLIC_API_URL}/users/verify-email`, emailData);
                Cookies.set('register_access_token', result.data.token, { expires: 1 });
                Cookies.set('register_refresh_token', result.data.refresh_token, { expires: 1 });
                router.push({ pathname: "/otp" })
              } catch (error) {
                setAlertLabel("Network Error, Please Try Again.");
                setShowAlert(true);
              }
              break;
            case "USER__NOT_FOUND" :
              setAlertLabel("Email doesn't exist. Try again or create a new account if you don't have one yet");
              setShowAlert(true);
              break;
            default :
              setAlertLabel("Network Error, Please Try Again.");
              setShowAlert(true);
              break;
          }
        } else{
          setAlertLabel("Network Error, Please Try Again.");
          setShowAlert(true);
        }
        setIsLoading(false);
      }
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("error");
  const [alertLabel, setAlertLabel] = useState("The email address or password you entered is incorrect. Please try again");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowAlert= () => setShowAlert((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if(isSuccessRegistration){
      setAlertSeverity("success");
      setAlertLabel("Congratulations! Your registration was successful ");
      setShowAlert(true);
    }else if(isSuccessForgotPassword){
      setAlertSeverity("success");
      setAlertLabel("Your password has been successfully reset. Please check your email for a new password");
      setShowAlert(true);
    }else if(isAccountVerified){
      setAlertSeverity("success");
      setAlertLabel("Your account has been verified. Please log in");
      setShowAlert(true);
    }
  }, [isSuccessRegistration, isSuccessForgotPassword, isAccountVerified]);

  return (
    <>
    { !isLoading && showAlert &&
      <CustomAlert
        severity={alertSeverity}
        label={alertLabel}
        onClose={handleClickShowAlert}
      /> 
    }
    { isLoading && <Loading /> }
    <Container 
      sx={{
        padding: "0", 
        minHeight:"100vh",
        display: "flex",
        flexDirection: "row"
      }} 
    >
      <LeftContainer />
      <Box 
        sx={{
        width: "100%",
        minHeight: "100%",
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        [theme.breakpoints.up("small")]: {
          width: "50%",
          padding: "0 120px"
        },
        [theme.breakpoints.only("small")]: {
          width: "50%",
          padding: "80px"
        },
      }} 
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "center",
            justifyContent: "center",
            marginBottom: "16px"
          }}
        >
          <Logo
            width={mobile? 120: 150}
            height={mobile? 120: 150}
            variant={mobile? "logo_small": "logo_large"}
            withText={true}
          />
        </Box>
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
          <FormInput 
            id="email"            
            name="email"
            label="Email"
            placeholder="example@email.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helpertext={formik.touched.email && formik.errors.email}
            required={true}
          />
          <FormInput 
            id="password"            
            name="password"
            label="Password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helpertext={formik.touched.password && formik.errors.password}
            showPassword={showPassword}
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            required={true}
            isPasswordInput={true}
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
              width: "100%", 
              marginTop: "8px",
              "&.Mui-disabled": {
                backgroundColor: theme.palette.dark_gray.light,
                color: theme.palette.light_gray.light,
              },}}
            type="submit"
            disabled={formik.values.email === "" || formik.values.password === ""}
          >
            Login
          </Button> 
          <Typography variant={"paragraph_h5"} sx={{ color: "black.main", alignSelf: "center", textAlign: "center" }}>Don&apos;t have an account yet?&nbsp;
            <Link
              variant="heading_h5"
              underline="none"
              href={"/register"}
              color={"secondary.main"}
            >
              Register
            </Link>
          </Typography>
        </form>
        <Typography 
          variant={"paragraph_h5"} 
          sx={{ 
            color: "black.main",
            textAlign: "center",
            width: "100%",
            marginTop: "40px"
          }}
        >
          © Intelligent Repository System
        </Typography>
      </Box>
    </Container>
    </>
  )
}