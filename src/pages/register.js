import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Container, Box, Typography, Button, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import { NEXT_PUBLIC_API_URL } from '@/constants/api';
import { registerValidation } from '@/schema/register-validation';
import Logo from '@/component/logo';
import CustomAlert from '@/component/custom-alert';
import Loading from '@/component/loading';
import FormInput from '@/component/form-input';
import LeftContainer from '@/component/left-container';

export default function Register() {
  const router = useRouter();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('tablet'));
  
  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation:'',
    },
    validationSchema: registerValidation,
    onSubmit: async (values,) => {
      setIsLoading(true);
      const registerData = {
        email: values.email,
        first_name: values.firstName,
        last_name: values.lastName,
        password: values.password,
      }
      try {
        const result = await axios.post(`${NEXT_PUBLIC_API_URL}/api/v1/users/register`, registerData);
        Cookies.set('register_access_token', result.data.token, { expires: 1 });
        Cookies.set('register_refresh_token', result.data.refresh_token, { expires: 1 });
        router.push({ pathname: '/otp' })
        setIsLoading(false);
      } catch (error) {
        if(error.response){
          setAlertSeverity('error');
          switch (error.response.data.error_code){
            case 'USER__DUPLICATE_EMAIL' :
              setAlertLabel('Email already exist for another user. Log in or register with another email.');
              break;
            default :
              setAlertLabel('Network Error, Please Try Again.');
              break;
          }
          setIsLoading(false);
          setShowAlert(true);
        } else{
          setAlertLabel('Network Error, Please Try Again.');
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
  const [alertSeverity, setAlertSeverity] = useState('error');
  const [alertLabel, setAlertLabel] = useState('Registration Failed. Please try again');

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
        <Typography variant={'heading_h1'} sx={{ color: 'black.main' }} mb={'16px'}>Register</Typography>
        <Typography variant={'paragraph_h4'} sx={{ color: 'black.main' }}>Create a new account by filling out the registration form below.</Typography>
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
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              [theme.breakpoints.down('tablet')]: {
                flexDirection: 'column',
                gap: '16px',
              }, 
              [theme.breakpoints.only('small')]: {
                flexDirection: 'column',
                gap: '16px',
              },  
            }}
          >
            <FormInput 
              id='firstName'            
              name='firstName'
              label='First Name'
              placeholder='Name'
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helpertext={formik.touched.firstName && formik.errors.firstName}
              required={true}
              sx={{
                [theme.breakpoints.up('tablet')]: {
                  width: 'calc(50% - 8px)',
                },
                [theme.breakpoints.only('small')]: {
                  width: '100%',
                },  
              }}
            />
            <FormInput 
              id='lastName'            
              name='lastName'
              label='Last Name'
              placeholder='Name'
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helpertext={formik.touched.lastName && formik.errors.lastName}
              required={true}
              sx={{
                [theme.breakpoints.up('tablet')]: {
                  width: 'calc(50% - 8px)',
                }, 
                [theme.breakpoints.only('small')]: {
                  width: '100%',
                },  
              }}
            />
          </Box>
          <FormInput 
            id='password'            
            name='password'
            label='Password'
            placeholder='Password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helpertext={formik.touched.password && formik.errors.password}
            info={'Your password must be at least 8 characters that contain at least one uppercase letter, one lowercase letter, one special character (! @ $ % ^ & * ( ) \ - _ = + { } ; : , < . >), and one number.'}
            showPassword={showPassword}
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            required={true}
            isPasswordInput={true}
          />
          <FormInput 
            id='passwordConfirmation'            
            name='passwordConfirmation'
            label='Password Confirmation'
            placeholder='Re-enter your password'
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
            disabled={formik.values.email === '' || formik.values.password === '' || formik.values.firstName === '' || formik.values.lastName === '' || formik.values.passwordConfirmation === ''}
          >
            Register
          </Button> 
          <Typography variant={'paragraph_h5'} sx={{ color: 'black.main', alignSelf: 'center', textAlign: 'center' }}>Already have an account?&nbsp;
            <Link
              variant='heading_h5'
              underline='none'
              href={'/login'}
              color={'secondary.main'}
            >
              Login
            </Link>
          </Typography>
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