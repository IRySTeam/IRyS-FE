import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Container, Box, Typography, Button, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useFormik } from "formik";
import Logo from "@/component/logo";
import CustomAlert from "@/component/custom-alert";
import { registerValidation } from "@/schema/register-validation";
import { NEXT_PUBLIC_API_URL } from "@/constants/api";
import Loading from "@/component/loading";
import FormInput from "@/component/form-input";

export default function Register() {
  const router = useRouter();
  const theme = useTheme();

  const config = {
    headers: { 
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': "*"
    }
  }
  
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      passwordConfirmation:"",
    },
    validationSchema: registerValidation,
    onSubmit: async (values,) => {
      setIsLoading(true);
      try {
        const result = await axios.post(`${NEXT_PUBLIC_API_URL}/users/register`, values, config);
        console.log(result.data)
        router.push({ pathname: "/login" })
        setIsLoading(false);
      } catch (error) {
        if(error.response){
          setAlertSeverity("error");
          switch (error.response.data.error_code){
            case "USER__NOT_FOUND" :
              setAlertLabel("Email doesn't exist. Try again or create a new account if you don't have one yet");
              break;
            case "USER__PASSWORD_DOES_NOT_MATCH":
              setAlertLabel("The password you entered is incorrect. Please try again");
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
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("error");
  const [alertLabel, setAlertLabel] = useState("Registration Failed. Please try again");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswordConfirmation = () => setShowPasswordConfirmation((show) => !show);
  const handleClickShowAlert= () => setShowAlert((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
        <Typography variant={"heading_h1"} sx={{ color: "black.main" }} mb={"16px"}>Register</Typography>
        <Typography variant={"paragraph_h4"} sx={{ color: "black.main" }}>Create a new account by filling out the registration form below.</Typography>
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
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              [theme.breakpoints.down("tablet")]: {
                flexDirection: "column",
                gap: "16px",
              }, 
              [theme.breakpoints.only("small")]: {
                flexDirection: "column",
                gap: "16px",
              },  
            }}
          >
            <FormInput 
              id="firstName"            
              name="firstName"
              label="First Name"
              placeholder="Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helpertext={formik.touched.firstName && formik.errors.firstName}
              required={true}
              sx={{
                [theme.breakpoints.up("tablet")]: {
                  width: "calc(50% - 8px)",
                },
                [theme.breakpoints.only("small")]: {
                  width: "100%",
                },  
              }}
            />
            <FormInput 
              id="lastName"            
              name="lastName"
              label="Last Name"
              placeholder="Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helpertext={formik.touched.lastName && formik.errors.lastName}
              required={true}
              sx={{
                [theme.breakpoints.up("tablet")]: {
                  width: "calc(50% - 8px)",
                }, 
                [theme.breakpoints.only("small")]: {
                  width: "100%",
                },  
              }}
            />
          </Box>
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
            info={"Your password must be at least 8 characters characters and should include a combinations of numbers, letters, and special characters (!@$%)."}
            showPassword={showPassword}
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            required={true}
            isPasswordInput={true}
          />
          <FormInput 
            id="passwordConfirmation"            
            name="passwordConfirmation"
            label="Password Confirmation"
            placeholder="Re-enter your password"
            value={formik.values.passwordConfirmation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
            helpertext={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
            showPassword={showPasswordConfirmation}
            onClick={handleClickShowPasswordConfirmation}
            onMouseDown={handleMouseDownPassword}
            required={true}
            isPasswordInput={true}
          />
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
            Register
          </Button> 
          <Typography variant={"paragraph_h5"} sx={{ color: "black.main", alignSelf: "center", textAlign: "center" }}>Already have an account?&nbsp;
            <Link
              variant="heading_h5"
              underline="none"
              href={"/login"}
              color={"secondary.main"}
            >
              Login
            </Link>
          </Typography>
        </form>
      </Box>
    </Container>
    </>
  )
}