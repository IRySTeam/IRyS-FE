import { useState } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Logo from "@/component/logo";
import CustomAlert from "@/component/custom-alert";
import Loading from "@/component/loading";
import OtpInput from 'react-otp-input';

export default function Otp() {
  const theme = useTheme();

  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("error");
  const [alertLabel, setAlertLabel] = useState("Sorry, the OTP you entered has already expired. Please request a new OTP and try again");

  const handleClickShowAlert= () => setShowAlert((show) => !show);
  const handleChangeOtp = (newValue) => {setOtp(newValue)};
  return (
    <>
    { showAlert &&
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
      <Box sx={{
        width: "50%",
        minHeight: "100%",
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        backgroundImage: "linear-gradient(90deg, #2064AC 0%, #7EC7EE 100%)",
        [theme.breakpoints.down("small")]: {
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
        <Typography variant={"heading_h1"} sx={{ color: "black.main" }} mb={"16px"}>Verify Account</Typography>
        <Typography variant={"paragraph_h4"} sx={{ color: "black.main" }}>Your registration is almost complete! Please enter the OTP (One-Time Password) sent to your email address to verify your account.Note that the OTP will expire in 5 minutes. </Typography>
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
          type="submit"
          disabled={otp.length < 4}
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
          >
            Resend Code
          </Button>
        </Typography> 
      </Box>
    </Container>
    </>
  )
}