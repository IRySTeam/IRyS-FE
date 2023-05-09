import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { NEXT_PUBLIC_API_URL } from '@/constants/api';
import { Container, Button, Typography, Box, } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import Loading from '@/component/loading';
import CustomAlert from '@/component/custom-alert';
import NavBar from '@/component/navbar';
import { getDocumentDetailFailed, getDocumentDetailSuccess } from '@/state/actions/documentActions';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import DownloadIcon from '@mui/icons-material/Download';

export default function Repository() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertLabel, setAlertLabel] = useState('Repository successfully created!');
  const documentData = useSelector(state => state.document);
  const [docs, setDocs] = useState([]);

  const formatUrl = (url) => {
    const prefix = 'https://storage.googleapis.com/irys-dev/';
    const newPrefix = 'https://irys-dev.storage.googleapis.com/';
    return url.replace(prefix, newPrefix);
  };

  const handleClickShowAlert= () => setShowAlert((show) => !show);

  useEffect(() => {
    setIsLoading(true);
    const { id } = router.query;
    if(!id){
      //
    }else{
      const fetchDocumentDetail = async () =>  {
        const token =  Cookies.get('access_token');
        try {
          const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/v1/repositories/documents/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          const doc = { 
            uri: formatUrl(response.data.file_url),
            fileType: response.data.doc_detail.doc_metadata.mimetype || 'application/pdf'
          }
          setDocs([doc])
          dispatch(getDocumentDetailSuccess(response.data))
        } catch (error){
          dispatch(getDocumentDetailFailed(error.response.data))
          setAlertSeverity('error');
          setAlertLabel(`Network Error, Please try again`);
          setShowAlert(true);
        }
        setIsLoading(false)
      }
      
      if(!documentData.id || documentData.id  !== id){
        fetchDocumentDetail()
      }else{
        setIsLoading(false)
      }
    }
  }, [dispatch, router, documentData.id]);


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
              [theme.breakpoints.down('tablet')]: {
                gap: '16px'
              },  
            }} 
          >
          <Typography 
            sx={{ 
              color: 'black.main', 
              typography: 'heading_h2',
              [theme.breakpoints.down('tablet')]: {
                typography: 'heading_h4',
              }, 
            }}
          >
            {documentData.title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: {mobile: 'column', laptop: 'row'},
              justifyContent: {mobile: 'flex-start', laptop: 'space-between'},
              alignItems: 'flex-start',
              width: '100%',
              gap: '40px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                width: {mobile: '100%', laptop: 'calc(50% - 20px)'},
              }}
            >
              <DocViewer
                pluginRenderers={DocViewerRenderers}
                documents={docs}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                width: {mobile: '100%', laptop: 'calc(50% - 20px)'},
                gap: '16px',
              }}
            >
              <Box
                sx={{
                  width:'100%',
                  display: 'flex',
                  flexDirection: 'row', 
                  alignItems: 'center',
                  justifyContent:'space-between',
                }} 
              >
                <Typography 
                  sx={{ 
                    color: 'black.main', 
                    typography: 'heading_h2',
                    [theme.breakpoints.down('small')]: {
                      typography: 'heading_h3',
                    },
                  }}
                >
                  Information
                </Typography>
                <Button 
                  color='primary' 
                  variant='contained' 
                  sx={{ 
                    height: '32px',
                    width: '125px',
                    typography: theme.typography.heading_h6,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '8px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: {mobile: 0, small:'16px'},
                    marginTop: {mobile: 0, small:'6px'},
                  }}
                >
                  <Typography
                    sx={{ 
                      color: 'white.main', 
                      typography: 'heading_h6',

                    }}
                  >
                    Download
                  </Typography>
                  <DownloadIcon
                    sx={{
                      width: '18px',
                      height: '18px',
                      color: theme.palette.white.main
                    }}
                  />
                </Button>
              </Box>
              <Box sx={{ backgroundColor: 'light_gray.main', width: '100%', height: '1px',}}/>
            </Box>
          </Box>
          </Container>
        </> 
      }
    </>
  )
}
