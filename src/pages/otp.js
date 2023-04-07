import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Container, Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';
import Logo from "@/component/logo";
import CustomAlert from "@/component/custom-alert";
import Loading from "@/component/loading";
import LeftContainer from "@/component/left-container";
import OtpInput from 'react-otp-input';
import Cookies from 'js-cookie'
import { NEXT_PUBLIC_API_URL } from "@/constants/api";

export default function Otp() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('tablet'));

  const router = useRouter();

  const [otp, setOtp] = useState('')
  const [timeLeft, setTimeLeft] = useState(0);
  const isResendDisabled = timeLeft > 0;
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("error");
  const [alertLabel, setAlertLabel] = useState("Sorry, the OTP you entered has already expired. Please request a new OTP and try again");

  const handleClickShowAlert= () => setShowAlert((show) => !show);

  const handleOtpSubmit = async () => {
    setIsLoading(true);

    const register_access_token = Cookies.get('register_access_token');
    const register_refresh_token = Cookies.get('register_refresh_token');
    const otpData = {
      otp: otp,
    }

    if(register_access_token && register_refresh_token){
      try {
        await axios.post(`${NEXT_PUBLIC_API_URL}/api/v1/users/verify-otp`, otpData, {
          headers: {
            Authorization: `Bearer ${register_access_token}`
          }
        })
        Cookies.remove('register_access_token')
        Cookies.remove('register_refresh_token')
        router.replace({ pathname: "/login", query: { isSuccessRegistration : true} })
        setIsLoading(false);
      } catch (error) {
        if(error.response){
          setAlertSeverity("error");
          switch (error.response.data.error_code){
            case "USER__WRONG_OTP" :
              setAlertLabel("Sorry, the OTP you entered wrong. Please try again")
              setShowAlert(true);
              break;
            case 401:
              const refreshData = {
                token: register_access_token,
                refresh_token: register_refresh_token
              }
              try {
                const new_token = await axios.post(`${NEXT_PUBLIC_API_URL}/auth/refresh`, refreshData);
                Cookies.set('register_access_token', new_token.data.token, { expires: 1 });
                Cookies.set('register_refresh_token', new_token.refresh_token, { expires: 1 });
                setAlertSeverity("success");
                setAlertLabel("Your session has been restored. Please reinput your OTP");
                setShowAlert(true);
              }catch (error){
                Cookies.remove('register_access_token');
                Cookies.remove('register_refresh_token');
                router.replace({ pathname: "/login" });
              }
              break;
            case "USER__EMAIL_ALREADY_VERIFIED" :
              router.replace({ pathname: "/login", query: { isAccountVerified : true} })
              break;
            case "USER__NOT_FOUND" :
              router.replace({ pathname: "/register" })
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
    }
  }
  
  const resendOtp = async () => {
    setTimeLeft(60);
    setIsLoading(true);
    const register_access_token = Cookies.get('register_access_token');
    const register_refresh_token = Cookies.get('register_refresh_token');

    if(register_access_token && register_refresh_token){
      try {
        await axios.post(`${NEXT_PUBLIC_API_URL}/api/v1/users/resend-otp`, null, {
          headers: {
            Authorization: `Bearer ${register_access_token}`
          }
        })
        setAlertSeverity("success")
        setAlertLabel("Your new OTP has been sent to your email.")
        setShowAlert(true)
        setIsLoading(false);
      } catch (error) {
        if(error.response){
          setAlertSeverity("error");
          switch (error.response.data.error_code){
            case 401:
              const refreshData = {
                token: register_access_token,
                refresh_token: register_refresh_token
              }
              try {
                const new_token = await axios.post(`${NEXT_PUBLIC_API_URL}/api/v1/auth/refresh`, refreshData);
                Cookies.set('register_access_token', new_token.data.token, { expires: 1 });
                Cookies.set('register_refresh_token', new_token.data.refresh_token, { expires: 1 });
                setAlertLabel("Sorry, the OTP you entered has already expired. Please request a new OTP and try again");
              }catch (error){
                setAlertLabel("Sorry, the OTP you entered has already expired. Please request a new OTP and try again");
              }
              break;
            case "USER__EMAIL_ALREADY_VERIFIED" :
              router.replace({ pathname: "/login", query: { isAccountVerified : true} })
              break;
            case "USER__NOT_FOUND" :
              router.replace({ pathname: "/register" })
              break;
            default :
              setAlertLabel("Network Error, Please Try Again.");
              break;
          }
          setIsLoading(false);
          setShowAlert(true);
        } else{
          setAlertLabel("Network Error, Please Try Again.");
          setIsLoading(false);
          setShowAlert(true);
        }
      }
    }
  }

  // First Time Loaded
  useEffect(() => {
    setIsLoading(true)
    const register_access_token = Cookies.get('register_access_token');
    const register_refresh_token = Cookies.get('register_refresh_token');
    if(!register_access_token || !register_refresh_token){
      router.replace({ pathname: "/login" })
    }
    setIsLoading(false)
  }, [router]);

  // For OTP Timer
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return (
    <>
    { showAlert &&
      <CustomAlert
        severity={alertSeverity}
        label={alertLabel}
        onClose={handleClickShowAlert}
      /> 
    }
    { isLoading && <Loading centered={true} /> }
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
        <Typography variant={"heading_h1"} sx={{ color: "black.main" }} mb={"16px"}>Verify Account</Typography>
        <Typography variant={"paragraph_h4"} sx={{ color: "black.main" }}>Your registration is almost complete! Please enter the OTP (One-Time Password) sent to your email address to verify your account. Note that the OTP will expire in 5 minutes. </Typography>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          renderInput={(props) => <input {...props} id="otp"/>}
          containerStyle={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "30px",
            margin: "50px 0 80px"
          }}
          inputStyle={{
            fontFamily: 'Poppins, sans-serif',
          }}
        />
        <Button 
          color="primary" 
          variant="contained" 
          sx={{ 
            height: "56px",
            width: "100%", 
            margin: "8px 0px 16px",
            "&.Mui-disabled": {
              backgroundColor: theme.palette.dark_gray.light,
              color: theme.palette.light_gray.light,
            },}}
          disabled={otp.length < 4}
          type="submit"
          onClick={handleOtpSubmit}
        >
          Verify Account
        </Button>
        <Typography variant={"paragraph_h5"} sx={{ color: "black.main", alignSelf: "center", textAlign: "center" }}>Didn&apos;t receive the OTP?&nbsp;
          <Button 
            variant="text"
            color="secondary"
            sx={{
              typography: theme.typography.heading_h5,
              margin: 0,
              padding: 0,
            }}
            onClick={resendOtp}
            disabled={isResendDisabled}
          >
            { isResendDisabled? `Resend Code in ${timeLeft} seconds` : "Resend Code"}
          </Button>
        </Typography> 
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