import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
// import axios from 'axios';
import { Container, Button, Typography, Box } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Loading from '@/component/loading';
import NavBar from '@/component/navbar';
import FormInput from '@/component/form-input';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { createRepositoryValidation } from '@/schema/create-repository';
// import Cookies from 'js-cookie'
// import { NEXT_PUBLIC_API_URL } from '@/constants/api';
// import { refresh } from '@/utils/token';
import CustomAlert from '@/component/custom-alert';
import { faq } from '@/data/faq';
import { getFAQSuccess } from '@/state/actions/faqActions';

export default function Faq() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('error');
  const [alertLabel, setAlertLabel] = useState('Network Error, Please Try Again.');
  const [search, setSearch] = useState('');

  const formik = useFormik({
    initialValues: {
      question: ''
    },
    onSubmit: () => {
      setIsLoading(true);
      setAlertSeverity('success')
      setAlertLabel('Your feedback successfully sent')
      formik.setFieldValue('question', '')
      setIsLoading(false);
    },
  });

  const handleClickShowAlert= () => setShowAlert((show) => !show);
  
  useEffect(() => {
    const data = faq.filter((q) => q.question.includes(search) || q.answer.includes(search))
    dispatch(getFAQSuccess(data))
  }, [dispatch, search]);

  return (
    <>
      { isLoading && <Loading centered={true}/> }
      {
        <>
          <NavBar 
            setIsLoading={setIsLoading}
          />
          { !isLoading && showAlert &&
            <CustomAlert
              severity={alertSeverity}
              label={alertLabel}
              onClose={handleClickShowAlert}
            /> 
          }
          <Container 
            sx={{
              padding: '40px 24px', 
              minHeight:'100vh',
              width: '100%',
              maxWidth:'tablet',
              display: 'flex',
              flexDirection: 'column', 
              gap: '40px',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              [theme.breakpoints.down('tablet')]: {
                padding: '40px 16px',
              }, 
              marginTop: '64px'
            }} 
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column', 
                gap: '8px',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }} 
            >
              <Typography 
                sx={{ 
                  color: 'black.main', 
                  typography: 'heading_h2',
                  [theme.breakpoints.down('tablet')]: {
                    typography: 'heading_h3',
                  }, 
                }}
              >
                Frequently Asked Question (FAQ)
              </Typography>
              <Typography 
                sx={{ 
                  color: 'dark_gray.main', 
                  typography: 'heading_h5',
                  [theme.breakpoints.down('tablet')]: {
                    typography: 'heading_h6',
                  }, 
                }}
              >
                Explore the question that have frequently asked from other users.
              </Typography>
            </Box>
          </Container>
        </> 
      }
    </>
  )
}
