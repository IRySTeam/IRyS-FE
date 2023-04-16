import { useState } from 'react';
import { useFormik } from 'formik';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
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
import { createRepositoryValidation } from '@/schema/create-repository';

export default function CreateRepository() {
  const theme = useTheme();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      type: 'public'
    },
    validationSchema: createRepositoryValidation,
    onSubmit: (values) => {
      setIsLoading(true);
      router.push({ pathname: '/', query: { newRepository : values.name }})
    },
  });

  return (
    <>
      { isLoading && <Loading centered={true}/> }
      {!isLoading &&
        <>
          <NavBar 
            setIsLoading={setIsLoading}
          />
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
                Create Repository
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
                Here you can create a new repository for your project. Fill out the following details to get started.
              </Typography>
            </Box>
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
                id='name'            
                name='name'
                label='Repository Name'
                placeholder='Enter a repository name'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helpertext={formik.touched.name && formik.errors.name}
                required={true}
                small={true}
              />
              <FormInput 
                id='description'            
                name='description'
                label='Description'
                placeholder='Enter repository description'
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helpertext={formik.touched.description && formik.errors.description}
                small={true}
                multiline={true}
                optional={true}
              />
              <Box 
                sx={{ 
                  height: '1px', 
                  width: '100%',
                  backgroundColor: theme.palette.black.main
                }}
              />
              <FormControl>
                <RadioGroup
                  name='type'
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                  }}
                >
                  <FormControlLabel 
                    value='public' 
                    control={<Radio />} 
                    label={
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          gap: '16px'
                        }}
                      >
                        <FolderSharedOutlinedIcon
                          sx={{
                            width: '32px',
                            height: '32px',
                            color: theme.palette.black.main
                          }}
                        />
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            gap: '3px'
                          }}
                        >
                          <Typography variant='form_label_small' color='black.main'>Public Repository</Typography>
                          <Typography variant='form_sublabel_small' color='black.main'>Public repositories are visible to everyone</Typography>
                        </Box>
                      </Box>
                    } 
                  />
                  <FormControlLabel 
                    value='private' 
                    control={<Radio />} 
                    label={
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          gap: '16px'
                        }}
                      >
                        <LockOutlinedIcon
                          sx={{
                            width: '32px',
                            height: '32px',
                            color: theme.palette.black.main
                          }}
                        />
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            gap: '3px'
                          }}
                        >
                          <Typography variant='form_label_small' color='black.main'>Private Repository</Typography>
                          <Typography variant='form_sublabel_small' color='black.main'>Private repositories are only visible to you and selected collaborators</Typography>
                        </Box>
                      </Box>
                    } 
                  />
                </RadioGroup>
              </FormControl>
              <Box 
                sx={{ 
                  height: '1px', 
                  width: '100%',
                  backgroundColor: theme.palette.black.main
                }}
              />
              <Button 
                color='primary' 
                variant='contained' 
                sx={{ 
                  height: '32px', 
                  marginTop: '24px',
                  padding: '0 12px',
                  width: '160px',
                  typography: theme.typography.heading_h6,
                  '&.Mui-disabled': {
                    backgroundColor: theme.palette.dark_gray.light,
                    color: theme.palette.light_gray.light,
                  },}}
                type='submit'
                disabled={formik.values.name === '' }
              >
                Create Repository
              </Button> 

            </form>
          </Container>
        </> 
      }
    </>
  )
}
