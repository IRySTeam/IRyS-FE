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

export default function FeaturesSarchDocumentsRepositories() {
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
            features={'Search Documents and Repositories'}
          />
          <FeaturesDrawer 
            features={'Search Documents and Repositories'}
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
            Search Documents and Repositories
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
                src={'/features/public_search.svg'} 
                alt='create repo image' 
                width={mobile? 300: 500} 
                height={mobile? 200: 355}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                gap: '8px'
              }}
            >
              <Typography 
                sx={{ 
                  color: 'black.main', 
                  typography: 'heading_h4',
                  textAlign: 'justify',
                }}
              >
                Public Search
              </Typography>
              <Typography 
                sx={{ 
                  color: 'black.main', 
                  typography: 'paragraph_h4',
                  textAlign: 'justify',
                }}
              >
                Public search allows you to search for repositories and documents that you have access to. Having access to a repository or document can mean that you were explicitly given authority to access the resource or that the resource is made public by the owners. 
                <br/><br/>
                Public search can be accessed through the top search bar from within your dashboard.
              </Typography>
            </Box>

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
                src={'/features/joined_search.svg'} 
                alt='create repo image' 
                width={mobile? 300: 500} 
                height={mobile? 200: 355}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                gap: '8px'
              }}
            >
              <Typography 
                sx={{ 
                  color: 'black.main', 
                  typography: 'heading_h4',
                  textAlign: 'justify',
                }}
              >
                Joined Repository Search
              </Typography>
              <Typography 
                sx={{ 
                  color: 'black.main', 
                  typography: 'paragraph_h4',
                  textAlign: 'justify',
                }}
              >
                Joined repository search allows you to search for documents within a specific repository that you have access to. Please note that you will need to be explicitly granted access to the repository by the repository owner (if you are not the owner).
                <br/><br/>
                Joined repository search can be accessed through the search bar after choosing a specific repository from your dashboard.
              </Typography>
            </Box>

          </Box>
          </Container>
        </> 
      }
    </>
  )
}
