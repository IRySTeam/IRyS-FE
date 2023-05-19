import { useState } from 'react';
import { Container, Button, Typography, Box, } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import Loading from '@/component/loading';
import NavBar from '@/component/navbar';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FeaturesNav from '@/component/features-nav';
import FeaturesDrawer from '@/component/features-drawer';

export default function FeaturesUpload() {
  const theme = useTheme();
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
            Upload Documents
          </Typography>
          </Container>
        </> 
      }
    </>
  )
}
