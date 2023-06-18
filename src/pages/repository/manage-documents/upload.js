import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { NEXT_PUBLIC_API_URL } from '@/constants/api';
import { Container, Box, Typography, Button } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import NavBar from '@/component/navbar';
import Loading from '@/component/loading';
import CustomAlert from '@/component/custom-alert';
import ManageDocumentsTabs from '@/component/tabs/manage-documents';
import Uploader from '@/component/uploader';
import { isUploader } from '@/utils/roles';
import { getRepoCollaboratorListFailed, getRepoCollaboratorListSuccess, getRepoDetailFailed, getRepoDetailSuccess } from '@/state/actions/repositoryActions';
import { getSingleRepoFailed, getSingleRepoSuccess } from '@/state/actions/singleRepositoryActions';
import { refresh } from '@/utils/token';

export default function ManageDocumentsUpload() {
  const theme = useTheme();
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertLabel, setAlertLabel] = useState('Your changes to the repository settings have been successfully saved');
  const repositoryData = useSelector(state => state.repository);
  
  useEffect(() => {
    setIsLoading(true);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const { id } = router.query;
    if(!id){
        //
    }else{
      const fetchDetailRepo = async () =>  {
        const token =  Cookies.get('access_token');
        try {
          const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/v1/repositories/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          dispatch(getRepoDetailSuccess(response.data))
        } catch (error){
          dispatch(getRepoDetailFailed(error.response.data))
          setAlertSeverity('error');
          if(error.response){
            switch (error.response.data.error_code){
              case 401:
                refresh('access_token', 'refresh_token', router);
                setAlertSeverity('success');
                setAlertLabel('Your session has been restored. Please Try Again.');
                setShowAlert(true);
                setIsLoading(false);
                break;
              case 'USER__EMAIL_NOT_VERIFIED':
                setAlertLabel('Email is not verified');
                setShowAlert(true);
                break;
              case 'REPOSITORY__NOT_FOUND':
                setAlertLabel('Repository not found');
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
        }
      }

      const fetchRepoCollaborator = async () =>  {
        const token =  Cookies.get('access_token');
        try {
          const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/v1/repositories/${id}/members`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          dispatch(getRepoCollaboratorListSuccess(response.data))
        } catch (error){
          dispatch(getRepoCollaboratorListFailed(error.response.data))
          setAlertSeverity('error');
          if(error.response){
            switch (error.response.data.error_code){
              case 401:
                refresh('access_token', 'refresh_token', router);
                setAlertSeverity('success');
                setAlertLabel('Your session has been restored. Please Try Again.');
                setShowAlert(true);
                setIsLoading(false);
                break;
              case 'USER__NOT_ALLOWED':
                setAlertLabel('You are not allowed to perform this action');
                setShowAlert(true);
                break;
              case 'REPOSITORY__NOT_FOUND':
                setAlertLabel('Repository not found');
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
        }
      }

      const fetchDocumentCount = async () =>  {
        const token =  Cookies.get('access_token');
        try {
          const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/v1/repositories/${id}/documents/count`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          dispatch(getSingleRepoSuccess(response.data))
        } catch (error){
          dispatch(getSingleRepoFailed(error.response.data))
          setAlertSeverity('error');
          if(error.response){
            switch (error.response.data.error_code){
              case 401:
                refresh('access_token', 'refresh_token', router);
                setAlertSeverity('success');
                setAlertLabel('Your session has been restored. Please Try Again.');
                setShowAlert(true);
                setIsLoading(false);
                break;
              case 'USER__NOT_ALLOWED':
                setAlertLabel('You are not allowed to perform this action');
                setShowAlert(true);
                break;
              case 'REPOSITORY__NOT_FOUND':
                setAlertLabel('Repository not found');
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
        }
      }

      fetchDetailRepo()
      fetchRepoCollaborator()
      fetchDocumentCount()
      setIsLoading(false);
    }
  }, [dispatch, router, repositoryData.id]);

  const handleClickShowAlert= () => setShowAlert((show) => !show);

  return (
    <>
      { isLoading && <Loading centered={true}/> }
      {!isLoading &&
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
              padding: '40px', 
              minHeight:'100vh',
              maxWidth:'large',
              display: 'flex',
              flexDirection: 'column', 
              gap: '40px',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              [theme.breakpoints.down('small')]: {
                padding: '40px 16px',
              },
              marginTop: '64px',
            }} 
          >
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
                gap: '16px',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <Button 
                color='primary' 
                variant='contained' 
                sx={{ 
                  height: '36px',
                  width: '36px',
                  typography: theme.typography.heading_h6,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '4px 8px'
                }}
                onClick={() => router.push({ pathname: '/repository', query: {id: id} })}
              >
                <KeyboardBackspaceIcon 
                  sx={{
                    width: '24px',
                    height: '24px',
                    color: theme.palette.white.main
                  }}
                />
              </Button>
              <Typography 
                sx={{ 
                  color: 'black.main', 
                  typography: 'heading_h1',
                  [theme.breakpoints.down('tablet')]: {
                    typography: 'heading_h3',
                  },
                  maxWidth: 'calc(100% - 80px)',
                  wordWrap: 'break-word'
                }}
              >
                {repositoryData.name}
              </Typography>
            </Box>
            <Box
              sx={{
                width:'100%',
                display: 'flex',
                flexDirection: { mobile: 'column', small:'row' }, 
                gap: '40px',
                alignItems: 'flex-start',
                justifyContent:{ mobile: 'flex-start', small:'space-between' },
              }} 
            >
              <Box
                sx={{
                  width:{ mobile: '100%', small:'250px' },
                  display: 'flex',
                  gap: '18px',
                  flexDirection: 'column', 
                  alignItems: 'flex-start',
                  justifyContent:'flex-start',
                }} 
              >
                <Typography 
                  sx={{ 
                    color: 'black.main', 
                    typography: 'heading_h3',
                    [theme.breakpoints.down('small')]: {
                      typography: 'heading_h4',
                    }, 
                  }}
                >
                Manage Documents
                </Typography>
                <ManageDocumentsTabs
                  id={id} 
                  type={'upload'}
                />
              </Box>
              { isUploader(repositoryData.current_user_role) &&
              <Box
                sx={{
                  width:{ mobile: '100%', small:'calc(100% - 350px)'},
                  display: 'flex',
                  flexDirection: 'column', 
                  alignItems: 'flex-start',
                  justifyContent:'flex-start',
                  [theme.breakpoints.down('small')]: {
                    gap: '16px',
                  }, 
                }}  
              >
                <Box
                  sx={{
                    width:{ mobile: '100%'},
                    display: 'flex',
                    flexDirection: 'column', 
                    alignItems: 'flex-start',
                    justifyContent:'flex-start',
                    gap: '16px'
                  }} 
                >
                  <Typography 
                    sx={{ 
                      color: 'black.main', 
                      typography: 'heading_h2',
                      [theme.breakpoints.down('small')]: {
                        typography: 'heading_h3',
                      },
                      marginLeft: '16px', 
                    }}
                  >
                    Upload Documents
                  </Typography>
                  <Box sx={{ backgroundColor: 'light_gray.main', width: '100%', height: '1px',}}/>
                  <Uploader
                    setShowAlert={setShowAlert}
                    setAlertSeverity={setAlertSeverity}
                    setAlertLabel={setAlertLabel}
                    setIsLoading={setIsLoading}
                    page={'upload-file'}
                    repoId={id}
                  />
                </Box>
              </Box>
              }
              { !isUploader(repositoryData.current_user_role) &&
              <Box
                sx={{
                  width: '100%', 
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItem: 'center'
                }}
              >
                <Typography variant='paragraph_h2' color='dark_gray.main' sx={{textAlign: 'center'}}>Access Denied</Typography>
                <Typography variant='paragraph_h4' color='dark_gray.main' sx={{textAlign: 'center'}}>You are not <span style={{fontWeight: 700}}>Owner or Admin</span> of this repository</Typography>
              </Box>
              }
            </Box>
          </Container>
        </>
      }
    </>
  )
}
