import { useState } from 'react';
import { Container, Button, Typography, Box, useMediaQuery, } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import Loading from '@/component/loading';
import NavBar from '@/component/navbar';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FeaturesNav from '@/component/features-nav';
import FeaturesDrawer from '@/component/features-drawer';
import Logo from '@/component/logo';

export default function FeaturesIndex() {
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
            features={'Overview'}
          />
          <FeaturesDrawer 
            features={'Overview'}
            isDrawerOpen={isDrawerOpen}
            toggleDrawer={toggleDrawer}
          />
          <Container 
            sx={{
              padding: '40px', 
              minHeight:'100vh',
              display: 'flex',
              flexDirection: 'column', 
              gap: '40px',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              width: 'calc(100% - 362px)',
              [theme.breakpoints.down('small')]: {
                padding: '40px 16px',
                width: '100%',
              },
              [theme.breakpoints.down('tablet')]: {
                gap: '16px'
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
          <Typography 
            sx={{ 
              color: 'black.main', 
              typography: 'heading_h2',
              [theme.breakpoints.down('tablet')]: {
                typography: 'heading_h4',
              }, 
            }}
          >
            Intelligent Repository System - Overview
          </Typography>
          <Logo
            width={mobile? 120: 150}
            height={mobile? 120: 150}
            variant={mobile? 'logo_small': 'logo_large'}
            withText={true}
            sx={{
              alignSelf: 'center'
            }}
          />
          <Typography
            sx={{ 
              color: 'black.main', 
              typography: 'paragraph_h4',
              textAlign: 'justify',
            }}
          >
          IRyS is a web-based software that offers a comprehensive system for building a digital repository. It allows you to store and manage all your unstructured documents in one centralized location. With IRyS, you no longer have to worry about losing or misplacing your documents. You can easily upload and store them securely within the repository. Whether it TXT, PDF, DOC or DOCX, IRyS can handle it all.
          <br/>
          <br/>
          But what makes IRyS truly intelligent is its powerful search capabilities. You can effortlessly find specific documents by searching for keywords or utilizing metadata associated with the documents. IRyS allows you to choose the domain or category in which you want to search, making it even more tailored to your needs.
          <br/>
          <br/>
          The benefits of using IRyS are abundant. It provides a well-organized and secure storage space for all your documents, eliminating the clutter and confusion of physical or scattered digital files. You can access your documents anytime, anywhere, as long as you have an internet connection. This means you can retrieve and work with your documents whenever the need arises, whether you are at home, in the office, or on the go.
          <br/>
          <br/>
          In summary, IRyS is an invaluable tool for document storage and retrieval. It simplifies document management, ensures their safety, and enables quick and efficient access to your files. Embrace the power of IRyS and experience the convenience and peace of mind it brings to your document management needs.
          </Typography>
          </Container>
        </> 
      }
    </>
  )
}
