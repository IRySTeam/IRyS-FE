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

export default function FeaturesManageRepositorySetting() {
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
            features={'Manage Repository Setting'}
          />
          <FeaturesDrawer 
            features={'Manage Repository Setting'}
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
                Manage Repository Setting
              </Typography>
              <Typography 
                sx={{ 
                  color: 'black.main', 
                  typography: 'paragraph_h4',
                  textAlign: 'justify',
                }}
              >
                This feature provides users with the ability to edit various aspects of a repository, including the repository name, description, and visibility settings. Additionally, this feature grants the user the capability to delete the repository if needed. It is important to note that these actions can only be performed by the owner or an administrator of the repository.
              </Typography>
              <Box
                sx={{
                  border: '1px solid',
                  borderColor: theme.palette.light_gray.main,
                  alignSelf: 'center'
                }}
              >
                <Image 
                  src={'/features/general_settings.png'} 
                  alt='repository general setting page' 
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
                Users can modify the name of the repository, allowing them to update it based on their requirements or any changes in the project. Users also have the option to edit the repository`s description, enabling them to provide additional information or make necessary updates. Users can adjust the visibility settings of the repository, controlling who can access and view the repository. Visibility options typically include public or private access. Users with the appropriate permissions can delete the repository, permanently removing it from the system. This action should be exercised with caution as it cannot be undone.
                <br/><br/>
                The ability to manage repository settings, including editing and deletion, is restricted to the owner of the repository or users with administrator privileges. This ensures that only authorized individuals have control over these critical actions. Users without the necessary permissions will not be able to access the page or perform any modifications. By providing these features empowers repository owners and administrators to maintain and customize their repositories according to their specific needs while preserving the overall security and integrity of the repository.
              </Typography>
            </Box>
          </Container>
        </> 
      }
    </>
  )
}
