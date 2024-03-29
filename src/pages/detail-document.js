import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { NEXT_PUBLIC_API_URL } from '@/constants/api';
import { Container, Button, Typography, Box, } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import Loading from '@/component/loading';
import CustomAlert from '@/component/custom-alert';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import NavBar from '@/component/navbar';
import { getDocumentDetailFailed, getDocumentDetailSuccess } from '@/state/actions/documentActions';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import DownloadIcon from '@mui/icons-material/Download';
import MetadataItem from '@/component/metadata-item';
import { downloadFile } from '@/utils/download';
import { refresh } from '@/utils/token';

export default function DetailDocument() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
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
        if(!id) return
        try {
          const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/v1/documents/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          const doc = [{ 
            uri: formatUrl(response.data.file_url),
          }]
          setDocs(doc)
          dispatch(getDocumentDetailSuccess(response.data))
        } catch (error){
          dispatch(getDocumentDetailFailed(error.response.data.error_code))
          setAlertSeverity('error')
          if(error.response){
            switch (error.response.data.error_code){
              case 401:
                refresh('access_token', 'refresh_token', router);
                setAlertSeverity('success');
                setAlertLabel('Your session has been restored. Please Try Again.');
                setShowAlert(true);
                setIsLoading(false);
                break;
              case 403:
                setAlertLabel('Request forbidden -- authorization will not help');
                setShowAlert(true);
                setIsError(true);
                break;
              case 'USER__NOT_ALLOWED':
                setAlertLabel('You don\'t have access to this document');
                setShowAlert(true);
                setIsError(true);
                break;
              case 'DOCUMENT__NOT_FOUND':
                setAlertLabel('Document not found');
                setShowAlert(true);
                setIsError(true);
                break;
              default :
                setAlertLabel('Network Error, Please Try Again.');
                setShowAlert(true);
                setIsError(true);
                break;
            }
          } else{
            setAlertLabel('Network Error, Please Try Again.');
            setShowAlert(true);
            setIsError(true);
          }
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
              marginTop: '64px',
            }} 
          >
          
          {!isError && 
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
              onClick={() => router.back()}
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
                typography: 'heading_h2',
                [theme.breakpoints.down('tablet')]: {
                  typography: 'heading_h4',
                },
                maxWidth: '100%',
                wordWrap: 'break-word'
              }}
            >
              {documentData.title}
            </Typography>
          </Box>
          }
          {!isError && 
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
                gap: '8px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  width: '100%',
                  border: '1px solid',
                  borderColor: theme.palette.light_gray.main,
                }}
              >
                <DocViewer
                  pluginRenderers={DocViewerRenderers}
                  documents={docs}
                  config={{ header: { disableHeader: true } }}
                  style={{ maxHeight: 700, minHeight: 700}}
                />
              </Box>
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
                  alignSelf: 'flex-end'
                }}
                onClick={()=> downloadFile(documentData.file_url)}
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
                  justifyContent:'flex-start',
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
              </Box>
              <Box sx={{ backgroundColor: 'light_gray.main', width: '100%', height: '1px',}}/>
              <Accordion
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
                  <Typography variant='heading_h4' color='black.main'>Extracted Information</Typography>
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
                  { documentData.doc_detail.doc_metadata && 
                  Object.entries(documentData.doc_detail.doc_metadata).map(([key, value]) => (
                      <MetadataItem
                        key={key} 
                        label={key}
                        value={value}
                      />
                    ))
                  }
                </AccordionDetails>
              </Accordion>
              <Accordion
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
                  <Typography variant='heading_h4' color='black.main'>Extracted Entities</Typography>
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
                  { documentData.doc_detail.doc_entities && 
                  Object.entries(documentData.doc_detail.doc_entities).map(([key, value]) => (
                      <MetadataItem
                        key={key} 
                        label={key}
                        value={value}
                      />
                    ))
                  }
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>
          }
          </Container>
        </> 
      }
    </>
  )
}
