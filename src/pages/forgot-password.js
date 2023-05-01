import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Container, Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useFormik } from 'formik';
import Logo from '@/component/logo';
import CustomAlert from '@/component/custom-alert';
import Loading from '@/component/loading';
import FormInput from '@/component/form-input';
import LeftContainer from '@/component/left-container';
import { forgotPasswordValidation } from '@/schema/forgot-password-validation';
import { NEXT_PUBLIC_API_URL } from '@/constants/api';

export default function ForgotPassword() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: forgotPasswordValidation,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const result = await axios.post(`${NEXT_PUBLIC_API_URL}/api/v1/users/forgot-password/send-otp`, values);
        Cookies.set('change_password_access_token', result.data.token, { expires: 1 });
        Cookies.set('change_password_refresh_token', result.data.refresh_token, { expires: 1 });
        router.push({ pathname: '/otp',  query: { from : 'forgot-password' }  })
        setShowAlert(false);
        setIsLoading(false);
      } catch (error) {
        setAlertSeverity('error')
        if(error.response){
          switch (error.response.data.error_code){
            case 'USER__EMAIL_NOT_VERIFIED':
              try {
                const result = await axios.post(`${NEXT_PUBLIC_API_URL}/api/v1/users/verify-email`, values);
                Cookies.set('register_access_token', result.data.token, { expires: 1 });
                Cookies.set('register_refresh_token', result.data.refresh_token, { expires: 1 });
                router.push({ pathname: '/otp',  query: { from : 'login' }  })
              } catch (error) {
                setAlertLabel('Network Error, Please Try Again.');
                setShowAlert(true);
              }
              break;
            case 'USER__NOT_FOUND' :
              setAlertLabel("Email doesn't exist. Try again or create a new account if you don't have one yet");
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
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('error');
  const [alertLabel, setAlertLabel] = useState('The email address you entered is not found. Please try again');

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
          padding: '0 120px'
        },
        [theme.breakpoints.only('small')]: {
          width: '50%',
          padding: '80px'
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
        <Typography variant={'heading_h1'} sx={{ color: 'black.main' }} mb={'16px'}>Reset Password</Typography>
        <Typography variant={'paragraph_h4'} sx={{ color: 'black.main' }}>Enter your email to reset your password</Typography>
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
            id='email'            
            name='email'
            label='Email'
            placeholder='example@email.com'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helpertext={formik.touched.email && formik.errors.email}
            required={true}
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
            disabled={formik.values.email === ''}
          >
            Reset Password
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