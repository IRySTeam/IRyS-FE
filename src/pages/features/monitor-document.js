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

export default function FeaturesMonitorDocument() {
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
            features={'Monitor Document'}
          />
          <FeaturesDrawer 
            features={'Monitor Document'}
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
                Monitor Documents
              </Typography>
              <Typography 
                sx={{ 
                  color: 'black.main', 
                  typography: 'paragraph_h4',
                  textAlign: 'justify',
                }}
              >
                To enable document search functionality, it is necessary to index the document within the application. To check the indexing status of a document, you can navigate to the &quot;Manage Document&quot; section on a repository page.
              </Typography>
              <Box
                sx={{
                  border: '1px solid',
                  borderColor: theme.palette.light_gray.main,
                  alignSelf: 'center'
                }}
              >
                <Image 
                  src={'/features/monitor_document.png'} 
                  alt='monitor documents page' 
                  width={mobile? 356.25: 712.5} 
                  height={mobile? 197.5: 395}
                />
              </Box>
              <Typography 
                sx={{ 
                  color: 'black.main', 
                  typography: 'paragraph_h4',
                  textAlign: 'justify',
                }}
              >
                Occasionally, the indexing process may encounter failures. In such cases, you can reindex the document by clicking on the &quot;Reindex&quot; button for each individual document or by selecting the &quot;Reindex All&quot; button. Additionally, you have the ability to search for specific documents or apply filters based on the indexing status.
              </Typography>
            </Box>
          </Container>
        </> 
      }
    </>
  )
}
