import { useState } from 'react';
import { Container, Button, Typography, Box, useMediaQuery, } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import Loading from '@/component/loading';
import NavBar from '@/component/navbar';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FeaturesNav from '@/component/features-nav';
import FeaturesDrawer from '@/component/features-drawer';
import Image from 'next/image';

export default function FeaturesUpload() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const router = useRouter();
  const toggleDrawer = (open) => {
    setIsDrawerOpen(open)
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      { isLoading && <Loading centered={true}/> }
      {!isLoading &&
        <>
          <NavBar 
            setIsLoading={setIsLoading}
          />
          <FeaturesNav 
            features={'Upload Documents'}
          />
          <FeaturesDrawer 
            features={'Upload Documents'}
            isDrawerOpen={isDrawerOpen}
            toggleDrawer={toggleDrawer}
          />
          <Container 
            sx={{
              padding: '40px', 
              minHeight:'100vh',
              display: 'flex',
              flexDirection: 'column', 
              gap: '56px',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              width: 'calc(100% - 362px)',
              [theme.breakpoints.down('small')]: {
                padding: '40px 16px',
                width: '100%',
              },
              [theme.breakpoints.down('tablet')]: {
                gap: '40px'
              },
              marginTop: '64px',
              marginLeft: {mobile: '0', small: '360px'},
            }}  
          >
            <Button 
              color='primary' 
              variant='contained' 
              sx={{ 
                height: '32px',
                width: {tablet:'200px'},
                typography: theme.typography.heading_h6,
                display: 'flex',
                flexDirection: 'row',
                gap: '8px',
                justifyContent: 'space-between',
                alignItems: 'center',
                display: {mobile: 'flex', small:'none'},
              }}
              onClick={() => toggleDrawer(true)}
            >
              <Typography
                sx={{ 
                  color: 'white.main', 
                  typography: 'heading_h6',
                }}
              >
                Explore Features
              </Typography>
              < ArrowForwardIosIcon color='white' sx={{width: '20px', height: '20px'}}/>
            </Button>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column', 
                gap: '16px',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                width: '100%',
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
                Upload Documents
              </Typography>
              <Typography 
                sx={{ 
                  color: 'black.main', 
                  typography: 'paragraph_h4',
                  textAlign: 'justify',
                }}
              >
               This feature offers a dedicated page where users, including the repository owner, admin, and uploaders, can upload various documents. Users can select and upload documents from their local devices to the repository. This feature supports various file formats, including TXT, DOC, DOCX, and PDF. This feature typically imposes a maximum total file size limit up to 30 MB per upload. Once uploaded, users can manage their documents within the repository.
                <br/><br/>
              </Typography>
              <Box
                sx={{
                  border: '1px solid',
                  borderColor: theme.palette.light_gray.main,
                  alignSelf: 'center'
                }}
              >
                <Image 
                  src={'/features/upload.png'} 
                  alt='upload documents page' 
                  width={mobile? 309: 712.5} 
                  height={mobile? 172: 395}
                />
              </Box>
            </Box>
          </Container>
        </> 
      }
    </>
  )
}
