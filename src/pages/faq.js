import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, Typography, Box, OutlinedInput } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Loading from '@/component/loading';
import NavBar from '@/component/navbar';
// import axios from 'axios';
// import { createRepositoryValidation } from '@/schema/create-repository';
// import Cookies from 'js-cookie'
// import { NEXT_PUBLIC_API_URL } from '@/constants/api';
// import { refresh } from '@/utils/token';
import CustomAlert from '@/component/custom-alert';
import { faq } from '@/data/faq';
import { getFAQSuccess } from '@/state/actions/faqActions';
import FormInput from '@/component/form-input';

export default function Faq() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('error');
  const [alertLabel, setAlertLabel] = useState('Network Error, Please Try Again.');
  const [search, setSearch] = useState('');
  const faqData = useSelector( state => state.faq )

  const formik = useFormik({
    initialValues: {
      question: ''
    },
    onSubmit: () => {
      setIsLoading(true);
      setAlertSeverity('success');
      setAlertLabel('Your feedback or question successfully sent')
      setShowAlert(true);
      formik.setFieldValue('question', '')
      setIsLoading(false);
    },
  });

  const handleClickShowAlert= () => setShowAlert((show) => !show);
  
  useEffect(() => {
    const data = faq.filter((q) => q.question.toLowerCase().includes(search.toLowerCase()) || q.answer.toLowerCase().includes(search.toLowerCase()))
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
            <OutlinedInput
              id='own'
              name='own'
              placeholder='Ask a question...'
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              sx={{
                width: '100%',
                '& .MuiInputBase-input': {
                  height: '42px',
                  maxHeight: '42px',
                  padding: '0 16px',
                  display: 'flex',
                  justifyContent: 'center',
                  typography: theme.typography.paragraph_h5,
                  backgroundColor: theme.palette.white.main,
                  border: '1px solid',
                  borderColor: theme.palette.dark_gray.main,
                  borderRadius: '5px',
                },
                '&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                  border: '0 !important',
                },
                '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: '0 !important',
                },
                '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                  border: '0 !important',
                },
              }}
            />
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                flexDirection: 'column', 
                gap: '16px',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }} 
            >
              { faqData.questions.length > 0 &&
                faqData.questions.map((q, index) => (
                  <Accordion
                    key={index}
                    sx={{
                      border: '1px solid',
                      borderColor: theme.palette.light_gray.main,
                      borderRadius: '5px',
                      width: '100%'
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                      <ExpandMoreIcon 
                        sx={{
                          width: '32px',
                          height: '32px',
                          color: theme.palette.black.main,
                        }}
                      />}
                      sx={{
                        padding:'0 16px'
                      }}
                    >
                      <Typography variant='heading_h4' color='black.main'>{q.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        borderTop: '1px solid',
                        borderTopColor: theme.palette.light_gray.main,
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}
                    >
                      <Typography 
                        sx={{ 
                          color: 'black.main', 
                          typography: 'paragraph_h5',
                        }}
                      >
                        {q.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))
              }
              { faqData.questions.length === 0 &&
                <>
                  <Typography 
                    sx={{ 
                      color: 'black.main', 
                      typography: 'heading_h4',
                      alignSelf: 'center'
                    }}
                  >
                    There is no relevant answer to your question.
                  </Typography>
                  <Typography 
                    sx={{ 
                      color: 'black.main', 
                      typography: 'paragraph_h4',
                      alignSelf: 'center'
                    }}
                  >
                    Please ask your question through this form.
                  </Typography>
                  <form 
                    onSubmit={formik.handleSubmit} 
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      gap: '16px'
                    }}
                  >
                    <FormInput 
                      id='question'            
                      name='question'
                      placeholder='Enter your question...'
                      value={formik.values.question}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.question && Boolean(formik.errors.question)}
                      helpertext={formik.touched.question && formik.errors.question}
                    />
                    <Button 
                      color='primary' 
                      variant='contained' 
                      sx={{ 
                        height: '32px', 
                        padding: '0 12px',
                        width: '160px',
                        typography: theme.typography.heading_h6,
                        '&.Mui-disabled': {
                          backgroundColor: theme.palette.dark_gray.light,
                          color: theme.palette.light_gray.light,
                        },
                        alignSelf: 'flex-end'
                      }}
                      type='submit'
                      disabled={formik.values.name === '' }
                    >
                      Ask Question
                    </Button> 
                  </form>
                </>
              }
            </Box>
          </Container>
        </> 
      }
    </>
  )
}
