import { useState } from "react";
import { Container, Box, Typography, Button, OutlinedInput } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useFormik } from "formik";
import Logo from "@/component/logo";
import CustomAlert from "@/component/custom-alert";
import { loginValidation } from "@/schema/login-validation";
import Loading from "@/component/loading";

export default function Login() {
  const theme = useTheme();
  
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: loginValidation,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("error");
  const [alertLabel, setAlertLabel] = useState("The email address you entered is not found. Please try again");

  const handleClickShowAlert= () => setShowAlert((show) => !show);


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
        [theme.breakpoints.down("laptop")]: {
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
        [theme.breakpoints.up("laptop")]: {
          width: "50%",
          padding: "0 120px"
        },
        [theme.breakpoints.only("laptop")]: {
          width: "50%",
          padding: "80px"
        },
      }} 
      >
        <Typography variant={"heading_h1"} sx={{ color: "black.main" }} mb={"16px"}>Reset Password</Typography>
        <Typography variant={"paragraph_h4"} sx={{ color: "black.main" }}>Enter your email to reset your password</Typography>
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
            helpertext={formik.touched.email && formik.errors.email}
          />
          <Button 
            color="primary" 
            variant="contained" 
            sx={{ 
              height: "56px", 
              marginTop: "8px",
              "&.Mui-disabled": {
                backgroundColor: theme.palette.dark_gray.light,
                color: theme.palette.light_gray.light,
              },}}
            fullWidth 
            type="submit"
            disabled={formik.values.email === ""}
          >
            Reset Password
          </Button> 
        </form>
      </Box>
    </Container>
    </>
  )
}