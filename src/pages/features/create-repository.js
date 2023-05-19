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

export default function FeaturesCreateRepository() {
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
            features={'Create Repositories'}
          />
          <FeaturesDrawer 
            features={'Create Repositories'}
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
            Create Repositories
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: {mobile: 'column', small: 'row'},
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: '100%',
              gap: '16px',
            }}
          >
            <Box
              sx={{
                border: '1px solid',
                borderColor: theme.palette.light_gray.main,
              }}
            >
              <Image 
                src={'/features/create_repo_1.svg'} 
                alt='create repo image' 
                width={mobile? 300: 500} 
                height={mobile? 200: 355}
              />
            </Box>
            <Typography 
              sx={{ 
                color: 'black.main', 
                typography: 'paragraph_h4',
                textAlign: 'justify',
              }}
            >
              The first thing you have to do before you can save documents is to create a repository. To create a repository, you can click on the &quot;New Repository&quot; button or click on the &quot;Create a Repository&quot; link. You will be redirected to the Create Repository page.
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: {mobile: 'column', small: 'row-reverse'},
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: '100%',
              gap: '16px',
            }}
          >
            <Box
              sx={{
                border: '1px solid',
                borderColor: theme.palette.light_gray.main,
              }}
            >
              <Image 
                src={'/features/create_repo_2.svg'} 
                alt='create repo image 2' 
                width={mobile? 300: 500} 
                height={mobile? 200: 355}
              />
            </Box>
            <Typography 
              sx={{ 
                color: 'black.main', 
                typography: 'paragraph_h4',
                textAlign: 'justify',
              }}
            >
              On the &quot;Create Repository&quot; page, you will encounter a form that needs to be filled out in order to create a repository. The form prompts you to provide a name for your repository, and optionally, a description. Additionally, you are required to choose the visibility setting for your repository, which can be either public or private. Opting for a public repository allows it to be viewed by anyone on IRyS, whereas a private repository restricts access solely to the repository collaborators, including yourself as the owner. Once you have entered the necessary details, you can proceed by clicking on the &quot;Create Repository&quot; button.
            </Typography>
          </Box>
          </Container>
        </> 
      }
    </>
  )
}
