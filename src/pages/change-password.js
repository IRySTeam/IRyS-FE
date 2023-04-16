import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import { useRouter } from 'next/router';
import { Container, Box, Typography, Button, } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useFormik } from 'formik';
import { NEXT_PUBLIC_API_URL } from '@/constants/api';
import Logo from '@/component/logo';
import CustomAlert from '@/component/custom-alert';
import Loading from '@/component/loading';
import FormInput from '@/component/form-input';
import LeftContainer from '@/component/left-container';
import { changePasswordValidation } from '@/schema/change-password-validation';
import { refresh } from '@/utils/token';

export default function ChangePassword() {
  const router = useRouter();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('tablet'));
  
  const formik = useFormik({
    initialValues: {
      new_password: '',
      confirm_new_password:'',
    },
    validationSchema: changePasswordValidation,
    onSubmit: async (values,) => {
      setIsLoading(true);
      try {
        const token = Cookies.get('change_password_access_token');
        await axios.post(`${NEXT_PUBLIC_API_URL}/api/v1/users/change-password`, values, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        router.push({ pathname: '/login', query: { isSuccessForgotPassword : true} })
        setShowAlert(false);
        setIsLoading(false);
      } catch (error) {
        setAlertSeverity('error')
        if(error.response){
          switch (error.response.data.error_code){
            case 401:
              refresh('change_password_access_token', 'change_password_refresh_token', router)
              setAlertLabel('Your session has been restored. Please Try Again.');
              setShowAlert(true);
              setIsLoading(false);
              break;
            case 'USER__INVALID_PASSWORD':
              setAlertLabel('Invalid password. Please try again.');
              setShowAlert(true);
              break;
            case 'USER__FORGOT_PASSWORD_OTP_NOT_VERIFIED':
              setAlertLabel('Your action is not yet verified. Please try again.');
              setShowAlert(true);
              break;
            case 'USER__NOT_FOUND':
              setAlertLabel('Your account is not found. Please try again.');
              setShowAlert(true);
              break;
            case 'TOKEN__TOKEN_ALREADY_USED':
              setAlertLabel('Your token is invalid. Please try again.');
              setShowAlert(true);
              break;
            default :
              setAlertLabel('Network Error, Please Try Again.');
              setShowAlert(true);
              break;
          }
        } else{
          setAlertLabel('Network Error, Please Try Again.');
          setShowAlert(true);
        }
        setIsLoading(false);
      }
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('error');
  const [alertLabel, setAlertLabel] = useState('Registration Failed. Please try again');

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswordConfirmation = () => setShowPasswordConfirmation((show) => !show);
  const handleClickShowAlert= () => setShowAlert((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // First Time Loaded
  useEffect(() => {
    setIsLoading(true)
    const change_password_access_token = Cookies.get('change_password_access_token');
    const change_password_refresh_token = Cookies.get('change_password_refresh_token');
    if(!change_password_access_token || !change_password_refresh_token ){
      router.replace({ pathname: '/forgot-password' })
    }
    setIsLoading(false)
  }, [router]);

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
        padding: '0', 
        minHeight:'100vh',
        display: 'flex',
        flexDirection: 'row'
      }} 
    >
      <LeftContainer />
      <Box 
        sx={{
        width: '100%',
        minHeight: '100%',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        [theme.breakpoints.up('small')]: {
          width: '50%',
          padding: '40px 80px',
        },
        [theme.breakpoints.up('desktop')]: {
          width: '50%',
          padding: '40px 120px'
        },
      }} 
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}
        >
          <Logo
            width={mobile? 120: 150}
            height={mobile? 120: 150}
            variant={mobile? 'logo_small': 'logo_large'}
            withText={true}
          />
        </Box>
        <Typography variant={'heading_h1'} sx={{ color: 'black.main' }} mb={'16px'}>Change Password</Typography>
        <Typography variant={'paragraph_h4'} sx={{ color: 'black.main' }}>Regain access by resetting your password below.</Typography>
        <form 
          onSubmit={formik.handleSubmit} 
          style={{
            marginTop: '40px',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: '16px'
          }}
        >
          <FormInput 
            id='new_password'            
            name='new_password'
            label='Password'
            placeholder='Password'
            value={formik.values.new_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.new_password && Boolean(formik.errors.new_password)}
            helpertext={formik.touched.new_password && formik.errors.new_password}
            info={'Your password must be at least 8 characters that contain at least one uppercase letter, one lowercase letter, one special character (! @ $ % ^ & * ( ) \ - _ = + { } ; : , < . >), and one number.'}
            showPassword={showPassword}
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            required={true}
            isPasswordInput={true}
          />
          <FormInput 
            id='confirm_new_password'            
            name='confirm_new_password'
            label='Password Confirmation'
            placeholder='Re-enter your password'
            value={formik.values.confirm_new_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirm_new_password && Boolean(formik.errors.confirm_new_password)}
            helpertext={formik.touched.confirm_new_password && formik.errors.confirm_new_password}
            showPassword={showPasswordConfirmation}
            onClick={handleClickShowPasswordConfirmation}
            onMouseDown={handleMouseDownPassword}
            required={true}
            isPasswordInput={true}
          />
          <Button 
            color='primary' 
            variant='contained' 
            sx={{ 
              height: '56px',
              width: '100%', 
              marginTop: '8px',
              '&.Mui-disabled': {
                backgroundColor: theme.palette.dark_gray.light,
                color: theme.palette.light_gray.light,
              },}}
            type='submit'
            disabled={formik.values.new_password === '' || formik.values.confirm_new_password === ''}
          >
            Change Password
          </Button> 
        </form>
        <Typography 
          variant={'paragraph_h5'} 
          sx={{ 
            color: 'black.main',
            textAlign: 'center',
            width: '100%',
            marginTop: '40px'
          }}
        >
          © Intelligent Repository System
        </Typography>
      </Box>
    </Container>
    </>
  )
}